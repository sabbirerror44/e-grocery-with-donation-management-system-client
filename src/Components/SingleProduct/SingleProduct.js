import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext, UserContext } from '../../App';
import Navigationbar from '../Navigationbar/Navigationbar';
import './SingleProduct.css';

const SingleProduct = () => {

    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [value, setValue] = useState({
        count: 0,
    });
    const [donation, setDonation] = useState({
        quantity: 0,
    });

    const [cartItems, setCartItems] = useContext(CartContext);
    const handleAddProduct = (product) => {
       
        const totalQuantity = parseInt(value.count) + parseInt(donation.quantity);
        if(totalQuantity <= product.stock){
        if (parseInt(value.count) || parseInt(donation.quantity)!== 0) {
            // eslint-disable-next-line no-underscore-dangle
            const toBeAddedId = product._id;
            // eslint-disable-next-line no-underscore-dangle
            const sameProduct = cartItems.find((pd) => pd._id === toBeAddedId);
            let c = 1;
            let d = 0;
            let newCartItems;
            let totalquantity;
            if (sameProduct) {
                c = sameProduct.quantity + parseInt(value.count);
                d = sameProduct.donation + parseInt(donation.quantity)
                if (c <= product.stock-d) sameProduct.quantity = c;
                if (d <= product.stock-c) sameProduct.donation = d;
                // eslint-disable-next-line no-underscore-dangle
                if(product.donation>0){
                    totalquantity = sameProduct.quantity + sameProduct.donation;
                }
                else{
                    totalquantity = sameProduct.quantity;
                }

                sameProduct.totalAmount = sameProduct.price * totalquantity;
                const others = cartItems.filter((pd) => pd._id !== toBeAddedId);
                newCartItems = [...others, sameProduct];
            } else {
                // eslint-disable-next-line no-param-reassign
                product.quantity = parseInt(value.count);
                product.donation = parseInt(donation.quantity);
                if(product.donation>0){
                    totalquantity = product.quantity + product.donation;
                }
                else{
                    totalquantity = product.quantity;
                }
                product.totalAmount = product.price * totalquantity;
                newCartItems = [...cartItems];
                newCartItems.push(product);
            }
            setCartItems(newCartItems);
        }
    }
    };
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [question, setQuestion] = useState();
    const [query, setQuery] = useState([]);
    // const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        fetch(`https://powerful-sierra-34042.herokuapp.com/product/single/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data[0]);
            });

        fetch(`https://powerful-sierra-34042.herokuapp.com/query/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setQuery(data);
            });
    }, [id]);

    const handleChange = (e) => {
        setValue({ count: parseInt(e.target.value) || 0 });
    };
    const decrease = () => {
        if (value.count <= 0) {
            return;
        }
        setValue({ count: value.count - 1 });
    };
    const increase = () => {
        if (value.count >= product.stock-donation.quantity) {
            return;
        }
        setValue({ count: value.count + 1 });
    };

    const handleChangeDonation = (e) => {
        setDonation({ quantity: parseInt(e.target.value) || 0 });
    };
    const decreaseDonation = () => {
        if (donation.quantity <= 0) {
            return;
        }
        setDonation({ quantity: donation.quantity - 1 });
    };
    const increaseDonation = () => {
        if (donation.quantity >= product.stock-value.count) {
            return;
        }
        setDonation({ quantity: donation.quantity + 1 });
    };
    const handleSubmitQuery = () => {
        const newQuery ={};
        newQuery.productId = id;
        newQuery.productTitle = product.title;
        newQuery.question = question;
        newQuery.answer = null;
        newQuery.username =  localStorage.getItem('userName');;

        if(newQuery.question){
            fetch(`https://powerful-sierra-34042.herokuapp.com/query`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newQuery),
            })
                .then((res) => res.json())
                .then((result) => {
                    alert(result.message);
                });
        }
    }
    return (
        <div className="backgroundColorSingle">
            <Navigationbar />
            <div className="container">
                <div className="d-flex main">
                    <div className="style mt-4">
                           <div className="text-center my-3">
                                <img
                                        className="rounded centerForce"
                                        src={`https://powerful-sierra-34042.herokuapp.com/${product.image}`}
                                        alt=""
                                    />
                        </div>
                         <h4 className="text-center titleSingle">{product.title}</h4>
                         <h5 className="text-center priceSingle">{product.price} BDT </h5>
                         {
                            product.stock > 0 ?
                            <div className="text-center">
                            <h6 className="priceSingle">Stock: {product.stock}</h6>
                            </div>
                            :
                            <div className="text-center">
                            <h6 >Out of stock</h6>
                            </div>
                         }
                         
                    </div>
                    <div className="style2 ml-5">
                        

                        <h6 className="d-inline-block mt-2 mb-3 titleStyle">Quantity: </h6><br />
                        <div className="d-flex flex-row mb-2"  role="group">
                            <button type="button" onClick={decrease} className="btn btn-danger mr-2">-</button>
                            <input type="text" className="form-control w-25" value={value.count} onChange={handleChange} />
                            <button type="button"  onClick={increase} className="btn btn-info ml-2">+</button>
                        </div>

                      
                        <h6 className="titleStyle"> Wanna Donate some for needy? </h6><br/>
                         <div className="d-flex flex-row mt-2" role="group">
                            <button type="button" onClick={decreaseDonation} className="btn btn-danger mr-2">-</button>
                            <input type="text" className="form-control w-25" value={donation.quantity} onChange={handleChangeDonation} />
                            <button type="button"  onClick={increaseDonation} className="btn btn-info ml-2">+</button>
                        </div>
                      
                        <button
                            onClick={() => handleAddProduct(product)}
                            type="button"
                            className="addCart mt-3"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className="row mt-4" style={{'margin': '1px'}}>
                    <div className="col-10 productDetails">
                        <h5 className="titleSingle">Product Details</h5>
                        <div className="p-1">
                        <p>{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
            {
                loggedInUser ?
                <div className="col-8 query-section">
                    <h5 className="titleStyle margin">Any Query about this product?</h5>
                    <div className="form-group ml-4 shadow-textarea">
                        <textarea className="ml-2 form-control z-depth-1" rows="3"  onChange={(e)=> setQuestion(e.target.value)}  placeholder="Enter your question here..."></textarea>
                    </div>
                    <button className="btnQuery" onClick={handleSubmitQuery}>Submit</button>
                </div>
                :
                <></>
            }
            </div>
            
            <div className="mb-3 ml-5">
                {

                    query.length ?
                    <h5 className="titleStyle mt-4 extra-margin">Product Query given below...</h5>
                    :
                    <></>

                }
           <div className="row">
            {
               
                query.map(qr => (
                    <>  
                        <div className="col-8 query-design">
                            <p><span className="text-primary">{qr.username}</span> - { moment(`${qr.createdAt}`).fromNow() }</p>
                            <p>Q: {qr.question}</p>
                            <p className="">A: {qr.answer}</p>
                        </div>
                    </>
                )
                )
               
            }
             </div>

            </div>
        </div>
    );
};

export default SingleProduct;
