"use client";
import AreaModal from "@/components/AreaModal/areaModal";
import NormalText from "@/components/assetBoxDesign/NormalText/normalText";
import ModeSelector from "@/components/common/ModeSelector/modeSelector";
import { AppContext } from "@/context/AppContext";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import styles from "./orderType.module.css";
import moment from "moment";
import BottomDrawer from "@/components/BottomDrawer/bottomDrawer";
import { motion, AnimatePresence } from "framer-motion";

const OrderType = () => {
  const { homePageDetails, areaDetails, addressDetails, userDetails } =
    useContext(AppContext);
  const router = useRouter();
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const getBoxValue = () => {
    if (areaDetails?.type === "delivery") {
      return (
        <NormalText
          enText={
            areaDetails?.area === ""
              ? "Select Your Delivery Location"
              : addressDetails?.addressName
              ? `${addressDetails?.addressName}, ${areaDetails.area}`
              : areaDetails.area
          }
          arText={
            areaDetails?.area === ""
              ? "حدد موقع التسليم الخاص بك"
              : addressDetails?.addressName
              ? `${addressDetails?.addressName}, ${areaDetails.ar_area}`
              : areaDetails.ar_area
          }
        />
      );
    } else if (
      homePageDetails?.vendor_data?.is_pickup == 1 &&
      areaDetails.type === "pickup"
    ) {
      return (
        <NormalText
          enText={
            areaDetails?.branch != "" ? areaDetails?.branch : "Select Branch"
          }
          arText={
            areaDetails?.branch != "" ? areaDetails?.ar_branch : "حدد الفرع"
          }
        />
      );
    }
  };

  const getTimeValue = () => {
    if (areaDetails?.now == 1) {
      return {
        enText: `${!areaDetails?.customDelivery ? "Delivery Within" : ""} ${
          areaDetails?.deliveryTiming
        }`,
        arText: `${!areaDetails?.customDelivery ? "التوصيل سيكون خلال" : ""} ${
          areaDetails?.ar_deliveryTiming
        }`,
      };
    } else {
      return {
        enText:
          moment(areaDetails?.laterDeliveryTiming).locale("en").format("DD") +
          " " +
          moment(areaDetails?.laterDeliveryTiming).locale("en").format("MMMM") +
          moment(areaDetails?.laterDeliveryTiming)
            .locale("en")
            .format(", yyyy hh:mm ") +
          moment(areaDetails?.laterDeliveryTiming).locale("en").format("A"),
        arText:
          moment(areaDetails?.laterDeliveryTiming).locale("en").format("DD") +
          " " +
          moment(areaDetails?.laterDeliveryTiming)
            .locale("ar-sa")
            .format("MMMM") +
          moment(areaDetails?.laterDeliveryTiming)
            .locale("en")
            .format(", yyyy hh:mm ") +
          moment(areaDetails?.laterDeliveryTiming).locale("ar-sa").format("A"),
      };
    }
  };

  return (
    <div className={styles.mainDiv}>
      <ModeSelector />
      <Box
        sx={{
          padding: "20px 10px",
          width: "100%",
          border: 0,
          border: "1px solid #aeaeae",
          outline: 0,
          fontSize: "14px",
          color: "#000",
          padding: "4px 10px",
          fontWeight: 400,
          background: "transparent",
          transition: "border-color 0.2s",
          borderRadius: "10px",
          height: "44px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
        component="button"
        onClick={() => {
          if (addressDetails?.addressName) {
            setShowAddress(true);
          } else {
            setShowAreaModal(true);
          }
        }}
      >
        {getBoxValue()}
        <KeyboardArrowDown
          sx={{
            fontSize: 26,
            color: "#000",
          }}
        />
      </Box>
      {areaDetails?.area != "" ? (
        <Box
          component={"button"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!areaDetails?.customDelivery) router.push("/timing");
          }}
          sx={{
            padding: "20px 10px",
            width: "100%",
            border: 0,
            // border: "1px solid #aeaeae",
            outline: 0,
            fontSize: "14px",
            color: "#000",
            padding: "4px 10px",
            fontWeight: 400,
            background: "transparent",
            transition: "border-color 0.2s",
            borderRadius: "10px",
            // height: "44px",
            height: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // backgroundColor: "#fff",
          }}
        >
          <NormalText enText={"Delivery Time"} arText={"وقت التوصيل"} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <NormalText
              enText={getTimeValue().enText}
              arText={getTimeValue().arText}
            />
            {/* <KeyboardArrowDown
              sx={{
                fontSize: 26,
                color: "#000",
              }}
            /> */}
          </Box>
        </Box>
      ) : null}
      <AreaModal
        showAreaModal={showAreaModal}
        handleClose={() => {
          setShowAreaModal(false);
        }}
      />
      {showAddress &&
      userDetails?.address?.length > 0 &&
      areaDetails?.type !== "pickup" ? (
        <BottomDrawer
          type="orderType"
          onClick={() => setShowAddress(false)}
        />
      ) : null}
    </div>
  );
};

export default OrderType;
