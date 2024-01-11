import React from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../component/Rating";
import { useGetOneProuductQuery } from "../slices/ProuductApislice";
import Message from "../component/Message";
// import Proudcts from "../component/Proudcts";
import Loader from "../component/Loader";
const ProuductScreen = () => {

  const { id :prouductId } = useParams();
  const { data: prouduct, isLoading, error } = useGetOneProuductQuery(prouductId);
  return (
    <>
    <Link className="btn btn-light btn-goback" to="/">
    Go back
    </Link>
    {isLoading ? (
     <Loader/>
    ) : error ?(
      <Message variant='danger'>{error?.data?.message || error.error}</Message>
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
                    {prouduct.countInStock > 0 ? "In stock" : "Out of Stock"}
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
    ) }
    </>
  );
};
export default ProuductScreen;
