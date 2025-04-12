import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const HeadLine = ({ enText, arText }) => {
  const { language } = useContext(AppContext);
  return (
    <Box sx={{ fontWeight: "500", fontSize: "26px" }}>
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default HeadLine;
