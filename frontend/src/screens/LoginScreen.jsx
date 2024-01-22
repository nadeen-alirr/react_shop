import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ContainerForm from "../component/ContainerForm";
import { Form, Row, Col, Button, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/UserApiSlice";
import { setUserInformation } from "../slices/AuthSlice";
import Loader from "../component/Loader";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.Auth);

  const search_params = new URLSearchParams(search);
  // { redirect → "/shipping" }

  const redirect = search_params.get("redirect") || "/";
  // /shipping

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim() === "" || email.trim() === "") {
      toast.error("Please fill all fields");
    } else {
      try {
        const response = await Login({ email, password }).unwrap();
        dispatch(setUserInformation({ ...response }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ContainerForm>
          <h1 className="pb-3">Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <FormGroup>
              <Form.Label>
                New Costumer
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Register
                </Link>
              </Form.Label>
            </FormGroup>

            <Row>
              <Col md={4}>
                <Button variant="primary" type="submit" disabled={isLoading}>
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </ContainerForm>
      )}
    </>
  );
};

export default LoginScreen;
