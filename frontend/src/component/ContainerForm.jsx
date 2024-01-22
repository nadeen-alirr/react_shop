import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ContainerForm = ({ children }) => {
  return (
    <Container className="p-5">
      <Row  className="justify-content-md-center">
        <Col md={6} mx={12}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default ContainerForm;
