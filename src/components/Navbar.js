import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/DishHome_Logo.svg.png';

export const Navbar = () => {

  return (
    <div className='navBar'>
      <nav className="navbar navbar-expand-lg p-1 navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" width="40" height="40" style={{ marginRight: '10px' }} />
            DH-RTLS
          </Link>
        </div>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <button type="button" class="btn btn-success">Online</button>
            </li>
            <li class="nav-item">
            <button type="button" class="btn btn-danger">Offline</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
