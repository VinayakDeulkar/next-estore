import React from "react";
import styles from "./navbar.module.css";
import { Box } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const Navbar = () => {
  const { homePageDetails } = useContext(AppContext);
  console.log(homePageDetails, "homePageDetails");
  return (
    <Box
      sx={{
        backgroundColor: homePageDetails?.vendor_data?.vendor_color,
        height: "50px",
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 999,
        color: "blue",
      }}
    >
      Hello
    </Box>
  );
};

export default Navbar;
