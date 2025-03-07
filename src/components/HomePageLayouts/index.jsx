import React from "react";
import Layout15 from "./Layout15";
import Layout11 from "./Layout11";

const HomePageLayouts = ({ homePageDetails }) => {

  const renderLayoutType = (categories) => {
    switch (homePageDetails?.vendor_data?.home_page_type) {
      case "11":
        return <Layout11 categories={categories} />;

      case "15":
        return <Layout15 categories={categories} />;

      default:
        break;
    }
  };

  return <>{renderLayoutType(homePageDetails?.categories)}</>;
};

export default HomePageLayouts;
