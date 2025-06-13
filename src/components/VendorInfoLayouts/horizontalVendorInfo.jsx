import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import TypographyConverter from "../common/typographyConveter/TypographyConverter";

const HorizontalVendorInfo = () => {
  const { homePageDetails, language } = useContext(AppContext);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <div>
        <img
          className="horizontalVendorInfoImg"
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
            display: "flex",
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
            display: "flex",
            alignItems: "center",
          }}
          enText={homePageDetails?.vendor_data?.slogan}
          arText={homePageDetails?.vendor_data?.slogan_ar}
        />
      </div>
    </div>
  );
};

export default HorizontalVendorInfo;
