import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-cycle
import { AdminContext } from '../../App';
import './Login.css';

const Login = () => {
    // eslint-disable-next-line no-unused-vars
    const [loggedInAdmin, setLoggedInAdmin] = useContext(AdminContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const [error, setError] = useState('');
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const handleResponse = (res, redirect) => {
        setLoggedInAdmin(res);
        if (redirect) {
            history.replace(from);
        }
    };

    const notify = (message, time) => toast.success( message,{
        autoClose: time
      });
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://powerful-sierra-34042.herokuapp.com/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result === 'true') {
                    notify('Login successful', 3000);
                    localStorage.setItem('admin', user.username);
                    setTimeout(()=> handleResponse(user.username, true), 3100);            
                } else {
                    setError(result.error);
                }
            });
    };

    const handleBlur = (e) => {
        let isValid = true;
        if (e.target.name === 'username') {
            isValid = /\S+@\S+\.\S+/.test(e.target.value);
            if (isValid) {
                setError('');
            } else {
                setError('Please fill up email field correctly.');
            }
        }
        if (e.target.name === 'password') {
            const isPassValid = e.target.value.length > 5;
            const passHasNumber = /\d{1}/.test(e.target.value);
            isValid = isPassValid && passHasNumber;
            if (isValid) {
                setError('');
            } else {
                setError(
                    'Password strength poor. Please fill up with minimum 5 alphabates with minimun one number'
                );
            }
        }
        // eslint-disable-next-line no-constant-condition
        if (true) {
            const addUser = { ...user };
            addUser[e.target.name] = e.target.value;
            setUser(addUser);
        }
    };

    return (
        <>
      
        <div className="login-form">
        <ToastContainer
        />

            <div>
                <h2 className="heading mb-4">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="input-field"
                        type="Email"
                        name="username"
                        onBlur={handleBlur}
                        placeholder="Email"
                        required
                    />
                    <br />
                    <input
                        className="input-field"
                        type="password"
                        name="password"
                        onBlur={handleBlur}
                        placeholder="Password"
                        required
                    />
                    <br />
                    <br />
                    <input className="submit-btn" type="submit" value="Login" />
                    <p className="text-danger">{error}</p>
                </form>
            </div>
        </div>
        </>
    );
};
export default Login;
