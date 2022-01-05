import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Navigationbar from '../../Navigationbar/Navigationbar';

const UserDonation = () => {
    const [donation, setDonation] = useState([]);

    useEffect(()=>{
        fetch(`https://powerful-sierra-34042.herokuapp.com/donation/${localStorage.getItem('userMobile')}`)
            .then(res => res.json())
            .then((data) =>{
                setDonation(data.result);
            });
    }, [])

    return (
        <div className="backgroundColorSingle">
           <Navigationbar></Navigationbar>
           
          <div className="page">
            <h3 className="text-center titleStyle mb-4">My Donations</h3>
                <Row>

                {
                    donation&&donation.map(item => <>
                        
                        <Col xl={6} lg={6} md={12} sm={12} xs={12} className="mb-4">
                            <Row>
                                <Col lg={10} md={12} sm={12} xs={12}>
                                        <div className="clientInfo">
                                            <p className="text"><p className="d-inline bg-dark text-white mx-2">Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>{item.createdAt}</p>
                                            <p className="text"><p className="d-inline bg-dark text-white mx-2">Invoice: &nbsp;&nbsp; </p>{item.invoiceNo}</p>
                                        </div>
                                </Col>

                            </Row>
                            {
                                    item.donatedProducts&&<>
                                        <Row>
                                            {item.donatedProducts.map(product=><>
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
                                               
                                                <h6>Status:
                                                     { 
                                                     item.status === 'received' ?
                                                      <span style={{fontSize: '26px', fontWeight: 'bold'}} className="text-success mx-2">✔</span> 
                                                      : 
                                                      <span className="text-danger mx-2">Pending</span> 
                                                      }
                                                </h6>
                                            </div>
                                                            
                                        </Row>
                                    </>
                      
                             }

                        </Col>
                        </>)
                    }
                </Row>
          </div>
      
        </div>
    );
};

export default UserDonation;