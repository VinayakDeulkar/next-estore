"use client";
import { AppContext } from "@/context/AppContext";
import React, { useContext, useEffect } from "react";

const CheckOut = () => {
  const { vendorSlug, homePageDetails } = useContext(AppContext);

  return <div>CheckOut</div>;
};

export default CheckOut;
