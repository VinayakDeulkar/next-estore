import React, { useCallback, useContext, useRef, useState } from "react";
import Layout15 from "./Layout15";
import Layout11 from "./Layout11";
import "../custom.css";
import Layout13 from "./Layout13";
import Layout12 from "./Layout12";
import Layout14 from "./Layout14";
import SearchBar from "../SeachBar/searchBar";
import { AppContext } from "@/context/AppContext";
import SearchNone from "../SeachBar/searchNone";
import SearchProductList from "../SeachBar/searchProductList";
import OrderType from "../HomePage/OrderType/orderType";
import ReviewBar from "../ReviewBar/reviewBar";
import { Box } from "@mui/material";

const HomePageLayouts = ({ homePageDetails }) => {
  const [searchItems, setSearchItems] = useState([]);
  const { search, cart } = useContext(AppContext);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);

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

  const [categoryopen, setcategoryopen] = useState(false);
  const [categorynow, setcategorynow] = useState("");

  const renderLayoutType = (categories) => {
    switch (homePageDetails?.vendor_data?.home_page_type) {
      case "11":
        return (
          <Layout11
            categories={categories}
            setcategoryopen={setcategoryopen}
            setcategorynow={setcategorynow}
            categorynow={categorynow}
          />
        );

      case "12":
        return <Layout12 categories={categories} />;

      case "10":
      case "13":
      case "16":
        return <Layout13 categories={categories} />;

      case "14":
        return <Layout14 categories={categories} />;

      case "15":
        return <Layout15 categories={categories} />;

      default:
        break;
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <SearchBar
        setSearchLoading={setSearchLoading}
        searchItems={searchItems}
        setSearchItems={setSearchItems}
        page={page}
        setIsPageLoading={setIsPageLoading}
        setHasMore={setHasMore}
        hasMore={hasMore}
        setPage={setPage}
      />
      <OrderType />
      {search != "" ? (
        searchItems?.length != 0 || searchLoading ? (
          <>
            <SearchProductList
              loading={searchLoading}
              lastBookElementRef={lastBookElementRef}
              products={searchItems}
            />
            {isPageLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px 0",
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={50}
                />
              </div>
            )}
          </>
        ) : (
          <SearchNone />
        )
      ) : (
        renderLayoutType(homePageDetails?.categories)
      )}
      {cart?.cartCount ? <ReviewBar /> : null}
    </Box>
  );
};

export default HomePageLayouts;
