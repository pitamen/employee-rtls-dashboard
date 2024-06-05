import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SCSS/SideDetails.scss';
import Timepicker from './Timepicker';
import { userNameToName } from '../utils/stringUtils';

const UserSidedetails = ({ newCenter, isFetchingUserDetail, userDetail }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div className="offcanvas offcanvas-start show" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasScrollingLabel" style={{ color: 'white' }}></h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="container py-2"></div>
      <div className="d-flex justify-content-around">
        <h4>{!isFetchingUserDetail && userDetail ? userNameToName(userDetail.name) : ''}</h4>
      </div>
      {!isFetchingUserDetail && userDetail ? (
        <div className="offcanvas-body">
          <div className="d-flex bd-highlight mb-3 px-2">
            <div className="me-auto p-2 bd-highlight">Checked In: {userDetail.isCheckedIn ? 'Yes' : 'No'}</div>
            <div className="me-auto p-2">
              {userDetail.isCheckedIn
                ? `Check In Device: ${userDetail.lastAttendance?.device_detail?.deviceName || 'N/A'}`
                : `Last Used Device: ${userDetail.lastAttendance?.device_detail?.deviceName || 'N/A'}`}
            </div>
          </div>
          <div className="d-flex bd-highlight mb-3 px-2">
            <div className="me-auto p-2 bd-highlight">Latitude: {newCenter.latitude || 'N/A'}</div>
            <div className="p-2 bd-highlight">Longitude: {newCenter.longitude || 'N/A'}</div>
          </div>
          <div className="d-flex bd-highlight mb-3 px-2">
            <div className="me-auto p-2 bd-highlight">
              {userDetail.vendor && userDetail.vendor.is_ro
                ? `Regional Office: ${userDetail.vendor.name || 'N/A'}`
                : `Vendor: ${userDetail.vendor?.name || 'N/A'}`}
            </div>
          </div>
        </div>
      ) : null}
      <Timepicker />
      <button className="btn btn-outline-danger my-2 mx-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserSidedetails;
