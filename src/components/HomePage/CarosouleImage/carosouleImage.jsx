"use client";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import { Carousel } from "react-responsive-carousel";

const CarosouleImage = () => {
  const { homePageDetails } = useContext(AppContext);

  return (
    <Box
      sx={{
        "& .carousel-root .carousel .control-arrow": {
          display: "none",
        },
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
        transitionTime={700}
        emulateTouch
        stopOnHover
      >
        {homePageDetails?.vendor_data?.banner_images?.map((image) => (
          <Box key={image?.id}>
            <img
              loading="lazy"
              src={image?.image}
              style={{
                width: "100%",
                height: "500px",
              }}
              // width={1000}
              // height={500}
              alt="image?.image"
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarosouleImage;
