"use client";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SnackbarProvider } from "notistack";
import { emptyUserCart, getUserCart, GetUserDetails } from "@/apis";
import { tele } from "@/constants/constants";
import { Box } from "@mui/material";
import { LoadScript } from "@react-google-maps/api";
import NoVendor from "@/components/NoVendor/noVendor";
import Customloader from "@/components/customLoader/customloader";

export const AppContext = createContext();

export const AppProvider = ({
  vendorSlugResponse,
  homePageResponse,
  deliveryResponse,
  estoreBranchesResponse,
  children,
}) => {
  const [payment, setPayment] = useState(1);
  const handleSetPaymentChange = (value) => setPayment(value);

  const [language, setLanguage] = useState("ltr");
  const handleLanguageChange = (lng) => {
    localStorage.setItem("language", lng);
    setLanguage(lng);
  };

  const [vendorSlug, setVendorSlug] = useState();
  const handleVendorSlugChange = (value) => setVendorSlug(value);

  const [homePageDetails, setHomePageDetails] = useState();
  const handleHomePageDetailsChange = (value) =>
    setHomePageDetails({ ...value, estoreLayout: "1", productLayout: "1" });
  useEffect(() => {
    if (vendorSlugResponse) {
      Cookies.set("ecom_url_slug", vendorSlugResponse?.data?.ecom_url_slug);
      Cookies.set(
        "vendors_id",
        vendorSlugResponse?.data?.vendor_data?.vendors_id
      );
      Cookies.set(
        "ecommerce_vendor_id",
        vendorSlugResponse?.data?.vendor_data?.ecommerce_vendor_id
      );
      setVendorSlug(vendorSlugResponse);
    }
  }, [vendorSlugResponse]);

  useEffect(() => {
    if (homePageResponse) {
      setHomePageDetails(homePageResponse);
    }
  }, [homePageResponse]);

  const [areaDetails, setAreaDetails] = useState({
    type: "delivery",
    data: {},
    area: "",
    branch: "",
    branch_id: "",
    area_id: estoreBranchesResponse?.data[0]?.area_ids[0] || "1",
    branchForArea: {},
    deliveryTiming: "",
    pickupTiming: "",
    customDelivery: false,
    getDeliveryTiming: moment().add(2, "hours").toDate(),
    laterDeliveryTiming: moment().add(2, "hours").toDate(),
    laterPickupTiming: moment().add(2, "hours").toDate(),
    now: 1,
    ar_area: "",
    ar_branch: "",
    ar_deliveryTiming: "",
    ar_pickupTiming: "",
    shopOpen: 1,
    minimum: "",
    branch_lat: "",
    branch_lng: "",
  });
  const handleAreaDetailsChange = (value) => setAreaDetails(value);

  const [cart, setCart] = useState({});
  const handleCartChange = (value) => setCart(value);

  const [userDetails, setUserDetails] = useState({
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    firstname_ar: "",
    lastname_ar: "",
    mobilenumber: "",
    country_code: "",
    is_guest: false,
    is_social: false,
  });
  const handleUserDetailsChange = (value) => setUserDetails(value);

  const [contactDetails, setContactDetails] = useState({
    name: "",
    phoneCode: "KW",
    phone: "",
    email: "",
    model: "",
    color: "",
    license: "",
  });
  const handleContactDetailsChange = (value) => setContactDetails(value);

  const [internationalDelivery, setInternationalDelivery] = useState({
    country_name: "Kuwait",
    country_code: "KW",
    currency: "",
    currency_name: "",
    is_interNational: 0,
    city: "",
    region: "",
    delivery_country: "Kuwait",
    delivery_country_code: "KW",
    delivery_state: "",
    delivery_state_code: "",
    delivery_city: "",
    delivery_city_code: "",
    delivery_address1: "",
    delivery_address2: "",
    delivery_zipCode: "",
    delivery_specialInstruction: "",
    country_id: "1",
    delivery_expected_time: "",
    delivery_expected_type: "",
  });
  const handleInternationalDeliveryChange = (value) =>
    setInternationalDelivery(value);

  const [addressDetails, setAddressDetails] = useState({
    block: "",
    street: "",
    avenue: "",
    house: "",
    floor: "",
    flat: "",
    special_directions: "",
    lat: 29.378,
    lng: 47.99,
    fixedLat: 29.378,
    fixedLng: 47.99,
    addressString: "",
    addressType: "1",
  });
  const handleAddressDetailsChange = (value) => setAddressDetails(value);

  const [openArea, setOpenArea] = useState({ open: false, route: "/" });
  const handleOpenAreaChange = (value) => setOpenArea(value);
  const [search, setSearch] = useState("");
  const handleSearchProduct = (value) => setSearch(value);
  useEffect(() => {
    if (window && !localStorage.getItem("userID")) {
      let result = "";
      let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (var i = 0; i < 10; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      localStorage.setItem("userID", result);
    }
  }, []);

  useEffect(() => {
    if (window && localStorage.getItem("cartTime")) {
      let prevTime = Date.parse(localStorage.getItem("cartTime"));
      let nowTime = new Date();
      let diff = Math.abs(prevTime - nowTime) / 3600000;
      if (diff > 2) {
        if (localStorage.getItem("userID")) {
          handleEmptyCart();
        }
      } else {
        if (localStorage.getItem("userID")) {
          handleUserCart();
        }
      }
    }
  }, [homePageDetails?.data]);

  const resetUserDetails = () => {
    setAreaDetails({
      type:
        window.location.host.replace(/^www\./, "") !== "shop.playon.today"
          ? "delivery"
          : "pickup",
      data: { ...areaDetails.data },
      area: "",
      branch: "",
      branch_id: "",
      area_id: "",
      branchForArea: {},
      deliveryTiming: "",
      pickupTiming: "",
      customDelivery: false,
      getDeliveryTiming: moment().add(2, "hours").toDate(),
      laterDeliveryTiming: moment().add(2, "hours").toDate(),
      laterPickupTiming: moment().add(2, "hours").toDate(),
      now: 1,
      ar_area: "",
      ar_branch: "",
      ar_deliveryTiming: "",
      ar_pickupTiming: "",
      shopOpen: 1,
      minimum: "",
      branch_lat: "",
      branch_lng: "",
    });
    setCart({});
    setAddressDetails({
      block: "",
      street: "",
      avenue: "",
      house: "",
      floor: "",
      flat: "",
      special_directions: "",
      lat: 29.378,
      lng: 47.99,
      fixedLat: 29.378,
      fixedLng: 47.99,
      addressString: "",
      addressType: "1",
    });
    setContactDetails({
      name: "",
      phoneCode: "KW",
      phone: "",
      email: "",
      model: "",
      color: "",
      license: "",
    });
    setPayment(1);
    setUserDetails({
      id: "",
      email: "",
      firstname: "",
      lastname: "",
      firstname_ar: "",
      lastname_ar: "",
      mobilenumber: "",
      country_code: "",
      is_guest: false,
      is_social: false,
    });
    localStorage.removeItem("contactInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("cartTime");
    localStorage.removeItem("newPath");
  };

  useEffect(() => {
    if (vendorSlug?.status && homePageDetails?.data) {
      const categoriesData = ["10", "13", "16"].includes(
        vendorSlug?.data?.vendor_data?.home_page_type
      )
        ? homePageDetails?.data?.categories
        : homePageDetails?.data?.categories?.filter(
            (category) => category?.products?.length != 0
          );
      handleHomePageDetailsChange({
        ...vendorSlug?.data,
        categories: categoriesData,
      });

      if (document) {
        document.documentElement.style.setProperty(
          "--vendor-color",
          vendorSlug?.data?.vendor_data?.vendor_color
        );
      }
    }
  }, [vendorSlug, homePageDetails?.data]);

  useEffect(() => {
    if (deliveryResponse?.status) {
      setAreaDetails((areaDetails) => ({
        ...areaDetails,
        data: { ...areaDetails.data, ...deliveryResponse.data },
      }));
    }
    if (estoreBranchesResponse?.status) {
      if (
        estoreBranchesResponse.data ||
        estoreBranchesResponse.data?.length != 0
      ) {
        let b = estoreBranchesResponse.data.map((l, q) => {
          let diff = Math.abs(
            moment(l.office_start_time, "HH:mm:ss").diff(
              moment(l.office_end_time, "HH:mm:ss"),
              "minutes"
            )
          );
          return {
            ...l,
            office_end_time:
              diff == 1 || diff == 1439 ? "23:59:59" : l.office_end_time,
            office_start_time:
              diff == 1 || diff == 1439 ? "00:00:00" : l.office_start_time,
          };
        });
        let autoBranch = {};
        if (
          estoreBranchesResponse.data.length == 1 &&
          vendorSlug === "alawael-bilingual-school"
        ) {
          const value = getBranchForAlawael();
          autoBranch = value;
        }
        setAreaDetails((areaDetails) => ({
          ...areaDetails,
          data: { ...areaDetails.data, branch: b },
          ...autoBranch,
        }));
      }
    }
  }, [deliveryResponse, estoreBranchesResponse]);

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("contactInfo") &&
      vendorSlugResponse?.data?.vendor_data
    ) {
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("contactInfo")
      ) {
        (async () => {
          const contactInfo = JSON.parse(localStorage.getItem("contactInfo"));
          const response = await GetUserDetails({
            vendor_id: vendorSlugResponse?.data?.vendor_data?.vendors_id,
            sendSMS: false,
            country_code: `+${tele[contactInfo.code]}`,
            phone_number: contactInfo.phone,
            jwt_token: localStorage.getItem("token"),
            user_id: localStorage.getItem("id"),
            language: language,
          });
          if (response?.status) {
            setUserDetails({ ...response?.data });
            setContactDetails((contactDetails) => ({
              ...contactDetails,
              name: response?.data?.name,
              email: response?.data?.email,
              phone: contactInfo.phone,
              phoneCode: contactInfo.code,
            }));
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("contactInfo");
            resetUserDetails();
          }
        })();
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("contactInfo");
      }
    }
  }, [vendorSlugResponse?.data?.vendor_data]);

  const handleEmptyCart = async () => {
    const response = await emptyUserCart({
      vendorSlug: vendorSlugResponse?.data?.ecom_url_slug,
      vendor_id: vendorSlugResponse?.data?.vendor_data?.vendors_id,
      user_string: localStorage.getItem("userID"),
    });
    if (response?.status) {
      if (!response.data?.cartCount == 0) {
        setCart(response.data);
      }
    }
  };

  const handleUserCart = async () => {
    const response = await getUserCart({
      vendorSlug: vendorSlugResponse?.data?.ecom_url_slug,
      vendor_id: vendorSlugResponse?.data?.vendor_data?.vendors_id,
      user_string: localStorage.getItem("userID"),
      area_id: areaDetails?.area_id,
    });
    if (response?.status) {
      if (!response.data?.cartCount == 0) {
        setCart(response.data);
      }
    }
  };
  const getBranchForAlawael = async () => {
    // return await getBranch(
    //   estoreBranchesResponse.data[0]?.name,
    //   estoreBranchesResponse.data[0]?.arabic_name,
    //   estoreBranchesResponse.data[0]?.id,
    //   estoreBranchesResponse.data[0]?.area_ids[0] ?? 1,
    //   estoreBranchesResponse
    // );
  };

  const [layout14ToggleView, setLayout14ToggleView] = useState(false);
  const handleSetLayout14ToggleViewChange = (value) =>
    setLayout14ToggleView(value);

  const [layout17ToggleView, setLayout17ToggleView] = useState(false);
  const handleSetLayout17ToggleViewChange = (value) =>
    setLayout17ToggleView(value);

  const [searchItems, setSearchItems] = useState([]);
  const handleSearchItemsChange = (value) => setSearchItems(value);

  const [searchLoading, setSearchLoading] = useState(false);
  const handleSearchLoadingChange = (value) => setSearchLoading(value);

  const [isPageLoading, setIsPageLoading] = useState(false);
  const handleIsPageLoadingChange = (value) => setIsPageLoading(value);

  const [page, setPage] = useState(0);
  const handlePageChange = (value) => setPage(value);

  const [hasMore, setHasMore] = useState(0);
  const handleHasMoreChange = (value) => setHasMore(value);

  const [activeBackgroundColor, setActiveBackgroundColor] = useState("#f2f2f2");
  const handleActiveBackgroundColor = (value) =>
    setActiveBackgroundColor(value);

  const [deliveryKm, setDeliveryKm] = useState();
  const handleDeliveryKm = (value) => setDeliveryKm(value);

  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const handleDeliveryCharge = (value) => setDeliveryCharge(value);

  const [companyData, setCompanyData] = useState();
  const handleCompanyData = (value) => setCompanyData(value);

  const [sideMenuDrawer, setSideMenuDrawer] = useState(false);
  const handleSideMenuDrawer = (value) => setSideMenuDrawer(value);

  const store = {
    language,
    handleLanguageChange,
    vendorSlug,
    handleVendorSlugChange,
    homePageDetails,
    handleHomePageDetailsChange,
    areaDetails,
    handleAreaDetailsChange,
    cart,
    handleCartChange,
    userDetails,
    handleUserDetailsChange,
    contactDetails,
    handleContactDetailsChange,
    internationalDelivery,
    handleInternationalDeliveryChange,
    resetUserDetails,
    openArea,
    handleOpenAreaChange,
    addressDetails,
    handleAddressDetailsChange,
    payment,
    handleSetPaymentChange,
    search,
    handleSearchProduct,
    layout14ToggleView,
    handleSetLayout14ToggleViewChange,
    layout17ToggleView,
    handleSetLayout17ToggleViewChange,
    searchItems,
    handleSearchItemsChange,
    searchLoading,
    handleSearchLoadingChange,
    isPageLoading,
    handleIsPageLoadingChange,
    page,
    handlePageChange,
    hasMore,
    handleHasMoreChange,
    activeBackgroundColor,
    deliveryKm,
    handleDeliveryKm,
    deliveryCharge,
    handleDeliveryCharge,
    companyData,
    handleCompanyData,
    sideMenuDrawer,
    handleSideMenuDrawer,
  };

  return (
    <AppContext.Provider value={store}>
      {vendorSlugResponse?.data?.ecom_url_slug ? (
        <Box
          sx={{
            fontFamily:
              language === "ltr" ? "SFT Schrifted Sans TRIAL Var" : "Orleen",
          }}
        >
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
            libraries={["drawing", "geometry", "places"]}
            loadingElement={
              <Customloader vendorData={vendorSlugResponse?.data} />
            }
          >
            <SnackbarProvider
              anchorOrigin={{ horizontal: "left", vertical: "top" }}
            >
              {children}
            </SnackbarProvider>
          </LoadScript>
        </Box>
      ) : (
        <NoVendor />
      )}
    </AppContext.Provider>
  );
};
