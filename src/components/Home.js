import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Namebar from './Namebar';
import Sidedetails from './Sidedetails';
import MapComponent from './Map'; // Import the MapComponent

// Import custom marker icons
import userIcon from '../img/pin.png';

const Home = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    props.setProgress(10);

    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/location/latest-locations-ofAllUsers", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let json = await response.json();

      const userData = json.data.map((item) => ({
        id: item.user_id,
        name: item.user_id,
        lat: item.latitude,
        lng: item.longitude,
        icon: userIcon
      }));

      setUsers(userData);
      props.setProgress(100);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedUsers = users.map((user) => ({
        ...user,
        lat: user.lat + (Math.random() - 0.2) * 0.01,
        lng: user.lng + (Math.random() - 0.2) * 0.01,
      }));
      setUsers(updatedUsers);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [users]);

  return (
    <div className="App">
      <Navbar users={users} />
      <Namebar />
      <div className="d-flex">
        <div className="col-3 px-2">
          <div className="d-flex flex-column bd-highlight mb-3">
            <div className="p-2 bd-highlight border">
              <Sidedetails users={users} />
            </div>
          </div>
        </div>
        <div className="col-9">
          <MapComponent users={users} />
        </div>
      </div>
    </div>
  );
};

export default Home;
