import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FullscreenControl } from 'react-leaflet-fullscreen';
import UserCard from './UserCard';
import { customMapIcon, customMapIconVendor, lessZoomedIcon, lessZoomedIconVendor } from '../utils/mapUtils';
import './SCSS/Map.scss';
import {GeoJSON} from 'react-leaflet';
import geoJsonFile from '../dishhome.geojson';
import { colors } from '@mui/material';

const MapComponent = ({ users, receivedData }) => {
  const [newCenter, setNewCenter] = useState({ latitude: 28.2096, longitude: 83.9856 });
  const [zoomLevel, setZoomLevel] = useState(10);
  const [geoJSONData, setGeoJSONData] = useState(null);

  useEffect(() => {
    if (receivedData) {
      setZoomLevel(14);
      setNewCenter({ latitude: receivedData.latitude, longitude: receivedData.longitude });
    }
  }, [receivedData]);

  useEffect(() => {
    fetch(geoJsonFile)
      .then(response => response.json())
      .then(data => {
        setGeoJSONData(data);
      })
      .catch(error => console.error('Error fetching GeoJSON file:', error));
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

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
  };

  return (
    <div className="map-container">
      <MapContainer center={[newCenter.latitude, newCenter.longitude]} zoom={9} style={{ height: '95vh', width: '100%' }} key={`${newCenter.latitude}-${newCenter.longitude}`}>
        <MyMapComponent />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoJSONData && (
          <GeoJSON data={geoJSONData} style={{color: '#c97a29', weight: 1}} onEachFeature={onEachFeature} /> // Render GeoJSONLayer with fetched GeoJSON data
        )}
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
