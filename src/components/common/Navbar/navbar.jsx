import React from "react";
import styles from "./navbar.module.css";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import TypographyConverter from "../TypographyConveter/TypographyConverter";
const Navbar = ({ handleDrawar }) => {
  const { homePageDetails, language } = useContext(AppContext);
  console.log(homePageDetails, "homePageDetails");
  return (
    <Box
      sx={{
        backgroundColor: homePageDetails?.vendor_data?.vendor_color,
        height: "50px",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
        color: "blue",
      }}
    >
      <Grid container>
        <Grid item xs={false} sm={3} md={3}></Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{ position: "relative" }}
          container
        >
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            sx={{
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <IconButton color="#fff" onClick={handleDrawar}>
              <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            sx={{
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={30}
              height={30}
              src={
                language == "ltr"
                  ? homePageDetails?.vendor_data?.english_new_background
                  : homePageDetails?.vendor_data?.arabic_new_background
              }
              alt={
                language == "ltr"
                  ? homePageDetails?.vendor_data?.name
                  : homePageDetails?.vendor_data?.name_ar
              }
            />
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            sx={{
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              padding: "8px",
            }}
          >
            <Button
              variant="outlined"
              sx={{ borderRadius: "30px", borderColor: "#fff" }}
            >
              <Typography
                sx={{
                  fontSize: language === "ltr" ? "12px" : "10px",
                  color: "#fff",
                  fontFamily:
                    language === "ltr"
                      ? "Orleen"
                      : "SFT Schrifted Sans TRIAL Var",
                }}
              >
                {language === "ltr" ? "عربي" : "color"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={false} sm={3} md={3}></Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
