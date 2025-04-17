import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const SubHeadline = ({ enText, arText, color = "#000" }) => {
  const { language } = useContext(AppContext);
  return (
    <Box sx={{ fontWeight: "400", fontSize: "16px", color: color }}>
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default SubHeadline;
