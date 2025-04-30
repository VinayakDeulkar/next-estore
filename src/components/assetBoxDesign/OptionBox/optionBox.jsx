import SubTitle from "@/components/common/SubTitle/subTitle";
import { Box } from "@mui/material";
import NormalText from "../NormalText/normalText";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const OptionBox = ({
  enText,
  arText,
  handleClick,
  amount,
  selected,
  disabled,
}) => {
  const { activeBackgroundColor } = useContext(AppContext);

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
        border: selected ? "2px solid #000" : "1.5px solid #AEAEAE",
        height: "40px",
        backgroundColor: selected ? activeBackgroundColor : disabled ? "#ced4da" : "#fff",
        width: "100%",
        borderRadius: "6.38px",
      }}
    >
      <NormalText enText={enText} arText={arText} />
      {amount ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
          <Box>{parseFloat(amount).toFixed(3)}</Box>
          <NormalText enText={"KD"} arText={"د.ك"} />
        </Box>
      ) : null}
    </Box>
  );
};

export default OptionBox;
