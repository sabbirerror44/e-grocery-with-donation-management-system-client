import React, { useEffect, useState } from 'react';
import './OrgList.css';

const OrgList = () => {

const [orgList, setOrgList] = useState([]);

useEffect(() => {

    fetch(`http://localhost:5000/organization`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        setOrgList(data.org);
    });

},[])

    return (
          <section className="container my-2">
              <h4 className="titleStyle text-center">Our Member Organizations</h4>
              <div className="row">
                  {
                      orgList.length?
                      orgList.map( org =>(
                        <div className="col-12">
                        <div className="orgList-design">
                                <p>Name: <span>{org.name}</span></p>
                                <p>Email: <span>{org.email}</span></p>
                                <p>Phone: <span>{org.mobile}</span></p>
                                <p>Address: <span>{org.address}</span></p>
                                <p>Description: <span>{org.description}</span></p>
                        </div>
                        </div>
                      )):
                      <h3>No interested organization yet!</h3>
                  }

              </div>

          </section>
      );
};

export default OrgList;