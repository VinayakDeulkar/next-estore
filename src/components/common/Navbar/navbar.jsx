import CartIcon from "@/assets/icons/addressIcons/CartIcon";
import { AppContext } from "@/context/AppContext";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Box, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import GridLayout from "../GridLayout/gridLayout";
const Navbar = ({ handleDrawar }) => {
  const { homePageDetails, language, cart } = useContext(AppContext);
  const router = useRouter();
  return (
    <Box
      sx={{
        backgroundColor: homePageDetails?.vendor_data?.vendor_color,
        height: "50px",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
        color: "blue",
      }}
    >
      <GridLayout margin="0">
        <Grid container>
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
            <IconButton color="#fff" onClick={handleDrawar}>
              <MenuIcon sx={{ color: "#fff" }} />
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
            <Image
              loading="lazy"
              width={30}
              height={30}
              src={
                language == "ltr"
                  ? homePageDetails?.vendor_data?.english_new_background
                  : homePageDetails?.vendor_data?.arabic_new_background
              }
              alt={
                language == "ltr"
                  ? homePageDetails?.vendor_data?.name
                  : homePageDetails?.vendor_data?.name_ar
              }
            />
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
              padding: "8px",
            }}
          >
            {/* <Button
              variant="outlined"
              sx={{ borderRadius: "30px", borderColor: "#fff" }}
            >
              <Typography
                sx={{
                  fontSize: language === "ltr" ? "12px" : "10px",
                  color: "#fff",
                  fontFamily:
                    language === "ltr"
                      ? "Orleen"
                      : "SFT Schrifted Sans TRIAL Var",
                }}
              >
                {language === "ltr" ? "عربي" : "English"}
              </Typography>
            </Button> */}
            {cart?.cartCount && (
              <Badge
                color="success"
                badgeContent={cart?.cartCount}
                onClick={() => router.push("/desk-checkout")}
              >
                <CartIcon />
              </Badge>
            )}
          </Grid>
        </Grid>
      </GridLayout>
    </Box>
  );
};

export default Navbar;
