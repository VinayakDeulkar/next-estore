import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const SubHeadline = ({ enText, arText }) => {
  const { language } = useContext(AppContext);
  return (
    <Box sx={{ fontWeight: "400", fontSize: "16px" }}>
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default SubHeadline;
