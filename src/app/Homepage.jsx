"use client";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import HomePageLayouts from "@/components/HomePageLayouts";
import { AppContext } from "@/context/AppContext";
import { Grid } from "@mui/material";
import { useContext } from "react";

const Homepage = () => {
  const { vendorSlug, homePageDetails } = useContext(AppContext);
  console.log(homePageDetails, "homePageDetails");

  return (
    <>
      <Grid container>
        <Grid item xs={false} sm={3} md={3}></Grid>

        <Grid item xs={12} sm={6} md={6}>
          <HeaderBox />
          <HomePageLayouts homePageDetails={homePageDetails} />
        </Grid>

        <Grid item xs={false} sm={3} md={3}></Grid>
      </Grid>
    </>
  );
};

export default Homepage;
