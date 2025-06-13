"use client";
import VendorBox from "@/components/assetBoxDesign/vendorBox/vendorBox";
import BottomDrawer from "@/components/BottomDrawer/bottomDrawer";
import CarouselImage from "@/components/HomePage/CarosouleImage/carosouleImage";
import HomePageLayouts from "@/components/HomePageLayouts";
import { AppContext } from "@/context/AppContext";
import { Box, Fab } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import BurgerIcon from "@/SVGs/BurgerIcon";
import MenuDrawer from "@/components/common/MenuDrawer/menuDrawer";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import { motion } from "framer-motion";

const Homepage = () => {
  const {
    homePageDetails,
    areaDetails,
    userDetails,
    internationalDelivery,
    addressDetails,
    language,
    handleSideMenuDrawer,
    handleLanguageChange,
  } = useContext(AppContext);
  const scrollRef = useRef(null);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const checkDrawer = () =>
    homePageDetails?.vendor_data &&
    userDetails?.address?.length > 0 &&
    areaDetails?.data?.governarate &&
    !addressDetails?.id &&
    (homePageDetails?.vendor_data?.international_delivery === "3" ||
      homePageDetails?.vendor_data?.international_delivery === "" ||
      internationalDelivery.delivery_country.toLowerCase() === "kuwait") &&
    areaDetails?.type !== "pickup";

  const checkSize = () => {
    return window != undefined && window?.innerWidth > 990;
  };

  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;
    const top = scrollRef.current.getBoundingClientRect();
    console.log(scrollTop, "scrollTop");

    if (top < 0) {
      setIsScrollingUp(true); // User is scrolling up
    } else {
      setIsScrollingUp(false); // User is scrolling down
    }

    setLastScrollTop(scrollTop);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <Box
      sx={{
        width: "100vw",
      }}
    >
      <Box sx={checkSize() ? { width: "37.5%" } : {}}>
        {checkSize() && <HeaderBox isScrollingUp={isScrollingUp} />}
        <Box
          sx={{
            padding: checkSize() ? "0 40px" : "0 20px",
            width: checkSize() ? "100%" : "100vw",
          }}
          ref={scrollRef}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            {window?.innerWidth < 991 ? (
              <Box sx={{ direction: "ltr", margin: "0 -22px" }}>
                <Box sx={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: language === "ltr" && "16px",
                      right: language !== "ltr" && "16px",
                      zIndex: 50,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Fab
                        size="small"
                        sx={{
                          boxShadow: "none",
                          backgroundColor: "white",
                          color: "black",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSideMenuDrawer(true);
                        }}
                      >
                        <BurgerIcon />
                      </Fab>
                    </motion.div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: language === "ltr" && "16px",
                      left: language !== "ltr" && "16px",
                      zIndex: 50,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Fab
                        size="small"
                        sx={{
                          boxShadow: "none",
                          backgroundColor: "white",
                          fontFamily:
                            language === "rtl"
                              ? "SFT Schrifted Sans TRIAL Var"
                              : "Orleen",
                          color: "#000",
                          fontSize: language === "ltr" ? "14px" : "12px",
                        }}
                        onClick={() => {
                          document
                            .getElementsByTagName("html")[0]
                            .setAttribute(
                              "dir",
                              language.split("").reverse().join("")
                            );
                          sessionStorage.setItem(
                            "language",
                            language.split("").reverse().join("")
                          );
                          handleLanguageChange(
                            language.split("").reverse().join("")
                          );
                        }}
                      >
                        {language === "rtl" ? "En" : "عربي"}
                      </Fab>
                    </motion.div>
                  </div>
                </Box>
                <MenuDrawer />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <CarouselImage mobile={true} />
                </motion.div>
              </Box>
            ) : null}
            {checkDrawer() ? <BottomDrawer type={"home"} /> : null}
            <VendorBox />
            <HomePageLayouts />
          </Box>
        </Box>
      </Box>
      {window?.innerWidth > 990 ? (
        <Box
          sx={{
            padding: "10px",
            direction: "ltr",
            position: "fixed",
            width: "62.5%",
            top: 0,
            ...(language === "ltr" ? { right: 0 } : { left: 0 }),
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.8 }}
          >
            <CarouselImage />
          </motion.div>
        </Box>
      ) : null}
    </Box>
  );
};

export default Homepage;
