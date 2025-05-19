"use client";
import VendorBox from "@/components/assetBoxDesign/vendorBox/vendorBox";
import BottomDrawer from "@/components/BottomDrawer/bottomDrawer";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import EstoreLayout2 from "@/components/EstoreLayouts/estoreLayout2";
import CarouselImage from "@/components/HomePage/CarosouleImage/carosouleImage";
import HomePageLayouts from "@/components/HomePageLayouts";
import { AppContext } from "@/context/AppContext";
import { Box, Fab, Grid } from "@mui/material";
import { useContext } from "react";
import BurgerIcon from "@/SVGs/BurgerIcon";
import MenuDrawer from "@/components/common/MenuDrawer/menuDrawer";
import HeaderBox from "@/components/common/HeaderBox/headerBox";

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
  console.log(homePageDetails, "homePageDetails");

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

  const estoreLayout = () => {
    switch (homePageDetails?.estoreLayout) {
      case "1":
        return (
          <Box
            sx={{
              height: "100vh",
              overflow: checkSize() && "hidden",
              width: "100%",
            }}
          >
            <Grid container sx={{ width: "100vw" }}>
              <Grid item sm={12} md={12} lg={4.5}>
                {checkSize() && <HeaderBox />}
                <Box
                  sx={{
                    height: checkSize() ? "calc(100vh - 50px)" : "100%",
                    overflow: "scroll",
                    padding: checkSize() ? "0 40px" : "0 20px",
                    width: checkSize() ? "100%" : "100vw",
                  }}
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
                                fontSize: language === "ltr" ? "14px" : "8px",
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
                              {language === "rtl" ? "English" : "عربي"}
                            </Fab>
                          </div>
                        </Box>
                        <MenuDrawer />
                        <CarouselImage mobile={true} />
                      </Box>
                    ) : null}
                    {checkDrawer() ? <BottomDrawer type={"home"} /> : null}
                    <VendorBox />
                    <HomePageLayouts />
                  </Box>
                </Box>
              </Grid>
              {window?.innerWidth > 990 ? (
                <Grid
                  item
                  sm={12}
                  md={12}
                  lg={7.5}
                  sx={{ padding: "10px", direction: "ltr" }}
                >
                  <CarouselImage />
                </Grid>
              ) : null}
            </Grid>
          </Box>
        );

      case "2":
        return <EstoreLayout2 />;

      default:
        break;
    }
  };

  return estoreLayout();
};

export default Homepage;
