import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    })

const [errors, setError] = useState('');

const [errorsOtp, setErrorsOtp] = useState('');

const [userFilledOtp, setUserFilledOtp] = useState();

const [storeOtp, setStoreOtp] = useState();

const toastPopUp = (msg) => {

  toast.success( msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

}

const handleChange = (e) => {
        if(e.target.name === 'name'){
            const addUser = { ...user };
            addUser[e.target.name] = e.target.value;
            setUser(addUser);
         }
        if(e.target.name === 'email'){
                const addUser = { ...user };
                addUser[e.target.name] = e.target.value;
                setUser(addUser);
        }
        if(e.target.name === 'mobile'){
            const addUser = { ...user };
            addUser[e.target.name] = e.target.value;
            setUser(addUser);
        }
        if(e.target.name === 'password'){
            const addUser = { ...user };
            addUser[e.target.name] = e.target.value;
            setUser(addUser);
        }

}
 const handleOtp = () => {

    if(user.mobile){

    const code = Math.floor(1000 + Math.random() * 9000);

    setStoreOtp(code.toString());

    fetch(`http://gsms.pw/smsapi?api_key=C2000343618ca1805c77b6.21481376&type=text&contacts=${user.mobile}&senderid=8809601001329&msg=${code}`)
    .then(res => {
        console.log();
      })
      .catch(err => {
        console.log("error:", err);
      });

    }
    else{

        alert("Enter Mobile Number")

    }

 }
 const handleSubmit = (e) => {
     e.preventDefault();

     if( storeOtp === userFilledOtp){

   
        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((result) => {
                    if(result.message) {
                           setError('')
                           toastPopUp(result.message);
                    }
                    else{
                          setError(result.errors)
                        }
                 })
        setErrorsOtp('');
    
     }
     else{

        setErrorsOtp('Incorrect OTP');

     }

    


 }
    return (
        <>
        <ToastContainer />
           <div className="registration-form">
           <h3 className="heading">Sign Up</h3>
                    <form onSubmit={handleSubmit}
                    >
                     <div className="form-group">
                        <input type="text" 
                          className="form-control item"
                          placeholder="Enter Your Name"
                          onChange = {handleChange}
                          name="name" required  />
                        </div>
                        {errors.name&&<p className="error">{errors.name.msg}</p>}

                        <div className="form-group">
                        <input type="email"
                          className="form-control item"
                          placeholder="Enter Your Email"
                          onChange = {handleChange}
                          name="email" required  />
                        </div>
                        {errors.email&&<p className="error">{errors.email.msg}</p>}
              
                        <div className="form-group">
                        <input type="text" 
                            className="form-control item" 
                            placeholder="Enter Your Mobile Number"
                            onChange = {handleChange}
                            name="mobile"
                            required  />
                        </div>  
                        {errors.mobile&&<p className="error">{errors.mobile.msg}</p>}

                        <div className="form-group">
                        <input type="number"
                          className="form-control item"
                          placeholder="Enter OTP"
                          onChange = {(e)=> setUserFilledOtp(e.target.value)}
                          required  />
                        <span className="resend-span" onClick={handleOtp}>Resend</span>
                        </div>

                        {errorsOtp &&<p className="error">{errorsOtp}</p>} 

                        <div className="form-group">
                             <input type="password"
                               className="form-control item"
                               placeholder="Enter Your Password" 
                               onChange = {handleChange}
                               name="password" required  />
                        </div>
                        {errors.password&&<p className="error">{errors.password.msg}</p>}                

                     <div className="form-group text-center">

                      <button onClick={handleOtp} className="btn btn-primary mr-3"> Send OTP</button>

                      <input className="btn btn-dark" type="submit" value="Signup" />
                     </div>
                    </form>
                </div>
            </>
    );
};

export default Signup;