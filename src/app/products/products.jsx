"use client";
import ProductSquareCard from "@/components/ProductSquareCard/productSquareCard";
import { Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "../../components/HomePageLayouts/layout.css";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import SingleProductCard from "@/components/SingleProductCard/singleProductCard";
import { AppContext } from "@/context/AppContext";
import HorizontalCard from "@/components/HorizontalCard/horizontalCard";

const Products = (props) => {
  const [page, setPage] = useState(0);
  const [isCategoryChanged, setIsCategoryChanged] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("id");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [hasMore, setHasMore] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const { homePageDetails } = useContext(AppContext);

  console.log(props?.data, "props?.data");

  useEffect(() => {
    setProductsData([...props?.data]);
  }, []);

  useEffect(() => {
    if (category) {
      setIsCategoryChanged(true);
    }
  }, [category]);

  const getCategoryName = () => {
    const filterCategory = details?.categories.filter(
      (ele) => ele.category_slug == category
    );
    if (filterCategory.length) {
      return {
        eng: filterCategory[0].category_name,
        ar: filterCategory[0].category_name_ar,
      };
    } else {
      return { eng: "", ar: "" };
    }
  };

  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (isPageLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isPageLoading, hasMore]
  );

  const handleBackClick = () => {
    setProductsData([]);
    setHasMore(0);
    setPage(0);
    history.goBack();
  };

  return (
    <GridLayout backgroundColor={"#fff"} padding={"20px"}>
      {homePageDetails?.vendor_data?.home_page_type === "13" ? (
        <Grid container className="gridContainer">
          {productsData?.map((product) => (
            <Grid item xs={6} key={product?.id}>
              <ProductSquareCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : null}
      {homePageDetails?.vendor_data?.home_page_type === "16" ? (
        <Grid container sx={{ gap: "50px", padding: "25px 100px" }}>
          {productsData?.map((product) => (
            <Grid item xs={12} key={product?.id}>
              <ProductSquareCard product={product} imgHeight={"250px"} />
            </Grid>
          ))}
        </Grid>
      ) : null}
      {homePageDetails?.vendor_data?.home_page_type === "10" ? (
        <Grid container spacing={1}>
          {productsData?.map((product) => (
            <Grid
              item
              xs={12}
              key={product?.id}
            >
              <HorizontalCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </GridLayout>
  );
};

export default Products;
