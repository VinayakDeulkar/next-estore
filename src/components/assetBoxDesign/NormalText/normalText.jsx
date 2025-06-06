import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const NormalText = ({
  enText,
  arText,
  color = "#000",
  fontSize = "14px",
  fontWeight = "300",
  isNumber = false,
}) => {
  const { language } = useContext(AppContext);

  return (
    <Box
      sx={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        color: color,
        ...(isNumber && { direction: "ltr", textAlign: language === "ltr" ? "start" : "end" }),
      }}
    >
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default NormalText;
