import React, { useEffect, useState } from 'react';
import './ProductQuery.css';

const ProductQuery = () => {
    const [query, setQuery] = useState([]);
    const [answer, setAnswer] = useState();

    useEffect(() => {
        fetch("https://powerful-sierra-34042.herokuapp.com/query")
        .then((res) => res.json())
        .then((data) => {
            setQuery(data);
        });
    },[])

    const handleSubmitQuery = (id)=>{
        if(answer){
        fetch(`https://powerful-sierra-34042.herokuapp.com/query/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({answer: answer}),
        })
        .then(res => res.json())
        .then(res => {
            alert(res.message);
        })
    }
    }
    return (
        <section className="container">
            {
                query.map(qr => (
                    <div className="query-box">
                        <p><span className="font-weight-bold">Product Title: </span>{qr.productTitle}</p>
                        <p><span className="font-weight-bold">User Name: </span>{qr.username}</p>
                        <p><span className="font-weight-bold">Question: </span>{qr.question}</p>
                        <textarea className="form-control z-depth-1" onChange={(e)=> setAnswer(e.target.value)} placeholder="reply..."></textarea><br />
                        <button className="btn btn-dark" onClick={()=> handleSubmitQuery(qr._id)}>Submit</button>
                    </div>
                )
                )
            }
        </section>
    );
};

export default ProductQuery;