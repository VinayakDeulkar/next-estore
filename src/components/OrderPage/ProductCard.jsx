import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import Divider from "../Divider/Divider";

const ProductCard = ({ product, isLast }) => {
  const { language, homePageDetails } = useContext(AppContext);
  return (
    <div className="cart-card-product-div">
      <div className="cart-card-product-mainDiv">
        <div>
          <img
            src={product?.product_img}
            className={`product-detail-image ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme-border"
            }`}
          />
        </div>
        <div>
          <div className="order-status-product-div">
            <div className="order-status-quantity-div">{product.quantity}x</div>
            <div>
              <div className="order-status-product-name">
                {language === "ltr"
                  ? product.english_name
                  : product.arabic_name}
              </div>
              {product?.addOns?.map((i) => (
                <div className="order-status-product-notes" key={i?.item}>
                  {language == "ltr" ? i?.item : i?.item_ar}
                </div>
              ))}
              {product?.variation_name ? (
                <div className="order-status-product-notes">
                  {product?.variation_name}
                </div>
              ) : null}
              {product?.offer_applied == 1 && (
                <div className="order-status-product-offer">
                  {language == "ltr"
                    ? product?.offer_message
                    : product?.offer_message_ar}
                </div>
              )}
              <div className="order-status-price-div">
                {(product?.discount_applied == 1 ||
                  (product?.offer_applied == 1 &&
                    product?.stripe_amount != 0)) && (
                  <>
                    <span className="order-status-product-discount">
                      {product?.stripe_amount
                        ? Number(product?.stripe_amount).toLocaleString(
                            "en-KW",
                            {
                              minimumFractionDigits: 3,
                              maximumFractionDigits: 3,
                            }
                          )
                        : 0}{" "}
                      {language === "rtl" ? "د.ك" : "KD"}
                    </span>
                  </>
                )}
                <div>
                  <span>
                    {product?.original_price
                      ? Number(product?.original_price).toLocaleString(
                          "en-KW",
                          {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                          }
                        )
                      : 0}
                  </span>{" "}
                  {language === "rtl" ? "د.ك" : "KD"}
                </div>
              </div>
            </div>
          </div>
          {!isLast && <Divider />}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
