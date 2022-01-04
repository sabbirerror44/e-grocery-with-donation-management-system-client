import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const OrgHome = () => {

    const [deliveredDonation, setDeliveredDonation] = useState([]);
    const handleLogOut = ()=>{
        localStorage.clear(); 
        window.location.reload()
    }

    useEffect(()=>{

        fetch(`http://localhost:5000/donation/delivered/${localStorage.getItem('orgName')}`)
        .then((res) => res.json())
        .then((data) => {
            setDeliveredDonation(data.result);
        });

    },[])

    const handleReceived = (id, mobileNo)=>{

        fetch(`http://localhost:5000/donation/delivered/${id}`, {
            method: 'PUT',
        })
        .then((res) => res.json())
        .then((result) => {
                if(result.message) {
                       alert(result.message)
                }
             })

        fetch(`http://gsms.pw/smsapi?api_key=C2000343618ca1805c77b6.21481376&type=text&contacts=${mobileNo}&senderid=8809601001329&msg=We have received your donation. Thanks for your contribution (Team ${localStorage.getItem('orgName')})`)
        .then(res => {
            console.log();
        })
        .catch(err => {
            console.log("error:", err);
        });

    }

    return (
        <div>
            <h1 className="mt-4 text-center"> Organization Home</h1>
            <button className="float-right btn btn-danger mr-2" onClick={handleLogOut}>{localStorage.getItem('orgName')} (Log out)</button><br />

            <div className="page mt-5">
            
         {deliveredDonation.length?<div>
             <Row className=''>
             {deliveredDonation.map(donation => <>
                <Col xl={6} lg={6} md={12} sm={12} xs={12} className="mb-4">
                   <Row> 
                        <Col lg={10} md={12} sm={12} xs={12}>
                                <div className="clientInfo">
                                   <p className="text"><p className="d-inline bg-dark text-white mx-2">Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>{donation.createdAt}</p>
                                    <p className="text"><p className="d-inline bg-dark text-white mx-2">Client: &nbsp;&nbsp;&nbsp; </p>{donation.donerInfo.name}</p>
                                    <p className="text"><p className="d-inline bg-dark text-white mx-2">Address: </p> {donation.donerInfo.address}</p>
                                    <p className="text"><p className="d-inline bg-dark text-white mx-2">Phone: &nbsp;&nbsp; </p> {donation.donerInfo.mobileNo}</p>  

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
                                <button className="mx-2 buttonDesign" onClick={()=> handleReceived(donation._id, donation.donerInfo.mobileNo)}>Received</button>
                               
                            </div>
                          </Row>
                      </>
                      
                  }

                
                </Col>
                
             </>
             )}
          </Row></div>:<h2>No delivered donations</h2>
         
         } 

             
      
        </div>
        </div>
    );
};

export default OrgHome;