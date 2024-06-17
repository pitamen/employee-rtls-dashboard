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
          <div className="accordion" id="userDetailsAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingCheckedIn">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCheckedIn" aria-expanded="true" aria-controls="collapseCheckedIn">
                  Checked In: {userDetail.isCheckedIn ? <span><b>&nbsp;Yes<i className="uil uil-check"></i></b></span> : <span><b>&nbsp;No<i className="uil uil-times"></i></b></span>}
                </button>
              </h2>
              <div id="collapseCheckedIn" className="accordion-collapse collapse show" aria-labelledby="headingCheckedIn" data-bs-parent="#userDetailsAccordion">
                <div className="accordion-body">
                  <p className='pTag'>Checked Out at 2:00pm</p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingDevice">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDevice" aria-expanded="false" aria-controls="collapseDevice">
                  {userDetail.isCheckedIn ? 'Check In Device' : 'Last Used Device'}
                </button>
              </h2>
              <div id="collapseDevice" className="accordion-collapse collapse" aria-labelledby="headingDevice" data-bs-parent="#userDetailsAccordion">
                <div className="accordion-body">
                  <p className='pTag'>Brand: {userDetail.lastAttendance?.device_detail?.brand || 'N/A'}</p>
                  <p className='pTag'>Model: {userDetail.lastAttendance?.device_detail?.modelName || 'N/A'}</p>
                  <p className='pTag'>Battery: {userDetail.lastAttendance?.device_detail?.platformApiLevel || 'N/A'}%</p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingLocation">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLocation" aria-expanded="false" aria-controls="collapseLocation">
                  Last Location Update
                </button>
              </h2>
              <div id="collapseLocation" className="accordion-collapse collapse" aria-labelledby="headingLocation" data-bs-parent="#userDetailsAccordion">
                <div className="accordion-body">
                  <p className='pTag'>{trackedAt ? `${calculateTimeDifference(trackedAt)} ago` : 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingAppVersion">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAppVersion" aria-expanded="false" aria-controls="collapseAppVersion">
                  App Version
                </button>
              </h2>
              <div id="collapseAppVersion" className="accordion-collapse collapse" aria-labelledby="headingAppVersion" data-bs-parent="#userDetailsAccordion">
                <div className="accordion-body">
                  <p className='pTag'>v{userDetail.lastAttendance?.app_version || 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingVendor">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseVendor" aria-expanded="false" aria-controls="collapseVendor">
                  {userDetail.vendor && userDetail.vendor.is_ro ? 'Regional Office' : 'Vendor'}
                </button>
              </h2>
              <div id="collapseVendor" className="accordion-collapse collapse" aria-labelledby="headingVendor" data-bs-parent="#userDetailsAccordion">
                <div className="accordion-body">
                  <p className='pTag'>{userDetail.vendor?.name || 'N/A'}</p>
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
