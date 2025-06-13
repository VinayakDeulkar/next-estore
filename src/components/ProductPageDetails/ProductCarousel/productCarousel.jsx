import { useState } from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";

const ProductCarousel = ({ productImages }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Get all images to display

  const handleCarouselChange = (index) => {
    setActiveIndex(index);
  };
  return (
    <Box sx={{ position: "relative" }}>
      {/* Main Carousel */}
      <Carousel
        selectedItem={activeIndex}
        onChange={handleCarouselChange}
        autoPlay={productImages.length > 1}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        showArrows={false}
        swipeable={false}
        infiniteLoop={true}
        interval={3000}
        transitionTime={700}
        preventMovementUntilSwipeScrollTolerance
        stopSwipingHandler={() => {}}
        emulateTouch={false}
        stopOnHover
        className="carouselImage"
        animationHandler={"fade"}
      >
        {productImages.map((image, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Box key={index} className="product-owl-img">
              <img
                loading="lazy"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
                src={image}
                alt={`Product image ${index + 1}`}
              />
            </Box>
          </motion.div>
        ))}
      </Carousel>

      {/* Thumbnail Navigation */}
      {productImages?.length > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            gap: 1,
          }}
        >
          {productImages.map((_, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                key={index}
                sx={{
                  width: activeIndex === index ? "30px" : "15px",
                  height: activeIndex === index ? "6px" : "3px",
                  borderRadius: "5px",
                  backgroundColor: activeIndex === index ? "#000" : "#ccc",
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => {
                  setActiveIndex(index);
                }}
              />
            </motion.div>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductCarousel;
