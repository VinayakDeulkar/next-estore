import VendorInfoBox from "@/components/HomePage/VendorInfoBox/vendorInfoBox";
import RestSideDrawerContent from "@/components/SideBar/RestSideDrawerContent";
import { Box, Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import Navbar from "../Navbar/navbar";
import ClearIcon from "@mui/icons-material/Clear";
import SocialMedia from "../SocialMedia/socialMedia";
const HeaderBox = ({}) => {
  const [open, setOpen] = useState(false);
  const handleDrawar = () => {
    setOpen(true);
  };
  return (
    <Box sx={{ position: "sticky" }}>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="left"
        sx={{
          "& .MuiDrawer-paper": {
            borderTopRightRadius: "16px",
            borderBottomRightRadius: "16px",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "end",
            right: "20px",
            "& .MuiIconButton-root": {
              padding: 0,
            },
            marginTop: "40px",
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
          <SocialMedia />
        </Box>
      </Drawer>
      <Navbar handleDrawar={handleDrawar} />
    </Box>
  );
};

export default HeaderBox;
