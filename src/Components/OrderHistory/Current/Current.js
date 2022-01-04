import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Navigationbar from '../../Navigationbar/Navigationbar';
import './Current.css';

const Current = () => {
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:5000/order/processing/${localStorage.getItem('userMobile')}`)
            .then(res => res.json())
            .then((data) =>{
                setOrders(data);
            });
    }, [])

    return (
        <div className="backgroundColorSingle">
           <Navigationbar></Navigationbar>
           
          <div className="page">
            <h3 className="text-center titleStyle mb-4">Your Current Orders</h3>
                <Row>

                {
                    orders&&orders.map(order => <>
                        
                        <Col xl={6} lg={6} md={12} sm={12} xs={12} className="mb-4">
                            <Row>
                                <Col lg={10} md={12} sm={12} xs={12}>
                                        <div className="clientInfo">
                                            <p className="text"><p className="d-inline bg-dark text-white mx-2">Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>{order.createdAt}</p>
                                            <p className="text"><p className="d-inline bg-dark text-white mx-2">Invoice: &nbsp;&nbsp; </p>{order.invoiceNo}</p>
                                        </div>
                                </Col>

                            </Row>
                            {
                            order.products?<>
                                <Row>
                                    {order.products.map(product=><>
                                        <Col lg={4} md={4} sm={4} xs={4}>
                                            <p>{product.title}</p>
                                        </Col>
                                        <Col lg={3} md={3} sm={3} xs={3}>
                                            <p>Donation: {product.donation}</p>
                                        </Col>
                                        <Col lg={3} md={3} sm={3} xs={3}>
                                            <p>Qty: {product.quantity}</p>
                                        </Col>
                                    </>
                                    
                                    )}
                                    <div className="commonBorder"></div><br/>

                                    <div className="priceStyle">
                                    <p>Total Price: {order.price.totalPrice} ৳</p> <br/>
                                    </div>
                                </Row>
                            </>:<h2>Products not found</h2>
                            
                        }

                        </Col>
                        </>)
                    }
                </Row>
          </div>
      
        </div>
    );
};

export default Current;