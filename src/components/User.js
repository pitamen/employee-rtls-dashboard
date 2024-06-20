import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useParams } from 'react-router-dom';
import { FullscreenControl } from 'react-leaflet-fullscreen';
import { BASE_URL } from '../utils/constants';
import userIcon1 from '../img/live-person-location.png';
import Namebar from './Namebar';
import UserSidedetails from './UserSidedetails';
import '../my-sass.scss'
import { unixTimeStampToISOStringConverter, toggleFullScreen } from '../utils/commonUtils';
import { customMapIcon } from '../utils/mapUtils';

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
  const [currentTicketDetail, setCurrentTicketDetail] = useState(null)
  const [isFetchingCurrentTicketDetail, setIsFetchingCurrentTicketDetail] = useState(false)

  const enableDisableLiveTracking = () => {
    if (fetchEnabled) {
      setFetchEnabled(false)
    } else {
      setFetchEnabled(true)
    }
  }

  useEffect(() => {
    const fetchUserDetail = async () => {
      setIsFetchingUserDetail(true);
      try {
        const response = await fetch(`${BASE_URL}v2/employees/byempid/detail?id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const userDetailResponse = await response.json();
        const userData = userDetailResponse.data;
        if (userData.length > 0) {
          setUserDetail(userData[0]);
          if (userData[0].inProgressTicket && Object.keys(userData[0].inProgressTicket).length > 0 && userData[0].inProgressTicket.ticket_id) {
            fetchTicketDetail(userData[0].inProgressTicket.ticket_id)
          }
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


  const fetchTicketDetail = async (ticketId) => {
    try {
      setIsFetchingCurrentTicketDetail(true)
      const response = await fetch(`${BASE_URL}v2/tickets/detail/${ticketId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      console.log("Json", json)
      setCurrentTicketDetail(json)
    } catch (error) {
      setCurrentTicketDetail(null)
      console.error('error: ', error.message)
    } finally {
      setIsFetchingCurrentTicketDetail(false)
    }
  }

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
        trackedAt: item.tracked_at,
        device_timestamp: item.device_timestamp
      }));

      var trackedAt = updatedUserData[0].device_timestamp ? unixTimeStampToISOStringConverter(updatedUserData[0].device_timestamp) : updatedUserData[0].trackedAt
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
      <Namebar name={userName ?? ''} userDetail={userDetail} toggleFullScreen={toggleFullScreen} />
      <UserSidedetails userDetail={userDetail} isFetchingUserDetail={isFetchingUserDetail}
        fetch_enabling={enableDisableLiveTracking} isFetchEnabled={fetchEnabled}
        trackedAt={trackedAt}
        ticketDetail={currentTicketDetail}
        isFetchingCurrentTicketDetail={isFetchingCurrentTicketDetail}
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
          <FullscreenControl
            position="topright"
            content='<b>FS</b>'
            title="Fullscreen"
            titleCancel="Exit Fullscreen"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default User;
