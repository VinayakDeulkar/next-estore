import CartIcon from "@/assets/icons/addressIcons/CartIcon";
import GridLayout1 from "@/components/GridLayouts/gridLayout1";
import GridLayout2 from "@/components/GridLayouts/gridLayout2";
import { AppContext } from "@/context/AppContext";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Box, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
const Navbar = ({ handleDrawar }) => {
  const { homePageDetails, language, cart } = useContext(AppContext);
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
          background:
            "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.19))",
          position: "sticky",
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
          <IconButton color="#fff" onClick={handleDrawar}>
            <MenuIcon sx={{ color: "#fff" }} />
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
          {cart?.cartCount && (
            <Badge
              color="success"
              badgeContent={cart?.cartCount}
              onClick={() => {
                if (window.innerWidth < 600) {
                  router.push("/review");
                } else {
                  router.push("/checkout-desktop");
                }
              }}
            >
              <CartIcon />
            </Badge>
          )}
        </Grid> */}
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
      }}
    >
      {renderGridNav()}
    </Box>
  );
};

export default Navbar;
