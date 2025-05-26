import SubTitle from "@/components/common/SubTitle/subTitle";
import { Box } from "@mui/material";
import NormalText from "../NormalText/normalText";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import DoneIcon from "@mui/icons-material/Done";

const OptionBox = ({
  enText,
  arText,
  handleClick,
  amount,
  selected,
  disabled,
}) => {
  const { homePageDetails, language } = useContext(AppContext);

  return (
    <Box
      component="button"
      onClick={(e) => {
        if (!disabled) handleClick?.(e);
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        border: "1.5px solid #AEAEAE",
        height: "40px",
        backgroundColor: selected
          ? homePageDetails?.vendor_data?.vendor_color
          : disabled
          ? "#ced4da"
          : "#fff",
        color: selected ? "#fff" : "#000",
        width: "100%",
        borderRadius: "6.38px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <NormalText
          enText={enText}
          arText={arText}
          color={selected ? "#fff" : "#000"}
        />
        {selected && (
          <DoneIcon
            sx={{
              color: selected && "#fff",
              fontSize: "18px",
              marginTop: "-3px",
            }}
          />
        )}
      </Box>
      {amount ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
          {language === "rtl" ? "د.ك" : "KD"}{" "}
          <span>{parseFloat(amount).toFixed(3)}</span>
        </Box>
      ) : null}
    </Box>
  );
};

export default OptionBox;
