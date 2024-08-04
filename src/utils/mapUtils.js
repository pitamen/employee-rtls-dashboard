
import L from 'leaflet';
import { markerConfig } from './markerConfig.js';

const iconHtml = (vendorName, empType = "default") => {
  const { mapIconColor, mapIconColorInnerCircle, pinInnerCircleRadius, icon_url } = markerConfig[vendorName][empType];
  // const icon = `<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178">
  //   <path fill="${mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/>
  //   <circle fill="${mapIconColorInnerCircle}" cx="74" cy="75" r="61"/>
  //   <circle fill="#FFF" cx="74" cy="75" r="${pinInnerCircleRadius}"/>
  // </svg>`;
  return icon_url
}

export const customMapIcon = (name, icon, anchor = [0, 32], height = 32, width = 32) =>
  L.divIcon({
    className: 'custom-div-icon',
    html: `<span class="marker-text">${name}</span><img src="${icon}" style="width: ${width}px; height: ${height}px;">`,
    iconAnchor: anchor
  });

export const lessZoomedIcon = (icon_name) => {
  return new L.Icon({
    iconUrl: icon_name,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
  })
};

export const customMapIconVendor = (name, vendorName, empType, anchor = [0, 48], height = 48, width = 48) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<span class="marker-text">${name}</span><img src="${iconHtml(vendorName, empType)}" style="width: ${width}px; height: ${height}px;">`,
    iconAnchor: anchor
  });
}

export const lessZoomedIconVendor = (vendor_name, empType) => {
  return new L.Icon({
    iconUrl: iconHtml(vendor_name, empType),
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  })
};

export const sidebarIcon = (vendor_name) => {
  // return new L.Icon({
  //   iconUrl: iconHtml(vendor_name),
  //   iconSize: [32, 32],
  //   iconAnchor: [16, 32],
  // })
  return iconHtml(vendor_name)
};

