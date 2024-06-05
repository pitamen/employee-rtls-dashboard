import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useParams } from 'react-router-dom';
import { FullscreenControl } from 'react-leaflet-fullscreen';
import { BASE_URL } from '../utils/constants';
import userIcon1 from '../img/live-person-location.png';
import Namebar from './Namebar';
import L from 'leaflet';
import UserSidedetails from './UserSidedetails';

const User = (props) => {
  const [userData, setUserData] = useState([]);
  const [newCenter, setNewCenter] = useState({ latitude: 27.633367, longitude: 85.305531 });
  const { user: userId, name: userName } = useParams();
  const [userDetail, setUserDetail] = useState(null);
  const [isFetchingUserDetail, setIsFetchingUserDetail] = useState(false);

  const customIcon = useMemo(() => new L.Icon({
    iconUrl: userIcon1,
    iconSize: [32, 32], // Adjust the size of your icon as needed
    iconAnchor: [16, 32], // Adjust the anchor point if necessary
  }), []);

  useEffect(() => {
    const fetchUserDetail = async () => {
      setIsFetchingUserDetail(true);
      try {
        const response = await fetch(`${BASE_URL}employees/detail/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const userDetailResponse = await response.json();
        if (userDetailResponse.length > 0) {
          setUserDetail(userDetailResponse[0]);
        }
        setIsFetchingUserDetail(false);
      } catch (error) {
        setIsFetchingUserDetail(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchUserDetail();
  }, [userId]);

  useEffect(() => {
    props.setProgress(10); // Set loading to 10% initially

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}employees/${userId}/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await response.json();

        const updatedUserData = json.map((item) => ({
          keyId: item._id,
          id: item.employeeId,
          lat: item.latitude,
          lng: item.longitude,
          trackedAt: item.tracked_at, // Add the tracked_at property
        }));

        if (updatedUserData.length > 0) {
          setNewCenter({ latitude: updatedUserData[0].lat, longitude: updatedUserData[0].lng });
        }

        setUserData(updatedUserData);
        props.setProgress(100);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, props]);

  return (
    <div className="App">
      <Namebar name={userName ?? ''} userDetail={userDetail} />
      <UserSidedetails newCenter={newCenter} userDetail={userDetail} isFetchingUserDetail={isFetchingUserDetail} />
      <div className="map-container">
        <MapContainer
          key={`${newCenter.latitude}-${newCenter.longitude}`}
          center={[newCenter.latitude, newCenter.longitude]}
          zoom={15}
          style={{ height: '95vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {userData.map((user, index) => (
            index === 0 ? (
              <Marker key={user.keyId} position={[user.lat, user.lng]} icon={customIcon}>
                <Popup>{new Date(user.trackedAt).toLocaleString()}</Popup>
              </Marker>
            ) : (
              <CircleMarker key={user.keyId} center={[user.lat, user.lng]} radius={1} color="red" fillOpacity={1}>
                <Popup>{new Date(user.trackedAt).toLocaleString()}</Popup>
              </CircleMarker>
            )
          ))}
          <FullscreenControl position="topright" />
        </MapContainer>
      </div>
    </div>
  );
};

export default User;
