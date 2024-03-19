import React from 'react';
import { Link } from 'react-router-dom';
import { calculateTimeDifference } from '../utils/commonUtils';

const Sidedetails = ({ users, userId }) => {
  const orgUsersResponse = users;
  
  return (
    <div>
      <div className="accordion" id="accordionExample">
        {
          orgUsersResponse ? orgUsersResponse.map((vendor) => (
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {vendor.vendor_name} ({vendor.employees.length})
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ul className="list-group">
                    {vendor ? vendor.employees?.map((user) => (
                      <li key={user.employeeId} className="list-group-item">
                        <Link to={`/${user.employeeId}`} style={{ textDecoration: 'none' }}>
                          {user.name} ({calculateTimeDifference(user.location.tracked_at)})
                        </Link>
                      </li>
                    )) : <></>}
                  </ul>
                </div>
              </div>
            </div>
          )) : <></>
        }

      </div>
    </div>
  );
};

export default Sidedetails;
