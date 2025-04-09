import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import "./vendorInfoLayouts.css";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";

const VerticalVendorInfo = () => {
  const { homePageDetails, language } = useContext(AppContext);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className="verticalVendorInfoImg"
          src={
            language === "ltr"
              ? homePageDetails?.vendor_data?.english_new_background
              : homePageDetails?.vendor_data?.arabic_new_background
          }
        />
      </div>
      <div>
        <TypographyConverter
          sx={{
            fontSize: "22px",
            fontWeight: "500",
            marginTop: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          enText={homePageDetails?.vendor_data?.name}
          arText={homePageDetails?.vendor_data?.name_ar}
        />
        <TypographyConverter
          sx={{
            fontSize: "18px",
            color: "#848484",
            fontWeight: "400",
            marginTop: "-5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          enText={homePageDetails?.vendor_data?.slogan}
          arText={homePageDetails?.vendor_data?.slogan_ar}
        />
      </div>
    </div>
  );
};

export default VerticalVendorInfo;
