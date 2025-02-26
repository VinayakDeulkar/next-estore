"use client";
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

  useEffect(() => {
    if (vendorSlug?.status) {
      handleHomePageDetailsChange({
        ...vendorSlug?.data,
        categories: ["10", "13", "16"].includes(
          vendorSlug?.data?.vendor_data?.vendor?.home_page_type
        )
          ? homePageDetails?.data?.categories
          : homePageDetails?.data?.categories?.filter(
              (category) => category?.products?.length != 0
            ),
      });
    }
  }, [vendorSlug]);

  const store = {
    language,
    handleLanguageChange,
    vendorSlug,
    handleVendorSlugChange,
    homePageDetails,
    handleHomePageDetailsChange,
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
