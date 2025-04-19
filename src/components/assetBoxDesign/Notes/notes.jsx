import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const Notes = ({ enText, arText, color }) => {
  const { language } = useContext(AppContext);

  return (
    <Box sx={{ fontWeight: "300", fontSize: "12px", color: color }}>
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default Notes;
