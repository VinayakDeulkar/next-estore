"use client";
import DeliveryTimeHeader from "@/components/DeliveryTimeHeader/DeliveryTimeHeader";
import DeliveryTimeSelect from "@/components/DeliveryTimeSelect/DeliveryTimeSelect";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const Timing = () => {
  const { homePageDetails, areaDetails } = useContext(AppContext);
  const router = useRouter();

  //   useEffect(() => {
  //     if (areaDetails?.customDelivery && areaDetails?.type != "pickup") {
  //         router.push("/");
  //     }
  //   }, [homePageDetails?.vendor_data, areaDetails]);

  useEffect(() => {
    if (
      homePageDetails?.vendor_data?.snap_pixel_code &&
      homePageDetails?.vendor_data?.snap_pixel_code != ""
    )
      SnapPixel.pageView();
  }, []);

  return (
    <Box>
      <HeaderBox />
      <GridLayout
        backgroundColor={"#fff"}
        padding={"20px"}
        sx={{ height: "calc(100vh - 50px)" }}
      >
        <Box>
          <DeliveryTimeHeader></DeliveryTimeHeader>
          <DeliveryTimeSelect></DeliveryTimeSelect>
        </Box>
      </GridLayout>
    </Box>
  );
};

export default Timing;
