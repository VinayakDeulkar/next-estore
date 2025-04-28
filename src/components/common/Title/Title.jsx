import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import "./title.css";
import { Box } from "@mui/material";

const Title = ({ enText, arText, fontWeight = "400" }) => {
  const { language } = useContext(AppContext);

  return (
    <Box sx={{ fontSize: "16px", fontWeight: fontWeight }}>
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default Title;
