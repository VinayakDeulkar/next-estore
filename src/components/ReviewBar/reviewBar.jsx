import { AppContext } from "@/context/AppContext";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";
import Image from "next/image";
import EstoreBag from "@/SVGs/EstoreBag";
import { motion } from "framer-motion";

const ReviewBar = () => {
  const { cart, homePageDetails } = useContext(AppContext);
  const router = useRouter();
  const [isOverlappingFooter, setIsOverlappingFooter] = useState(false);

  useEffect(() => {
    const buttonEl = document.getElementById("reviewOrderButton");
    const footerEl = document.getElementById("pageFooter");

    if (!buttonEl || !footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry, "entryentry");
        setIsOverlappingFooter(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px 0px -200px 0px",
        // observe when bottom of viewport hits footer
      }
    );

    observer.observe(footerEl);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.8 }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: "100",
          width:
            window.innerWidth > 990
              ? "calc(37.5% - 80px)"
              : "calc(100% - 40px)",
          background: isOverlappingFooter
            ? "rgba(255, 255, 255, 0.6)"
            : homePageDetails?.vendor_data?.vendor_color,
          minHeight: "53px",
          // color: isOverlappingFooter ? "#000" : "#fff",
          borderRadius: "30px",
          padding: "15px 25px",
        }}
        component="button"
        onClick={() => {
          window.innerWidth > 990
            ? router.push("/checkout-desktop")
            : router.push("/review");
        }}
        id="reviewOrderButton"
      >
        <Grid container>
          <Grid
            item
            md={4}
            sm={4}
            lg={4}
            xs={3}
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
                color={isOverlappingFooter ? "#000" : "#fff"}
              />
            </Box>
            <EstoreBag color={isOverlappingFooter ? "#000" : "#fff"} />
          </Grid>
          <Grid item md={4} sm={4} lg={4} xs={5}>
            <SubHeadline
              enText={"Review Order"}
              arText={"مراجعة الطلب"}
              color={isOverlappingFooter ? "#000" : "#fff"}
            />
          </Grid>
          <Grid item md={4} sm={4} lg={4} xs={4} sx={{ textAlign: "end" }}>
            <SubHeadline
              enText={`${
                cart?.subTotal
                  ? Number(cart.subTotal).toLocaleString("en-KW", {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })
                  : "0.000"
              }
               KD`}
              arText={`${
                cart?.subTotal
                  ? Number(cart.subTotal).toLocaleString("en-KW", {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })
                  : "0.000"
              }
               د.ك`}
              color={isOverlappingFooter ? "#000" : "#fff"}
            />
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default ReviewBar;
