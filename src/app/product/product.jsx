"use client";
import BackButton from "@/components/common/BackButton/BackButton";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
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
  const [loading, setLoading] = useState(true);

  return (
    <Box>
      <HeaderBox />
      <Grid container sx={{ marginTop: "50px" }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Grid item>
            <ProductCarousel
              product={props?.data}
              addedVariaton={addedVariaton}
            />
          </Grid>
          <Grid item>
            {/* <BackButton variant="dark" /> */}
            <ProductDetails
              product={props?.data}
              loading={loading}
              addon={props?.addons}
              productvariation={props?.productvariation}
              productvariationPrice={props?.productvariationPrice}
              addedVariaton={addedVariaton}
              setAddedVariation={setAddedVariation}
            />
          </Grid>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Box>
  );
};

export default Product;
