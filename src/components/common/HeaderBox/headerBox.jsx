import { Box } from "@mui/material";
import Navbar from "../Navbar/navbar";
import MenuDrawer from "../menuDrawer/MenuDrawer";

const HeaderBox = ({ isScrollingUp, hidePadding }) => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <MenuDrawer />
      <Navbar isScrollingUp={isScrollingUp} hidePadding={hidePadding} />
    </Box>
  );
};

export default HeaderBox;
