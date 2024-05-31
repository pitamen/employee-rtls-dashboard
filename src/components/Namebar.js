import React from 'react';
import './SCSS/Namebar.scss';
import { Link } from 'react-router-dom';
import logo from '../img/DishHome_Logo.svg.png';

const Namebar = ({ toggleFullScreen, isFullScreen = false, name = "" , userId}) => {

  return (
    <div  className="d-flex justify-content-between " id='namebarStyle'>
      <button className="btn btn-outline btn-sm" id='fullScreenButton' data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Technician <i className="fa-solid fa-list"></i></button>
      <h6 className='pt-1' >
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" width="20" height="20" style={{ marginRight: '10px' }} />
            DH-RTLS Live Location
          </Link>
        </h6>
      <button id='fullScreenButton' className="btn btn-outline btn-sm" onClick={toggleFullScreen}>{isFullScreen ? 'Exit Full Screen' : 'Full Screen'}</button>
    </div>
  );
};

export default Namebar;