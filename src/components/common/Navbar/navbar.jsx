import GridLayout2 from "@/components/GridLayouts/gridLayout2";
import { AppContext } from "@/context/AppContext";
import BurgerIcon from "@/SVGs/BurgerIcon";
import { Box, Grid, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import SearchBox from "../SearchBox/searchBox";
const Navbar = ({ handleDrawar }) => {
  const { homePageDetails, language, cart, handleLanguageChange } =
    useContext(AppContext);
  const router = useRouter();

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
        {/* <Grid
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
          <SearchBox />
        </Grid> */}
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            padding: "20px",
            gap: "10px"
          }}
        >
          <SearchBox />
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
        backgroundColor: homePageDetails?.vendor_data?.vendor_color,
        height: "50px",
        top: 0,
        left: 0,
        zIndex: 999,
        color: "blue",
        position: "sticky",
      }}
    >
      {renderGridNav()}
    </Box>
  );
};

export default Navbar;
