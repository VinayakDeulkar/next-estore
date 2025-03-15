"use client";
import TypographyConverter from "@/components/common/TypographyConveter/TypographyConverter";
import { AppContext } from "@/context/AppContext";
import { Box, Card, CardContent } from "@mui/material";
import React, { useContext } from "react";

const ProductDetails = ({ product }) => {
  const { language } = useContext(AppContext);
  return (
    <Box>
      <Card>
        <CardContent sx={{ padding: "0" }}>
          <TypographyConverter
            sx={{ fontSize: "17px", fontWeight: "600", textAlign: "center" }}
            enText={product?.name}
            arText={product?.name_ar}
          />
        </CardContent>
      </Card>
      <div className="details-container pt-2">
        <div className="product-outer-div">
          <div className="product-inner-div">
            <h3 className="product-name">
              {language === "ltr" ? product?.name : product?.name_ar}
            </h3>
            {product?.offer_applied == 1 ? (
              <h3
                className="product-name"
                style={{ color: product?.offer_color }}
              >
                {language === "ltr"
                  ? product?.offer_msg
                  : product?.offer_msg_ar}
              </h3>
            ) : null}
            <p className="product-category mt-3">
              {language === "ltr"
                ? product.category_name
                : product?.category_name_ar}
              {/* {navigator.share && (
                <button className="sharewith" onClick={() => onShareClick()}>
                  <i className="fa fa-arrow-up" aria-hidden="true"></i>{" "}
                  {language === "ltr" ? "Share this page" : "شارك هذا الرابط"}
                </button>
              )} */}
            </p>
            {(product?.variation_id != "" &&
              productvariationPrice?.[addedVariaton.toString()]?.sku) ||
            (product?.sku != "" && product?.sku) ? (
              <pre className="product-category mt-2 mb-0">
                {" "}
                <span className="sharewith">
                  SKU{" "}
                  {product?.variation_id != ""
                    ? productvariationPrice?.[addedVariaton.toString()]?.sku
                      ? productvariationPrice?.[addedVariaton.toString()]?.sku
                      : product?.sku
                    : product?.sku}
                </span>
              </pre>
            ) : null}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ProductDetails;
