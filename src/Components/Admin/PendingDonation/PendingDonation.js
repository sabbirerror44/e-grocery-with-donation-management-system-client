import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './PendingDonation.css';

const PendingDonation = () => {
    const [pendingDonations, setpendingDonations] = useState([]);
    useEffect(() =>{
        fetch(`https://powerful-sierra-34042.herokuapp.com/donation/pending`)
        .then((res) => res.json())
        .then((data) => {
            setpendingDonations(data);
        });
    }, [pendingDonations])

    const handleClickDelivered = (id) =>{
        fetch(`https://powerful-sierra-34042.herokuapp.com/donation/pending/${id}`, {
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
        fetch(`https://powerful-sierra-34042.herokuapp.com/donation/${id}`, {
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
              <h4 className="titleStyle text-center mb-4"> Pending Donations </h4>
            
         {pendingDonations.result?<div>
             <Row className=''>
             {pendingDonations.result.map(donation => <>
                <Col xl={6} lg={6} md={12} sm={12} xs={12} className="mb-4">
                   <Row> 
                        <Col lg={10} md={12} sm={12} xs={12}>
                                <div className="clientInfo">
                                   <p className="text"><p className="d-inline bg-dark text-white mx-2">Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>{donation.createdAt}</p>
                                   <p className="text"><p className="d-inline bg-dark text-white mx-2">Invoice: &nbsp;&nbsp; </p>{donation.invoiceNo}</p>
                                   <p className="text"><p className="d-inline bg-dark text-white mx-2">Org Name: &nbsp; </p>{donation.organizationName}</p>
                                    <p className="text"><p className="d-inline bg-dark text-white mx-2">Client: &nbsp;&nbsp;&nbsp; </p>{donation.donerInfo.name}</p>
                                    <p className="text"><p className="d-inline bg-dark text-white mx-2">Address: </p> {donation.donerInfo.address}</p>
                                    <p className="text"><p className="d-inline bg-dark text-white mx-2">Phone: &nbsp;&nbsp; </p> {donation.donerInfo.mobileNo}</p>  
                                    <p className="text"><p className="d-inline bg-dark text-white mx-2">Payment: </p> {donation.payment.paymentMethod}</p>
                                  {donation.payment.TransactionId? <p className="text"><p className="d-inline bg-dark text-white mx-2">Trans_Id:</p> {donation.payment.TransactionId}</p>:''}                           
                                </div>
                        </Col>
                    </Row>

                  {
                      donation.donatedProducts&&<>
                          <Row>
                              {donation.donatedProducts.map(product=><>
                                <Col lg={8} md={8} sm={8} xs={8}>
                                    <p>{product.title}</p>
                                </Col>
                                <Col lg={4} md={4} sm={4} xs={4}>
                                    <p>Quantity: {product.donation}</p>
                                </Col>
                                
                              </>
                               
                              )}
                            <div className="commonBorder"></div><br/>
                            <div className="w-100 mb-4 mx-4">
                                <button className="mx-2 buttonDesign" onClick={()=>handleClickDelivered(donation._id)}>Delivered</button>
                                <button className="buttonDesignDel" onClick={()=>handleClickDelete(donation._id)}>Delete</button>
                            </div>
                          </Row>
                      </>
                      
                  }

                
                </Col>
                
             </>
             )}
          </Row></div>:<h2>No pending donations</h2>
         
         } 

             
      
        </div>
    );
        };

export default PendingDonation;