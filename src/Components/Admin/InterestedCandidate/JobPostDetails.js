import React from 'react';
import { NavLink } from 'react-router-dom';

const JobPostDetails = (props) => {
    const {_id, companyName, title, category} = props.post;

    // delete single job post by admin
    const handleDeletePost = (id) => {
        fetch(`http://localhost:5000/job/delete/${id}`,{
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(res => alert(res.message))
  }
 
    return (
        <div className="col-lg-4 col-md-5 col-sm-12">
            <div className="employer-job-post">
                <h4>{title}</h4>
                <h6>{companyName}</h6>
                <p>Category: {category}</p>
                <NavLink style={{ textDecoration: 'none' }}  to={`/candidatelist/${_id}`} className="btn btn-success">See who applied</NavLink>
                <button onClick={() => handleDeletePost(_id)} className="mt-3 btn btn-danger">Delete This Post</button>
            </div>

        </div>
       
          
        
           
    );
};

export default JobPostDetails;