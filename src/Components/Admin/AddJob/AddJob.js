/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useForm } from 'react-hook-form';
import './AddJob.css';

const AddJob = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        fetch(`http://localhost:5000/job/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                alert(result.message);
            });
    };
    return (
        <>
          <h4 className="titleStyle text-center"> Add A New Job Post </h4>
        <div className="job-post-form col-md-8">
            <form className="pt-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <input
                        name="title"
                        className="form-control"
                        placeholder="Job title"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="vacancy"
                        className="form-control"
                        placeholder="Vacancy"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="jobType"
                        className="form-control"
                        placeholder="Job Type. Example: Full-Time/ Part-Time"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        rows="4"
                        name="responsibilities"
                        className="form-control"
                        placeholder="Responsibilities for this job &#13;Example:&#13;1. Abc&#13;2. Xyz"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        rows="4"
                        name="requirements"
                        className="form-control"
                        placeholder="Requirements for this job  &#13;Example:&#13;1. Abc&#13;2. Xyz"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="experience"
                        className="form-control"
                        placeholder="experience"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="location"
                        className="form-control"
                        placeholder="Job Location"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="salary"
                        className="form-control"
                        placeholder="Salary"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="education"
                        className="form-control"
                        placeholder="Educational Requirements"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="category"
                        className="form-control"
                        placeholder="Job Category"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        rows="4"
                        name="otherBenefits"
                        className="form-control"
                        placeholder="Compensation & Other Benefits &#13;Example:&#13;1. Abc&#13;2. Xyz"
                        ref={register({ required: true })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="deadline"
                        className="form-control"
                        placeholder="Deadline. Example: 14 August 2021"
                        ref={register({ required: true })}
                    />
                </div>
                <input
                    className="btn btn-success d-block w-100"
                    type="submit"
                    value="Submit Job Post"
                />
                <p className="my-2 text-danger">N.B: Please don't submit same job post more than once.</p>
            </form>
        </div>
        </>
    );
};

export default AddJob;