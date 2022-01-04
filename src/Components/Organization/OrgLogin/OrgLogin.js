import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OrgContext } from '../../../App';


const OrgLogin = () => {
        const [errors, setError] = useState('');
        // eslint-disable-next-line no-unused-vars
        const [loggedInOrg, setLoggedInOrg] = useContext(OrgContext);
        const history = useHistory();
        const location = useLocation();
        const { from } = location.state || { from: { pathname: '/' } };
        const [organization, setOrganization] = useState({
            mobile: '',
            password: '',
        });
        
        const handleChange = (e) =>{
            if(e.target.name === 'mobile'){
                const addUser = { ...organization };
                addUser[e.target.name] = e.target.value;
                setOrganization(addUser);
            }
            if(e.target.name === 'password'){
                const addUser = { ...organization };
                addUser[e.target.name] = e.target.value;
                setOrganization(addUser);
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
            e.preventDefault();

            fetch('http://localhost:5000/organization/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(organization),
            })
                .then((res) => res.json())
                .then((result) => {
                    if(result.message) {
                        toastPopUp(result.message);
                        setError('')
                        localStorage.setItem('orgName', result.user.name);
                        localStorage.setItem('org_token', result.access_token);
                        setLoggedInOrg(result.access_token);
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
        <h3 className="mb-3 heading">Organization Login</h3>
                 <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <input
                            className="form-control item"
                            type="text"
                            autocomplete="off"
                            name="mobile" onChange={handleChange}
                            placeholder="Enter Organization Mobile No"
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
                                placeholder="Enter Organization Password"
                                required />
                        </div>
                        {errors.password&&<p className="error">{errors.password.msg}</p>}
                        <p>Don't have an account? <Link to='/organizationsignup'>Sign up</Link></p>
         
                     <input className="btn btn-dark" type="submit" value="Submit" />
                     {errors.error&&<p className="error mt-2">{errors.error}</p>}
                 </form>
             </div>
         
         </div>
    );
};

export default OrgLogin;