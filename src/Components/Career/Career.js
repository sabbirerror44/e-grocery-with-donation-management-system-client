import React, { useEffect, useState } from 'react';
import Navigationbar from '../Navigationbar/Navigationbar';
import SingleJobPost from './SingleJobPost';

const Career = () => {
    const [post, setPost] = useState([]);
    useEffect(() => {
        fetch('https://powerful-sierra-34042.herokuapp.com/job')
            .then((res) => res.json())
            .then((res) => {
                setPost(res);
            });
    }, []);
    return (
        <div className="backgroundColorSingle">
        <Navigationbar />
        <div className="container mt-5">
            
            <div className="job-page">
                <h4 className="text-center mb-3 titleStyle">Choose your desire job</h4>
                <div className="row">
                    {post.map((job) => (
                        <SingleJobPost job={job} />
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Career;
