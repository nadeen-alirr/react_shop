import React from "react";
import { products } from "../proudcts";
import { Link, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  } from "react-bootstrap";
import Rating from "../component/Rating";
import axios from "axios";
import Proudcts from "../component/Proudcts";
const ProuductScreen = () => {
const [products,setProduct]=useState([]);
  const { id: productId } = useParams();
useEffect(
    () => {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(
            `/api/prouduct/${productId}`
          );
          setProduct(data);
          console.log(products);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProduct();
    },
    [productId]
  );
  return (
    <>
      <Link className="btn btn-light btn-goback" to="/">
        Go back
      </Link>
      <Row>
        <Col md={5} >
          <Image className="img-fluid" src={products.image} alt={products.name} style={{ maxHeight: '500px' , borderRadius:'10px' ,marginTop:'20px', width:'100%'}} />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{products.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={products.rating}
                text={`${products.numReviews} review`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <h6><strong>Price :</strong> ${products.price}</h6>
            </ListGroup.Item>
            <ListGroup.Item>
            <h6><strong>Brand :</strong> {products.brand}</h6>
          </ListGroup.Item>
          <ListGroup.Item>
          <h6><strong>Category :</strong> {products.category}</h6>
        </ListGroup.Item>
            <ListGroup.Item>
              <h6><strong>Description :</strong> {products.description}</h6>
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
                    <strong>{products.price}</strong>
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
                      {products.countInStock > 0 ? "In stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button>Add To Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default ProuductScreen;