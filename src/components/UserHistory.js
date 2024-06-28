import React from "react";
import Namebar from "./Namebar";
import Timepicker from "./Timepicker";
import "./SCSS/UserHistory.scss";

const UserHistory = () => {
  // Example data array
  const users = [
    {
      userid: 345589,
      username: "Larry",
      trackedtime: "the Bird",
      trackedlocation: "@twitter",
      button:"view"
    },
    {
      userid: 345589,
      username: "Larry",
      trackedtime: "the Bird",
      trackedlocation: "@twitter",
      button:"view"
    },
    {
      userid: 345589,
      username: "Larry",
      trackedtime: "the Bird",
      trackedlocation: "@twitter",
      button:"view"
    }
  ];

  return (
    <div className="tableBody" >
      <Namebar dashboardName="User History" />
      <div className="py-4">
      <div className="container mx-auto px-4">
      <div className="personal-details mt-2">
        <h2>User Details</h2>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
      </div>

        <div className="container py-1 my-1 ">
          <div className="mb-6 py-2">
            <div className="date-filter mt-2">
              <h3 className="text-center">Filter Location History by Date</h3>
              <div
                className="d-flex justify-content-center"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="mb-2" style={{ marginRight: 8 }}>
                  <label htmlFor="startDate" className="sr-only">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    placeholder="Start Date"
                  />
                </div>
                <div className="mb-2" style={{ marginRight: 8 }}>
                  <label htmlFor="endDate" className="sr-only">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    placeholder="End Date"
                  />
                </div>
                <button type="submit" className="btn btn-danger mb-2">
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 ">
          <div>
            <div className="container py-2 ">
              <table className="table table-striped ">
                <thead>
                  <tr className="table-danger">
                    <th scope="col">
                      <b>User ID</b>
                    </th>
                    <th scope="col">
                      <b>Username</b>
                    </th>
                    <th scope="col">
                      <b>Tracked Time</b>{" "}
                    </th>
                    <th scope="col">
                      <b>Tracked Location</b>
                    </th>
                    <th scope="col">
                      <b>Links</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.userid}>
                      <th scope="row">{user.userid}</th>
                      <td>{user.username}</td>
                      <td>{user.trackedtime}</td>
                      <td>{user.trackedlocation}</td>
                      <td><button className="btn btn-danger mb-2">{user.button}</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserHistory;
