// MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FullscreenControl } from 'react-leaflet-fullscreen'; // Import FullscreenControl
import L, { icon } from 'leaflet';
import UserCard from './UserCard'

const MapComponent = ({ users }) => {

  const customIcon = (name, icon) => L.divIcon({
    className: 'custom-div-icon',
    html: `<span class="marker-text">${name}</span><img src="${icon}" style="width: 24px; height: 24px;">`
  })
  return (
    <div className="map-container">
      <MapContainer
        center={[27.633367, 85.305531]}
        zoom={10}
        style={{ height: '85vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {users.map((user) => (
          // <Marker
          //   key={user.id}
          //   position={[user.lat, user.lng]}
          //   icon={L.icon({ iconUrl: user.icon, iconSize: [32, 32] })}
          // >
          //   <Popup><UserCard user={user} /></Popup>
          // </Marker>
          // <CustomMarker user={user}/>
          <Marker position={[user.lat, user.lng]} icon={customIcon(user.name, user.icon)}>
            <Popup><UserCard user={user} /></Popup>
          </Marker>
        ))}
        <FullscreenControl position="topright"
          content='<b>FS</b>'
          title="Fullscreen"
          titleCancel="Exit Fullscreen"
          forceSeparateButton='true'
        /> {/* Add FullscreenControl */}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
