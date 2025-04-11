import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import "./title.css";

const Title = ({ enText, arText }) => {
  const { language } = useContext(AppContext);

  return (
    <Box sx={{ fontSize: "16px", fontWeight: "400" }}>
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default Title;
