import { Card, CardContent, CardMedia } from "@mui/material";
import React from "react";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";
import { useRouter } from "next/navigation";

const CategoryCard = ({ category }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products?id=${category?.category_slug}`);
  }

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
      <CardContent sx={{padding: "0"}}>
        <TypographyConverter
          sx={{ fontSize: "17px", fontWeight: "600", textAlign: "center" }}
          enText={category?.category_name}
          arText={category?.category_name_ar}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
