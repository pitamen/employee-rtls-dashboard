import React from "react";
import Namebar from "./Namebar";
import Timepicker from "./Timepicker";
import "./SCSS/UserHistory.scss";

const UserHistory = () => {
  // Example data array
  const users = [
    { id: 154658, firstName: "Mark", lastName: "Otto", handle: "@mdo" },
    { id: 256589, firstName: "Jacob", lastName: "Thornton", handle: "@fat" },
    {
      id: 345589,
      firstName: "Larry",
      lastName: "the Bird",
      handle: "@twitter",
    },
  ];

  return (
    <div className="tableBody">
      <Namebar dashboardName="User History" />
      <div className="container mx-auto px-4 py-8 my-2">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center ">
            <h2 class="heading-section">User's History of 25-06-2024</h2>
          </div>
        </div>
        <div className="container py-1 my-1 ">
        <div className="mb-6 py-3">
          <Timepicker />
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
                      <tr key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.handle}</td>
                        <td>{user.handle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserHistory;
