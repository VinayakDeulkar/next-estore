"use client";
import DeliveryTimeHeader from "@/components/DeliveryTimeHeader/DeliveryTimeHeader";
import DeliveryTimeSelect from "@/components/DeliveryTimeSelect/DeliveryTimeSelect";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

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
      <EstoreLayout1>
        <Box sx={{ height: "calc(100vh - 56px)", position: "relative" }}>
          <DeliveryTimeHeader></DeliveryTimeHeader>
          <DeliveryTimeSelect></DeliveryTimeSelect>
        </Box>
      </EstoreLayout1>
    </Box>
  );
};

export default Timing;
