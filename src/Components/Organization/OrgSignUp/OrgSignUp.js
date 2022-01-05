import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
    const [organization, setOrganization] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        description: '',
        password: '',
    })

const [errors, setError] = useState('');

const toastPopUp = (msg) => {

  toast.success( msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

}

const handleChange = (e) => {
        if(e.target.name === 'name'){
            const addUser = { ...organization };
            addUser[e.target.name] = e.target.value;
            setOrganization(addUser);
         }
        if(e.target.name === 'email'){
                const addUser = { ...organization };
                addUser[e.target.name] = e.target.value;
                setOrganization(addUser);
        }
        if(e.target.name === 'mobile'){
            const addUser = { ...organization };
            addUser[e.target.name] = e.target.value;
            setOrganization(addUser);
        }
        if(e.target.name === 'address'){
            const addUser = { ...organization };
            addUser[e.target.name] = e.target.value;
            setOrganization(addUser);
        }
        if(e.target.name === 'description'){
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

 const handleSubmit = (e) => {
     e.preventDefault();

        fetch('https://powerful-sierra-34042.herokuapp.com/organization', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(organization),
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

 }
    return (
        <>
        <ToastContainer />
           <div className="registration-form">
           <div className="container">
           <h3 className="heading mb-4">Organization Sign Up</h3>
                    <form onSubmit={handleSubmit}
                    >
                     <div className="form-group">
                        <input type="text" 
                          className="form-control item"
                          placeholder="Enter name of the organization"
                          onChange = {handleChange}
                          name="name" required  />
                        </div>
                        {errors.name&&<p className="error">{errors.name.msg}</p>}

                        <div className="form-group">
                        <input type="email"
                          className="form-control item"
                          placeholder="Enter organization email"
                          onChange = {handleChange}
                          name="email" />
                        </div>
                        {errors.email&&<p className="error">{errors.email.msg}</p>}
              
                        <div className="form-group">
                        <input type="text" 
                            className="form-control item" 
                            placeholder="Enter organization mobile number"
                            onChange = {handleChange}
                            name="mobile"
                            required  />
                        </div>  
                        {errors.mobile&&<p className="error">{errors.mobile.msg}</p>}

                        <div className="form-group">
                        <textarea 
                          className="form-control item"
                          placeholder="Address of the organization"
                          onChange = {handleChange}
                          name="address"
                          required  />
                        </div>

                        <div className="form-group">
                        <textarea 
                          className="form-control item"
                          placeholder="Description of the organization"
                          onChange = {handleChange}
                          name="description"
                          required  />
                        </div>

                        <div className="form-group">
                             <input type="password"
                               className="form-control item"
                               placeholder="Enter password" 
                               onChange = {handleChange}
                               name="password" required  />
                        </div>
                        {errors.password&&<p className="error">{errors.password.msg}</p>}                

                     <div className="form-group text-center">

                      <input className="btn btn-dark" type="submit" value="Signup" />
                     </div>
                    </form>
                </div>
                </div>
            </>
    );
};

export default Signup;