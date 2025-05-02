import VendorInfoBox from "@/components/HomePage/VendorInfoBox/vendorInfoBox";
import RestSideDrawerContent from "@/components/SideBar/RestSideDrawerContent";
import { Box, Drawer, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import Navbar from "../Navbar/navbar";
import ClearIcon from "@mui/icons-material/Clear";
import SocialMedia from "../SocialMedia/socialMedia";
import { AppContext } from "@/context/AppContext";
import { getTNC } from "@/apis/getTNC";
import TermsModal from "@/components/TermsModal/termsModal";

const HeaderBox = ({}) => {
  const [open, setOpen] = useState(false);
  const handleDrawar = () => {
    setOpen(true);
  };
  const { language, vendorSlug, homePageDetails } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [termsData, setTermsData] = useState();

  const handleTermsClick = async () => {
    try {
      const response = await getTNC({
        vendorSlug: vendorSlug?.data?.ecom_url_slug,
        vendors_id: homePageDetails?.vendor_data?.vendors_id,
      });
      console.log(response, "In termsclick");
      if (response.status) {
        setIsOpen(true);
        setTermsData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            overflowX: "hidden",
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
            <SocialMedia handleTermsClick={handleTermsClick} />
            <TermsModal
              isOpen={isOpen}
              handleClose={() => setIsOpen(false)}
              termsData={termsData}
            />
          </div>
        </Box>
      </Drawer>
      <Navbar handleDrawar={handleDrawar} />
    </Box>
  );
};

export default HeaderBox;
