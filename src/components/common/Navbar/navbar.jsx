import GridLayout2 from "@/components/GridLayouts/gridLayout2";
import { AppContext } from "@/context/AppContext";
import BurgerIcon from "@/SVGs/BurgerIcon";
import { Box, Grid, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SearchBox from "../SearchBox/searchBox";
import Image from "next/image";

const Navbar = ({ handleDrawar }) => {
  const { homePageDetails, language, handleLanguageChange } =
    useContext(AppContext);
  const [logo, setLogo] = useState(false);

  const renderGridNav = () => {
    switch (homePageDetails?.estoreLayout) {
      case "1":
        return <>{navChidren()}</>;

      case "2":
        return (
          <>
            {window.innerWidth > 600 ? (
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
  const handleScroll = () => {
    if (window.scrollY - 350 > (100 * 32) / window.innerHeight) {
      setLogo((f) => true);
    } else setLogo((f) => false);
  };

  useEffect(() => {
    console.log("scroll");
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            padding: "0 12px",
          }}
        >
          <IconButton color="#fff" onClick={handleDrawar}>
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
          <Box>
            {logo ? (
              <Image
                height={50}
                width={50}
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
          <Box
            sx={{
              fontFamily:
                language === "rtl" ? "SFT Schrifted Sans TRIAL Var" : "Orleen",
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
        padding: window.innerWidth > 600 ? "0 32px" : "0",
      }}
    >
      {renderGridNav()}
    </Box>
  );
};

export default Navbar;
