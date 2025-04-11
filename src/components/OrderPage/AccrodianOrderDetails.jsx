import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import ProductCard from "./ProductCard";
import SubTitle from "../common/SubTitle/subTitle";
import Title from "../common/Title/Title";

export const AccrodianOrderDetails = ({ orderDetails }) => {
  const { language, homePageDetails } = useContext(AppContext);
  return (
    <div>
      {orderDetails?.cartItems &&
        orderDetails?.cartItems.map((product, i) => (
          <ProductCard
            product={product}
            key={i}
            isLast={i === orderDetails.cartItems.length - 1}
          />
        ))}
      <div className="details-common-mainDIv" style={{ padding: "0 10px" }}>
        <SubTitle enText={"Sub Total"} arText={"الإجمالي"} />
        <div className="details-common-seconddiv">
          <span>
            {orderDetails?.subTotal
              ? parseFloat(orderDetails?.subTotal).toFixed(3)
              : 0}
          </span>{" "}
          {language === "rtl" ? "د.ك" : "KD"}
        </div>
      </div>
      {orderDetails?.delivery_charge &&
      orderDetails?.customer_details?.self_pickup !== "1" ? (
        <div className="details-common-mainDIv" style={{ padding: "0 10px" }}>
          <SubTitle enText={"Delivery Charges"} arText={"رسوم التوصيل"} />
          <div className="details-common-seconddiv">
            <span>
              {orderDetails?.delivery_charge
                ? parseFloat(orderDetails?.delivery_charge).toFixed(3)
                : 0}
            </span>{" "}
            {language === "rtl" ? "د.ك" : "KD"}
          </div>
        </div>
      ) : null}
      {orderDetails.promo_code_price ? (
        <div
          className="details-common-mainDIv"
          style={{ padding: "0 10px", color: "red" }}
        >
          <div className="details-common-seconddiv">
            {language === "ltr" ? "Discount" : "خصم الرمز الترويجي"}
          </div>
          <div className="details-common-seconddiv">
            <span>
              {orderDetails?.promo_code_price
                ? parseFloat(orderDetails?.promo_code_price).toFixed(3)
                : 0}
            </span>{" "}
            {language === "rtl" ? "د.ك" : "KD"}
          </div>
        </div>
      ) : null}
      <div
        className={`order-status-total-div ${
          homePageDetails?.vendor_data?.home_page_type === "18" &&
          "fashion-theme-border"
        }`}
      >
        <Title enText={"Total Payment"} arText={"المبلغ الإجمالي"} />
        <div>
          <span>{parseFloat(orderDetails?.total_amount ?? 0).toFixed(3)}</span>{" "}
          {language === "rtl" ? "د.ك" : "KD"}
        </div>
      </div>
    </div>
  );
};
