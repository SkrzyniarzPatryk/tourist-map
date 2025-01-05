import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ points }) => {
  const instance = L.Routing.control({
    position: "topleft",
    // waypoints: [
    //     {points.map((point, index)) => (
    //         L.latLng({point.position}),
    //     )}
    // ],

  //  waypoints: [L.latLng(52.2297, 21.0122), L.latLng(52.2397, 21.0222), L.latLng(52.2497, 21.0322)],
    lineOptions: {
      styles: [
        {
          color: "#757de8",
        },
      ],
    },
  });

  return instance;
};

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Export
export default RoutingMachine;
