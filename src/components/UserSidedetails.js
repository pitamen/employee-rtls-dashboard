import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SCSS/user-side-details.scss';
import Timepicker from './Timepicker';
import { userNameToName } from '../utils/stringUtils';
// import '../user-side-details.scss';
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
        <h4>{!isFetchingUserDetail && userDetail ? <span><i className="uil uil-user"></i> {userNameToName(userDetail.name)}</span> : ''}</h4>
      </div>
      {!isFetchingUserDetail && userDetail ? (
        <div className="offcanvas-body">
          <div className="card">
            <div className="card-body">
              <ul className="list-unstyled">
                <li>Checked In: {userDetail.isCheckedIn ? <span><b>&nbsp;Yes<i className="uil uil-check"></i></b></span> : <span><b>&nbsp;No<i className="uil uil-times"></i></b></span>}</li>
                <li>{userDetail.vendor && userDetail.vendor.is_ro ? 'Regional Office' : 'Vendor'}: <b>{userDetail.vendor?.name || 'N/A'}</b></li>
                <li>App Version: <b>v{userDetail.lastAttendance?.app_version || 'N/A'}</b></li>
                <li>Last Location Update: <b>{trackedAt ? `${calculateTimeDifference(trackedAt)} ago` : 'N/A'}</b></li>
              </ul>
            </div>
          </div>
          <div className="accordion" id="userDetailsAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingDevice">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDevice" aria-expanded="false" aria-controls="collapseDevice">
                  {userDetail.isCheckedIn ? 'CheckIn Details' : 'Last CheckIn Details'}
                </button>
              </h2>
              <div id="collapseDevice" className="accordion-collapse collapse" aria-labelledby="headingDevice" data-bs-parent="#userDetailsAccordion">
                <div className="accordion-body">
                  <ul className="list-unstyled">
                  <li>Checked In Time: <b>9:30 am</b></li>  
                  <li>Device Name: <b>{userDetail.lastAttendance?.device_detail?.brand || 'N/A'}</b></li>
                  <li>Device Brand: <b>{userDetail.lastAttendance?.device_detail?.brand || 'N/A'}</b></li>
                  <li>Device Model: <b>{userDetail.lastAttendance?.device_detail?.modelName || 'N/A'}</b></li>
                  <li>Device Battery: <b>{userDetail.lastAttendance?.device_detail?.platformApiLevel || 'N/A'}%</b></li>
                  <li>OS Version: <b>20.5</b></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingCheckedIn">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCheckedIn" aria-expanded="true" aria-controls="collapseCheckedIn">
                 Ticket Details
                </button>
              </h2>
              <div id="collapseCheckedIn" className="accordion-collapse collapse" aria-labelledby="headingCheckedIn" data-bs-parent="#userDetailsAccordion">
                <div className="accordion-body">
                <ul className="list-unstyled">  
                  <li>Ticket no.: 1201456787</li>
                  <li>Picked at: 2:00 pm</li>
                  <li>Category: </li>
                  <li>Sub-Category: {userDetail.lastAttendance?.device_detail?.platformApiLevel || 'N/A'}%</li>
                  </ul>
                  <button className='btn btn-primary'>View</button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button
              className={`btn ${isFetchEnabled ? 'btn-danger btn-fetching' : 'btn-primary'}`}
              onClick={fetch_enabling}
              disabled={!userDetail.isCheckedIn}
            >
              {!isFetchEnabled ? 'Start Tracking' : 'Stop Tracking'}
              {isFetchEnabled && <span className="spinner"></span>}
            </button>
          </div>
        </div>
      ) : null}
      <div className='pt-2 ps-2'>
        <Timepicker />
      </div>
      <button className="btn btn-outline-danger my-2 mx-3" onClick={() => navigate('/')}>
        Home
      </button>
    </div>
  );
};

export default UserSidedetails;
