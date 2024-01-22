import React, { useState } from "react";
import { Row, Col, ListGroup, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Message from "../component/Message";
import { BsTrash } from "react-icons/bs";
import { addToCart } from "../slices/cartSlice";
import { removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const { cartItem, taxItem, totalItem, priceItem } = useSelector(
    (state) => state.cartSlice
  );

  // console.log("the cart items"+ JSON.stringify(cartItem))

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const HandlerAddtoCart = async (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const handel_checkout = () => {
    navigate("/login?redirect=/shipping");
    // navigate('/login', { state: { redirect: '/shopping' } });
  };
  return (
    <div>
      <Row>
        <h1>Cart Shopping</h1>
        {cartItem.length === 0 ? (
          <Message variant="info">
            <span>Cart is empty </span>
            <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItem.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                      </Row>
                      <Row>
                        <Link to={`/products/${item._id}`}>{item.brand}</Link>
                      </Row>
                    </Col>
                    <Col md={2}>
                      <h3>${item.price}</h3>
                    </Col>
                    <Col md={2}>
                      <Row>
                        <Col md={12}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) => {
                              HandlerAddtoCart(item, e.target.value);
                            }}
                          >
                            {[...Array(item.countInStock).keys()].map(
                              (index) => (
                                <option key={index} value={index + 1}>
                                  {index + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={2}>
                      <BsTrash
                        onClick={() => {
                          removeFromCartHandler(item._id);
                        }}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        )}
        {cartItem.length > 0 && (
          <Col md={4}>
            <h2>
              SubTotal {cartItem.reduce((a, b) => a + Number(b.qty), 0)} Items
            </h2>
            <ListGroup variant="flush">
              <Card>
                <ListGroup.Item>
                  <span>Price of Items :</span>
                  <strong> {priceItem}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>Tax Items :</span>
                  <strong> {taxItem}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>Total :</span>
                  <strong> {totalItem}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link>
                    <Button
                      variant="primary pt-2 btn-block"
                      disabled={cartItem.length === 0}
                      onClick={handel_checkout}
                    >
                      Checkout
                    </Button>
                  </Link>
                </ListGroup.Item>
              </Card>
            </ListGroup>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CartScreen;
