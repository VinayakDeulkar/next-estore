"use client";
import BackComponent from "@/components/BackComponent";
import BackButton from "@/components/common/BackButton/BackButton";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import HorizontalProductGrid from "@/components/GridLayouts/horizontalProductGrid";
import VerticalProductGrid from "@/components/GridLayouts/verticalProductGrid";
import CarouselImage from "@/components/HomePage/CarosouleImage/carosouleImage";
import ProductCarousel from "@/components/ProductPageDetails/ProductCarousel/productCarousel";
import ProductDetails from "@/components/ProductPageDetails/ProductDetails/ProductDetails";
import { AppContext } from "@/context/AppContext";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import { useContext, useState } from "react";
import { Carousel } from "react-responsive-carousel";

const Product = (props) => {
  const { homePageDetails, areaDetails } = useContext(AppContext);
  const [product, setProduct] = useState({});
  const [addedVariaton, setAddedVariation] = useState([]);

  const renderProductLayout = () => {
    switch (homePageDetails?.productLayout) {
      case "1":
        return (
          <EstoreLayout1>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "relative",
                  height: "30px",
                }}
              >
                <BackComponent />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <ProductCarousel
                  product={props?.data}
                  addedVariaton={addedVariaton}
                />
                <ProductDetails
                  product={props?.data}
                  addon={props?.addons}
                  productvariation={props?.productvariation}
                  productvariationPrice={props?.productvariationPrice}
                  addedVariaton={addedVariaton}
                  setAddedVariation={setAddedVariation}
                />
              </Box>
            </Box>
          </EstoreLayout1>
        );

      case "2":
        return (
          <>
            <VerticalProductGrid>
              <BackButton variant="dark" />
              <ProductCarousel
                product={props?.data}
                addedVariaton={addedVariaton}
              />
              <ProductDetails
                product={props?.data}
                addon={props?.addons}
                productvariation={props?.productvariation}
                productvariationPrice={props?.productvariationPrice}
                addedVariaton={addedVariaton}
                setAddedVariation={setAddedVariation}
              />
            </VerticalProductGrid>
          </>
        );

      default:
        break;
    }
  };

  return <Box>{renderProductLayout()}</Box>;
};

export default Product;
