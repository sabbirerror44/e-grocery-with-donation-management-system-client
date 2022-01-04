/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
    BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import AddJob from './AddJob/AddJob';
import AddProduct from './AddProduct/AddProduct';
import DeleteProduct from './DeleteProduct/DeleteProduct';
import DeliveredDonation from './DeliveredDonation/DeliveredDonation';
import DeliveredOrder from './DeliveredOrder/DeliveredOrder';
import JobPost from './InterestedCandidate/JobPost';
import PendingDonation from './PendingDonation/PendingDonation';
import ProcessingOrder from './ProcessingOrder/ProcessingOrder';
import ProductQuery from './ProductQuery/ProductQuery';
import UpdateForm from './UpdateForm/UpdateForm';
import UpdateProduct from './UpdateProduct/UpdateProduct';

const Admin = () => {
    return (
        <>
            <Router>
                {/* <MaterialNavbar /> */}
              {/* <AdminNavbar /> */}
                <Switch>
                   <Route exact path="/admin/add/product">
                       <AddProduct />
                   </Route>
                   <Route exact path="/admin/add/job">
                       <AddJob />
                   </Route>
                   <Route exact path="/admin/processing/order">
                        <ProcessingOrder />
                   </Route>
                   <Route path="/admin/delivered/order">
                       <DeliveredOrder />
                   </Route>
                   <Route path="/admin/pending/donation">
                       <PendingDonation />
                   </Route>
                   <Route path="/admin/delivered/donation">
                       <DeliveredDonation />
                   </Route>
                   <Route path="/admin/query">
                       <ProductQuery />
                   </Route>
                   <Route path="/admin/updateProduct">
                       <UpdateProduct />
                   </Route>
                   <Route path="/admin/deleteProduct">
                       <DeleteProduct />
                   </Route>
                   <Route path="/admin/updateForm/:id">
                       <UpdateForm />
                   </Route>
                   <Route path="/admin/previousJob">
                       <JobPost />
                   </Route>
                </Switch>
            </Router>
        </>
    );
};

export default Admin;