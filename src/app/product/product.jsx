"use client";
import BackButton from "@/components/common/BackButton/BackButton";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
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
          <>
            <Grid
              container
              sx={{
                height: "calc(100vh - 50px)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  position: "relative",
                  overflow: "scroll",
                  height: "calc(100vh - 50px)",
                }}
              >
                <Box
                  sx={{
                    position: "sticky",
                    top: "20px",
                    left: "80px",
                    zIndex: "100",
                  }}
                >
                  <BackButton variant="dark" />
                </Box>
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
              </Grid>
              {window.innerWidth > 600 ? (
                <Grid item xs={12} sm={8}>
                  <CarouselImage />
                </Grid>
              ) : null}
            </Grid>
          </>
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

  return (
    <Box>
      <HeaderBox />
      {renderProductLayout()}
    </Box>
  );
};

export default Product;
