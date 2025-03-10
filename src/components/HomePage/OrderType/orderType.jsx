import { AppContext } from "@/context/AppContext";
import { Box, Card, Tab, Tabs } from "@mui/material";
import React, { useContext } from "react";
import styles from "./orderTyep.module.css";
import { useState } from "react";

const OrderType = () => {
  const {
    language,
    homePageDetails,
    areaDetails,
    handleHomeAreaDetailsChange,
  } = useContext(AppContext);

  return (
    <Box sx={{ padding: "10px 0" }}>
      <Card sx={{ boxShadow: "none", padding: "10px", borderRadius: "8px" }}>
        <Box
          className={`${styles.modeSelector_tabsNew} ${
            homePageDetails?.vendor_data?.is_pickup === "1" &&
            homePageDetails?.ecom_url_slug != "alawael-bilingual-school"
              ? areaDetails.type === "delivery"
                ? styles.left
                : styles.right
              : styles.selector_full
          }`}
        >
          {homePageDetails?.ecom_url_slug != "alawael-bilingual-school" && (
            <Box
              className={`${styles.modeSelector_insidetabsNew} ${
                areaDetails.type === "delivery" ? styles.active : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleHomeAreaDetailsChange({
                  ...areaDetails,
                  type: "delivery",
                });
              }}
            >
              {language === "ltr" ? "Delivery" : "توصيل"}
            </Box>
          )}
          {homePageDetails?.vendor_data?.is_pickup === "1" ? (
            <Box
              className={`${styles.modeSelector_insidetabsNew} ${
                areaDetails.type === "pickup" ? styles.active : ""
              } `}
              onClick={(e) => {
                e.preventDefault();
                handleHomeAreaDetailsChange({
                  ...areaDetails,
                  type: "pickup",
                });
              }}
            >
              {language === "ltr" ? "Pickup" : "استلام"}
            </Box>
          ) : null}
        </Box>
      </Card>
    </Box>
  );
};

export default OrderType;
