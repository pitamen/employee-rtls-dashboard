import React , { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import './SCSS/user-side-details.scss';
import Timepicker from './Timepicker';
import { userNameToName } from '../utils/stringUtils';
// import '../user-side-details.scss';
import { calculateTimeDifference } from '../utils/commonUtils';
import CustomModal from './Modal';

const UserSidedetails = ({ isFetchingUserDetail, userDetail, fetch_enabling, isFetchEnabled = false, trackedAt }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

    // Sample table data for the modal
    const tableData = [
      { label: 'Ticket no.:', value: <b>1201456787</b> },
      { label: 'Picked at:', value: <b>2:00 pm</b> },
      { label: 'Category:', value: <b>NST</b> },
      { label: 'Sub-Category:', value: <b>LOS</b> },
    ];

  return (
    <div className="offcanvas offcanvas-start show user-side-detail" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasScrollingLabel" style={{ color: 'white' }}></h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="container py-2"></div>
      <div className="d-flex justify-content-around">
        <h4>{!isFetchingUserDetail && userDetail ? <span><i className="uil uil-user"></i> {userNameToName(userDetail.name)}</span> : ''}
          <div className="d-flex justify-content-center mt-3">
            <button
              className={`btn ${isFetchEnabled ? 'btn-danger btn-fetching' : 'btn-primary'}`}
              onClick={fetch_enabling}
            // disabled={!userDetail.isCheckedIn}
            >
              {!isFetchEnabled ? 'Start Tracking' : 'Stop Tracking'}
              {isFetchEnabled && <span className="spinner"></span>}
            </button>
          </div></h4>
      </div>
      {!isFetchingUserDetail && userDetail ? (
        <div className="offcanvas-body">
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>Checked In:</td>
                <td>{userDetail.isCheckedIn ? <span><b>&nbsp;Yes<i className="uil uil-check"></i></b></span> : <span><b>&nbsp;No<i className="uil uil-times"></i></b></span>}</td>
              </tr>
              <tr>
                <td>{userDetail.vendor && userDetail.vendor.is_ro ? 'Regional Office' : 'Vendor'}:</td>
                <td><b>{userDetail.vendor?.name || 'N/A'}</b></td>
              </tr>
              <tr>
                <td>App Version:</td>
                <td><b>v{userDetail.lastAttendance?.app_version || 'N/A'}</b></td>
              </tr>
              <tr>
                <td>Last Location Update:</td>
                <td><b>{trackedAt ? `${calculateTimeDifference(trackedAt)} ago` : 'N/A'}</b></td>
              </tr>
            </tbody>
          </table>
          <div className="accordion" id="userDetailsAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingDevice">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDevice" aria-expanded="false" aria-controls="collapseDevice">
                  {userDetail.isCheckedIn ? 'CheckIn Details' : 'Last CheckIn Details'}
                </button>
              </h2>
              <div id="collapseDevice" className="accordion-collapse collapse" aria-labelledby="headingDevice" data-bs-parent="#userDetailsAccordion">
                <div className="accordion-body">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <th>Checked In Time:</th>
                        <td><b>{userDetail.lastAttendance?.checkedInTime || 'N/A'}</b></td>
                      </tr>
                      <tr>
                        <th>Device Name:</th>
                        <td><b>{userDetail.lastAttendance?.device_detail?.brand || 'N/A'}</b></td>
                      </tr>
                      <tr>
                        <th>Device Model:</th>
                        <td><b>{userDetail.lastAttendance?.device_detail?.modelName || 'N/A'}</b></td>
                      </tr>
                      <tr>
                        <th>Device Battery:</th>
                        <td><b>{userDetail.lastAttendance?.device_detail?.platformApiLevel || 'N/A'}%</b></td>
                      </tr>
                      <tr>
                        <th>OS Version:</th>
                        <td><b>20.5</b></td>
                      </tr>
                    </tbody>
                  </table>
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
                  <table class="table table-striped">  <tbody>
                    <tr>
                      <th>Ticket no.:</th>
                      <td><b>1201456787</b></td>
                    </tr>
                    <tr>
                      <th>Picked at:</th>
                      <td><b>2:00 pm</b></td>
                    </tr>
                    <tr>
                      <th>Category:</th>
                      <td><b>NST</b></td>
                    </tr>
                    <tr>
                      <th>Sub-Category:</th>
                      <td><b>LOS</b></td>
                    </tr>
                  </tbody>
                  </table>
                  <button className='btn btn-primary' onClick={handleModalOpen}>View</button>
                  <CustomModal
                    show={showModal}
                    onHide={handleModalClose}
                    title="Ticket Details"
                    tableData={tableData}
                  />
                </div>
              </div>
            </div>
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
