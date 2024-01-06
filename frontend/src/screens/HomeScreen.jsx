import React from 'react'
import { products } from '../proudcts';
import { Row ,Col } from 'react-bootstrap'
import Proudcts from '../component/Proudcts';

const HomeScreen = () => {
  return (
    <div>
    <h1>Latest proudcts</h1> 
    <Row className='my-3'>
    {products.map(proudcts => (
      <Col key={proudcts._id} xl={3} sm={12} md={6} lg={4} className='my-2'>
        <Proudcts proudcts={proudcts} />
      </Col>
    ))}
    </Row>
    </div>
  )
}

export default HomeScreen
