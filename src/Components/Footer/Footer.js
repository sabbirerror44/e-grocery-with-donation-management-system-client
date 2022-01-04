/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import './Footer.css';

const Footer = () => (
    <section id="footer">
        <div className="container">
            <div className="row text-center text-xs-center text-sm-left text-md-left">
                <div className="col-xs-12 col-sm-4 col-md-4">
                    <h5>Customer Services</h5>
                    <ul className="list-unstyled quick-links">
                        <li>
                            <a href="#">
                                <i className="fa fa-angle-double-right" />
                                Grocery Stores
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-angle-double-right" />
                                FAQ
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-angle-double-right" />
                                Terms and Conditions
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-angle-double-right" />
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-angle-double-right" />
                                Videos
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4">
                    <h5>Grocery Store</h5>
                    <ul className="list-unstyled quick-links">
                        <li>
                            <a href="#">
                                <i className="fa fa-angle-double-right" />
                                About GroceryStore
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-angle-double-right" />
                                Shipping and Delivery
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-angle-double-right" />
                                Customer Care
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-angle-double-right" />
                                Careers
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-angle-double-right" />
                                Videos
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4">
                    <div>
                        <h5>Contact Us</h5>
                        <div>
                            <p className="text-white">House No: 44, OR Nizam Road</p>
                            <p className="text-white">Chittagong, Bangladesh</p>
                        </div>
                        <p className="text-white">
                            <i className="fa fa-phone" aria-hidden="true">
                                {' '}
                                +8801833904498
                            </i>
                        </p>
                        <p className="text-white">
                            <i className="fa fa-envelope" aria-hidden="true">
                                {' '}
                                grocery@gmail.com
                            </i>
                        </p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                    <ul className="list-unstyled list-inline social text-center">
                        <li className="list-inline-item">
                            <a href="#">
                                <i className="fa fa-facebook" />
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#">
                                <i className="fa fa-twitter" />
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#">
                                <i className="fa fa-instagram" />
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#">
                                <i className="fa fa-google-plus" />
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#" target="_blank">
                                <i className="fa fa-envelope" />
                            </a>
                        </li>
                    </ul>
                </div>
                <hr />
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 text-center text-white">
                    <p className="h6">
                        © All rights Reversed by
                        <a
                            className="text-green ml-2"
                            href=""
                            target="_blank"
                        >
                            Grocery Store
                        </a>
                    </p>
                </div>
                <hr />
            </div>
        </div>
    </section>
);

export default Footer;
