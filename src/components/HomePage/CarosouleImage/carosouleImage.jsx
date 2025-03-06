import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import { Carousel } from "react-responsive-carousel";

const CarosouleImage = () => {
  const { homePageDetails } = useContext(AppContext);
  console.log(homePageDetails, "homePageDetails");
  return (
    <Box>
      <Carousel autoPlay showThumbs={false} showStatus={false}>
        {homePageDetails?.vendor_data?.banner_images?.map((image) => (
          <Box key={image?.id}>
            <Image src={image?.image} width={1000} height={300} />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarosouleImage;
