import TypographyConverter from "@/components/common/TypographyConveter/typographyConverter";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";

const VendorInfoBox = () => {
  const { homePageDetails, language } = useContext(AppContext);
  return (
    <Box sx={{ padding: "40px 20px 20px" }}>
      <div>
        <Image
          loading="lazy"
          width={75}
          height={75}
          style={{
            borderRadius: "5px",
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
        <TypographyConverter
          sx={{
            color: "#000",
            textAlign: "start",
            fontSize: "28px",
            fontWeight: 400,
            marginTop: "5px",
          }}
          enText={homePageDetails?.vendor_data?.name}
          arText={homePageDetails?.vendor_data?.name_ar}
        />
        <TypographyConverter
          sx={{
            textAlign: "start",
            color: "#8D8D8D",
            fontWeight: 200,
            fontSize: "21px",
            marginTop: "-4px",
          }}
          enText={homePageDetails?.vendor_data?.slogan}
          arText={homePageDetails?.vendor_data?.slogan_ar}
        />
      </div>
    </Box>
  );
};

export default VendorInfoBox;
