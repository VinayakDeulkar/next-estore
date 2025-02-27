import React from "react";
import Layout15 from "./Layout15";

const HomePageLayouts = ({ homePageDetails }) => {
  const renderLayoutType = (categories) => {
    switch (homePageDetails?.vendor_data?.home_page_type) {
      case "15":
        return <Layout15 categories={categories} />;
        break;

      default:
        break;
    }
  };
  return <>{renderLayoutType(homePageDetails?.categories)}</>;
};

export default HomePageLayouts;
