import { Card, CardContent, CardMedia } from "@mui/material";
import React from "react";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";

const HorizontalCard = ({ product }) => {
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        padding: "15px 20px",
        gap: "20px",
        boxShadow: "none",
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
            sx={{
              fontSize: "12px",
              fontWeight: 300,
              backgroundColor: product?.label_color,
              color: "#fff",
              position: "absolute",
              left: 0,
              width: "100px",
              textAlign: "center",
              marginLeft: "40px",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
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
              marginTop: "2px",
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
        ) : null}
        {product?.product_type != 0 ? (
          <div>
            {product?.offer_applied == 1 ? (
              <TypographyConverter
                sx={{ fontSize: "15px", color: item?.color }}
                enText={product?.offer_msg}
                arText={product?.offer_msg_ar}
              />
            ) : null}
            {product?.product_status == 0 ? (
              <TypographyConverter
                sx={{
                  color: "red",
                  fontSize: "15px",
                }}
                enText={product?.status_label}
                arText={product?.status_label_ar}
              />
            ) : product?.price_on_selection == 1 ? (
              <TypographyConverter
                sx={{
                  fontSize: "15px",
                }}
                enText="Price On Selection"
                arText="السعر حسب الاختيار"
              />
            ) : product?.prodyct_type == 2 ? (
              <TypographyConverter
                sx={{
                  borderRadius: "30px",
                  fontSize: "15px",
                  padding: "0 15px",
                  color: "#818181",
                  border: "2px solid #818181",
                  marginTop: "7px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "auto",
                }}
                enText="Product Registration only"
                arText="حجز المنتج فقط"
              />
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default HorizontalCard;
