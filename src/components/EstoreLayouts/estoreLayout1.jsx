import React, { useContext } from "react";
import HeaderBox from "../common/HeaderBox/headerBox";
import GridLayout1 from "../GridLayouts/gridLayout1";
import VerticalVendorInfo from "../VendorInfoLayouts/verticalVendorInfo";
import CarouselImage from "../HomePage/CarosouleImage/carosouleImage";
import OrderType from "../HomePage/OrderType/orderType";
import { AppContext } from "@/context/AppContext";
import HomePageLayouts from "../HomePageLayouts";

const EstoreLayout1 = () => {
  const { homePageDetails } = useContext(AppContext);

  return (
    <GridLayout1>
      <div>
        <div style={{ width: "100%" }}>
          <HeaderBox />
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
  );
};

export default EstoreLayout1;
