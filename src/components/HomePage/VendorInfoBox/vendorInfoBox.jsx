import { AppContext } from "@/context/AppContext";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import TypographyConverter from "../../common/TypographyConveter/TypographyConverter";

const VendorInfoBox = () => {
  const { homePageDetails, language } = useContext(AppContext);
  return (
    <Box sx={{ padding: "40px 20px" }}>
      <Grid container>
        <Grid item lg={1.8} sx={3}>
          <Image
            loading="lazy"
            width={110}
            height={110}
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
        </Grid>
        <Grid
          item
          sm={9}
          lg={10.2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box sx={{ paddingLeft: "10px" }}>
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VendorInfoBox;
