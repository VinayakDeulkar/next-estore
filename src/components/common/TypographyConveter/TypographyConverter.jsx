import { AppContext } from "@/context/AppContext";
import { Typography } from "@mui/material";
import React, { useContext } from "react";

const TypographyConverter = ({sx, ar_text, en_text, ...props}) => {
  const { language } = useContext(AppContext);
  return (
    <Typography
      sx={{ ...sx, fontFamily: language === "ltr" ? "SFT Schrifted Sans TRIAL Var" : "Orleen" }}
      {...props}
    >
      {language === "ltr" ? en_text : ar_text}
    </Typography>
  );
};

export default TypographyConverter;
