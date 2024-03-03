import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet directly for custom icons
import 'leaflet/dist/leaflet.css';
import Namebar from './Namebar';
import Sidedetails from './Sidedetails'

// Import custom marker icons
import userIcon from '../img/pin.png';

const Home = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    props.setProgress(10); // Set loading to 10% initially

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
      props.setProgress(100); // Set loading to 100% when data is fetched
    }

    fetchData();
  }, []); // Empty dependency array, so it only runs once

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
      <div class="d-flex">
        <div class="col-3 px-2">
          <div class="d-flex flex-column bd-highlight mb-3">
            <div class="p-2 bd-highlight border"><Sidedetails users={users}/></div>
          </div>
        </div>
        <div class="col-9">
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
              {
                users.map((user) => (
                  <Marker
                    key={user.id}
                    position={[user.lat, user.lng]}
                    icon={L.icon({ iconUrl: user.icon, iconSize: [32, 32] })}
                  >
                    <Popup>{user.name}</Popup>
                  </Marker>
                ))

              }
            </MapContainer>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
