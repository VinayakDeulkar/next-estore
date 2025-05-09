"use client";
import VendorBox from "@/components/assetBoxDesign/vendorBox/vendorBox";
import BottomDrawer from "@/components/BottomDrawer/bottomDrawer";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import EstoreLayout2 from "@/components/EstoreLayouts/estoreLayout2";
import CarouselImage from "@/components/HomePage/CarosouleImage/carosouleImage";
import HomePageLayouts from "@/components/HomePageLayouts";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import { useContext } from "react";

const Homepage = () => {
  const {
    homePageDetails,
    areaDetails,
    userDetails,
    internationalDelivery,
    addressDetails,
  } = useContext(AppContext);
  console.log(homePageDetails, "homePageDetails");

  const checkDrawer = () =>
    homePageDetails?.vendor_data &&
    userDetails?.address?.length > 0 &&
    areaDetails?.data?.governarate &&
    !addressDetails?.id &&
    (homePageDetails?.vendor_data?.international_delivery === "3" ||
      homePageDetails?.vendor_data?.international_delivery === "" ||
      internationalDelivery.delivery_country.toLowerCase() === "kuwait") &&
    areaDetails?.type !== "pickup";

  const estoreLayout = () => {
    switch (homePageDetails?.estoreLayout) {
      case "1":
        return (
          <EstoreLayout1>
            <Box
              sx={{
                position: "relative",
              }}
            >
              {window?.innerWidth < 991 ? (
                <Box sx={{ direction: "ltr", margin: "0 -22px" }}>
                  <CarouselImage mobile={true} />
                </Box>
              ) : null}
              {checkDrawer() ? <BottomDrawer type={"home"} /> : null}
              <VendorBox />
              <HomePageLayouts />
            </Box>
          </EstoreLayout1>
        );

      case "2":
        return <EstoreLayout2 />;

      default:
        break;
    }
  };

  return estoreLayout();
};

export default Homepage;
