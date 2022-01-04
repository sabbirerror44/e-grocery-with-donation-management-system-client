/* eslint-disable import/no-cycle */
import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cart from '../Home/Cart/Cart';
import './Navigationbar.css';

const Navigationbar = ({ setCategory }) => (
    <Navbar className="navCustomStyle" variant="dark" expand="lg">
        <Navbar.Brand>
            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/">
                <h4 className="mx-4">e-Grocery</h4>
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{'backgroundColor': '#195155'}}>
            <Nav className="navbar-design ml-auto">
              <Nav.Link>
                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/popular">
                       Popular Products
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/career">
                        Career
                    </Link>
                </Nav.Link>

                {
                 window.location.pathname === "/" ?
                 <>
                 <NavDropdown title="Products" id="basic-nav-dropdown">
                 <NavDropdown.Item onClick={() => setCategory('oil')} href="">
                     Oil
                 </NavDropdown.Item>
                 <NavDropdown.Item onClick={() => setCategory('rice')} href="">
                     Rice
                 </NavDropdown.Item>
                 <NavDropdown.Item onClick={() => setCategory('beverages')} href="">
                     Beverages
                 </NavDropdown.Item>
                 <NavDropdown.Item onClick={() => setCategory('bakery')} href="">
                     Bakery
                 </NavDropdown.Item>
                 <NavDropdown.Item onClick={() => setCategory('ingredients')} href="">
                     Ingredients(মসলা)
                 </NavDropdown.Item>
                 <NavDropdown.Item onClick={() => setCategory('beauty')} href="">
                     Beauty & Health
                 </NavDropdown.Item>
                 <NavDropdown.Item onClick={() => setCategory()} href="">
                     All
                 </NavDropdown.Item>
             </NavDropdown>
             </>
             :
          
            <></>
                }
  
              <Cart />

                <NavDropdown title="Organization" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/orghome' className="">Home</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/organizationsignup' className="">Organization Signup</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/organizationlist' className="">Organization List</Link>
                    </NavDropdown.Item>
                </NavDropdown>
               
                {localStorage.getItem('userName')?

                    <NavDropdown title={localStorage.getItem('userName').toUpperCase()} id="basic-nav-dropdown">
                    <NavDropdown.Item>
                        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/current' className="">Current Orders</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/previous' className="">Previous Orders</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/donation' className="">My Donations</Link>
                    </NavDropdown.Item>
                    </NavDropdown>

               : <Nav.Link> <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/userlogin">Login</Link> </Nav.Link>}


                {localStorage.getItem('userName')? <Nav.Link> <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }} className="text-white" onClick={()=>{localStorage.clear(); window.location.reload()}}>Logout</Link></Nav.Link>:''}
               
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Navigationbar;
