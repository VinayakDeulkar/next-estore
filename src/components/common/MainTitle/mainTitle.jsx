import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React from "react";
import { useContext } from "react";

const MainTitle = ({ enText, arText }) => {
  const { language } = useContext(AppContext);
  return (
    <Box sx={{ fontSize: "26px", fontWeight: "500" }}>
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default MainTitle;
