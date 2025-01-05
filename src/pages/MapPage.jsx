import React from "react";
import MapComponent from "../components/MapComponent";

function MapPage({ pointsOfInterest }) {
  return (
    <>
      <div>
        <MapComponent points={pointsOfInterest} />
      </div>
    </>
  );
}

export default MapPage;