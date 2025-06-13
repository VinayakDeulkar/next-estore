"use client";
import { breakPoints } from "@/constants/constants";
import { betweenTwoDevice } from "@/constants/function";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

const CarouselImage = ({ mobile = false }) => {
  const { homePageDetails } = useContext(AppContext);

  const carouselHeight = () => {
    switch (homePageDetails?.estoreLayout) {
      case "1":
        return betweenTwoDevice(0, breakPoints.sm)
          ? "310.77px"
          : betweenTwoDevice(breakPoints.sm, breakPoints.md)
          ? "610.77px"
          : "calc(100dvh - 20px)";

      case "2":
        return "700px";

      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        "& .carousel-root .carousel .control-arrow": {
          display: "none",
          borderRadius: mobile ? "0" : "13px",
        },
        width: "100%",
        height: carouselHeight(),
        overflowY: "hidden",
      }}
    >
      <Carousel
        autoPlay
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        showArrows={false}
        infiniteLoop
        interval={3000}
        transitionTime={3000}
        emulateTouch
        stopOnHover
        className="carouselImage"
        animationHandler={"fade"}
      >
        {homePageDetails?.vendor_data?.banner_images?.map((image) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 2 }}
            key={image?.id}
          >
            <Box sx={{ borderRadius: mobile ? "0" : "13.81px" }}>
              <img
                loading="lazy"
                src={image?.image}
                style={{
                  width: "100%",
                  height: carouselHeight(),
                  borderRadius: mobile ? "0" : "13.81px",
                  border: "1.5px solid #9191913D",
                }}
                alt="image?.image"
              />
            </Box>
          </motion.div>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarouselImage;
