import { Card, CardContent, CardMedia } from "@mui/material";
import React, { useContext } from "react";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";
import { useRouter } from "next/navigation";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";
import { AppContext } from "@/context/AppContext";

const CategoryCard = ({ category }) => {
  const { homePageDetails } = useContext(AppContext);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products?id=${category?.category_slug}`);
  };

  const rendorCategoryCard = () => {
    switch (homePageDetails?.vendor_data?.home_page_type) {
      case "11":
        return (
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "none",
              width: "100%",
              display: "flex",
              gap: "18px"
            }}
            onClick={handleCardClick}
          >
            <CardMedia
              component="img"
              height="200"
              image={category?.category_image}
              alt={category?.category_name}
              style={{
                width: "125px",
                height: "125px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <CardContent sx={{ padding: "0" }}>
              <SubHeadline
                enText={category?.category_name}
                arText={category?.category_name_ar}
              />
            </CardContent>
          </Card>
        );

      case "10":
      case "13":
      case "15":
        return (
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "none",
              width: "100%",
            }}
            onClick={handleCardClick}
          >
            <CardMedia
              component="img"
              height="200"
              image={category?.category_image}
              alt={category?.category_name}
              style={{
                maxWidth: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <CardContent sx={{ padding: "0", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <SubHeadline
                enText={category?.category_name}
                arText={category?.category_name_ar}
              />
            </CardContent>
          </Card>
        );
    }
  };

  return <>{rendorCategoryCard()}</>;
};

export default CategoryCard;
