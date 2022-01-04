import React, { useEffect, useState } from 'react';
import getPopularProduct from '../../DatabaseCall/getPopularProduct';
import Product from '../Home/Product/Product';
import Navigationbar from '../Navigationbar/Navigationbar';
import './Popular.css';

const Popular = () => {
    const [product, setProduct] = useState([]);
    const [selectCategoryProduct, setSelectCategoryProduct] = useState([]);

    useEffect(() => {

        getPopularProduct()
        .then(
            function(data) {
    
                setProduct(data);
                setSelectCategoryProduct(data);
            },
            function(){
    
                setProduct([]);
                setSelectCategoryProduct([]);
            }
        );
    },[])

    const handleOnChange = (e)=>{
        if(e.target.value === 'All'){
            setProduct(selectCategoryProduct);
        }
        else{
            const tempProduct = selectCategoryProduct.filter( item => item.category === e.target.value);
            setProduct(tempProduct);
        }
    }

    return (
        <div className="backgroundColorSingle">
        <Navigationbar />
                <div className="container my-5">
                    <h3 className="text-center titleStyle my-4">Popular Products</h3>
                    <select id="category" onChange={handleOnChange} required>
                                <option value="All">All</option>
                                <option value="oil">Oil</option>
                                <option value="rice">Rice</option>
                                <option value="beverages">Beverages</option>
                                <option value="bakery">Bakery</option>
                    </select>
                        <div className="row d-flex justify-content-center">
                            {
                            product.length?
                            product.map((product) => (
                                <>
                                    <Product product={product} />
                                </>
                            ))
                            :
                            <h5 className="text-center titleStyle"> No Popular Products Available</h5>
                        }
                        </div>
                    </div>
        </div>
    );
};

export default Popular;