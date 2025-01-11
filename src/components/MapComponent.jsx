import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
//import L from 'leaflet';
//import 'leaflet-routing-machine';
import Routing from "../utils/MapRouting";
import { point } from "leaflet";

const MapComponent = ({ points }) => {
  // useEffect(() => {
  //     L.Routing.control({
  //       waypoints: [
  //         L.latLng(52.2297, 21.0122),
  //         L.latLng(52.2397, 21.0222)
  //       ]
  //     }).addTo(map);
  //   });
  return (
    <MapContainer
      center={[50.86605628744675, 20.628193619169046]}
      zoom={14}
      style={{ height: "calc(-143px + 100vh)", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //url="https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreeeeeetMap</a> contributors'
      />
      {points.map((point, index) => (
        <Marker key={index} position={point.position}>
          <Popup>
            <strong>{point.name}</strong>
            <br />
            {point.description}
          </Popup>
        </Marker>
      ))}

      <Routing points={points} />
    </MapContainer>
  );
};

export default MapComponent;
