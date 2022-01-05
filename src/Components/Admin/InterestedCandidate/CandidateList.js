import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import loading from '../../../image&gif/loading.gif';
import sadEmoji from '../../../image&gif/sad-emoji.png';
import SingleCandidateList from './SingleCandidateList';

const CandidateList = () => {
    const {id} = useParams();
    const [isHitApi,setIsHitApi] = useState(false);
    const [candidateList, setCandidateList] = useState([]);

    useEffect(()=>{
        fetch(`https://powerful-sierra-34042.herokuapp.com/apply/candidate/${id}`)
        .then(res => res.json())
        .then(res => {
            setIsHitApi(true);
            setCandidateList(res)});
    },[id])
    
    return (
        <div className="mt-5 container">
              <h2 className="titleStyle text-center mb-3">Candidate List</h2>
            <div className="row">
            {   

                isHitApi ?
                candidateList.length?
                candidateList.map((list,index) => 
                <SingleCandidateList list={list} index={index}></SingleCandidateList>
                )
                :
                <div  className="mt-4 text-center col-12"> 
                     <h4 className="inline-block text-secondary">Sorry</h4>
                     <img className="w-25" src={sadEmoji} alt="sad-emoji" />
                     <h2 className="text-danger">No one applied</h2>
                </div>
                :
                <div className="col-12">
                    <img className="d-block mx-auto w-25 h-75" src={loading} alt="loading" />
                </div>
                
            }
            </div>
        </div>
    );
};

export default CandidateList;