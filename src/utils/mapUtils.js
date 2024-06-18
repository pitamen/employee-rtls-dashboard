
import L from 'leaflet';

export const customMapIcon = (name, icon, anchor = [0, 32], height = 32, width = 32) =>
  L.divIcon({
    className: 'custom-div-icon',
    html: `<span class="marker-text">${name}</span><img src="${icon}" style="width: ${width}px; height: ${height}px;">`,
    iconAnchor: anchor
  });