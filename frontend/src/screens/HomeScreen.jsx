import React from 'react'
import { useEffect ,useState } from 'react';
import { products } from '../proudcts';
import { Row ,Col } from 'react-bootstrap'
import Proudcts from '../component/Proudcts';
import axios from 'axios';

const HomeScreen = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const featchProuducts=async()=>{
      try{
        const {data}= await axios.get('/api/prouduct');
        setProduct(data)
        console.log(data)
      }
      catch(err){
        console.log(err.message)
    }};
    featchProuducts();
  }, []);
  return (
    <div>
    <h1>Latest proudcts</h1> 
    <Row className='my-3'>
    {product.map(proudcts => (
      <Col key={proudcts._id} xl={3} sm={12} md={6} lg={4} className='my-2'>
        <Proudcts proudcts={proudcts} />
      </Col>
    ))}
    </Row>
    </div>
  )
}

export default HomeScreen
