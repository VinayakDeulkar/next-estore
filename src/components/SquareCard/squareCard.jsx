import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";

const SquareCard = ({ product }) => {
  const language = useContext(AppContext);
  console.log(product, "product");
  return (
    <Card
      sx={{
        cursor: "pointer",
        boxShadow: "none",
        width: "100%",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product?.image}
        alt={product?.product_name}
        style={{
          maxWidth: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />
      <CardContent
        sx={{
          padding: "0",
          "&:last-child": {
            paddingBottom: "0",
          },
        }}
      >
        {product?.label ? (
          <TypographyConverter
            sx={{ fontSize: "12px", fontWeight: 300 }}
            enText={product?.label}
            arText={product?.label_ar}
          />
        ) : null}
        <TypographyConverter
          sx={{ fontSize: "16px", fontWeight: 400 }}
          enText={product?.product_name}
          arText={product?.product_name_ar}
        />
        {product?.short_description != "" ? (
          <TypographyConverter
            sx={{ fontSize: "14px", fontWeight: 300, color: "#888888" }}
            enText={product?.short_description
              ?.replace(/(<([^>]+)>)/gi, "")
              .replace(/\&nbsp;/gi, "")
              .replace(/\s\s+/g, " ")
              .replace(/&#39;/gi, "'")}
            arText={product?.short_description_ar
              ?.replace(/(<([^>]+)>)/gi, "")
              .replace(/\&nbsp;/gi, "")
              .replace(/\s\s+/g, " ")
              .replace(/&#39;/gi, "'")}
          />
        ) : null}
        {product?.product_type != 0 ? (
          <div>
            {product?.product_status == 0 ? (
              <TypographyConverter
                enText={product?.status_label}
                arText={product?.status_label_ar}
              />
            ) : product?.price_on_selection == 1 ? (
              <Link href={""}>
                <TypographyConverter
                  enText="Price On Selection"
                  arText="السعر حسب الاختيار"
                />
              </Link>
            ) : product?.prodyct_type == 2 ? (
              <Link href={""}>
                <TypographyConverter
                  enText="Product Registration only"
                  arText="حجز المنتج فقط"
                />
              </Link>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default SquareCard;
