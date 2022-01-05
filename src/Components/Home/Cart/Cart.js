/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { CartContext } from '../../../App';
import './Cart.css';

function Cart() {
    const [show, setShow] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const [cartItems, setCartItems] = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState();
    useEffect(() => {
        const newTotal = cartItems.reduce((total, item) => total + item.totalAmount, 0);
        setTotalPrice(newTotal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]);
    const onRemove = (item) => {
        const exist = cartItems.find((x) => x._id === item);
        if (exist) {
            setCartItems(cartItems.filter((x) => x._id !== item));
        }
    };
    const increaseItem = (id) => {
        const exist = cartItems.find((x) => x._id === id);
        let totalQuantity;
        if(exist) {
            if (exist.stock-exist.donation > exist.quantity) {
                exist.quantity = exist.quantity + 1;
                totalQuantity = exist.quantity+exist.donation;

                exist.totalAmount = exist.price * totalQuantity;
                const newCart = cartItems.map(item => {
                    if( item._id === exist._id ){
                        return exist
                    }
                    else{
                        return item;
                    }
                })
                setCartItems(newCart);
                }
        }
    }

    const increaseDonation = (id) => {
        const exist = cartItems.find((x) => x._id === id);
        let totalQuantity;
        if(exist) {
            if (exist.stock-exist.quantity > exist.donation) {
                exist.donation = exist.donation + 1;
                totalQuantity = exist.quantity+exist.donation;

                exist.totalAmount = exist.price * totalQuantity;
                const newCart = cartItems.map(item => {
                    if( item._id === exist._id ){
                        return exist
                    }
                    else{
                        return item;
                    }
                })
                setCartItems(newCart);
                }
        }
    }

    const decreaseItem = (id) => {
        let totalQuantity;
        const exist = cartItems.find((x) => x._id === id);
        if(exist) {
            if (1 < exist.quantity) {
                exist.quantity = exist.quantity - 1;
                
                totalQuantity = exist.quantity + exist.donation;

                exist.totalAmount = exist.price * totalQuantity;
                const newCart = cartItems.map(item => {
                    if( item._id === exist._id ){
                        return exist
                    }
                    else{
                        return item;
                    }
                })
                setCartItems(newCart);
            }
        }
    }


    const decreaseDonation = (id) => {
        let totalQuantity;
        const exist = cartItems.find((x) => x._id === id);
        if(exist) {
            if (0 <exist.donation) {
                exist.donation = exist.donation - 1;
                
                totalQuantity = exist.quantity + exist.donation;

                exist.totalAmount = exist.price * totalQuantity;
                const newCart = cartItems.map(item => {
                    if( item._id === exist._id ){
                        return exist
                    }
                    else{
                        return item;
                    }
                })
                setCartItems(newCart);
            }
        }
    }

    return (
        <>
            <Button className="buttonCartStyle" variant="dark" onClick={() => setShow(true)}>
            <FontAwesomeIcon className="mr-1" style={{ color: 'white' }} icon={faShoppingCart} />
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="Cart-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="Cart-custom-modal-styling-title">Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {
                        cartItems.length ?
                        cartItems.map((item) => (
                            <div className="cart">
                                <div className="d-inline-block mr-3">
                                    <span className="cart-btn" onClick={() => increaseItem(item._id)}>▲</span>
                                    <br />
                                    <p className="d-inline">{item.quantity}</p>
                                    <br />
                                    <span className="cart-btn" onClick={() => decreaseItem(item._id)}>▼</span>
                                </div>
                                <div className="d-inline-block">
                                <img
                                    src={`https://powerful-sierra-34042.herokuapp.com/${item.image}`}
                                    alt="product-img"
                                />
                                <h4>{item.title}</h4>
                              
                                <br/>
                                <h6 className="mt-2">
                                    ৳ {item.price} * {item.quantity } = {item.price*item.quantity}৳
                                </h6>
                                </div>
                                <button onClick={()=> onRemove(item._id)} className="btn btn-danger">X</button>
                                <br/>
                                <hr/>
                                <h6 className="mx-4 text-danger">Donation</h6><br/>
                                <div className="d-inline-block mx-4">
                                    <span className="cart-btn" onClick={() => increaseDonation(item._id)}>▲</span>
                                    <br />
                                    <p className="d-inline">{item.donation}</p>
                                    <h6 className="mx-4">
                                            ৳ {item.price} * {item.donation } = {item.price*item.donation}৳
                                    </h6>
                                    <br />
                                    <span className="cart-btn" onClick={() => decreaseDonation(item._id)}>▼</span>
                                    
                                </div>

                                </div>
                        )
                        )
                        :
                        <h5 className="text-center">Cart is empty</h5>
                        }
                        {cartItems.length ? (
                            <>
                                <h5>Total Price : {totalPrice}৳</h5>
                                <button className="btn btn-dark">
                                    <Link
                                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                                        to="/checkout"
                                    >
                                        Procced to checkout
                                    </Link>
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Cart;
