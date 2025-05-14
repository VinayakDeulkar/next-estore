"use client";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 19.076, // Default center (Mumbai)
  lng: 72.8777,
};

const GoogleMapComponent = ({ lat, lng }) => {
  const onMapClick = useCallback((event) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
    }
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      }}
      zoom={{ lat, lng } ? 15 : 5}
      onClick={onMapClick}
    >
      {{
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      } && (
        <Marker
          position={{
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          }}
        />
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
