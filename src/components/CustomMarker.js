import React, { Component, useRef, useEffect } from 'react'
import L from 'leaflet';
const CustomMarker = ({ position, iconUrl, name, myRef }) => {
    const markerRef = myRef;
    useEffect(() => {
        const marker = L.marker(position, { icon: L.icon({ iconUrl, iconSize: [32, 32] }) });

        // marker.bindPopup(name);
        // if (markerRef.current) {

        //     markerRef.current.addLayer(marker);
        // }

        // return () => {
        //     if (markerRef.current) {
        //         markerRef.current.removeLayer(marker);
        //     }
        // };
    }, [position, iconUrl, name]);

    return <div ref={markerRef} />;
}

export default CustomMarker