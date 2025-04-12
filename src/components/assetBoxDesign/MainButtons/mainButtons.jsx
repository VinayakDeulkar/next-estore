import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import { useContext } from "react";

const MainButtons = ({ enText, arText, handleClick, varient }) => {
  const { language } = useContext(AppContext);
  return (
    <Box
      component="button"
      sx={{
        width: "182px",
        borderRadius: "9px",
        backgroundColor: varient === "dark" ? "#000" : "#fff",
        padding: "8px",
        height: "40px",
        color: varient === "dark" ? "#fff" : "#000",
        fontWeight: "600",
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleClick}
    >
      {language === "ltr" ? enText : arText}
    </Box>
  );
};

export default MainButtons;
