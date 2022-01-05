import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {

    const [totalOrder, setTotalOrder] = useState(0);
    const [totalOrderDelivered, setTotalOrderDelivered] = useState(0);
    const [totalDonation, setTotalDonation] = useState(0);
    const [totalDonationDelivered, setTotalDonationDelivered] = useState(0);

    useEffect(() => {

        fetch(`https://powerful-sierra-34042.herokuapp.com/order/allOrders`)
        .then((res) => res.json())
        .then((data) => {
            if(data.length){
            setTotalOrder(data.length);
            }
        });

        fetch(`https://powerful-sierra-34042.herokuapp.com/donation/all`)
        .then((res) => res.json())
        .then((data) => {
            if(data.length){
            setTotalDonation(data.length);
            }
        });

        fetch(`https://powerful-sierra-34042.herokuapp.com/order/delivered`)
        .then(res => res.json())
        .then(data => {
            if(data.result.length){
            setTotalOrderDelivered(data.result.length);
            }
        })

        fetch(`https://powerful-sierra-34042.herokuapp.com/donation/delivered`)
        .then(res => res.json())
        .then(data => {
            if(data.result.length){
            setTotalDonationDelivered(data.result.length);
            }
        })


    }, [])

    return (
        <section> 
            <h4 className="text-center titleStyle">Admin Dashboard</h4>
            <div className="row d-flex justify-content-center">
            
            <div className="col-md-6">
                <div style={{backgroundColor: '#7C83FD'}} className="card-admin">
                    <h4>Total order</h4>
                    <h5>{totalOrder}</h5>
                </div>
            </div>
            <div className="col-md-6">
                <div style={{backgroundColor: '#04BE5B'}} className="card-admin">
                    <h4>Pending order</h4>
                    <h5>{totalOrder - totalOrderDelivered}</h5>
                </div>
            </div>
            <div className="col-md-6">
                <div style={{backgroundColor: '#9DBF16'}} className="card-admin">
                    <h4>Delivered order</h4>
                    <h5>{totalOrderDelivered}</h5>
                </div>
            </div>
            <div className="col-md-6">
                <div style={{backgroundColor: '#FF9948'}} className="card-admin">
                    <h4>Total Donation</h4>
                    <h5>{totalDonation}</h5>
                </div>
            </div>
            <div className="col-md-6">
                <div style={{backgroundColor: '#DF5E5E'}} className="card-admin">
                    <h4>Pending donation</h4>
                    <h5>{totalDonation - totalDonationDelivered}</h5>
                </div>
            </div>
            <div className="col-md-6">
                <div style={{backgroundColor: '#FDD2BF'}} className="card-admin">
                    <h4>Donation delivered</h4>
                    <h5>{totalDonationDelivered}</h5>
                </div>
            </div>
            </div>
        </section>
    );
};

export default Dashboard;