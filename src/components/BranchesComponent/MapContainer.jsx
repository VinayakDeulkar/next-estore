"use client";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useContext } from "react";
import Spinner from "../common/Spinner/spinner";
import { AppContext } from "@/context/AppContext";

function MapContainer({ branch }) {
  const { homePageDetails } = useContext(AppContext);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });
  if (!isLoaded)
    return (
      <div
        style={{
          width: "100%",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "10",
          boxShadow: "none",
          borderRadius: "20px",
        }}
        className="order-spinner-background"
      >
        <Spinner
          height="50px"
          color={homePageDetails?.vendor_data?.vendor_color}
          size="6px"
        />
      </div>
    );
  return (
    <div>
      {branch?.lat && (
        <GoogleMap
          defaultZoom={13}
          defaultCenter={{
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
      )}
    </div>
  );
}

export default MapContainer;
