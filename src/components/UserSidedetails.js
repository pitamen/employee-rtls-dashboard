import React from 'react';
import { useNavigate } from 'react-router-dom';

import './SCSS/SideDetails.scss'
import Timepicker from './Timepicker';

const UserSidedetails = (newCenter) => {
  console.log(newCenter.newCenter.latitude)
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <>
      <div className="offcanvas offcanvas-start show" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Technician Name</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className='container py-2'>
        </div>
        <div className="d-flex justify-content-around">

        </div>
        <div className='offcanvas-body'>
          <h4>Latest Tracked Location</h4>
          <p>Lattitude: {newCenter.newCenter.latitude}</p>
          <p>Longitude: {newCenter.newCenter.longitude}</p>
        </div>
        <Timepicker />
        <button className="btn btn-outline-danger my-2 mx-3" onClick={handleLogout} >
          Logout
        </button>
      </div>

    </>

  );
};

export default UserSidedetails;
