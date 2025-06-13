import { Box } from "@mui/material";
import React, { useContext } from "react";
import NormalText from "../NormalText/normalText";
import { AppContext } from "@/context/AppContext";
import DoneIcon from "@mui/icons-material/Done";
import { motion } from "framer-motion";

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
    <motion.div
      initial={false}
      animate={{
        backgroundColor: selected
          ? homePageDetails?.vendor_data?.vendor_color
          : disabled
          ? "#ced4da"
          : "#fff",
      }}
      transition={{ duration: 0.2 }}
      style={{ borderRadius: "10px" }}
    >
      <Box
        component="button"
        onClick={(e) => {
          if (!disabled) handleClick?.(e);
        }}
        sx={{
          padding: "20px",
          color: selected ? "#fff" : "#000",
          border: selected
            ? `1.5px solid ${homePageDetails?.vendor_data?.vendor_color}`
            : "1.5px solid #AEAEAE",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          alignItems: "start",
          width: "160px",
          height: "160px",
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
              <span>
                {Number(amount).toLocaleString("en-KW", {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                })}
              </span>
            </Box>
          ) : null}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "3px",
              borderRadius: "8px",
              backgroundColor: selected
                ? "#fff"
                : homePageDetails?.vendor_data?.vendor_color,
              padding: "8px 15px",
              marginTop: "10px",
              transition: "width 0.2s ease",
              width: selected ? "110px" : "75px",
            }}
          >
            {selected && (
              <DoneIcon sx={{ color: selected && "#000", fontSize: "18px" }} />
            )}
            <NormalText
              enText={selected ? "Selected" : "Select"}
              arText={selected ? "مختارة" : "يختار"}
              color={selected ? "#000" : "#fff"}
            />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default SquareOptionBox;
