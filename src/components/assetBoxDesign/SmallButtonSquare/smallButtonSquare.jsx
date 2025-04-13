import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const SmallButtonSquare = ({ enText, arText, handleClick, varient }) => {
  const { language, homePageDetails } = useContext(AppContext);

  return (
    <Box
      component="button"
      sx={{
        width: "106px",
        borderRadius: "9px",
        backgroundColor:
          varient === "dark"
            ? homePageDetails?.vendor_data?.vendor_color
            : "#fff",
        padding: "8px",
        height: "35px",
        color: varient === "dark" ? "#fff" : "#000",
        fontWeight: "500",
        fontSize: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleClick}
    >
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default SmallButtonSquare;
