import React, { useEffect, useState } from 'react';
import JobPostDetails from './JobPostDetails';

const JobPost = () => {
    const [jobPost, setJobPost] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/job')
        .then((res) => res.json())
        .then((res) => {
            setJobPost(res);
        });
      }, [])
    return (
        <div>
            <h3 className="mb-4 text-center titleStyle">Our Previous Job post</h3>
            <div className="row mx-5">
            {
              jobPost.length ?
              
              jobPost.map(post => <JobPostDetails post={post}></JobPostDetails>)
              :
              <h4 className="mb-4 text-danger text-center mx-auto">You have no job post. Please post first</h4>
            }
            </div>
          </div>
    );
};

export default JobPost;