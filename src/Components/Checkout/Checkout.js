import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../../App';
import './Checkout.css';

const Checkout = () => {
    // eslint-disable-next-line no-unused-vars
    // const [payment, setPayment] = useState();
    const [org, setOrg] = useState([]);

    const [selectedOrg, setSelectedOrg] = useState();

    const [cartItems, setCartItems] = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState();
    const [client, setClient] = useState('For Me');
    const [payment, setPayment] = useState('Cash On');

    useEffect(() => {
        const newTotal = cartItems.reduce((total, item) => total + item.totalAmount, 0);
        setTotalPrice(newTotal);

        fetch(`https://powerful-sierra-34042.herokuapp.com/organization`)
        .then((res) => res.json())
        .then((data) => {
            setOrg(data.org);
        });
        
    }, [cartItems]);

    

    const [data, setData] = useState({
        name: localStorage.getItem('userName'),
        mobileNo: localStorage.getItem('userMobile'),
        address: '',
    })
    const handleOnChange = (e) => {
        const newData = { ...data };
        if (e.target.name === 'name') {
            newData.name = e.target.value;
            setData(newData);
        }
        if (e.target.name === 'mobileNo') {
            newData.mobileNo = e.target.value;
            setData(newData);
        }
        if (e.target.name === 'address') {
            newData.address = e.target.value;
            setData(newData);
        }

    }

    const toastPopUp = (msg) => {

        toast.info( msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      
      }

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
  
    const handleSubmit = (e) => {
        e.preventDefault();
  
        const presentTime = new Date();
        const presentTimeMili = presentTime.getTime();

        const cartProducts = [];
        const donationItems = [];
        const { name, mobileNo, address } = data;
        const order = {
            userInfo: {
                name,
                mobileNo,
                address,
            },
            price: {
                totalPrice,
            },

            invoiceNo:`${name[0]}${presentTimeMili}`
        };
        const donation = {
            donerInfo: {
                name,
                mobileNo,
                address,
            },
            price: {
                totalPrice,
            },

            organizationName: selectedOrg,

            invoiceNo:`${name[0]}${presentTimeMili}`
        }
        cartItems.map(item => {
            if (item.donation > 0) {
                const { _id, title, donation } = item;
                const donationItem = {
                    _id,
                    title,
                    donation,
                }
                donationItems.push(donationItem);
            }
            const { _id, title, donation, quantity, image } = item;
            const newItem = {
                _id,
                title,
                quantity,
                donation,
                image,
            }
            cartProducts.push(newItem);
        })

        donation.donatedProducts = donationItems;
        order.products = cartProducts;
        
        let valid = false;
        for (let key in order) {
            console.log(key);
            if (order[key] !== null && order[key] !== "") {
                valid = true;
            }
        }
            
       let count = 0;

       order.products.map( product => {
            if(product.quantity>0){
                count=count+1;
            }
        })


       if( payment==='Cash On' ){
          
            if (valid===true && count>0) {

                order.payment = {
                    paymentMethod: 'Cash On'
                }
                
                fetch('https://powerful-sierra-34042.herokuapp.com/order/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(order),
                })
                    .then((res) => res.json())
                    .then((result) => {
                        toastPopUp(result.message);
                    });
            }


            if (donation.donatedProducts.length > 0) {

                donation.payment = {
                    paymentMethod: 'Cash On'
                }

                fetch('https://powerful-sierra-34042.herokuapp.com/donation/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(donation),
                })
                    .then((res) => res.json())
                    .then((result) => {
                        console.log(result.message);
                    });
            }
       }
       else{
           
         localStorage.setItem('order', JSON.stringify(order));
         localStorage.setItem('donation', JSON.stringify(donation));

         if( valid === true && count > 0 ){

         window.open(`https://powerful-sierra-34042.herokuapp.com/payment/ssl-request/${order.price.totalPrice}`, '_blank');

         }

         else if (donation.donatedProducts.length > 0){

            window.open(`https://powerful-sierra-34042.herokuapp.com/payment/ssl-request/${order.price.totalPrice}`, '_blank');
         
        }
       }

    }
    return (
        <section className="container">
              <ToastContainer />
           <div className="row">
           <div className="col-md-8 order-2 order-md-1 mt-4">
              <h3 className="mb-3 titleStyle">Checkout</h3>
               <form onSubmit={handleSubmit}>
                           <div className="" onClick={()=>{setClient('For Me')}}>
                                   <input type="radio" name="client" value="For Me" checked={client=== 'For Me'} /> For Me
                                   </div>
                                   <div className="" onClick={()=>{setClient('For Gift')}}>
                                   <input type="radio" name="client" value="Gift" checked={client=== 'For Gift'} /> For Gift
                           </div><br/> 
                           
                   {client==='For Me'?<h4 className="titleStyle">Your Information</h4>:<h4 className="titleStyle">Receiver's Information</h4>}
                      
            
                           <div className="form-group col-8">
                              {client==='For Me'?<label htmlFor="title">Your Name</label>:<label htmlFor="title">Receiver's Name</label>} 
                               <br />
                               {
                                   client==='For Me'?
                                   <input type="text" name="name" className="mb-2 form-control" defaultValue={localStorage.getItem('userName')} onChange={handleOnChange} required />:
                                   <></>

                               }
                               {
                                   client === 'For Gift' ?
                                   <input type="text" name="name" placeholder="Receiver's Name" className="mb-2 form-control" onChange={handleOnChange} required />:
                                   <></>
                               }
                            
                                
                           </div>
                   
               
                           <div className="form-group col-8">
                               {client==='For Me'?<label htmlFor="title">Mobile No</label>:<label htmlFor="title">Receiver's Mobile No</label>}
                               <br />
                               {
                                   client==='For Me'?
                                   <input type="text" name="mobileNo" className="mb-2 form-control" defaultValue={localStorage.getItem('userMobile')} onChange={handleOnChange} required />:
                                   <></>

                               }
                               {
                                   client === 'For Gift' ?
                                   <input type="text" name="mobileNo" placeholder="Receiver's Number" className="mb-2 form-control" onChange={handleOnChange} required />:
                                   <></>
                               }
                       
                           </div>
               
                       <div className="form-group col-8">
                           <label htmlFor="title">Address</label>
                           <br />
                           <input type="text" name="address" className="mb-2 form-control" placeholder="House, Road No, Area, District" onChange={handleOnChange} required />
                       </div>

                       <p style={{fontWeight: 'normal'}} className="ml-3 titleStyle">If you donate products then select your preferred organization. Otherwise, we donate will these products to any organization.</p>
                       <select id="org-name" onChange={(e)=> setSelectedOrg(e.target.value)} >
                       <option value="">Select a Organization</option>
                            {
                                org.length ?
                                org.map(item => (
                                    <option value={item.name}>{item.name}</option>
                                )):
                                <option disabled value="">----</option>

                            }
                                
                        </select>
                       
                      <div className="ml-3 mt3" onClick={()=>{setPayment('Online Payment')}}>
                          <input type="radio" name="paymentMethod" value="Online Payment" checked={payment=== 'Online Payment'}  /> Online Payment
                       </div>
                      <div className="ml-3 mt-2" onClick={()=>{setPayment('Cash On')}} >
                         <input type="radio" name="paymentMethod" value="cashOnDelivery" checked={payment=== 'Cash On'} /> Cash On Delivery
                      </div><br/> 

                   <input type="submit" class="homeButton mx-3" value='Order' />
               </form>
              
           </div>

           <div className="col-md-4 order-1 order-md-2">
             <div>
                  <h5 className="titleStyle">Order Summary</h5>
                  <div  style={{border: '1px solid black', borderRadius: '5px', padding: '20px'}}>
                       {cartItems.map((item) => (
                            <div className="cart">
                            <div className="d-inline-block">
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
                            <h6 className="mt-2 ml-2">
                                ৳ {item.price} * {item.quantity } = {item.price*item.quantity}৳
                            </h6>
                    
                            </div>
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
                    ))}
                    {cartItems.length ? (
                        <>
                            <h5>Total Price : {totalPrice}৳</h5>

                        </>
                    ) : (
                        <></>
                    )}
                   </div>
                </div>
           </div>

           </div>
           
        </section>
    );
};

export default Checkout;