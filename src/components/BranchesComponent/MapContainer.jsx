"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRef } from "react";

function MapContainer({ branch, isLoaded }) {
  const mapRef = useRef(null);

  return isLoaded ? (
    <GoogleMap
      zoom={13}
      center={{
        lat: parseFloat(branch?.lat),
        lng: parseFloat(branch?.lng),
      }}
    >
      <Marker
        position={{
          lat: parseFloat(branch?.lat),
          lng: parseFloat(branch?.lng),
        }}
      />
    </GoogleMap>
  ) : null;
}

export default MapContainer;
