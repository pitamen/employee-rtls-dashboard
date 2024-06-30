import React, { useState } from "react";
import Namebar from "./Namebar";
import "./SCSS/UserHistory.scss";

const UserHistory = () => {
  // Example data array
  const initialUsers = [
    {
      userid: 345589,
      username: "Larry",
      trackedtime: "the Bird",
      trackedlocation: "@twitter",
      button: "view"
    },
    {
      userid: 345590,
      username: "Moe",
      trackedtime: "the Manager",
      trackedlocation: "@office",
      button: "view"
    },
    {
      userid: 345591,
      username: "Curly",
      trackedtime: "the Comedian",
      trackedlocation: "@stage",
      button: "view"
    }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const onSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  return (
    <div className="tableBody">
      <Namebar dashboardName="User History" />
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="personal-details mt-2">
            <h2>User Details</h2>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
          </div>
          <div className="container py-1 my-1">
            <div className="mb-6 py-2">
              <div className="date-filter mt-2">
                <h3 className="text-center">Filter Location History by Date</h3>
                <div
                  className="d-flex justify-content-center"
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
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
          <div className="mb-6">
            <div>
              <div className="container py-2">
                <table className="table table-striped">
                  <thead>
                    <tr className="table-danger">
                      <th scope="col" onClick={() => onSort("userid")}>
                        <b>User ID {getSortIcon("userid")}</b>
                      </th>
                      <th scope="col" onClick={() => onSort("username")}>
                        <b>Username {getSortIcon("username")}</b>
                      </th>
                      <th scope="col" onClick={() => onSort("trackedtime")}>
                        <b>Tracked Time {getSortIcon("trackedtime")}</b>
                      </th>
                      <th scope="col" onClick={() => onSort("trackedlocation")}>
                        <b>Tracked Location {getSortIcon("trackedlocation")}</b>
                      </th>
                      <th scope="col">
                        <b>Links</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
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
