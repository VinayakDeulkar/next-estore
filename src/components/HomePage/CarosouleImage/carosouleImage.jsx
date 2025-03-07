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
      >
        {homePageDetails?.vendor_data?.banner_images?.map((image) => (
          <Box key={image?.id}>
            <Image
              loading="lazy"
              src={image?.image}
              width={1000}
              height={1000}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarosouleImage;
