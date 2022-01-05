import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SearchProduct.css';

const SearchProduct = () => {

    const [result, setResult] = useState([]);

    const handleSearch = (e) =>{

    if( e.target.value !== ''){
       
        fetch(`https://powerful-sierra-34042.herokuapp.com/product/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({productName: e.target.value}),
        })
            .then((res) => res.json())
            .then((result) => {
                setResult(result);
            });
            
    }
    else {
        setResult([]);
    }
}

    return (
        <>
        <div className="product-search-div">
            <div className="search-box">
                
                
                <input type="text" className="input-search-box" onBlur={(e)=> handleSearch(e)} placeholder="Search Product..." />
                <FontAwesomeIcon  className="mr-2 text-white search-pro-btn" icon={faSearch} />
                <div className="">
                    <ul>

                    {
                        result.map(item => (

                  <>    
                    <img className="small-product-img" src={`https://powerful-sierra-34042.herokuapp.com/${item.image}`} alt="product-img"/>
                    <NavLink style={{textDecoration: 'none', color: 'white'}} to={`/singleProduct/${item._id}`}>{item.title}
                    </NavLink>
                  <br />
                  </>
                          

                        ))
                    }
                    </ul>
                </div>
            </div>
            
       </div>
       </>
    );
};

export default SearchProduct;