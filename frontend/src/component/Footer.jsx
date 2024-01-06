import React from "react";
import {  Row, Col } from "react-bootstrap";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer>
      <Row>
        <Col>
          <p className="text-center">Copyright &copy; {year}</p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
