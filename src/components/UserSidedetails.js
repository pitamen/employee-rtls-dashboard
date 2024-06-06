import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SCSS/SideDetails.scss';
import Timepicker from './Timepicker';
import { userNameToName } from '../utils/stringUtils';
import '../user-side-details.scss'
import { calculateTimeDifference } from '../utils/commonUtils';

const UserSidedetails = ({ isFetchingUserDetail, userDetail, fetch_enabling, isFetchEnabled = false, trackedAt }) => {
  const navigate = useNavigate();
  return (
    <div className="offcanvas offcanvas-start show user-side-detail" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
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
            <div className="me-auto p-2 bd-highlight">Checked In: <span className="item-value">{userDetail.isCheckedIn ? 'Yes' : 'No'}</span></div>
            {/* <div className="me-auto p-2">
              {userDetail.isCheckedIn
                ? `Check In Device: ${userDetail.lastAttendance?.device_detail?.deviceName || 'N/A'}`
                : `Last Used Device: ${userDetail.lastAttendance?.device_detail?.deviceName || 'N/A'}`}
            </div> */}
          </div>
          <div className="d-flex bd-highlight mb-3 px-2">
            <div className="me-auto p-2">
              {userDetail.isCheckedIn ? "Check In Device: " : "Last Used Device"}
              <span className="item-value">{userDetail.lastAttendance?.device_detail?.modelName || 'N/A'}</span>
            </div>

          </div>
          <div className="d-flex bd-highlight mb-3 px-2">
            <div className="me-auto p-2">
              Last Location Update:
              <span className="item-value">{trackedAt ? ` ${calculateTimeDifference(trackedAt)} ago` : 'N/A'}</span>
            </div>

          </div>
          <div className="d-flex bd-highlight mb-3 px-2">
            <div className="me-auto p-2 bd-highlight">App Version: <span className="item-value">v{userDetail.lastAttendance?.app_version || 'N/A'}</span></div>

          </div>
          <div className="d-flex bd-highlight mb-3 px-2">
            <div className="me-auto p-2 bd-highlight">{
              userDetail.vendor && userDetail.vendor.is_ro ? "Regional Office: " : "Vendor: "
            }
              <span className="item-value">{`${userDetail.vendor?.name || 'N/A'}`}</span>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className={`btn ${isFetchEnabled ? 'btn-danger btn-fetching' : 'btn-primary'}`}
              onClick={fetch_enabling}
              disabled={!userDetail.isCheckedIn}
            >
              {!isFetchEnabled ? "Start Tracking" : "Stop Tracking"}
              {isFetchEnabled && <span className="spinner"></span>}
            </button>
          </div>
        </div>
      ) : null}
      <Timepicker />
      <button className="btn btn-outline-danger my-2 mx-3" onClick={() => navigate('/')}>
        Home
      </button>
    </div>
  );
};

export default UserSidedetails;
