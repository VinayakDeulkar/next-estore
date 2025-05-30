import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import "./textInputField.css";

const TextInputField = ({
  value,
  handleChange,
  name,
  label,
  arLabel,
  color = "#000",
  fontWeight = "400",
}) => {
  const { language } = useContext(AppContext);
  return (
    <Box
      sx={{
        position: "relative",
        height: "65px",
        display: "flex",
        alignItems: "end",
        width: "100%",
      }}
    >
      <input
        type="text"
        placeholder=""
        className="text-field-input"
        id={name}
        name={name}
        required="true"
        autoComplete
        value={value}
        onChange={handleChange}
        style={{ fontWeight: fontWeight }}
      />
      <label
        htmlFor={name}
        className="text-field-label"
        style={{ color: color, fontWeight: fontWeight, position: "absolute" }}
      >
        {language == "ltr" ? label : arLabel}
      </label>
    </Box>
  );
};

export default TextInputField;
