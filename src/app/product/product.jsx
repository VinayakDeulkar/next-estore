"use client";

import BackButton from "@/components/common/BackButton/BackButton";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import ProductCarousel from "@/components/ProductPageDetails/ProductCarousel/productCarousel";
import ProductDetails from "@/components/ProductPageDetails/ProductDetails/ProductDetails";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";

const Product = (props) => {
  console.log(props, "props");
  const [addedVariaton, setAddedVariation] = useState([]);

  return (
    <Box>
      <HeaderBox />
      <GridLayout>
        <Box
          sx={{
            "& .carousel-root .carousel .control-arrow": {
              display: "none",
            },
            position: "relative",
          }}
        >
          <BackButton variant="dark" />
          <ProductCarousel
            product={props?.data}
            addedVariaton={addedVariaton}
          />
          <ProductDetails product={props?.data} />
        </Box>
      </GridLayout>
    </Box>
  );
};

export default Product;
