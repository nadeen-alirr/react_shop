import React from "react";
import { products } from "../proudcts";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  } from "react-bootstrap";
import Rating from "../component/Rating";
const ProuductScreen = () => {
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);
  return (
    <>
      <Link className="btn btn-light btn-goback" to="/">
        Go back
      </Link>
      <Row>
        <Col md={5} >
          <Image className="img-fluid" src={product.image} alt={product.name} style={{ maxHeight: '500px' , borderRadius:'10px' ,marginTop:'20px', width:'100%'}} />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} review`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <h6><strong>Price :</strong> ${product.price}</h6>
            </ListGroup.Item>
            <ListGroup.Item>
            <h6><strong>Brand :</strong> {product.brand}</h6>
          </ListGroup.Item>
          <ListGroup.Item>
          <h6><strong>Category :</strong> {product.category}</h6>
        </ListGroup.Item>
            <ListGroup.Item>
              <h6><strong>Description :</strong> {product.description}</h6>
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
                    <strong>{product.price}</strong>
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
                      {product.countInStock > 0 ? "In stock" : "Out of Stock"}
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