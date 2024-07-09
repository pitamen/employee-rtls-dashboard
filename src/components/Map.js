import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FullscreenControl } from 'react-leaflet-fullscreen'; // Import FullscreenControl
import L from 'leaflet';
import UserCard from './UserCard';
import { customMapIcon, customMapIconVendor, lessZoomedIcon, lessZoomedIconVendor } from '../utils/mapUtils';
import './SCSS/Map.scss';
import ReactLeafletKml from "react-leaflet-kml";
import kmlFile from '../kalaiya.kml'

const MapComponent = ({ users, receivedData }) => {
  const [newCenter, setNewCenter] = useState({ latitude: 28.2096, longitude: 83.9856 });
  const [zoomLevel, setZoomLevel] = useState(10);
  const [kml, setKml] = useState(null);

  useEffect(() => {
    if (receivedData) {
      setZoomLevel(14);
      setNewCenter({ latitude: receivedData.latitude, longitude: receivedData.longitude });
    }
  }, [receivedData]);

  useEffect(() => {
    // Fetch the KML file dynamically
    fetch(kmlFile) // Adjust the path as needed
      .then(response => response.text())
      .then(text => {
        const parser = new DOMParser();
        const kmlData = parser.parseFromString(text, 'application/xml');
        setKml(kmlData);
      })
      .catch(error => console.error('Error fetching KML file:', error));
  }, []);

  const MyMapComponent = () => {
    const map = useMapEvents({
      zoomend: () => {
        const zoom = map.getZoom();
        setZoomLevel(zoom);
      },
    });
    return null;
  };

  return (
    <div className="map-container">
      <MapContainer center={[newCenter.latitude, newCenter.longitude]} zoom={9} style={{ height: '95vh', width: '100%' }} key={`${newCenter.latitude}-${newCenter.longitude}`}>
        <MyMapComponent />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {kml && <ReactLeafletKml kml={kml} />}
        {users.map((user) => (
          <Marker
            key={user.id}
            position={[user.lat, user.lng]}
            icon={user.isRO ? (zoomLevel > 10 ? customMapIcon(user.name, user.icon, [0, 48], 48, 48) : lessZoomedIcon(user.icon)) : zoomLevel > 10 ? customMapIconVendor(user.name, user.vendorName, user.empType) : lessZoomedIconVendor(user.vendorName, user.empType)}
          >
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
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
