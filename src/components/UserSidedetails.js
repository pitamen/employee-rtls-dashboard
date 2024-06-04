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
          <h4><i class="fa-solid fa-location-pin"></i> Latest Tracked Location</h4>
        </div>
        <div className='offcanvas-body'>
        <div class="d-flex bd-highlight mb-3 px-2">
            <div class="me-auto p-2 bd-highlight">Tracked at: FWDR</div>
          </div>
          <div class="d-flex bd-highlight mb-3 px-2">
            <div class="me-auto p-2 bd-highlight">Lattitude: {newCenter.newCenter.latitude}</div>
            <div class="p-2 bd-highlight">Longitude: {newCenter.newCenter.longitude}</div>
          </div>
          <div class="d-flex bd-highlight mb-3 px-2">
            <div class="me-auto p-2 bd-highlight">Region Name: FWDR</div>
          </div>
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
