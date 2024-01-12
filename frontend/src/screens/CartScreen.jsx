import React, { useState } from "react";
import { Row, Col, ListGroup, Button, Card, Form, ListGroupItem } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Message from "../component/Message";
import { BsTrash } from "react-icons/bs";
import { addToCart } from "../slices/cartSlice";
const CartScreen = () => {
  const { cartItem, taxItem, totalItem, priceItem } = useSelector(
    (state) => state.cartSlice
  );
  //   const [qty, SetQty] = useState(1);
  // console.log("the cart items"+ JSON.stringify(cartItem))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    //   dispatch(removeFromCart(id))
  };

const HandlerAddtoCart =(item,qty)=>{
    dispatch(addToCart({...item,qty}))
}
  return (
    <div>
      <Row>
        <Col md={8}>
          <h1>Cart Shopping</h1>
          {cartItem.length === 0 ? (
            <Message variant="info">
              <p>Cart is empty</p>
              <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItem.map((item) => (
                <ListGroup.Item key={item.id}>
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
                    <Col md={3}>
                      <h3>${item.price}</h3>
                    </Col>
                    <Col md={2}>
                      <Row>
                        <Col md={12}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) => {HandlerAddtoCart(item,e.target.value)}}
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
                    <Col Col={2}>
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
          )}
        </Col>
        <Col md={4}>
          <h2>
            SubTotal {cartItem.reduce((a, b) => a + Number(b.qty), 0)} Items
          </h2>
          <ListGroup variant="flush">
            <Card>
              <ListGroup.Item>
                <strong>Price of Items :</strong>
                {priceItem}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Tax Item :</strong>
                {taxItem}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Total :</strong>
                {totalItem}
              </ListGroup.Item>
              <ListGroup.Item>
              <Link to="/checkout">
              <Button variant="primary pt-2 btn-block">Checkout</Button>
            </Link>
              </ListGroup.Item>
            </Card>
          </ListGroup>

        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
