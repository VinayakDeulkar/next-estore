import { Box } from "@mui/material";
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
      className="carouselImage"
      animationHandler={"fade"}
    >
      <Box
        className="product-owl-img"
      >
        <img
          loading="lazy"
          style={{
            height: "100%",
            // borderRadius: "13.81px",
            // margin: checkSize() ? "0 -40px" : "0 -20px",
            // border: "1.5px solid #9191913D",
          }}
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
                src={`${i}`}
                alt={i}
                style={{
                  height: "100%",
                  // borderRadius: "13.81px",
                  // margin: checkSize() ? "0 -40px" : "0 -20px",
                  // border: "1.5px solid #9191913D",
                }}
              />
            </Box>
          ))
        : null}
    </Carousel>
  );
};

export default ProductCarousel;
