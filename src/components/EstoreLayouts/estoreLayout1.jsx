import React from "react";
import HeaderBox from "../common/HeaderBox/headerBox";
import GridLayout1 from "../GridLayouts/gridLayout1";
import VerticalVendorInfo from "../VendorInfoLayouts/verticalVendorInfo";

const EstoreLayout1 = () => {
  return (
    <GridLayout1>
      <div>
        <div style={{ width: "100%" }}>
          <HeaderBox />
          <div style={{padding: "25px"}}>
            <VerticalVendorInfo />
          </div>
        </div>
      </div>
      <div>Hii</div>
    </GridLayout1>
  );
};

export default EstoreLayout1;
