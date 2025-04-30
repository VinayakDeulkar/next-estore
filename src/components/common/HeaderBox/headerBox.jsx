import VendorInfoBox from "@/components/HomePage/VendorInfoBox/vendorInfoBox";
import RestSideDrawerContent from "@/components/SideBar/RestSideDrawerContent";
import { Box, Drawer, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import Navbar from "../Navbar/navbar";
import ClearIcon from "@mui/icons-material/Clear";
import SocialMedia from "../SocialMedia/socialMedia";
import { AppContext } from "@/context/AppContext";
const HeaderBox = ({}) => {
  const [open, setOpen] = useState(false);
  const handleDrawar = () => {
    setOpen(true);
  };
  const { language } = useContext(AppContext);

  return (
    <Box sx={{ position: "sticky" }}>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor={language === "ltr" ? "left" : "right"}
        sx={{
          "& .MuiDrawer-paper": {
            borderTopRightRadius: language === "ltr" ? "16px" : 0,
            borderBottomRightRadius: language === "ltr" ? "16px" : 0,
            borderTopLeftRadius: language === "ltr" ? 0 : "16px",
            borderBottomLeftRadius: language === "ltr" ? 0 : "16px",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "end",
            right: language === "ltr" ? "20px" : 0,
            left: language === "ltr" ? 0 : "20px",
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
            minHeight: "100vh",
            overflowX: "hidden"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              gap: "20px",
            }}
          >
            <Box>
              <VendorInfoBox />
              <RestSideDrawerContent setBurger={setOpen} />
            </Box>
            <SocialMedia />
          </div>
        </Box>
      </Drawer>
      <Navbar handleDrawar={handleDrawar} />
    </Box>
  );
};

export default HeaderBox;
