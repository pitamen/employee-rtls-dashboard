import React from "react";
import Namebar from "./Namebar";

const UserHistory = () => {
  // Example data array
  const users = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', handle: '@mdo' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', handle: '@fat' },
    { id: 3, firstName: 'Larry', lastName: 'the Bird', handle: '@twitter' }
  ];

  return (
    <div>
      <Namebar />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Username</th>
            <th scope="col">Tracked Date</th>
            <th scope="col">Tracked Location</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.handle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserHistory;
