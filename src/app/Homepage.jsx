"use client";
import VendorBox from "@/components/assetBoxDesign/vendorBox/vendorBox";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import EstoreLayout2 from "@/components/EstoreLayouts/estoreLayout2";
import CarouselImage from "@/components/HomePage/CarosouleImage/carosouleImage";
import HomePageLayouts from "@/components/HomePageLayouts";
import { AppContext } from "@/context/AppContext";
import { Box, Grid } from "@mui/material";
import { useContext } from "react";

const Homepage = () => {
  const { homePageDetails } = useContext(AppContext);

  const estoreLayout = () => {
    switch (homePageDetails?.estoreLayout) {
      case "1":
        return (
          <EstoreLayout1>
            <Box>
              {window?.innerWidth < 600 ? <CarouselImage /> : null}
              <VendorBox />
              <HomePageLayouts homePageDetails={homePageDetails} />
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
