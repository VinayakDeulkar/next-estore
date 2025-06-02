// import { Box } from "@mui/material";
// import { Carousel } from "react-responsive-carousel";

// const ProductCarousel = ({ product, addedVariaton }) => {
//   return (
//     <Carousel
//       autoPlay={product?.product_images?.length}
//       showThumbs={false}
//       showStatus={false}
//       showIndicators={false}
//       showArrows={false}
//       swipeable={
//         !(
//           product?.product_images?.length != 0 &&
//           !product?.productvariationPrice?.[addedVariaton.toString()]?.image
//         )
//       }
//       infiniteLoop
//       interval={3000}
//       transitionTime={700}
//       emulateTouch
//       stopOnHover
//       className="carouselImage"
//       animationHandler={"fade"}
//     >
//       <Box
//         className="product-owl-img"
//       >
//         <img
//           loading="lazy"
//           style={{
//             height: "100%",
//           }}
//           src={`${
//             product?.productvariationPrice?.[addedVariaton.toString()]?.image
//               ? product?.productvariationPrice?.[addedVariaton.toString()]
//                   ?.image
//               : product?.image
//           }`}
//           alt={product?.image}
//         />
//       </Box>

//       {product?.product_images?.length != 0 &&
//       !product?.productvariationPrice?.[addedVariaton.toString()]?.image
//         ? product?.product_images?.map((i, k) => (
//             <Box key={k}>
//               <img
//                 src={`${i}`}
//                 alt={i}
//                 style={{
//                   height: "100%",
//                 }}
//               />
//             </Box>
//           ))
//         : null}
//     </Carousel>
//   );
// };

// export default ProductCarousel;

import { useState } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCarousel = ({ product, addedVariaton }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Get all images to display
  const allImages = [
    product?.productvariationPrice?.[addedVariaton.toString()]?.image ||
      product?.image,
    ...(product?.product_images || []),
  ].filter(Boolean);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const handleCarouselChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Main Carousel */}
      <Carousel
        selectedItem={activeIndex}
        onChange={handleCarouselChange}
        autoPlay={allImages.length > 1}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        showArrows={false}
        swipeable={allImages.length > 1}
        infiniteLoop
        interval={3000}
        transitionTime={700}
        emulateTouch
        stopOnHover
        className="carouselImage"
        animationHandler={"fade"}
      >
        {allImages.map((image, index) => (
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
        ))}
      </Carousel>

      {/* Thumbnail Navigation */}
      {allImages.length > 1 && (
        <Box
          sx={{
            position: "relative",
            mt: 2,
            display: "flex",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {allImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  p: 0.5,
                  minWidth: 60,
                  flexShrink: 0,
                }}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: "65px",
                    height: "65px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    border:
                      activeIndex === index
                        ? "2px solid #000"
                        : "2px solid transparent",
                    opacity: activeIndex === index ? 1 : 0.7,
                    transition: "all 0.2s ease",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductCarousel;
