import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ScaleControl,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { Button, Spinner } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "leaflet/dist/leaflet.css";
//import L from 'leaflet';
//import 'leaflet-routing-machine';
// import Routing from "../utils/MapRouting";
import { pointsService } from "../utils/api/pointsService";
import marker1 from "../assets/markers/location-pin-1.png";
import marker2 from "../assets/markers/location-pin-2.png";
import marker3 from "../assets/markers/small-location-pin.png";
import PointCardComponent from "./PointsPageComponents/PointCardComponent";

const MapComponent = ({ pointss }) => {
  const [points, setPoints] = useState([]);
  const [fetchingStatus, setFetchingStatus] = useState({
    loading: true,
    error: null,
  });
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [clickedPoint, setClickedPoint] = useState([
    50.871848299959176, 20.63844948247584,
  ]);

  const fetchPoints = async () => {
    try {
      const response = await pointsService.getAllPoints();
      setPoints(response);
    } catch (err) {
      console.log(err);
    } finally {
      setFetchingStatus({ ...fetchingStatus, loading: false });
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  const ClickMapHandler = () => {
    useMapEvents({
      click: (e) => {
        setClickedPoint(e.latlng);
      },
      // dragend: (e) => {
      //   console.log("stop dragging");
      // },
    });
    return;
  };

  const SelectedPointDialog = () => {
    return (
      <>
        {selectedPoint && (
          <div
            style={{
              position: "absolute",
              zIndex: "1000",
              padding: "10px",
              background: "rgb(159 161 164)",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button variant="primary" className="me-2">
                <i className="bi bi-plus-circle-fill"> Dodaj do trasy</i>
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => setSelectedPoint(null)}
              >
                <i className="bi bi-x-circle-fill"> Zamknij okno</i>
              </Button>
            </div>
            <div>
              <PointCardComponent point={selectedPoint} />
            </div>
          </div>
        )}
      </>
    );
  };

  const defaultIcon = new L.icon({
    iconUrl: marker1,
    iconSize: [41, 41],
    iconAnchor: [20, 41],
  });
  const selectedIcon = new L.icon({
    iconUrl: marker2,
    iconSize: [41, 41],
    iconAnchor: [20, 41],
  });
  const clickedIcon = new L.icon({
    iconUrl: marker3,
    iconSize: undefined,
    iconAnchor: [16, 32],
  });

  if (fetchingStatus.loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h3>
          <Spinner animation="border" variant="primary" />
        </h3>
      </div>
    );
  }

  return (
    <>
      <SelectedPointDialog />

      <MapContainer
        center={[50.86605628744675, 20.628193619169046]}
        zoom={14}
        zoomControl={false}
        style={{ height: "calc(-143px + 100vh)", width: "100%" }}
      >
        <ScaleControl imperial={false} />
        <ZoomControl position="topright" />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreeeeeetMap</a> contributors'
        />
        <ClickMapHandler />
        {clickedPoint && (
          <Marker position={clickedPoint} icon={clickedIcon}></Marker>
        )}

        {points.map((point, index) => (
          <Marker
            key={index}
            position={point.position}
            eventHandlers={{
              click: () => {
                setSelectedPoint(point);
                setClickedPoint(null);
              },
            }}
            icon={selectedPoint?.id === point.id ? selectedIcon : defaultIcon}
          >
            {/* <Popup>
              <strong>{point.name}</strong>
              <br />
              {point.description}
            </Popup> */}
          </Marker>
        ))}
        {/* <Routing points={points} /> */}
      </MapContainer>
    </>
  );
};

export default MapComponent;
