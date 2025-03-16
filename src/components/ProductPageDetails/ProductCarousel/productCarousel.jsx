import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";

const ProductCarousel = ({ product, addedVariaton }) => {
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
        <Image
          loading="lazy"
          width={1000}
          height={1000}
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
              <Image
                loading="lazy"
                className="img"
                src={`${i}`}
                width={1000}
                height={1000}
                alt={i}
              />
            </Box>
          ))
        : null}
    </Carousel>
  );
};

export default ProductCarousel;
