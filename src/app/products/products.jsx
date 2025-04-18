"use client";
import ProductSquareCard from "@/components/ProductSquareCard/productSquareCard";
import { Box, Grid } from "@mui/material";
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
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import SubHeadline from "@/components/assetBoxDesign/SubHeadline/subHeadline";
import BackButton from "@/components/common/BackButton/BackButton";
import HeadLine from "@/components/assetBoxDesign/Headline/headLine";
import CategoryCard from "@/components/CategoryCard/categoryCard";
import Notes from "@/components/assetBoxDesign/Notes/notes";
import NotificationAlerts from "@/components/assetBoxDesign/NotificationAlerts/notificationAlerts";

const Products = (props) => {
  const [page, setPage] = useState(0);
  const [isCategoryChanged, setIsCategoryChanged] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("id");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [hasMore, setHasMore] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [hasSubCategories, setHasSubCategories] = useState(false);
  const { homePageDetails } = useContext(AppContext);

  useEffect(() => {
    if (props?.is_subcategory === 1) {
      setHasSubCategories(true);
      setSubCategoryData([...props?.data]);
    } else {
      setHasSubCategories(false);
      setProductsData([...props?.data]);
    }
  }, [props?.data]);

  useEffect(() => {
    if (category) {
      setIsCategoryChanged(true);
    }
  }, [category]);

  const getCategoryName = () => {
    const filterCategory = homePageDetails?.categories?.filter(
      (ele) => ele.category_slug == props?.category
    );
    if (filterCategory?.length) {
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

  const categoryProducts = () => {
    if (hasSubCategories) {
      return (
        <Grid container spacing={"20px"}>
          {subCategoryData?.map((cat) => (
            <Grid item xs={6} key={cat?.category_id}>
              <CategoryCard category={cat} />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      switch (homePageDetails?.vendor_data?.home_page_type) {
        case "10":
        case "11":
        case "14":
          return (
            <Grid container spacing={1}>
              {productsData?.map((product) => (
                <Grid item xs={12} key={product?.id}>
                  <HorizontalCard product={product} />
                </Grid>
              ))}
            </Grid>
          );

        case "12":
        case "13":
        case "15":
          return (
            <Grid container className="gridContainer">
              {productsData?.map((product) => (
                <Grid item xs={6} key={product?.id}>
                  <ProductSquareCard product={product} />
                </Grid>
              ))}
            </Grid>
          );

        case "16":
          return (
            <>
              <Grid container sx={{ gap: "50px", padding: "25px 80px" }}>
                {productsData?.map((product) => (
                  <Grid item xs={12} key={product?.id}>
                    <ProductSquareCard product={product} imgHeight={"250px"} />
                  </Grid>
                ))}
              </Grid>
            </>
          );

        default:
          break;
      }
    }
  };

  return (
    <EstoreLayout1>
      <div>
        <Box sx={{ position: "relative", height: "74px" }}>
          <BackButton
            variant="dark"
            arabic_title={
              hasSubCategories
                ? getCategoryName().ar
                : productsData?.[0]?.category_name_ar
            }
            english_title={
              hasSubCategories
                ? getCategoryName().eng
                : productsData?.[0]?.category_name
            }
          />
        </Box>

        <>
          {(hasSubCategories && subCategoryData?.length) ||
          (!hasSubCategories && productsData?.length) ? (
            <>{categoryProducts()}</>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 400px)",
              }}
            >
              <SubHeadline
                enText={"Products are unavailable"}
                arText={"المنتجات غير متوفرة"}
                color="#8D8D8D"
              />
            </Box>
          )}
        </>
      </div>
    </EstoreLayout1>
  );
};

export default Products;
