import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div style={{display:'flex' ,alignItems:'center',justifyContent:'center',height:'70vh'}}>
      <Spinner animation="border" role="status" style={{height:'80px',width:'80px'  }}>
      </Spinner>
    </div>
  )
}

export default Loader
