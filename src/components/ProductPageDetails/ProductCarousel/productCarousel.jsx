import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import { Carousel } from "react-responsive-carousel";

const ProductCarousel = ({ product, addedVariaton }) => {
  const { homePageDetails } = useContext(AppContext);

  const productImgStyle = () => {
    switch (homePageDetails?.productLayout) {
      case "1":
        return { height: "auto" };

      case "2":
        return { height: "500px" };

      default:
        break;
    }
  };

  return (
    <Carousel
      autoPlay={product?.product_images?.length}
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      showArrows={false}
      swipeable={
        !(
          product?.product_images?.length != 0 &&
          !product?.productvariationPrice?.[addedVariaton.toString()]?.image
        )
      }
      infiniteLoop
      interval={3000}
      transitionTime={700}
      emulateTouch
      stopOnHover
    >
      <Box className="product-owl-img">
        <img
          loading="lazy"
          style={productImgStyle()}
          src={`${
            product?.productvariationPrice?.[addedVariaton.toString()]?.image
              ? product?.productvariationPrice?.[addedVariaton.toString()]
                  ?.image
              : product?.image
          }`}
          alt={product?.image}
        />
      </Box>

      {product?.product_images?.length != 0 &&
      !product?.productvariationPrice?.[addedVariaton.toString()]?.image
        ? product?.product_images?.map((i, k) => (
            <Box key={k}>
              <img
                loading="lazy"
                src={`${i}`}
                alt={i}
                style={productImgStyle()}
              />
            </Box>
          ))
        : null}
    </Carousel>
  );
};

export default ProductCarousel;
