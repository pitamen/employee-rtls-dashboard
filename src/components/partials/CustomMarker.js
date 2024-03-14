import { useRef, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import L from 'leaflet';

const CustomMarker = ({ user }) => {
    const popupRef = useRef(null);
  
    useEffect(() => {
      if (popupRef.current) {
        popupRef.current.openPopup();
      }
    }, [popupRef]); // Only run once when popupRef changes
  
    return (
      <Marker
        key={user.id}
        position={[user.lat, user.lng]}
        icon={L.icon({ iconUrl: user.icon, iconSize: [32, 32] })}
      >
        <Popup ref={popupRef}>{user.name}</Popup>
      </Marker>
    );
  };

  export default CustomMarker;