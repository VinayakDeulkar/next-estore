import SubTitle from "@/components/common/SubTitle/subTitle";
import { Box } from "@mui/material";

const OptionBox = ({
  enText,
  arText,
  handleClick,
  amount,
  selected,
  disabled,
}) => {
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
        backgroundColor: selected ? "#F2F2F2" : disabled ? "#ced4da" : "#fff",
        width: "100%",
        borderRadius: "6.38px",
      }}
    >
      <SubTitle enText={enText} arText={arText} />
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
          <SubTitle enText={"KD"} arText={"د.ك"} />
        </Box>
      ) : null}
    </Box>
  );
};

export default OptionBox;
