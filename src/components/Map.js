import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FullscreenControl } from 'react-leaflet-fullscreen'; // Import FullscreenControl
import L from 'leaflet';
import UserCard from './UserCard';

const MapComponent = ({ users, receivedData }) => {
  const [newCenter, setNewCenter] = useState({ latitude: 27.7172, longitude: 85.3240 });

  useEffect(() => {
    // Update center when receivedData changes
    if (receivedData) {
      setNewCenter({ latitude: receivedData.latitude, longitude: receivedData.longitude });
    }
  }, [receivedData]);


  const customIcon = (name, icon) =>
    L.divIcon({
      className: 'custom-div-icon',
      html: `<span class="marker-text">${name}</span><img src="${icon}" style="width: 24px; height: 24px;">`,
    });

  return (
    <div className="map-container">
      <MapContainer center={[newCenter.latitude, newCenter.longitude]} zoom={10} style={{ height: '85vh', width: '100%' }} key={receivedData.mapKey} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {users.map((user) => (
          <Marker key={user.id} position={[user.lat, user.lng]} icon={customIcon(user.name, user.icon)}>
            <Popup>
              <UserCard user={user} />
            </Popup>
          </Marker>
        ))}
        <FullscreenControl
          position="topright"
          content='<b>FS</b>'
          title="Fullscreen"
          titleCancel="Exit Fullscreen"
          forceSeparateButton="true"
        />
        {/* Add FullscreenControl */}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
