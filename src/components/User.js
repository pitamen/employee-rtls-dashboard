import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet directly for custom icons
import 'leaflet/dist/leaflet.css';
import { useParams } from "react-router-dom";

// Import custom marker icons
import userIcon from '../img/circlePointer.png'; 


const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);

  const userId = useParams();

  
  const fetchData = async()=>{
    const response = await fetch(`http://localhost:3000/location/getLocationById/${userId.user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let json = await response.json();
    console.log(json)
    //userData.concat(json)
    json.data.forEach(function(item){
      const myobj = {
        id: item.user_id,
        name: item.user_id,
        lat: item.latitude,
        lng: item.longitude,
        icon: userIcon
      }
      userData.push(myobj);
    });
    console.log(userData)
  
  }

  fetchData();  

  const userData = [];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedUsers = userData.map((user) => ({
        ...user
      }));
      setUsers(updatedUsers);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <Navbar users={users} setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
      <h1>Live Employee Locations</h1>
      <div className="map-container">
        <MapContainer
          center={
            selectedUser === null
            ? [27.700769, 85.300140]
              : [selectedUser.lat, selectedUser.lng]
          }
          zoom={10}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {selectedUser === null
            ? users.map((user) => (
              <Marker
                key={user.id}
                position={[user.lat, user.lng]}
                icon={L.icon({ iconUrl: user.icon, iconSize: [32, 32] })}
              >
                <Popup>{user.name}</Popup>
              </Marker>
            ))
            : selectedUser && (
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
