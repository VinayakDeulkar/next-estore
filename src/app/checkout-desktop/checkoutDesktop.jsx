"use client";
import DeskCheckoutComponents from "@/components/DeskCheckoutComponents";
import NewOrderProductList from "@/components/NewOrderProductList/NewOrderProductList";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import MainTitle from "@/components/common/MainTitle/mainTitle";
import Title from "@/components/common/Title/Title";
import { AppContext } from "@/context/AppContext";
import { Grid } from "@mui/material";
import React, { useContext } from "react";

const CheckoutDesktop = () => {
  const { language } = useContext(AppContext);

  return (
    <>
      <HeaderBox />
      <Grid
        container
        sx={{
          height: "calc(100vh - 80px)",
          padding: "20px",

          width: "100%",
        }}
      >
        <Grid item xs={0} sm={2}>
          {/* For Aligment */}
        </Grid>
        <Grid
          item
          xs={0}
          sm={4}
          sx={{ height: "calc(100vh - 120px)", overflow: "scroll" }}
        >
          <MainTitle enText={"Checkout"} arText={"تفاصيل الطلب"} />
          <DeskCheckoutComponents />
        </Grid>
        <Grid item xs={0} sm={0.5}>
          {/* For Aligment */}
        </Grid>
        <Grid item xs={0} sm={3.5}>
          <Title enText="Items Details" arText="تفاصيل عربة التسوق" />
          <NewOrderProductList />
        </Grid>
        <Grid item xs={0} sm={2}>
          {/* For Aligment */}
        </Grid>
      </Grid>
    </>
  );
};

export default CheckoutDesktop;
