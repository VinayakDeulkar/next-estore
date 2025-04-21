import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const SubHeadline = ({
  enText,
  arText,
  color = "#000",
  fontWeight = "400",
}) => {
  const { language } = useContext(AppContext);
  return (
    <Box sx={{ fontWeight: fontWeight, fontSize: "16px", color: color }}>
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default SubHeadline;
