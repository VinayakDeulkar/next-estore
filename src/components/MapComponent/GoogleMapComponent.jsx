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

const GoogleMapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  const [marker, setMarker] = useState(null);

  const onMapClick = useCallback((event) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
    }
  }, []);

  if (!isLoaded) return <p>Loading Maps...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={marker || center}
      zoom={marker ? 15 : 5}
      onClick={onMapClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
