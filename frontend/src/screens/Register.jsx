import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContainerForm from "../component/ContainerForm";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUserInformation } from "../slices/AuthSlice";
import { useRegistrationMutation } from "../slices/UserApiSlice";
import {toast} from 'react-toastify';
import Loader from "../component/Loader";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state)=> state.Auth) 
  console.log(userInfo)


  const [ register,{isLoading}] =useRegistrationMutation();
  const {search}= useNavigate();
  const search_params = new URLSearchParams(search);
  const redirect = search_params.get("redirect") || '/';

  const [inputFields, setInputFields] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Username: "",
  });

  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);
  const [confirmpasswordIcon, setconfirmPasswordIcon] = useState(eyeOff);


  const handleToggle = (field) => {
    if (field === 'password') {
      setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
      setPasswordIcon((prevIcon) => (prevIcon === eye ? eyeOff : eye));
    } else if (field === 'confirmPassword') {
      setConfirmPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
      setconfirmPasswordIcon((prevIcon) => (prevIcon === eye ? eyeOff : eye));
    }
  };
 
  
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const regexemail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexpassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  

  const validateValues = (inputValues) => {
    console.log(inputValues)

    let errors = {};

    // Password validation
    if (!inputValues.Password) {
        errors.password = "Password is required";
    } else if (!regexpassword.test(inputValues.Password)) {
        errors.password = " At least 8 characters with at least one uppercase letter, one digit, and one special character.";
    }

    // Confirm Password validation
    if (!inputValues.ConfirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
    } else if (inputValues.Password !== inputValues.ConfirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    // Email validation
    if (!inputValues.Email) {
        errors.email = "Email is required";
    } else if (!regexemail.test(inputValues.Email)) {
        errors.email = "Email is not valid";
    }

    // Username validation
    if (!inputValues.Username) {
        errors.username = "Username is required";
    }

    return errors;
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const finishSubmit = () => {
    console.log(inputFields);
  };
 

  useEffect(()=>{
    
    if (userInfo) {
      navigate(redirect);
    }
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  },[userInfo , redirect ,navigate ,errors]); 


    const HandleRegister = async(e) =>{
      
      e.preventDefault();
      const validationErrors = validateValues(inputFields);
      setErrors(validationErrors);
      if(Object.keys(validationErrors).length === 0){
       
        const email = inputFields.Email;
        const password = inputFields.Password;
        const username = inputFields.Username;
        try {
          const response =await register({ email ,password ,username }).unwrap();
          console.log(response);
          dispatch(setUserInformation({...response}));
          navigate(redirect);
          toast.success("Registration Successfull");
        } catch (err) {
          console.log(err);
          setErrors(err.message);
          toast.error(err.message);
        }
       }
      }
  return (
    <>
   {
    isLoading ?(
      <Loader />
    ):(
      <ContainerForm>

      <h1>Register</h1>
      <Form onSubmit={HandleRegister}>
      <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control  placeholder="Enter email"  name="Email"  value={inputFields.Email}  onChange={handleChange}/>
      {errors.email && (
        <p className="error">
         {errors.email}
        </p>
      )}
      </Form.Group>
      
      <Form.Group controlId="formBasicPassword" className="password_container">
      
      <Form.Label>Password</Form.Label>
      <Form.Control placeholder="Password" name="Password" value={inputFields.Password} type={passwordType}  onChange={handleChange} className="inputfiled"/>
      <span className="flex justify-around items-center icon_eyes" onClick={() => handleToggle('password')} style={{ cursor: 'pointer' }}>
          <Icon className="absolute mr-10"  icon={passwordIcon} size={25}/>
      </span>

      {errors.password &&(
        <p className="error">
         {errors.password}
        </p>
      ) }

      </Form.Group>

      <Form.Group controlId="formBasicConfirmPassword" className="password_container">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type={confirmPasswordType} placeholder="Confirm Password"  name="ConfirmPassword" value={inputFields.ConfirmPassword} onChange={handleChange}/>
      <span className="flex justify-around items-center icon_eyes" onClick={() => handleToggle('confirmPassword')} style={{ cursor: 'pointer' }}>
      <Icon className="absolute mr-10" icon={confirmpasswordIcon} size={25}/>
      </span>

      {errors.confirmPassword && (
        <p className="error">
         {errors.confirmPassword}
        </p>
      ) }
      </Form.Group>
      <Form.Group controlId="formBasicUsername">
      <Form.Label>Username</Form.Label>
      <Form.Control type="text" placeholder="Username" name="Username" value={inputFields.Username} onChange={handleChange}/>

      {errors.username && (
        <p className="error">
         {errors.username}
        </p>
      )}

      </Form.Group>
      <Row>
      <Col md={6}>
      Already have an account?
      <Link to={redirect ? `/login?redirect=${redirect}` :'/login'}>Login</Link>
      </Col>
      </Row>
      <Row>
      <Col md={4}>
      <Button variant="primary" type="submit" className="mt-2"  disabled={isLoading}>
      Register
      </Button>
      </Col>
      </Row>
  
      </Form>
      </ContainerForm>
    )
   }
    </>
  )
}

export default Register
