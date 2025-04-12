import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext } from "react";
import "./textInputField.css";

const TextInputField = ({ value, handleChange, name, label, arLabel }) => {
  const { language } = useContext(AppContext);
  return (
    <Box
      sx={{
        position: "relative",
        height: "65px",
        display: "flex",
        alignItems: "end",
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
      />
      <label htmlFor={name} className="text-field-label">
        {language == "ltr" ? label : arLabel}
      </label>
    </Box>
  );
};

export default TextInputField;
