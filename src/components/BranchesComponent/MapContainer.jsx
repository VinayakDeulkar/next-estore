"use client";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRef } from "react";

function MapContainer({ branch }) {
  console.log(branch,"branch")
  const mapRef = useRef(null);

  return (
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
  );
}

export default MapContainer;
