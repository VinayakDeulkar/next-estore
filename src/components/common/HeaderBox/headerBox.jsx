import VendorInfoBox from "@/components/HomePage/VendorInfoBox/vendorInfoBox";
import { Box, Drawer } from "@mui/material";
import { useState } from "react";
import Navbar from "../Navbar/navbar";
import RestSideDrawerContent from "@/components/SideBar/RestSideDrawerContent";

const HeaderBox = () => {
  const [open, setOpen] = useState(false);
  const handleDrawar = () => {
    setOpen(true);
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
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
