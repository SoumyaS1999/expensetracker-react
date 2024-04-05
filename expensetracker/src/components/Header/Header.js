// Header.js
//import {Nav,Container} from 'react-bootstrap';
//import './Header.css'
import React, { useState , useContext} from 'react';
//import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
//import Cart from '../Cart/Cart'; // Import the Cart component
import AuthContext from "../Store/auth-context";

const Header = () => {
  //const [isCartOpen, setIsCartOpen] = useState(false);

 // const handleCartClick = () => {
 //   setIsCartOpen(!isCartOpen);
 // };

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler= ()=>{
    authCtx.logout();
  }

  return (
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Expense Tracker</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          
          <NavLink className="nav-link active" to="/" >Home
            <span class="visually-hidden">(current)</span>
          </NavLink>
        </li>
        <li class="nav-item">
        {!isLoggedIn && (
            
            <NavLink className="nav-link"  to="/login" style={{ position: 'fixed', right: '20px'}}>Login</NavLink>
          
        )}
        </li>
        <li class="nav-item">
        {isLoggedIn && (
          
            <NavLink className="nav-link"   to="/profile" style={{ position: 'fixed', right: '80px'}}>Profile</NavLink>
          
        )}
        </li>
        <li class="nav-item">
        {isLoggedIn && (
          
            <button className="nav-link"  onClick={logoutHandler} style={{ position: 'fixed', right: '3px'}}>Logout</button>
          
        )}
        </li>
        
      </ul>

    </div>
  </div>
</nav>

  );
};

export default Header;
