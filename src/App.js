import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminBar from './Components/Admin/AdminBar/AdminBar';
import CandidateList from './Components/Admin/InterestedCandidate/CandidateList';
import Career from './Components/Career/Career';
import JobApplyForm from './Components/Career/JobApplyForm';
import SingleJobDetails from './Components/Career/SingleJobDetails';
// eslint-disable-next-line import/no-cycle
import Checkout from './Components/Checkout/Checkout';
import PaymentPage from './Components/Checkout/PaymentPage';
import UserDonation from './Components/DonationHistory/UserDonation/UserDonation';
import Footer from './Components/Footer/Footer';
// eslint-disable-next-line import/no-cycle
import Home from './Components/Home/Home';
// eslint-disable-next-line import/no-cycle
import Login from './Components/Login/Login';
import Current from './Components/OrderHistory/Current/Current';
import Previous from './Components/OrderHistory/Previous/Previous';
import OrgHome from './Components/Organization/OrgHome';
import OrgList from './Components/Organization/OrgList/OrgList';
import OrgLogin from './Components/Organization/OrgLogin/OrgLogin';
import OrgSignUp from './Components/Organization/OrgSignUp/OrgSignUp';
import OrgPrivate from './Components/OrgPrivate/OrgPrivate';
import Popular from './Components/Popular/Popular';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
// eslint-disable-next-line import/no-cycle
// import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Signup from './Components/Signup/Signup.js';
// eslint-disable-next-line import/no-cycle
import SingleProduct from './Components/SingleProduct/SingleProduct';
import UserLogin from './Components/UserLogin/UserLogin';

export const UserContext = createContext();
export const OrgContext = createContext();
export const AdminContext = createContext();
export const CartContext = createContext();

function App() {

    const [loggedInOrg, setLoggedInOrg] = useState(localStorage.getItem('org_token'));
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('token'));
    const [loggedInAdmin, setLoggedInAdmin] = useState(localStorage.getItem('admin'));
    const [cartItems, setCartItems] = useState([]);
    return (
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <OrgContext.Provider value={[loggedInOrg, setLoggedInOrg]}>
        <AdminContext.Provider value={[loggedInAdmin, setLoggedInAdmin]}>
            <CartContext.Provider value={[cartItems, setCartItems]}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                            <Footer />
                        </Route>
                        <ProtectedRoute path="/checkout">
                            <Checkout />
                            <Footer />
                        </ProtectedRoute>
                        <ProtectedRoute path="/payment/:id">
                            <PaymentPage />
                        </ProtectedRoute>
                        <Route path="/singleProduct/:id">
                            <SingleProduct />
                            <Footer />
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route>
                        <Route path="/userlogin">
                            <UserLogin />
                        </Route>
                        <OrgPrivate path="/orghome">
                            <OrgHome />
                        </OrgPrivate>
                        <Route path="/organizationlogin">
                            <OrgLogin />
                        </Route>
                        <Route path="/organizationsignup">
                            <OrgSignUp />
                        </Route>
                        <Route path="/organizationlist">
                            <OrgList />
                        </Route>
                        <Route path="/career">
                            <Career />
                            <Footer />
                        </Route>
                        <Route path="/popular">
                            <Popular />
                            <Footer />
                        </Route>
                        <Route path="/current">
                            <Current />
                            <Footer />
                        </Route>
                        <Route path="/previous">
                            <Previous />
                            <Footer />
                        </Route>
                        <Route path="/donation">
                            <UserDonation />
                            <Footer />
                        </Route>
                        <Route exact path="/applypage/:id">
                            <SingleJobDetails />
                        </Route>
                        <Route path="/applypage/form/:id">
                            <JobApplyForm />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/jobdescription/:id">
                            <SingleJobDetails />
                        </Route>
                        <PrivateRoute path="/admin">
                            <AdminBar />
                        </PrivateRoute>
                        <Route exact path="/candidatelist/:id">
                            <CandidateList />
                        </Route>
                    </Switch>
                   
                </Router>
            </CartContext.Provider>
        </AdminContext.Provider>
        </OrgContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
