import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';
import './UserLogin.css';

const UserLogin = () => {
        const [errors, setError] = useState('');
        // eslint-disable-next-line no-unused-vars
        const [loggedInUser, setLoggedInUser] = useContext(UserContext);
        const history = useHistory();
        const location = useLocation();
        const { from } = location.state || { from: { pathname: '/' } };
        const [user, setUser] = useState({
            mobile: '',
            password: '',
        });
        
        const handleChange = (e) =>{
            if(e.target.name==='mobile'){
                const addUser = { ...user };
                addUser[e.target.name] = e.target.value;
                setUser(addUser);
            }
            if(e.target.name==='password'){
                const addUser = { ...user };
                addUser[e.target.name] = e.target.value;
                setUser(addUser);
            }
        }
        
        const toastPopUp = (msg) => {

            toast.success( msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }

        const handleSubmit = (e) => {
            console.log(user);
            e.preventDefault();
            fetch('https://powerful-sierra-34042.herokuapp.com/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((result) => {
                    if(result.message) {
                        toastPopUp(result.message);
                        setError('')
                        localStorage.setItem('token', result.access_token);
                        localStorage.setItem('userName', result.user.name);
                        localStorage.setItem('userEmail', result.user.email);
                        localStorage.setItem('userMobile', result.user.mobile);
                        setLoggedInUser(result.access_token);
                        setTimeout(()=>  history.replace(from), 2100);  
                       
                    }
                    else{
                        if(result.errors){
                            setError(result.errors);
                        }
                        else{
                            setError(result);
                        }  
                    }
                 })
        };

        
    return (
        <div className="loginBg">
            <ToastContainer />
        <div className="login-form">
        <h3 className="mb-3 heading">User Login</h3>
                 <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <input
                            className="form-control item"
                            type="text"
                            name="mobile" onChange={handleChange}
                            placeholder="Enter Your Mobile No"
                            required
                        />       
                     </div>
                     {errors.mobile&&<p className="error">{errors.mobile.msg}</p>}
            
                       
                       <div className="form-group">
                            <input 
                               className="form-control item"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Enter you Password"
                                required />
                        </div>
                        {errors.password&&<p className="error">{errors.password.msg}</p>}
                        <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
         
                     <input className="btn btn-dark" type="submit" value="Submit" />
                     {errors.error&&<p className="error mt-2">{errors.error}</p>}
                 </form>
             </div>
         
         </div>
    );
};

export default UserLogin;