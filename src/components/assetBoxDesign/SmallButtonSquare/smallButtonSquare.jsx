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
}) => {
  const { language, homePageDetails } = useContext(AppContext);

  return (
    <Box
      component="button"
      sx={{
        width: width,
        borderRadius: "8px",
        backgroundColor: varientBackgroundColor(
          varient,
          homePageDetails?.vendor_data?.vendor_color
        ),
        padding: "8px",
        height: "35px",
        color: varientColor(
          varient,
          homePageDetails?.vendor_data?.vendor_color
        ),
        fontWeight: "500",
        fontSize: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        whiteSpace: "nowrap",
        border:
          varient === "outline"
            ? `1px solid ${homePageDetails?.vendor_data?.vendor_color}`
            : null,
      }}
      onClick={handleClick}
    >
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default SmallButtonSquare;
