"use client";
import MobileCheckOut from "@/components/MobileCheckout/mobileCheckOut";
import { useJsApiLoader } from "@react-google-maps/api";
import "../../components/NewOrderDetailsPage/checkOrderDetails.css";

const CheckOut = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      "https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=AIzaSyDK_1lc7uLQSGYHVpr0mGl-c1Zys2OPOdg", // Replace with your Google Maps API key
  });
  return <MobileCheckOut />;
};

export default CheckOut;
