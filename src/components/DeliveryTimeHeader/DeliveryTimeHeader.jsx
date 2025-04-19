import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import BackButton from "../common/BackButton/BackButton";
import { Box } from "@mui/material";

function DeliveryTimeHeader() {
  const router = useRouter();
  const { language, areaDetails } = useContext(AppContext);

  return (
    <Box sx={{ position: "relative", height: "76px" }}>
      <BackButton
        variant="dark"
        arabic_title={
          areaDetails?.type == "delivery" ? "وقت التوصيل" : "وقت الاستلام"
        }
        english_title={
          areaDetails?.type == "delivery" ? "Delivery Time" : "Pickup Time"
        }
      />
    </Box>
  );
}

export default DeliveryTimeHeader;
