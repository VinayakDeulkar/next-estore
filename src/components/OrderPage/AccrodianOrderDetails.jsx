import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import ProductCard from "./ProductCard";
import Title from "../common/Title/Title";
import NormalText from "../assetBoxDesign/NormalText/normalText";
import Notes from "../assetBoxDesign/Notes/notes";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";

export const AccrodianOrderDetails = ({ orderDetails }) => {
  const { language, homePageDetails, activeBackgroundColor } =
    useContext(AppContext);
  return (
    <div
      style={{
        border: "1px solid #e1e1e1",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "10px"
      }}
    >
      {orderDetails?.cartItems &&
        orderDetails?.cartItems.map((product, i) => (
          <ProductCard
            product={product}
            key={i}
            isLast={i === orderDetails.cartItems.length - 1}
          />
        ))}
      <div className="details-common-mainDIv" style={{ padding: "0 10px" }}>
        <NormalText enText={"Sub Total"} arText={"الإجمالي"} />
        <NormalText
          enText={`${
            orderDetails?.subTotal
              ? parseFloat(orderDetails?.subTotal).toFixed(3)
              : 0
          } KD`}
          arText={`${
            orderDetails?.subTotal
              ? parseFloat(orderDetails?.subTotal).toFixed(3)
              : 0
          } د.ك`}
        />
      </div>
      {orderDetails?.delivery_charge &&
      orderDetails?.customer_details?.self_pickup !== "1" ? (
        <div className="details-common-mainDIv" style={{ padding: "0 10px" }}>
          <NormalText enText={"Delivery Charges"} arText={"رسوم التوصيل"} />
          <NormalText
            enText={`${
              orderDetails?.delivery_charge
                ? parseFloat(orderDetails?.delivery_charge).toFixed(3)
                : 0
            } KD`}
            arText={`${
              orderDetails?.delivery_charge
                ? parseFloat(orderDetails?.delivery_charge).toFixed(3)
                : 0
            } د.ك`}
          />
        </div>
      ) : null}
      {orderDetails.promo_code_price ? (
        <div
          className="details-common-mainDIv"
          style={{ padding: "0 10px", color: "red" }}
        >
          <Notes enText={"Discount"} arText={"خصم الرمز الترويجي"} />
          <NormalText
            enText={`${
              orderDetails?.promo_code_price
                ? parseFloat(orderDetails?.promo_code_price).toFixed(3)
                : 0
            } KD`}
            arText={`${
              orderDetails?.promo_code_price
                ? parseFloat(orderDetails?.promo_code_price).toFixed(3)
                : 0
            } د.ك`}
          />
        </div>
      ) : null}
      <div
        className={`order-status-total-div ${
          homePageDetails?.vendor_data?.home_page_type === "18" &&
          "fashion-theme-border"
        }`}
        style={{ backgroundColor: activeBackgroundColor }}
      >
        <SubHeadline enText={"Total Payment"} arText={"المبلغ الإجمالي"} />
        <SubHeadline
          enText={`${
            orderDetails?.total_amount
              ? parseFloat(orderDetails?.total_amount).toFixed(3)
              : 0
          } KD`}
          arText={`${
            orderDetails?.total_amount
              ? parseFloat(orderDetails?.total_amount).toFixed(3)
              : 0
          } د.ك`}
        />
      </div>
    </div>
  );
};
