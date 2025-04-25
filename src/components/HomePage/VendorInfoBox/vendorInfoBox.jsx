import TypographyConverter from "@/components/common/TypographyConveter/typographyConverter";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";

const VendorInfoBox = () => {
  const { homePageDetails, language } = useContext(AppContext);
  return (
    <Box sx={{ padding: "40px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div>
          <Image
            loading="lazy"
            width={75}
            height={75}
            style={{
              borderRadius: "10px",
            }}
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
        </div>
        <div sx={{ display: "flex", alignItems: "center" }}>
          <TypographyConverter
            sx={{ color: "#000", textAlign: "start", fontSize: "28px" }}
            enText={homePageDetails?.vendor_data?.name}
            arText={homePageDetails?.vendor_data?.name_ar}
          />
          <TypographyConverter
            sx={{
              color: "#000",
              textAlign: "start",
              color: "#848484",
              fontWeight: 200,
            }}
            enText={homePageDetails?.vendor_data?.slogan}
            arText={homePageDetails?.vendor_data?.slogan_ar}
          />
        </div>
      </div>
    </Box>
  );
};

export default VendorInfoBox;
