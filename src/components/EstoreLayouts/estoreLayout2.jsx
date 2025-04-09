import React from "react";
import HeaderBox from "../common/HeaderBox/headerBox";
import GridLayout2 from "../GridLayouts/gridLayout2";
import HorizontalVendorInfo from "../VendorInfoLayouts/horizontalVendorInfo";

const EstoreLayout2 = () => {
  return (
    <>
      <HeaderBox />
      <GridLayout2>
        <div>
          <div style={{padding: "25px 0"}}>
            <HorizontalVendorInfo />
          </div>
        </div>
      </GridLayout2>
    </>
  );
};

export default EstoreLayout2;
