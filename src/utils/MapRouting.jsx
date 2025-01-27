import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ points, onRouteFound }) => {
  const instance = L.Routing.control({
    position: "topright",
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
    routeWhileDragging: true,
  });

  instance.on("routesfound", function (e) {
    const routes = e.routes[0];
    console.log(routes);
    if (onRouteFound) {
      onRouteFound(routes);
    }
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
