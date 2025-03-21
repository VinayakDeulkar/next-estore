"use client";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import CarosouleImage from "@/components/HomePage/CarosouleImage/CarosouleImage";
import OrderType from "@/components/HomePage/OrderType/orderType";
import VendorInfoBox from "@/components/HomePage/VendorInfoBox/vendorInfoBox";
import HomePageLayouts from "@/components/HomePageLayouts";
import { AppContext } from "@/context/AppContext";
import { Box, Grid } from "@mui/material";
import { useContext } from "react";

const Homepage = () => {
  const { vendorSlug, homePageDetails } = useContext(AppContext);

  return (
    <>
      {homePageDetails?.vendor_data && <HeaderBox />}
      <Grid
        container
        sx={{
          marginTop: "50px",
          backgroundColor: "#fff",
        }}
      >
        <Grid item xs={false} sm={2} md={2}></Grid>

        <Grid item xs={12} sm={8} md={8} sx={{ position: "relative" }}>
          {homePageDetails?.vendor_data && (
            <>
              <CarosouleImage />
              <VendorInfoBox />
              {/* <Box sx={{ marginBottom: "20px" }}>
                <OrderType />
              </Box> */}
            </>
          )}
          <Box>
            <HomePageLayouts homePageDetails={homePageDetails} />
          </Box>
        </Grid>

        <Grid item xs={false} sm={2} md={2}></Grid>
      </Grid>
    </>
  );
};

export default Homepage;
