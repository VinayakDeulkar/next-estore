import { Box, Drawer, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import VendorInfoBox from "@/components/HomePage/VendorInfoBox/vendorInfoBox";
import RestSideDrawerContent from "@/components/SideBar/RestSideDrawerContent";
import SocialMedia from "../SocialMedia/socialMedia";
import TermsModal from "@/components/TermsModal/termsModal";
import { AppContext } from "@/context/AppContext";

const MenuDrawer = () => {
  const {
    language,
    vendorSlug,
    homePageDetails,
    sideMenuDrawer,
    handleSideMenuDrawer,
  } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [termsData, setTermsData] = useState();

  const handleTermsClick = async () => {
    try {
      const response = await getTNC({
        vendorSlug: vendorSlug?.data?.ecom_url_slug,
        vendors_id: homePageDetails?.vendor_data?.vendors_id,
      });
      if (response.status) {
        setIsOpen(true);
        setTermsData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      open={sideMenuDrawer}
      onClose={() => handleSideMenuDrawer(false)}
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
        <IconButton onClick={() => handleSideMenuDrawer(false)}>
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
            <RestSideDrawerContent />
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
  );
};

export default MenuDrawer;
