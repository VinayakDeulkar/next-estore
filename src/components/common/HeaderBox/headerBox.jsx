import VendorInfoBox from "@/components/HomePage/VendorInfoBox/vendorInfoBox";
import RestSideDrawerContent from "@/components/SideBar/RestSideDrawerContent";
import { Box, Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import Navbar from "../Navbar/navbar";
import ClearIcon from "@mui/icons-material/Clear";
const HeaderBox = ({}) => {
  const [open, setOpen] = useState(false);
  const handleDrawar = () => {
    setOpen(true);
  };
  return (
    <Box sx={{ position: "sticky" }}>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "end",
            padding: "20px",
            right: "20px",
          }}
        >
          <IconButton onClick={() => setOpen(false)}>
            <ClearIcon
              sx={{
                fill: "#000",
              }}
            />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: window.innerWidth < 991 ? "90vw" : "30vw",
          }}
        >
          <VendorInfoBox />
          <RestSideDrawerContent setBurger={setOpen} />
        </Box>
      </Drawer>
      <Navbar handleDrawar={handleDrawar} />
    </Box>
  );
};

export default HeaderBox;
