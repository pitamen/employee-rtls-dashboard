import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FullscreenControl } from 'react-leaflet-fullscreen'; // Import FullscreenControl
import L from 'leaflet';
import UserCard from './UserCard';

const MapComponent = ({ users, receivedData, isFullScreen = false }) => {
  const [newCenter, setNewCenter] = useState({ latitude: 28.2096, longitude: 83.9856 });
  const [zoomLevel, setZoomLevel] = useState(10);

  const lessZoomedIcon = (icon_name) => {
    return new L.Icon({
      iconUrl: icon_name,
      iconSize: [48, 48], // Adjust the size of your icon as needed
      iconAnchor: [24, 48], // Adjust the anchor point if necessary
    })
  };

  useEffect(() => {
    if (receivedData) {
      setZoomLevel(14)
      setNewCenter({ latitude: receivedData.latitude, longitude: receivedData.longitude });
    }
  }, [receivedData]);

  useEffect(() => {
    console.log(newCenter.latitude); // Log newCenter.latitude whenever it changes
  }, [newCenter.latitude]);

  const customIcon = (name, icon) =>
    L.divIcon({
      className: 'custom-div-icon',
      html: `<span className="marker-text">${name}</span><img src="${icon}" style="width: 48px; height: 48px;">`,
      iconAnchor: [0, 48]
    });

  const MyMapComponent = () => {
    const map = useMapEvents({
      zoomend: () => {
        const zoom = map.getZoom()
        setZoomLevel(zoom)
      },
    })
    return null
  }

  return (
    <div className="map-container">
      <MapContainer center={[newCenter.latitude, newCenter.longitude]} zoom={9} style={{ height: isFullScreen ? '95vh' : '85vh', width: '100%' }} key={`${newCenter.latitude}-${newCenter.longitude}`} >
        <MyMapComponent />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {users.map((user) => (
          <Marker key={user.id} position={[user.lat, user.lng]} icon={zoomLevel > 10 ? customIcon(user.name, user.icon) : lessZoomedIcon(user.icon)}>
            <Popup >
              <UserCard user={user} />
            </Popup>
          </Marker>
        ))}
        <FullscreenControl
          position="topright"
          content='<b>FS</b>'
          title="Fullscreen"
          titleCancel="Exit Fullscreen"
        />

      </MapContainer>
    </div>
  );
};


export default MapComponent;
