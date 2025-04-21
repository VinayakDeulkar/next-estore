import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const SubTitle = ({ enText, arText }) => {
  const { language } = useContext(AppContext);
  return (
    <Box sx={{ fontSize: "16px", fontWeight: "300" }}>
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default SubTitle;
