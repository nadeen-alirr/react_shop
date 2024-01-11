import React from "react";
import { Row, Col } from "react-bootstrap";
import Proudcts from "../component/Proudcts";
import { useGetProuductsQuery } from "../slices/ProuductApislice";
import Loader from "../component/Loader";
import Message from "../component/Message";

const HomeScreen = () => {
  const { data: productsData, isLoading, error } = useGetProuductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader/>
        ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest proudcts</h1>
          <Row className="my-3">
            {productsData.map((proudct) => (
              <Col
                key={proudct._id}
                xl={3}
                sm={12}
                md={6}
                lg={4}
                className="my-2"
              >
                <Proudcts proudcts={proudct} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
