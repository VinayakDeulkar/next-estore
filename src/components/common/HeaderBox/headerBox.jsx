import { Box } from "@mui/material";
import Navbar from "../Navbar/navbar";
import MenuDrawer from "../MenuDrawer/menuDrawer";

const HeaderBox = ({ isScrollingUp }) => {
  return (
    <Box sx={{ position: "sticky" }}>
      <MenuDrawer />
      <Navbar isScrollingUp={isScrollingUp} />
    </Box>
  );
};

export default HeaderBox;
