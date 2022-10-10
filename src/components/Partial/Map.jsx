import React, { useEffect } from "react";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

function Map({setLocation}) {
  const [position, setPosition] = useState([10,105]);
  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setLocation(e.latlng);
        },
    })

    return position ? (
      <Marker
        key={position[0]}
        position={position}
      >
        <Popup>
          Bạn đang ở đây
        </Popup>
      </Marker>
    ) : null;
  };
  return (
    <MapContainer center={position} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers />
    </MapContainer>
  );
}

export default Map;
