import React, { useContext } from "react";
import HeaderBox from "../common/HeaderBox/headerBox";
import GridLayout1 from "../GridLayouts/gridLayout1";
import VerticalVendorInfo from "../VendorInfoLayouts/verticalVendorInfo";
import CarouselImage from "../HomePage/CarosouleImage/carosouleImage";
import OrderType from "../HomePage/OrderType/orderType";
import { AppContext } from "@/context/AppContext";
import HomePageLayouts from "../HomePageLayouts";
import { Box, Grid } from "@mui/material";

const EstoreLayout1 = () => {
  const { homePageDetails } = useContext(AppContext);

  return (
    <Box>
      {/* {window.innerWidth > 600 ? (
        <Grid container>
          <Grid item xs={0} sm={4}>
            <HeaderBox />
          </Grid>
          <Grid item xs={0} sx={{display: "none"}}></Grid>
        </Grid>
      ) : (
        <></>
      )} */}
      {window.innerWidth < 600 ? <HeaderBox /> : null}
      <GridLayout1>
        <div>
          <div style={{ width: "100%" }}>
            {window.innerWidth > 600 ? <HeaderBox /> : null}

            <div style={{ padding: "25px 25px 0" }}>
              <VerticalVendorInfo />
            </div>
            <div style={{ padding: "25px 20px 0" }}>
              <OrderType />
            </div>
            <div style={{ padding: "13px 20px 0" }}>
              <HomePageLayouts homePageDetails={homePageDetails} />
            </div>
          </div>
        </div>
        <div>
          <CarouselImage />
        </div>
      </GridLayout1>
    </Box>
  );
};

export default EstoreLayout1;
