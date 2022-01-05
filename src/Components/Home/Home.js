/* eslint-disable import/no-cycle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Navigationbar from '../Navigationbar/Navigationbar';
import ContactWelcome from './ContactWelcome/ContactWelcome';
import './Home.css';
import Product from './Product/Product';
import SearchProduct from './SearchProduct/SearchProduct';

const Home = () => {
    const [category, setCategory] = useState();
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        fetch(`https://powerful-sierra-34042.herokuapp.com/product/${category}`)
            .then((res) => res.json())
            .then((data) => {
                setProductList(data);
            });
    }, [category]);
    return (
        <div className="backgroundHome">
            <div className="welcome-img" />
            <ContactWelcome />
            <SearchProduct />
            <Navigationbar setCategory={setCategory}></Navigationbar>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    {productList.map((product) => (
                        <>
                            <Product product={product} />
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
