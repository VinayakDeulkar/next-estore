"use client";
import { LoadScript } from "@react-google-maps/api";
import "../../components/NewOrderDetailsPage/checkOrderDetails.css";
import MobileCheckOut from "@/components/MobileCheckout/mobileCheckOut";
import React from "react";

const CheckOut = () => {
  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyDK_1lc7uLQSGYHVpr0mGl-c1Zys2OPOdg"}
      libraries={["places"]}
    >
      <MobileCheckOut />
    </LoadScript>
  );
};

export default CheckOut;
