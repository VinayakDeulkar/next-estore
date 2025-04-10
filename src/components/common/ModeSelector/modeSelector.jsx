import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import styles from "./modeSelector.module.css";

const ModeSelector = () => {
  const {
    language,
    homePageDetails,
    areaDetails,
    handleAreaDetailsChange,
  } = useContext(AppContext);

  return (
    <div
      className={`${styles.tabs} ${
        homePageDetails?.vendor_data?.is_pickup === "1" &&
        homePageDetails?.ecom_url_slug != "alawael-bilingual-school"
          ? areaDetails.type === "delivery"
            ? styles.left
            : styles.right
          : styles.selector_full
      }`}
    >
      {homePageDetails?.ecom_url_slug != "alawael-bilingual-school" ? (
        <div
          className={`${styles.innerTabs} ${
            areaDetails.type === "delivery" ? styles.active : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleAreaDetailsChange?.({
              ...areaDetails,
              type: "delivery",
            });
          }}
        >
          {language === "ltr" ? "Delivery" : "توصيل"}
        </div>
      ) : null}
      {homePageDetails?.vendor_data?.is_pickup === "1" ? (
        <div
          className={`${styles.innerTabs} ${
            areaDetails.type === "pickup" ? styles.active : ""
          } `}
          onClick={(e) => {
            e.preventDefault();

            handleAreaDetailsChange({
              ...areaDetails,
              type: "pickup",
            });
          }}
        >
          {language === "ltr" ? "Pickup" : "استلام"}
        </div>
      ) : null}
    </div>
  );
};

export default ModeSelector;
