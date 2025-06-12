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

  const handleCarouselChange = (index) => {
    console.log(index, "index");
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
        infiniteLoop={true}
        interval={3000}
        transitionTime={700}
        emulateTouch={false}
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
      {allImages?.length > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            gap: 1,
          }}
        >
          {allImages.map((_, index) => (
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
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductCarousel;
