import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import SubHeadline from "../SubHeadline/subHeadline";
import StaggeredAnimation from "@/components/Animations/staggeredAnimation";

const VendorBox = () => {
  const { homePageDetails, language } = useContext(AppContext);
  const staggeredAnimationRef = StaggeredAnimation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: window.innerWidth > 990 ? "column" : "row",
        gap: "20px",
        padding: "24px 0",
      }}
      id="vendor-box"
      // ref={staggeredAnimationRef}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Image
          loading="lazy"
          width={80}
          height={80}
          style={{
            borderRadius: "8px",
            border: "1.5px solid #9191913D",
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
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: window.innerWidth > 990 ? "center" : "start",
          fontSize: "28px",
          fontWeight: "400",
        }}
      >
        {language === "ltr"
          ? homePageDetails?.vendor_data?.name
          : homePageDetails?.vendor_data?.name_ar}
      </Box>

      {homePageDetails?.vendor_data?.slogan ? (
        <div style={{ color: "#8D8D8D", fontWeight: 300 }}>
          <SubHeadline
            enText={homePageDetails?.vendor_data?.slogan}
            arText={homePageDetails?.vendor_data?.slogan_ar}
            color="#8D8D8D"
          />
        </div>
      ) : null}
    </Box>
  );
};

export default VendorBox;
