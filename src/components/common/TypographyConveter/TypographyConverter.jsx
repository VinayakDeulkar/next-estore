import { AppContext } from "@/context/AppContext";
import { Typography } from "@mui/material";
import React, { useContext } from "react";

const TypographyConverter = ({ sx, arText, enText, ...props }) => {
  const { language } = useContext(AppContext);

  return (
    <Typography
      sx={{
        ...sx,
        fontFamily:
          language === "ltr" ? "SFT Schrifted Sans TRIAL Var" : "Orleen",
      }}
      {...props}
    >
      {language === "ltr" ? enText : arText}
    </Typography>
  );
};

export default TypographyConverter;
