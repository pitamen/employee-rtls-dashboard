import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useParams } from 'react-router-dom';
import { FullscreenControl } from 'react-leaflet-fullscreen';
import { BASE_URL } from '../utils/constants';
import userIcon1 from '../img/live-person-location.png';
import Namebar from './Namebar';
import UserSidedetails from './UserSidedetails';
import L, { point } from 'leaflet';
import '../my-sass.scss'
import { unixTimeStampToISOStringConverter } from '../utils/commonUtils';

const User = () => {
  const [userData, setUserData] = useState([]);
  const [newCenter, setNewCenter] = useState({ latitude: 27.633367, longitude: 85.305531 });
  const { user: userId, name: userName } = useParams();
  const [userDetail, setUserDetail] = useState(null);
  const [isFetchingUserDetail, setIsFetchingUserDetail] = useState(false);
  const [fetchIntervalId, setFetchIntervalId] = useState(null);
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [trackedAt, setUserTrackedAt] = useState(false);
  const [travelledPoints, setTravelledPoints] = useState([])

  const enableDisableLiveTracking = () => {
    console.log("clicked fetch enabled")
    if (fetchEnabled) {
      setFetchEnabled(false)
    } else {
      setFetchEnabled(true)
    }
  }

  const customMapIcon = (name, icon) =>
    L.divIcon({
      className: 'custom-div-icon',
      html: `<span className="marker-text">${name}</span><img src="${icon}" style="width: 32px; height: 32px;">`,
      iconAnchor: [0, 32]
    });

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
    if (fetchEnabled) {
      const intervalId = setInterval(fetchData, 1000);
      setFetchIntervalId(intervalId);
    } else {
      clearInterval(fetchIntervalId)
    }
    return () => {
      clearInterval(fetchIntervalId);
    };

  }, [fetchEnabled])

  useEffect(() => {
    console.log('')
  }, [trackedAt])

  const fetchData = async () => {
    console.log("called")
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
        trackedAt: item.trackedAt,
        device_timestamp: item.device_timestamp
      }));

      var trackedAt = updatedUserData[0].device_timestamp ? unixTimeStampToISOStringConverter(updatedUserData[0].device_timestamp) : updatedUserData[0].trackedAt
      console.log("Tracked at", trackedAt)
      setUserTrackedAt(trackedAt)

      if (updatedUserData.length > 0) {
        setNewCenter({ latitude: updatedUserData[0].lat, longitude: updatedUserData[0].lng });
      }

      setUserData(updatedUserData);

      const travelledPointsData = updatedUserData.map((point) => [point.lat, point.lng])
      setTravelledPoints(travelledPointsData)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <div className="App">
      <Namebar name={userName ?? ''} userDetail={userDetail} />
      <UserSidedetails userDetail={userDetail} isFetchingUserDetail={isFetchingUserDetail}
        fetch_enabling={enableDisableLiveTracking} isFetchEnabled={fetchEnabled}
        trackedAt={trackedAt}
      />
      <div className="map-container">
        <MapContainer
          key={`${newCenter.latitude}-${newCenter.longitude}`}
          center={[newCenter.latitude, newCenter.longitude]}
          zoom={fetchEnabled ? 20 : 15}
          style={{ height: '95vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Polyline positions={travelledPoints} color="#3d5a91" />
          {userData.map((user, index) => (
            index === 0 ? (
              <Marker key={user.keyId} position={[user.lat, user.lng]} icon={customMapIcon(userDetail ? userDetail.name : '', userIcon1)}>
                <Popup>{new Date(trackedAt).toLocaleString()}</Popup>
              </Marker>
            ) : (
              <CircleMarker key={user.keyId} center={[user.lat, user.lng]} radius={1} color="red" fillOpacity={1}>
                <Popup>{new Date(trackedAt).toLocaleString()}</Popup>
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
