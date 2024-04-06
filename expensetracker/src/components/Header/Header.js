
import React, { useState , useContext} from 'react';

import { NavLink } from "react-router-dom";

import AuthContext from "../Store/auth-context";

const Header = () => {

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler= ()=>{
    authCtx.logout();
  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Expense Tracker</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          
          <NavLink className="nav-link active" to="/" >Home
            <span className="visually-hidden">(current)</span>
          </NavLink>
        </li>
        <li className="nav-item">
          
          <NavLink className="nav-link" to="/expense" >Expense
            <span className="visually-hidden">(current)</span>
          </NavLink>
        </li>
        <li className="nav-item">
        {!isLoggedIn && (
            
            <NavLink className="nav-link"  to="/login" style={{ position: 'fixed', right: '20px'}}>Login</NavLink>
          
        )}
        </li>
        <li className="nav-item">
        {isLoggedIn && (
          
            <NavLink className="nav-link"   to="/profile" style={{ position: 'fixed', right: '80px'}}>Profile</NavLink>
          
        )}
        </li>
        <li className="nav-item">
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
