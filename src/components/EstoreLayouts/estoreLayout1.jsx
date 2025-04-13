import { Box, Grid } from "@mui/material";
import HeaderBox from "../common/HeaderBox/headerBox";
import CarouselImage from "../HomePage/CarosouleImage/carosouleImage";

const EstoreLayout1 = ({ children }) => {
  return (
    <Box>
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
        <Grid container>
          <Grid item sm={12} md={12} lg={4}>
            <HeaderBox />
            <Box
              sx={{
                height: "calc(100vh - 50px)",
                overflow: "scroll",
                padding: "0 20px",
              }}
            >
              {children}
            </Box>
          </Grid>
          {window?.innerWidth > 600 ? (
            <Grid item sm={12} md={12} lg={8} sx={{ padding: "10px" }}>
              <CarouselImage />
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </Box>
  );
};

export default EstoreLayout1;
