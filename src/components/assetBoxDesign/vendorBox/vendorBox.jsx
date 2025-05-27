import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import SubHeadline from "../SubHeadline/subHeadline";
import StaggeredAnimation from "@/components/Animations/staggeredAnimation";
import { motion } from "framer-motion";

const VendorBox = () => {
  const { homePageDetails, language } = useContext(AppContext);
  const staggeredAnimationRef = StaggeredAnimation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: window.innerWidth > 990 ? "column" : "row",
        gap: window.innerWidth > 990 ? "5px" : "20px",
        padding: "24px 0",
      }}
      id="vendor-box"
      // ref={staggeredAnimationRef}
    >
      <motion.div
        initial={{ opacity: 0, y: "20px" }}
        animate={{ opacity: 1, y: "0px" }}
        transition={{ duration: 0.5, delay: 0.5 }}
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
      </motion.div>

      <Box>
        <motion.div
          initial={{ opacity: 0, y: "20px" }}
          animate={{ opacity: 1, y: "0px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
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
        </motion.div>

        {homePageDetails?.vendor_data?.slogan ? (
          <motion.div
            initial={{ opacity: 0, y: "20px" }}
            animate={{ opacity: 1, y: "0px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div
              style={{
                color: "#8D8D8D",
                fontWeight: 300,
                textAlign: window.innerWidth > 990 ? "center" : "start",
                marginTop: "-5px",
              }}
            >
              <SubHeadline
                enText={homePageDetails?.vendor_data?.slogan}
                arText={homePageDetails?.vendor_data?.slogan_ar}
                color="#8D8D8D"
              />
            </div>
          </motion.div>
        ) : null}
      </Box>
    </Box>
  );
};

export default VendorBox;
