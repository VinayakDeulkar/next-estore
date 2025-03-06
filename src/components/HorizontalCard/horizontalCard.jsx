import { Card, CardContent, CardMedia } from "@mui/material";
import React from "react";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";

const HorizontalCard = ({ product }) => {
  console.log(product);
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "15px 20px",
        gap: "20px",
        boxShadow: "none"
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product?.image}
        alt={product?.product_name}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "8px",
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
          sx={{ fontSize: "16px", fontWeight: 400, top: "0" }}
          enText={product?.product_name}
          arText={product?.product_name_ar}
        />
        {product?.short_description != "" ? (
          <div>
            <TypographyConverter
              sx={{
                fontSize: "14px",
                fontWeight: 300,
                color: "#888888",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                width: "100%",
                margin: "0 auto",
              }}
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
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default HorizontalCard;
