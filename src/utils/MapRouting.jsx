import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect } from "react";

const createRoutineMachineLayer = ({ points, onRouteFound }) => {
  const instance = L.Routing.control({
    position: "bottomright",
    waypoints: points.map((point) =>
      L.latLng(point.position[0], point.position[1]),
    ),
    lineOptions: {
      styles: [
        {
          color: "#757de8",
        },
      ],
    },
    draggableWaypoints: false,
    show: true,
    addWaypoints: false,
    createMarker: function () {
      return null;
    },
  });

  instance.on("routesfound", function (e) {
    const routes = e.routes[0];
    if (onRouteFound) {
      onRouteFound(routes);
    }
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

const Routing = ({ points, onRouteFound }) => {
  const routeKey = points
    .map((p) => `${p.position[0]},${p.position[1]}`)
    .join("|");

  return (
    <RoutingMachine
      key={routeKey}
      points={points}
      onRouteFound={onRouteFound}
    />
  );
};

export default Routing;
