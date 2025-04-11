"use client";
import NewOrderProductList from "@/components/NewOrderProductList/NewOrderProductList";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import { AppContext } from "@/context/AppContext";
import { Grid } from "@mui/material";
import React, { useContext } from "react";

const CheckoutDesktop = () => {
  const { language } = useContext(AppContext);

  return (
    <>
      <HeaderBox />
      <Grid container>
        <Grid item xs={0} sm={2}></Grid>
        <Grid item xs={0} sm={3.5}>
          
        </Grid>
        <Grid item xs={0} sm={1}></Grid>
        <Grid item xs={0} sm={3.5}>
          <div
            className="checkoutPageText"
            style={{ marginTop: "5px", marginBottom: "10px" }}
          >
            {language === "ltr" ? "Items Details" : "تفاصيل عربة التسوق"}
          </div>
          <NewOrderProductList />
        </Grid>
        <Grid item xs={0} sm={2}></Grid>
      </Grid>
    </>
  );
};

export default CheckoutDesktop;
