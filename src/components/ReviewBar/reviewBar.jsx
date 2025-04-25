import { AppContext } from "@/context/AppContext";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";
import Image from "next/image";
import EstoreBag from "@/SVGs/EstoreBag";

const ReviewBar = () => {
  const { cart, homePageDetails } = useContext(AppContext);
  const router = useRouter();
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: "100",
        width:
          window.innerWidth > 990 ? "calc(37.5% - 80px)" : "calc(100% - 40px)",
        background: homePageDetails?.vendor_data?.vendor_color,
        minHeight: "53px",
        color: "#fff",
        borderRadius: "30px",
        padding: "15px 25px",
      }}
      component="button"
      onClick={() => {
        window.innerWidth > 990
          ? router.push("/checkout-desktop")
          : router.push("/review");
      }}
    >
      <Grid container>
        <Grid
          item
          md={4}
          sm={4}
          lg={4}
          xs={4}
          sx={{
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              width: "20px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <SubHeadline
              enText={cart?.cartCount}
              arText={cart?.cartCount}
              color="#fff"
            />
          </Box>
          <EstoreBag />
        </Grid>
        <Grid item md={4} sm={4} lg={4} xs={4}>
          <SubHeadline
            enText={"Review Order"}
            arText={"مراجعة الطلب"}
            color="#fff"
          />
        </Grid>
        <Grid item md={4} sm={4} lg={4} xs={4} sx={{ textAlign: "end" }}>
          <SubHeadline
            enText={`${
              cart?.subTotal ? parseFloat(cart?.subTotal).toFixed(3) : 0
            } KD`}
            arText={`${
              cart?.subTotal ? parseFloat(cart?.subTotal).toFixed(3) : 0
            } د.ك`}
            color="#fff"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewBar;
