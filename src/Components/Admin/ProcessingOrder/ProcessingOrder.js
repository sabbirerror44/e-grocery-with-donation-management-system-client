import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './ProcessingOrder.css';

const ProcessingOrder = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    useEffect(() =>{
        fetch(`https://powerful-sierra-34042.herokuapp.com/order/processing`)
        .then((res) => res.json())
        .then((data) => {
            setPendingOrders(data);
        });
    }, [])

    const handleClickDelivered = (id) =>{
        fetch(`https://powerful-sierra-34042.herokuapp.com/order/processing/${id}`, {
            method: 'PUT',
        })
        .then((res) => res.json())
        .then((result) => {
                if(result.message) {
                       alert(result.message)
                }
             })
        }
        
    const handleClickDelete = (id) =>{
        fetch(`https://powerful-sierra-34042.herokuapp.com/order/processing/${id}`, {
            method: 'DELETE',
        })
        .then((res) => res.json())
        .then((result) => {
                if(result.message) {
                       alert(result.message)
                }
             })
    }
    return (
        <div className="page">
             <h4 className="titleStyle text-center mb-4"> Processing Order </h4>
         {pendingOrders.result?<div>
             <Row className=''>
             {pendingOrders.result.map(order => <>
                <Col xl={6} lg={6} md={12} sm={12} xs={12} className="mb-4">
                  <Row>
                      <Col lg={10} md={12} sm={12} xs={12}>
                            <div className="clientInfo">
                                <p className="text"><p className="d-inline bg-dark text-white mx-2">Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>{order.createdAt}</p>
                                <p className="text"><p className="d-inline bg-dark text-white mx-2">Invoice: &nbsp;&nbsp; </p>{order.invoiceNo}</p>
                                <p className="text"><p className="d-inline bg-dark text-white mx-2">Client: &nbsp;&nbsp;&nbsp; </p>{order.userInfo.name}</p>
                                <p className="text"><p className="d-inline bg-dark text-white mx-2">Address: </p> {order.userInfo.address}</p>
                                <p className="text"><p className="d-inline bg-dark text-white mx-2">Phone: &nbsp;&nbsp; </p> {order.userInfo.mobileNo}</p> 
                                <p className="text"><p className="d-inline bg-dark text-white mx-2">Payment: </p> {order.payment.paymentMethod}</p>
                                {order.payment.TransactionId? <p className="text"><p className="d-inline bg-dark text-white mx-2">Trans_Id:</p> {order.payment.TransactionId}</p>:''}                     
                            </div>
                      </Col>

                  </Row>
                  {
                      order.products?<>
                          <Row>
                              {order.products.map(product=><>
                                <Col lg={6} md={6} sm={6} xs={6}>
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
    
                            <div className="w-100 mb-4 mx-4">
                                <button className="mx-2 buttonDesign" onClick={()=>handleClickDelivered(order._id)}>Delivered</button>
                                <button className="buttonDesignDel" onClick={()=>handleClickDelete(order._id)}>Delete Order</button>
                            </div>
                            
                          </Row>
                      </>:<h2>Products Not found</h2>
                      
                  }

                
                </Col>
                
             </>
             )}
          </Row></div>:<h2>No pending orders</h2>
         
         } 

             
      
        </div>
    );
        };

export default ProcessingOrder;