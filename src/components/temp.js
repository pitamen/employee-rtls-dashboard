import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../img/rtls-logo.png"

const UserHistory = () => {

  return (
    <div className="container">
      {/* Header with Logo */}
      <div className="header text-center">
        <img src={logo} alt="Logo" className="img-fluid" style={{ maxHeight: '50px' }} />
      </div>

      {/* User Personal Details */}
      <div className="personal-details mt-4">
        <h2>User Details</h2>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
      </div>

      {/* Date Filter Section */}
      <div className="date-filter mt-4">
        <h3 className="text-center">Filter Location History by Date</h3>
        <div className="d-flex justify-content-center" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <div className="mb-2" style={{ marginRight: 8 }}>
            <label htmlFor="startDate" className="sr-only">Start Date</label>
            <input type="date" className="form-control" id="startDate" placeholder="Start Date" />
          </div>
          <div className="mb-2" style={{ marginRight: 8 }}>
            <label htmlFor="endDate" className="sr-only">End Date</label>
            <input type="date" className="form-control" id="endDate" placeholder="End Date" />
          </div>
          <button type="submit" className="btn btn-primary mb-2">Filter</button>
        </div>
      </div>

      {/* Location History Table */}
      <div className="location-table mt-4">
        <h3>Location History</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-06-24</td>
              <td>New York, NY</td>
              <td><button className="btn btn-primary">View</button></td>
            </tr>
            <tr>
              <td>2023-06-23</td>
              <td>Los Angeles, CA</td>
              <td><button className="btn btn-primary">View</button></td>
            </tr>
            <tr>
              <td>2023-06-22</td>
              <td>Chicago, IL</td>
              <td><button className="btn btn-primary">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Battery Status Graph */}
      {/* <div className="graph-section mt-4">
        <h3>Battery Status</h3>
        <div className="card">
          <div className="card-body">
            <canvas ref={chartRef} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default UserHistory;
