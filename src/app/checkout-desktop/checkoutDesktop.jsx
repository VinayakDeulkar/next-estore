"use client";
import BackComponent from "@/components/BackComponent";
import DeskCheckoutComponents from "@/components/DeskCheckoutComponents";
import NewOrderProductList from "@/components/NewOrderProductList/NewOrderProductList";
import HeadLine from "@/components/assetBoxDesign/Headline/headLine";
import SubHeadline from "@/components/assetBoxDesign/SubHeadline/subHeadline";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import { AppContext } from "@/context/AppContext";
import { Grid } from "@mui/material";
import { LoadScript, useJsApiLoader } from "@react-google-maps/api";
import { useContext } from "react";

const CheckoutDesktop = () => {
  const { cart } = useContext(AppContext);

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
          sx={{ height: "calc(100vh - 80px)", overflow: "scroll" }}
          className="checkoutScroll"
        >
          <BackComponent />
          <div style={{ marginBottom: "30px" }}>
            <HeadLine enText={"Checkout"} arText={"تفاصيل الطلب"} />
          </div>
          <DeskCheckoutComponents />
        </Grid>
        <Grid item xs={0} sm={0.5}>
          {/* For Aligment */}
        </Grid>
        <Grid item xs={0} sm={3.5}>
          <SubHeadline enText="Items Details" arText="تفاصيل عربة التسوق" />
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
