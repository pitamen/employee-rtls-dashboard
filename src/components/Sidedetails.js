import React from 'react';
import { Link } from 'react-router-dom';
import { calculateTimeDifference } from '../utils/commonUtils';

const Sidedetails = ({ users, orgResponse, logData }) => {
  const orgUsersResponse = orgResponse;

  const handleClick = (user) => {
    console.log("Clicked User Latitude:", user.location.latitude);
    console.log("Clicked User Longitude:", user.location.longitude);
    logData({ latitude: user.location.latitude, longitude: user.location.longitude });
  };

  return (
    <div>
      <div className="accordion" id="accordionExample">
        {orgUsersResponse ? orgUsersResponse.map((vendor) => (
          <div className="accordion-item" key={vendor.vendor_id}>
            <h2 className="accordion-header" id={`heading-${vendor.vendor_id}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${vendor.vendor_id}`}
                aria-expanded="true"
                aria-controls={`collapse-${vendor.vendor_id}`}
              >
                {vendor.vendor_name} ({vendor.employees.length})
              </button>
            </h2>
            <div
              id={`collapse-${vendor.vendor_id}`}
              className="accordion-collapse collapse show"
              aria-labelledby={`heading-${vendor.vendor_id}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <ul className="list-group">
                  {vendor.employees && vendor.employees.map((user) => (
                    <li key={user.employeeId} className="list-group-item">
                      <Link
                        to="#"
                        style={{ textDecoration: 'none' }}
                        onClick={() => handleClick(user)}
                      >
                        {user.name}<br /> ({calculateTimeDifference(user.location.tracked_at)})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )) : null}
      </div>
    </div>
  );
};

export default Sidedetails;
