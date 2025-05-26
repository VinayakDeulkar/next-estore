import { Box } from "@mui/material";
import React, { useContext } from "react";
import NormalText from "../NormalText/normalText";
import { AppContext } from "@/context/AppContext";
import DoneIcon from "@mui/icons-material/Done";

const SquareOptionBox = ({
  enText,
  arText,
  handleClick,
  amount,
  selected,
  disabled,
}) => {
  const { language, homePageDetails } = useContext(AppContext);

  return (
    <Box
      component="button"
      onClick={(e) => {
        if (!disabled) handleClick?.(e);
      }}
      sx={{
        padding: "20px",
        backgroundColor: selected
          ? homePageDetails?.vendor_data?.vendor_color
          : disabled
          ? "#ced4da"
          : "#fff",
        color: selected ? "#fff" : "#000",
        border: "1.5px solid #AEAEAE",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        alignItems: "start",
        width: "47%",
      }}
    >
      <NormalText
        enText={enText}
        arText={arText}
        color={selected && "#fff"}
        fontSize="18px"
        fontWeight="400"
      />
      <Box>
        {amount ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "15px",
              fontWeight: "400",
            }}
          >
            {language === "rtl" ? "د.ك" : "KD"}{" "}
            <span>{parseFloat(amount).toFixed(3)}</span>
          </Box>
        ) : null}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "3px",
            borderRadius: "8px",
            backgroundColor: selected ? "#fff" : "#000",
            padding: "8px 15px",
            marginTop: "10px",
          }}
        >
          {selected && (
            <DoneIcon sx={{ color: selected && "#000", fontSize: "18px" }} />
          )}
          <NormalText
            enText={selected ? "Selected" : "Choose"}
            arText={selected ? "مختارة" : "يختار"}
            color={selected ? "#000" : "#fff"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SquareOptionBox;
