import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet directly for custom icons
import 'leaflet/dist/leaflet.css';

// Import custom marker icons
import userIcon1 from '../img/pin.png'; // Replace with your image file path
import userIcon2 from '../img/pin.png'; // Replace with your image file path


const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);

  const dummyUserData = [
    { id: 1, name: 'Aakash', lat: 27.700769, lng: 85.300140, icon: userIcon1 },
    { id: 2, name: 'Nirakar', lat: 27.6710, lng: 85.4298, icon: userIcon2 },
    { id: 3, name: 'User3', lat: 27.5710, lng: 85.4298, icon: userIcon2 },
    // Add more user data here
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedUsers = dummyUserData.map((user) => ({
        ...user,
        lat: user.lat + (Math.random() - 0.2) * 0.01,
        lng: user.lng + (Math.random() - 0.2) * 0.01,
      }));
      setUsers(updatedUsers);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <Navbar users={users} setSelectedUser={setSelectedUser} />
      <h1>Live Employee Locations</h1>
      <div className="map-container">
        <MapContainer center={[27.700769, 85.300140]} zoom={10} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {selectedUser && (
            <Marker
              key={selectedUser.id}
              position={[selectedUser.lat, selectedUser.lng]}
              icon={L.icon({ iconUrl: selectedUser.icon, iconSize: [32, 32] })}
            >
              <Popup>{selectedUser.name}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
