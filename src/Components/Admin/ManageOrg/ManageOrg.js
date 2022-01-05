import React, { useEffect, useState } from 'react';

const ManageOrg = () => {

const [orgList, setOrgList] = useState([]);

useEffect(() => {

    fetch(`https://powerful-sierra-34042.herokuapp.com/organization/pending`)
    .then((res) => res.json())
    .then((data) => {
        setOrgList(data.org);
    });

},[])

const handleAccept = (id, mobileNo) =>{

    fetch(`https://powerful-sierra-34042.herokuapp.com/organization/${id}`, {
        method: 'PUT',
    })
    .then((res) => res.json())
    .then((result) => {
            if(result.message) {
                   alert(result.message)
            }
         })

    fetch(`http://gsms.pw/smsapi?api_key=C2000343618ca1805c77b6.21481376&type=text&contacts=${mobileNo}&senderid=8809601001329&msg=We have accepted your sign up request in E-grocery and donation collector. Your can login from now. Thank you`)
    .then(res => {
        console.log();
    })
    .catch(err => {
        console.log("error:", err);
    });
}


const handleReject = (id) => {

 fetch(`https://powerful-sierra-34042.herokuapp.com/organization/${id}`, {
            method: 'DELETE',
        })
        .then((res) => res.json())
        .then((result) => {
                if(result.message) {
                       alert(result.message)
                }
             })
}

    return (
          <section className="container my-5">
              <div className="row">
                  {
                      orgList.length?
                      orgList.map( org =>(
                        <div className="col-12">
                        <div className="orgList-design ">
                                <p>Name: <span>{org.name}</span></p>
                                <p>Email: <span>{org.email}</span></p>
                                <p>Phone: <span>{org.mobile}</span></p>
                                <p>Address: <span>{org.address}</span></p>
                                <p>Description: <span>{org.description}</span></p>
                                <button style={{width:'100px'}} className="buttonDesign mr-2" onClick={() => handleAccept(org._id, org.mobile)}>Accept</button>
                                <button style={{width:'100px'}} className="buttonDesignDel" onClick={()=> handleReject(org._id)}>Reject</button>
                        </div>
                        </div>
                      )):
                      <h3>No interested organization yet!</h3>
                  }

              </div>

          </section>
      );
};

export default ManageOrg;