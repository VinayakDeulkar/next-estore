import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const HeadLine = ({ enText, arText, fontSize = "26px" }) => {
  const { language } = useContext(AppContext);
  return (
    <Box sx={{ fontWeight: "400", fontSize: fontSize }}>
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default HeadLine;
