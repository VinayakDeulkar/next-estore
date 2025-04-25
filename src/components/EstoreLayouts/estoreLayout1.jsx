import { Box, Grid } from "@mui/material";
import HeaderBox from "../common/HeaderBox/headerBox";
import CarouselImage from "../HomePage/CarosouleImage/carosouleImage";
import Footer from "../common/Footer/footer";

const EstoreLayout1 = ({ children }) => {
  const checkSize = () => {
    return window != undefined && window?.innerWidth > 990;
  };
  return (
    <Box sx={{ height: "100vh", overflow: "hidden", width: "100%" }}>
      <Grid container sx={{ width: "100vw" }}>
        <Grid item sm={12} md={12} lg={4.5}>
          <HeaderBox />
          <Box
            sx={{
              height: "calc(100vh - 50px)",
              overflow: "scroll",
              padding: checkSize() ? "0 40px" : "0 20px",
              width: checkSize() ? "100%" : "100vw",
            }}
          >
            {children}
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
};

export default EstoreLayout1;
