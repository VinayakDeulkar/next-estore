import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const NormalText = ({ enText, arText, color = "#000", fontSize = "14px" }) => {
  const { language } = useContext(AppContext);

  return (
    <Box sx={{ fontWeight: "300", fontSize: fontSize, color: color }}>
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default NormalText;
