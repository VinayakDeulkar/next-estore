"use client";
import React, { useContext, useState } from "react";
import "./trackorder.css";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState();
  const { language } = useContext(AppContext);
  const router = useRouter();
  const handleSubmit = () => {
    if (trackingNumber) {
      router.push(`/order=${trackingNumber}`);
    }
  };
  return (
    <Box>
      <HeaderBox />
      <GridLayout>
        <div className="trackOrder-whitebox">
          <div style={{ padding: "30px 20px" }}>
            <div className="tracker-order-center order-tracker-text">
              {language === "ltr" ? "Orders Tracker" : "تعقب الطلبات"}
            </div>
            <div className="tracker-order-center order-tracker-image">
              <img
                src="images/delivery-packed-image.jpg"
                className="trackorder-image"
              />
            </div>

            <div className="tracker-order-center shipment-tracker-text">
              {language === "ltr"
                ? "Track shipments and orders by entering the tracking number."
                : "تتبع الشحنات والطلبات عن طريق إدخال رقم التتبع."}
            </div>
            <div className="tracker-order-center">
              <div className="track-divider-line"></div>
            </div>
            <div className="tracker-order-center">
              <input
                type="text"
                onChange={(e) => {
                  setTrackingNumber(e.target.value);
                }}
                className="order-tracker-input-field"
                placeholder={
                  language === "ltr"
                    ? "Tracking Number Goes Here"
                    : "ضع رقم الطلب هنا لتتبعه"
                }
              />
            </div>
            <div className="tracker-order-center order-tracker-input-div">
              <button
                className="order-tracker-input-button"
                onClick={handleSubmit}
              >
                {language === "ltr" ? "Track" : "تتبع الطلب"}
              </button>
            </div>
          </div>
        </div>
      </GridLayout>
    </Box>
  );
};

export default TrackOrder;
