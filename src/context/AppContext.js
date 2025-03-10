"use client";
import moment from "moment";
import { createContext, useEffect, useState } from "react";

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

  const [vendorSlug, setVendorSlug] = useState(vendorSlugResponse);
  const handleVendorSlugChange = (value) => setVendorSlug(value);

  const [homePageDetails, setHomePageDetails] = useState(homePageResponse);
  const handleHomePageDetailsChange = (value) => setHomePageDetails(value);

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
    handleCartChange
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
