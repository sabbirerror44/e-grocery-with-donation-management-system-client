import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Navigationbar from '../Navigationbar/Navigationbar';

const SingleJobDetails = () => {
    const [job, setJob] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/job/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setJob(res[0]);
            });
    }, [id]);
    return (
        <div className="backgroundColorSingle">
        <Navigationbar />
            <div class="container my-5">
                <div class="job-description">
                    <h4 class="text-success">{job.title}</h4>
                    <h5>{job.companyName}</h5>
                    <h6>Vacancy</h6>
                    <p>{job.vacancy}</p>
                    <h6>Responsibilities</h6>
                    <pre>
                    {job.responsibilities}
                    </pre>
                    <h6>Requirements</h6>
                    <pre>
                    {job.requirements}
                    </pre>     
                    <h6>Educational Requirements</h6>
                    <p>{job.education}</p>         
                    <h6>Experience</h6>
                    <p>{job.experience}</p>
                    <h6>Job location</h6>
                    <p>{job.location}</p>
                    <h6>Salary</h6>
                    <p>{job.salary}</p>
                    <h6>Compensation & Other Benefits</h6>
                    <pre>
                    {job.otherBenefits}
                    </pre>       
                    <h6>Deadline</h6>
                    <p>{job.deadline}</p>
                    <NavLink to={`form/${id}`}> <button className="btn btn-success">Apply Now</button></NavLink>
                    </div>
            </div>
        </div>
);
};

export default SingleJobDetails;
