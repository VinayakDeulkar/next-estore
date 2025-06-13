import GridLayout2 from "@/components/GridLayouts/gridLayout2";
import { AppContext } from "@/context/AppContext";
import BurgerIcon from "@/SVGs/BurgerIcon";
import { Box, Grid, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const Navbar = ({ isScrollingUp, hidePadding }) => {
  const {
    homePageDetails,
    language,
    handleLanguageChange,
    handleSideMenuDrawer,
  } = useContext(AppContext);
  const pathname = usePathname();
  const renderGridNav = () => {
    switch (homePageDetails?.estoreLayout) {
      case "1":
        return (
          <>{pathname === "/checkout-desktop" ? navChidren() : navChidren()}</>
        );

      case "2":
        return (
          <>
            {window.innerWidth > 990 ? (
              <GridLayout2>{navChidren()}</GridLayout2>
            ) : (
              <div>{navChidren()}</div>
            )}
          </>
        );

      default:
        break;
    }
  };

  const navChidren = () => {
    return (
      <Grid
        container
        sx={{
          backgroundColor: "#fff",
          // backdropFilter: "blur(10px)",
        }}
      >
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <IconButton color="#fff" onClick={() => handleSideMenuDrawer(true)}>
              <Box
                sx={{
                  height: "20px",
                  width: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BurgerIcon />
              </Box>
            </IconButton>
          </motion.div>
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ padding: "10px" }}>
            {isScrollingUp ? (
              <Image
                height={30}
                width={30}
                style={{ borderRadius: "5px" }}
                src={
                  language === "ltr"
                    ? homePageDetails?.vendor_data?.english_new_background
                    : homePageDetails?.vendor_data?.arabic_new_background
                }
              />
            ) : null}
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            padding: "20px",
            gap: "10px",
          }}
        >
          {/* <SearchBox /> */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              sx={{
                fontFamily:
                  language === "rtl"
                    ? "SFT Schrifted Sans TRIAL Var"
                    : "Orleen",
                color: "#000",
              }}
              component={"button"}
              onClick={() => {
                document
                  .getElementsByTagName("html")[0]
                  .setAttribute("dir", language.split("").reverse().join(""));
                sessionStorage.setItem(
                  "language",
                  language.split("").reverse().join("")
                );
                handleLanguageChange(language.split("").reverse().join(""));
              }}
            >
              {language === "rtl" ? "English" : "عربي"}
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        // backgroundColor: homePageDetails?.vendor_data?.vendor_color,
        height: "50px",
        top: 0,
        left: 0,
        zIndex: 999,
        color: "blue",
        position: "sticky",
        padding: window.innerWidth > 990 && !hidePadding ? "0 32px" : "0",
      }}
    >
      {renderGridNav()}
    </Box>
  );
};

export default Navbar;
