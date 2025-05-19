"use client";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Carousel } from "react-responsive-carousel";

const CarouselImage = ({ mobile = false }) => {
  const { homePageDetails } = useContext(AppContext);

  const carouselHeight = () => {
    switch (homePageDetails?.estoreLayout) {
      case "1":
        return window.innerWidth > 990 ? "calc(100vh - 20px)" : "310.77px";

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
        overflow: "hidden",
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
          <Box key={image?.id} sx={{ borderRadius: mobile ? "0" : "13.81px" }}>
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
        ))}
      </Carousel>
    </Box>
  );
};

export default CarouselImage;
