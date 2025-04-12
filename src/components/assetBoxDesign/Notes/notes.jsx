import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";

const Notes = ({ enText, arText }) => {
  const { language } = useContext(AppContext);

  return (
    <Box sx={{ fontWeight: "300", fontSize: "12px" }}>
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default Notes;
