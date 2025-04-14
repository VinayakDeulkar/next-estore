"use client";
import { AppContext } from "@/context/AppContext";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useContext, useRef } from "react";

function MapContainer({ branch }) {
  const { homePageDetails } = useContext(AppContext);
  const mapRef = useRef(null);
  return (
    <div>
      {branch?.lat && (
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
        >
          <GoogleMap
            defaultZoom={13}
            defaultCenter={{
              lat: parseFloat(branch?.lat),
              lng: parseFloat(branch?.lng),
            }}
            onLoad={(map) => (mapRef.current = map)}
          >
            <Marker
              position={{
                lat: parseFloat(branch?.lat),
                lng: parseFloat(branch?.lng),
              }}
            />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
}

export default MapContainer;
