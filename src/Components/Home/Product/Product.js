/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
    const { product } = props;
    return (
        <div className="col-lg-4 col-md-6">
            <div className="card">
                <div className="card-img">
                    <Link to={`/singleProduct/${product._id}`}>
                        <img className="" src={`https://powerful-sierra-34042.herokuapp.com/${product.image}`} alt="" />
                    </Link>
                </div>
                <Card.Body>
                    <Card.Title className="titleColor">{product.title}</Card.Title>
                    <Card.Text className="titleColor">Taka {product.price} BDT</Card.Text>
                    <NavLink style={{textDecoration: 'none'}} to={`/singleProduct/${product._id}`}><button type="button" className="homeButton">
                       View Details
                    </button>
                    </NavLink>
                </Card.Body>
            </div>
        </div>
    );
};

export default Product;
