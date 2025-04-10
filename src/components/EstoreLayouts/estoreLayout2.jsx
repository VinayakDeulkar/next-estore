import React, { useContext } from "react";
import HeaderBox from "../common/HeaderBox/headerBox";
import GridLayout2 from "../GridLayouts/gridLayout2";
import HorizontalVendorInfo from "../VendorInfoLayouts/horizontalVendorInfo";
import CarouselImage from "../HomePage/CarosouleImage/carosouleImage";
import OrderType from "../HomePage/OrderType/orderType";
import HomePageLayouts from "../HomePageLayouts";
import { AppContext } from "@/context/AppContext";

const EstoreLayout2 = () => {
  const {homePageDetails} = useContext(AppContext);

  return (
    <>
      <HeaderBox />
      <GridLayout2>
        <div>
          <CarouselImage />
          <div style={{ padding: "25px 0 0" }}>
            <HorizontalVendorInfo />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "25px 0 25px",
            }}
          >
            <div
              style={{
                maxWidth: "450px",
                width: "100%",
              }}
            >
              <OrderType />
            </div>
          </div>
          <HomePageLayouts homePageDetails={homePageDetails} />
        </div>
      </GridLayout2>
    </>
  );
};

export default EstoreLayout2;
