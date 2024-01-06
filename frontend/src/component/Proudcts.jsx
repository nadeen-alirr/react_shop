import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const Proudcts = ({ proudcts }) => {
  return (
    <Card className=" p-3 rounded" style={{ height: '100%' }}>
      <Link to={`/products/${proudcts._id}`}>
        <Card.Img  src={proudcts.image} alt={proudcts.name} variant="top" style={{ height: '270px' }} />
      </Link>
      <Card.Body >
        <Link to={`/products/${proudcts._id}`}>
          <Card.Title as="div" className="product-title">
            <strong className="name-prouduct">{proudcts.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">{proudcts.price}</Card.Text>
        <Card.Text as="div">
        <Rating value={proudcts.rating} text={`${proudcts.numReviews } reviews`}/>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Proudcts;
