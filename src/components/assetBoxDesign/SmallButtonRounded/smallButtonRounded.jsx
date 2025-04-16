import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const SmallButtonRounded = ({ enText, arText, handleClick, varient }) => {
  const { language, homePageDetails } = useContext(AppContext);

  const varientColor = () => {
    switch (varient) {
      case "dark":
        return "#fff";

      case "outline":
        return "#000"

      default:
        break;
    }
  };

  const varientBackgroundColor = () => {
    switch (varient) {
      case "dark":
        return `${homePageDetails?.vendor_data?.vendor_color}`;

      default:
        break;
    }
  };

  return (
    <Box
      component="button"
      sx={{
        width: "106px",
        borderRadius: "20px",
        backgroundColor: varientBackgroundColor(),
        padding: "8px",
        height: "35px",
        color: varientColor(),
        fontWeight: "500",
        fontSize: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: varient === "outline" ? `1px solid ${homePageDetails?.vendor_data?.vendor_color}` : null
      }}
      onClick={handleClick}
    >
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default SmallButtonRounded;
