import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./Map.scss";
const MapContainer = () => {
  const mapStyles = {
    height: "36vh",
    width: "30vw",
  };

  const defaultCenter = {
    lat: 40.758701,
    lng: -111.876183,
  };

  return (
    <div className="mapCon">
      <LoadScript googleMapsApiKey="">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={4}
          center={defaultCenter}
        />
      </LoadScript>
    </div>
  );
};

export default MapContainer;
