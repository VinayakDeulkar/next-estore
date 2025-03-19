import React from "react";
import Layout15 from "./Layout15";
import Layout11 from "./Layout11";
import "../custom.css";
import Layout13 from "./Layout13";
import Layout16 from "./Layout16";
import Layout12 from "./Layout12";

const HomePageLayouts = ({ homePageDetails }) => {
  const renderLayoutType = (categories) => {
    switch (homePageDetails?.vendor_data?.home_page_type) {
      case "11":
        return <Layout11 categories={categories} />;

      case "12":
        return <Layout12 categories={categories} />;

      case "10":
      case "13":
      case "16":
        return <Layout13 categories={categories} />;

      case "15":
        return <Layout15 categories={categories} />;

      default:
        break;
    }
  };

  return <>{renderLayoutType(homePageDetails?.categories)}</>;
};

export default HomePageLayouts;
