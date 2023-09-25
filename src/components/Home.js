import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet directly for custom icons
import 'leaflet/dist/leaflet.css';

// Import custom marker icons
import userIcon1 from '../img/pin.png'; // Replace with your image file path
import userIcon2 from '../img/pin.png'; // Replace with your image file path

const App = () => {
  const [users, setUsers] = useState([]);

  const dummyUserData = [
    { id: 1, name: 'User 1', lat: 27.700769, lng: 85.300140, icon: userIcon1 },
    { id: 2, name: 'User 2', lat: 27.6710, lng: 85.4298, icon: userIcon2 },
    // Add more user data here
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedUsers = dummyUserData.map((user) => ({
        ...user,
        lat: user.lat + (Math.random() - 0.5) * 0.1,
        lng: user.lng + (Math.random() - 0.5) * 0.1,
      }));
      setUsers(updatedUsers);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <h1>Live Employee Locations</h1>
      <div className="map-container">
        <MapContainer center={[37.7749, -122.4194]} zoom={10} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {users.map((user) => (
            <Marker key={user.id} position={[user.lat, user.lng]} icon={L.icon({ iconUrl: user.icon, iconSize: [32, 32] })}>
              <Popup>{user.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
