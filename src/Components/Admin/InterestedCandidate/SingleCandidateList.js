
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import './interestedCandidate.css';

export default function SingleCandidateList(props) {
    const { name, email, mobileNo, address, source, resume} = props.list;
  return (
    <div className="col-12">
    <div className="orgList-design">
            <p>Name: <span>{name}</span></p>
            <p>Email: <span>{email}</span></p>
            <p>Phone: <span>{mobileNo}</span></p>
            <p>Address: <span>{address}</span></p>
            <p>Get To Know The Company: <span>{source}</span></p>
            <p><a href={`https://powerful-sierra-34042.herokuapp.com/${resume}`} target="_blank" rel='noreferrer noopener'><FontAwesomeIcon className="pdf-icon" icon={faFilePdf} /></a></p>
    </div>
    </div>
  );
}