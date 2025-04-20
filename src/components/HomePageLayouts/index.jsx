import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useRef, useState } from "react";
import AreaModal from "../AreaModal/areaModal";
import "../custom.css";
import OrderType from "../HomePage/OrderType/orderType";
import SearchBar from "../SeachBar/searchBar";
import SearchNone from "../SeachBar/searchNone";
import SearchProductList from "../SeachBar/searchProductList";
import Layout11 from "./Layout11";
import Layout12 from "./Layout12";
import Layout13 from "./Layout13";
import Layout14 from "./Layout14";
import Layout15 from "./Layout15";
import ReviewBar from "../ReviewBar/reviewBar";
import HomepageDesign from "../InternationalDelivery/HomepageDesign";

const HomePageLayouts = () => {
  const [searchItems, setSearchItems] = useState([]);
  const {
    homePageDetails,
    openArea,
    handleOpenAreaChange,
    search,
    cart,
    internationalDelivery,
  } = useContext(AppContext);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const observer = useRef();
  const router = useRouter();

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

  const handleCountryChange = (code) => {};
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
      {homePageDetails?.vendor_data?.international_delivery !== "3" &&
      homePageDetails?.vendor_data?.international_delivery !== "" ? (
        <div style={{ marginBottom: "20px" }}>
          <HomepageDesign handleCountryChange={handleCountryChange} />
        </div>
      ) : null}
      {(homePageDetails?.vendor_data?.international_delivery == "3" ||
        homePageDetails?.vendor_data?.international_delivery == "") &&
      internationalDelivery &&
      internationalDelivery.delivery_country_code === "KW" ? (
        <OrderType />
      ) : null}

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
      <AreaModal
        handleClose={() => {
          handleOpenAreaChange({ open: false, route: "/" });
          router.push(openArea.route);
        }}
        showAreaModal={openArea.open}
      />
      {cart?.cartCount ? <ReviewBar /> : null}
    </Box>
  );
};

export default HomePageLayouts;
