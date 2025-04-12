import SubTitle from "@/components/common/SubTitle/subTitle";
import { Box } from "@mui/material";

const OptionBox = ({ enText, arText, handleClick, amount, selected }) => {
  return (
    <Box
      component="button"
      onClick={() => handleClick?.()}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        border: "1.5px solid #AEAEAE",
        height: "40px",
        backgroundColor: selected ? "#F2F2F2" : "#fff",
        width: "100%",
        borderRadius: "6.38px",
      }}
    >
      <SubTitle enText={enText} arText={arText} />
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
        <SubTitle enText={"KD"} arText={"د.ك"} />
      </Box>
    </Box>
  );
};

export default OptionBox;
