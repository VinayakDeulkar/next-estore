import { varientBackgroundColor, varientColor } from "@/constants/function";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const SmallButtonSquare = ({
  enText,
  arText,
  handleClick,
  varient,
  width = "106px",
  fontWeight = "500",
  fontSize = "16px",
  height = "35px",
}) => {
  const { language, homePageDetails } = useContext(AppContext);

  return (
    <Box
      component="button"
      sx={{
        width: width,
        borderRadius: "5px",
        backgroundColor: varientBackgroundColor(
          varient,
          homePageDetails?.vendor_data?.vendor_color
        ),
        padding: "8px",
        height: height,
        color: varientColor(
          varient,
          homePageDetails?.vendor_data?.vendor_color
        ),
        fontWeight: fontWeight,
        fontSize: fontSize,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        whiteSpace: "nowrap",
        border:
          varient === "outline"
            ? `1.5px solid rgba(255, 255, 255, 0.75)`
            : null,
      }}
      onClick={handleClick}
    >
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default SmallButtonSquare;
