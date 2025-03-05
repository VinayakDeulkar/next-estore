"use client";
import HomePageLayouts from "@/components/HomePageLayouts";
import SquareCard from "@/components/SquareCard/squareCard";
import Navbar from "@/components/common/Navbar/navbar";
import TypographyConverter from "@/components/common/TypographyConveter/typographyConverter";
import { AppContext } from "@/context/AppContext";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useEffect } from "react";

const Homepage = () => {
  const { vendorSlug, homePageDetails } = useContext(AppContext);
  console.log(homePageDetails, "homePageDetails")

  return (
    <>
      <Navbar />

      <Grid container>
        <Grid item xs={false} sm={3} md={3}></Grid>

        <Grid item xs={12} sm={6} md={6}>
          <HomePageLayouts homePageDetails={homePageDetails} />
        </Grid>

        <Grid item xs={false} sm={3} md={3}></Grid>
      </Grid>
    </>
  );
};

export default Homepage;
