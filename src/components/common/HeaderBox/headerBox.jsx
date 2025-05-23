import { Box} from "@mui/material";
import Navbar from "../Navbar/navbar";
import MenuDrawer from "../MenuDrawer/menuDrawer";

const HeaderBox = () => {
  return (
    <Box sx={{ position: "sticky" }}>
      <MenuDrawer />
      <Navbar />
    </Box>
  );
};

export default HeaderBox;
