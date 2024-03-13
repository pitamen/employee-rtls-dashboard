import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useParams } from 'react-router-dom';

// Import custom marker icons
import userIcon from '../img/circlePointer.png';
import Namebar from './Namebar';

const User = (props) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const userId = useParams();

  useEffect(() => {
    props.setProgress(10); // Set loading to 10% initially

    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/employees/${userId.user}/history`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();

      const userData = json.map((item) => ({
        id: item.employeeId,
        // name: item.user_id,
        lat: item.latitude,
        lng: item.longitude,
        icon: userIcon,
        trackedAt: item.tracked_at, // Add the tracked_at property
      }));

      setUsers(userData);
      props.setProgress(100); // Set loading to 100% when data is fetched
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array, so it only runs once

  return (
    <div className="App">
      <Navbar users={users} userId={userId.user}/>
      <Namebar/>
      <div className="map-container">
        <MapContainer
          center={[27.633367, 85.305531]}
          zoom={10}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {users.map((user) => (
            <Marker
              key={userId.user}
              position={[user.lat, user.lng]}
              icon={L.icon({ iconUrl: user.icon, iconSize: [32, 32] })}
            >
              <Popup>
                User_id: {userId.user} <br />
                {new Date(user.trackedAt).toLocaleString()}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default User;
