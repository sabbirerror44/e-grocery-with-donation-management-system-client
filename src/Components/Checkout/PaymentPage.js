import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import rejected from '../../image&gif/reject.jpg';
import successful from '../../image&gif/successful.jpg';

const PaymentPage = () => {

    const { id } = useParams();

useEffect(() => {

    if(id === 'failed') {
        console.log('payment failed');
    }
    else{

        const orderObj = JSON.parse(localStorage.getItem('order'));
        const donation = JSON.parse(localStorage.getItem('donation'));

        orderObj.payment = {
            paymentMethod: 'online payment',
            TransactionId: id
        };

        donation.payment = {
            paymentMethod: 'online payment',
            TransactionId: id
        };

        if ( orderObj.products.length > 0 ) {

            fetch('https://powerful-sierra-34042.herokuapp.com/order/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderObj),
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result.message);
                    localStorage.removeItem('order');
                });
        }


        if (donation.donatedProducts.length > 0) {

            fetch('https://powerful-sierra-34042.herokuapp.com/donation/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(donation),
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result.message);
                    localStorage.removeItem('donation')
                });
        }

    }
   

},[id])
    return (
        <div className="container my-5">
            {
                id !== 'failed' ?
                <div className="w-50 mx-auto text-center">
                    <img className="w-25" src={successful} alt = "successful" />
                    <h5>Your payment was successfully received</h5>
                    <h5>We are processing your order</h5>
                    <h6>Thank you</h6>
                </div> : 

                 <div className="w-50 mx-auto text-center">
                    <img className="w-25" src={rejected} alt = "rejected" />
                    <h5>Your payment has been rejected</h5>
                    <h5>Try Again...</h5>
                 </div> 
            }
        </div>
    );
};

export default PaymentPage;