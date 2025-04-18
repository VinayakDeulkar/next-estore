import React, { useState } from "react";
import Layout15 from "./Layout15";
import Layout11 from "./Layout11";
import "../custom.css";
import Layout13 from "./Layout13";
import Layout12 from "./Layout12";
import Layout14 from "./Layout14";

const HomePageLayouts = ({ homePageDetails }) => {
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

  return <>{renderLayoutType(homePageDetails?.categories)}</>;
};

export default HomePageLayouts;
