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
import { Button, Spinner, Dropdown } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "leaflet/dist/leaflet.css";
//import L from 'leaflet';
//import 'leaflet-routing-machine';
import Routing from "../utils/MapRouting";
import { pointsService } from "../utils/api/pointsService";
import marker1 from "../assets/markers/location-pin-1.png";
import marker2 from "../assets/markers/location-pin-2.png";
import marker3 from "../assets/markers/small-location-pin.png";
import PointCardComponent from "./PointsPageComponents/PointCardComponent";
import AddPointModal from "./MapPage/AddPointModal";
import { Control } from "leaflet";
import { Card, ListGroup } from "react-bootstrap";
import RouteCard from "./MapPage/RouteCard";

const MapComponent = () => {
  const [points, setPoints] = useState([]);
  const [fetchingStatus, setFetchingStatus] = useState({
    loading: true,
    error: null,
  });
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [clickedPoint, setClickedPoint] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [userRouteList, setUserRouteList] = useState([]);
  const [routeDetails, setRouteDetails] = useState({ distance: 0, time: 0 });

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
        setClickedPoint(null);
        setContextMenuPosition(null);
      },
      drag: (e) => {
        setClickedPoint(null);
        setContextMenuPosition(null);
      },
      contextmenu: (e) => {
        setClickedPoint(e.latlng);
        console.log(e);
        setContextMenuPosition({
          x: e.originalEvent.pageX,
          y: e.originalEvent.pageY,
        });
      },
    });
    return;
  };

  /** Wyświetla menu kontekstowe po kliknięciu prawego przycisku */
  const CustomContextMenu = (position) => {
    const { x, y } = position.position;
    return (
      <Dropdown.Menu show variant="dark" style={{ top: y, left: x }}>
        <Dropdown.ItemText>
          <i className="bi bi-three-dots"></i> Menu
        </Dropdown.ItemText>
        <Dropdown.Item onClick={handleShowModal}>
          <i className="bi bi-plus-circle"></i> Dodaj punkt!
        </Dropdown.Item>
        <Dropdown.Divider />
        {/* <Dropdown.Item eventKey="2">
          <i className="bi bi-zoom-in"></i> Zbliż
        </Dropdown.Item>
        <Dropdown.Item eventKey="3">
          <i className="bi bi-zoom-out"></i> Oddal
        </Dropdown.Item> */}
      </Dropdown.Menu>
    );
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
              width: "400px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button
                variant="primary"
                className="me-2"
                onClick={() => {
                  setUserRouteList([
                    ...userRouteList,
                    {
                      name: selectedPoint.name,
                      position: selectedPoint.position,
                    },
                  ]);
                }}
              >
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

  //Ruting
  const handleRouteFound = (details) => {
    setRouteDetails({
      distance: details.summary.totalDistance / 1000,
      time: details.summary.totalTime / 60,
    });
  };
  useEffect(() => {
    console.log(routeDetails);
  }, [routeDetails]);
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

      {contextMenuPosition && (
        <CustomContextMenu position={contextMenuPosition} />
      )}

      <AddPointModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        pointPosition={clickedPoint}
      />

      <MapContainer
        center={[50.86605628744675, 20.628193619169046]}
        zoom={14}
        zoomControl={false}
        style={{ height: "calc(-143px + 100vh)", width: "100%" }}
      >
        <ScaleControl imperial={false} />
        <ZoomControl position="bottomleft" />
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
        //Ruting
        <Routing points={userRouteList} onRouteFound={handleRouteFound} />
        <RouteCard
          setUserRouteList={setUserRouteList}
          userRouteList={userRouteList}
          routeDetails={routeDetails}
        />
      </MapContainer>
    </>
  );
};

export default MapComponent;
