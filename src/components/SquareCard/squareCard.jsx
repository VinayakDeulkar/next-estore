import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import styles from "./squareCard.module.css";

const SquareCard = ({ product }) => {
  const language = useContext(AppContext);
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
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {product?.label ? (
          <TypographyConverter
            sx={{ fontSize: "12px", fontWeight: 300, textAlign: "center" }}
            enText={product?.label}
            arText={product?.label_ar}
          />
        ) : null}
        <TypographyConverter
          sx={{ fontSize: "16px", fontWeight: 400, textAlign: "center" }}
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
                textAlign: "center",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                width: "90%",
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
        {product?.product_type != 0 ? (
          <div>
            {product?.product_status == 0 ? (
              <TypographyConverter
                sx={{
                  borderRadius: "30px",
                  fontSize: language == "ltr" ? 12 : 15,
                  padding: "0 15px",
                  color: "#818181",
                  border: "2px solid #818181",
                  marginTop: "7px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "auto",
                }}
                enText={product?.status_label}
                arText={product?.status_label_ar}
              />
            ) : product?.price_on_selection == 1 ? (
              <Link href={""}>
                <TypographyConverter
                  sx={{
                    borderRadius: "30px",
                    fontSize: language == "ltr" ? 12 : 15,
                    padding: "0 15px",
                    color: "#818181",
                    border: "2px solid #818181",
                    marginTop: "7px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "auto",
                  }}
                  enText="Price On Selection"
                  arText="السعر حسب الاختيار"
                />
              </Link>
            ) : product?.prodyct_type == 2 ? (
              <Link href={""}>
                <TypographyConverter
                  sx={{
                    borderRadius: "30px",
                    fontSize: language == "ltr" ? 12 : 15,
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
              </Link>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default SquareCard;
