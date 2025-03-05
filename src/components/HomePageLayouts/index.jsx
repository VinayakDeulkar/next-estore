import React from "react";
import Layout15 from "./Layout15";

const HomePageLayouts = ({ homePageDetails }) => {
  const renderLayoutType = (categories) => {
    switch (homePageDetails?.vendor_data?.home_page_type) {
      case "15":
        return <Layout15 categories={categories} />;

      default:
        break;
    }
  };
  console.log(homePageDetails?.vendor_data?.home_page_type, "homePageDetails");
  return <>{renderLayoutType(homePageDetails?.categories)}</>;
};

export default HomePageLayouts;
