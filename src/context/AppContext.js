"use client";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SnackbarProvider } from "notistack";

export const AppContext = createContext();

export const AppProvider = ({
  vendorSlugResponse,
  homePageResponse,
  children,
}) => {
  const [language, setLanguage] = useState("ltr");
  const handleLanguageChange = (lng) => {
    localStorage.setItem("language", lng);
    setLanguage(lng);
  };

  const [vendorSlug, setVendorSlug] = useState();
  const handleVendorSlugChange = (value) => setVendorSlug(value);

  const [homePageDetails, setHomePageDetails] = useState();
  const handleHomePageDetailsChange = (value) => setHomePageDetails(value);
  useEffect(() => {
    if (vendorSlugResponse) {
      Cookies.set("ecom_url_slug", vendorSlugResponse?.data?.ecom_url_slug);
      Cookies.set(
        "vendors_id",
        vendorSlugResponse?.data?.vendor_data?.vendors_id
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

  const [openArea, setOpenArea] = useState({ open: false, goHome: false });
  const handleOpenAreaChange = (value) => setOpenArea(value);

  const resetUserDetails = () => {
    setAreaDetails({
      type:
        window.location.host.replace(/^www\./, "") !== "shop.playon.today"
          ? "delivery"
          : "pickup",
      data: {},
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
    if ((vendorSlug?.status, homePageDetails?.data)) {
      handleHomePageDetailsChange({
        ...vendorSlug?.data,
        categories: ["10", "13", "16"].includes(
          vendorSlug?.data?.vendor_data?.home_page_type
        )
          ? homePageDetails?.data?.categories
          : homePageDetails?.data?.categories?.filter(
              (category) => category?.products?.length != 0
            ),
      });

      if (document) {
        document.documentElement.style.setProperty(
          "--vendor-color",
          vendorSlug?.data?.vendor_data?.vendor_color
        );
      }
    }
  }, [vendorSlug, homePageDetails?.data]);

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
    handleAddressDetailsChange
  };

  return (
    <AppContext.Provider value={store}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </AppContext.Provider>
  );
};
