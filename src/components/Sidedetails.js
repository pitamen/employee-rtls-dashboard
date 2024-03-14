import React from 'react';
import { Link } from 'react-router-dom';

const Sidedetails = ({ users, userId }) => {

  const orgUsersResponse = users;

  const calculateTimeDifference = (targetTime) => {
    var currDate = new Date().getTime();
    var prevDate = new Date(targetTime).getTime();

    var timeDifference = currDate - prevDate;

    // Convert the time difference to a human-readable format
    var seconds = Math.floor((timeDifference / 1000) % 60);
    var minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    var hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    var result = "";

    if (days > 0) {
      result += days + " days, ";
    }
    if (hours > 0) {
      result += hours + " hours, ";
    }
    if (minutes > 0) {
      result += minutes + " minutes, ";
    }
    if (seconds > 0) {
      result += seconds + " seconds ago";
    }
    if (result === "") {
      result = "Just Now";
    }

    return result;

  };
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
