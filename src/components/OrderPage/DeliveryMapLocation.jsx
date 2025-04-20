import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";
import React, { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import Spinner from "../common/Spinner/spinner";

const DeliveryMapLocation = ({ startLat, startLng, endLat, endLng }) => {
  const [direction, setDirection] = useState(null);
  const [stopREload, setstopREload] = useState("DRIVING");
  const { homePageDetails } = useContext(AppContext);
  const coordinates = [
    { lat: Number(startLat), lng: Number(startLng) },
    { lat: Number(endLat), lng: Number(endLng) },
  ];
  setTimeout(() => {
    setstopREload("");
  }, 4000);
  const center = { lat: Number(endLat), lng: Number(endLng) };
  const directionsOptions = {
    destination: { lat: Number(endLat), lng: Number(endLng) },
    origin: { lat: Number(startLat), lng: Number(startLng) },
    travelMode: stopREload,
  };

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirection(response);
      } else {
        console.log("Directions request failed:", response.status);
      }
    }
  };
  return (
    <>
      {coordinates && center && directionsOptions ? (
        <LoadScript
          googleMapsApiKey={"AIzaSyDK_1lc7uLQSGYHVpr0mGl-c1Zys2OPOdg"}
        >
          <GoogleMap
            className={`map-border-new ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme-border"
            }`}
            mapContainerStyle={{
              height: "300px",
              width: "100%",
              marginTop: "27px",
              borderRadius:
                homePageDetails?.vendor_data?.home_page_type === "18"
                  ? "0"
                  : "19px",
            }}
            zoom={13}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            <DirectionsService
              options={directionsOptions}
              callback={directionsCallback}
            />
            {direction && <DirectionsRenderer directions={direction} />}
          </GoogleMap>
        </LoadScript>
      ) : (
        <div
          style={{
            width: "100%",
            height: "299px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "8",
          }}
          className="order-spinner-background"
        >
          <Spinner
            height="50px"
            color={homePageDetails?.vendor_data?.vendor_color}
            size="6px"
          />
        </div>
      )}
    </>
  );
};

export default DeliveryMapLocation;
