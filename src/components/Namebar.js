import React from 'react';
import './SCSS/Namebar.scss';
import { Link } from 'react-router-dom';
import logo from '../img/DishHome_Logo.svg.png';

const Namebar = ({ toggleFullScreen, isFullScreen = false, name = "", userId, userDetail = null }) => {
  
  return (
    <div className="d-flex justify-content-between " id='namebarStyle'>
      <button className="btn btn-outline btn-sm" id='fullScreenButton' data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
        {window.innerWidth < 600 ? <i className="fa-solid fa-list"></i> : <span><i className="fa-solid fa-list"></i> {userDetail ? 'View Details' : 'Technicians List'} </span>}
      </button>
      <h6 className='pt-1' >
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="20" height="20" style={{ marginRight: '10px' }} />
          {window.innerWidth < 600 ? 'DH-RTLS' : 'DH Field View Dashboard'}
        </Link>
      </h6>
      <button id='fullScreenButton' className="btn btn-outline btn-sm" onClick={toggleFullScreen} >
        {isFullScreen ? (window.innerWidth < 600 ? <i className="fa-solid fa-down-left-and-up-right-to-center"></i> : <span>Exit Full Screen <i className="fa-solid fa-down-left-and-up-right-to-center"></i></span>)
          : (window.innerWidth < 600 ? <i className="fa-solid fa-up-right-and-down-left-from-center"></i> : <span>Full Screen <i className="fa-solid fa-up-right-and-down-left-from-center"></i></span>)}
      </button>
    </div>
  );
};

export default Namebar;