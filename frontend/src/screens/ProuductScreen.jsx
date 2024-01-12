import React, { useState } from "react";

import { Link, useParams ,useNavigate} from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../component/Rating";
import { useGetOneProuductQuery } from "../slices/ProuductApislice";
import Message from "../component/Message";
// import Proudcts from "../component/Proudcts";
import Loader from "../component/Loader";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const ProuductScreen = () => {
  const [qty, SetQty] = useState(1);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const { id: prouductId } = useParams();
  const {
    data: prouduct,
    isLoading,
    error,
  } = useGetOneProuductQuery(prouductId);


  const Handel_Add_toCart =()=>{
    dispatch(addToCart({...prouduct ,qty}));
    navigate("/cart");

  }
  return (
    <>
      <Link className="btn btn-light btn-goback" to="/">
        Go back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image
              className="img-fluid"
              src={prouduct.image}
              alt={prouduct.name}
              style={{
                maxHeight: "500px",
                borderRadius: "10px",
                marginTop: "20px",
                width: "100%",
              }}
            />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{prouduct.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={prouduct.rating}
                  text={`${prouduct.reviews} review`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>
                  <strong>Price :</strong> ${prouduct.price}
                </h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>
                  <strong>Brand :</strong> {prouduct.brand}
                </h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>
                  <strong>Category :</strong> {prouduct.category}
                </h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>
                  <strong>Description :</strong> {prouduct.description}
                </h6>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>price</Col>
                    <Col md={6}>
                      <strong>{prouduct.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>status</Col>
                    <Col md={6}>
                      <strong>
                        {prouduct.countInStock > 0
                          ? "In stock"
                          : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {prouduct.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col md={6} className="d-flex align-items-center">
                        Qty
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => SetQty(e.target.value)}
                        >
                          {[...Array(prouduct.countInStock).keys()].map((index)=>(
                            <option key={index} value={index+1}>
                            {index+1}
                           
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button onClick={Handel_Add_toCart} disabled={prouduct.countInStock===0}>Add To Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
export default ProuductScreen;
