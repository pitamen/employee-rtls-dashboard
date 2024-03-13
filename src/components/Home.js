import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Namebar from './Namebar';
import Sidedetails from './Sidedetails';
import MapComponent from './Map'; // Import the MapComponent

// Import custom marker icons
import userIcon from '../img/pin.png';
import { BASE_URL } from '../utils/constants';
import moment from 'moment-timezone';

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

      console.log(json)

      const userData = json.map((item) => ({
        id: item.employeeId,
        name: formatName(item.name),
        lat: item.location.latitude,
        lng: item.location.longitude,
        time: item.location.tracked_at,
        icon: userIcon
      }));

      setUsers(userData);
      props.setProgress(100); // Set loading to 100% when data is fetched
    }

    fetchData();
  }, []); // Empty dependency array, so it only runs once

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData()
    }, 5000);

    fetchData()

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
