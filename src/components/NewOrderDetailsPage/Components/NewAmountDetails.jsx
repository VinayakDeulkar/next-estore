import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";

const NewAmountDetails = ({ onConfirmOrder }) => {
  const { cart, language, areaDetails, homePageDetails, payment } =
    useContext(AppContext);

  return (
    <div className="acmount-mainDIv">
      <div className="pt-2" style={{ marginBottom: "40px" }}>
        <div className="amount-sub-div">
          <div className="amount-sub-label">
            {language == "ltr" ? "Sub Total" : "الإجمالي"}
          </div>
          <div className="amount-sub-amount">
            <span>
              {cart?.subTotal ? parseFloat(cart?.subTotal).toFixed(3) : 0}
            </span>{" "}
            {language === "rtl" ? "د.ك" : "KD"}
          </div>
        </div>
        {cart?.promocode_applied == 1 ? (
          <div className="amount-sub-div">
            <div className="amount-discount">
              {language == "ltr" ? "Promo Code Discount" : "خصم الرمز الترويجي"}
            </div>
            <div className="amount-discount">
              <span>
                {" "}
                {parseFloat(-cart?.promo_code_discount_price).toFixed(3)}
              </span>{" "}
              {language === "rtl" ? "د.ك" : "KD"}
            </div>
          </div>
        ) : null}

        {areaDetails?.type == "delivery" &&
        homePageDetails?.vendor_data?.vendors_id != "1250" ? (
          <div className="amount-sub-div">
            <div className="amount-sub-label">
              {language == "ltr" ? "Delivery Charges" : "رسوم التوصيل"}
            </div>
            <div className="amount-sub-amount">
              <span>
                {cart?.deliveryCharge
                  ? parseFloat(cart?.deliveryCharge).toFixed(3)
                  : 0}
              </span>{" "}
              {language === "rtl" ? "د.ك" : "KD"}
            </div>
          </div>
        ) : null}
        {!(payment == 3) && cart?.serviceChargeTo == 2 ? (
          <div className="amount-sub-div">
            <div className="amount-sub-label">
              {language == "ltr" ? "Service Charges" : "رسوم الخدمات"}
            </div>
            <div className="amount-sub-amount">
              {payment == 1 ? (
                <span>
                  {cart?.knetServiceCharge
                    ? parseFloat(cart?.knetServiceCharge).toFixed(3)
                    : 0}
                </span>
              ) : null}
              {payment == 2 ? (
                <span>
                  {cart?.creditCardServiceCharge
                    ? parseFloat(cart?.creditCardServiceCharge).toFixed(3)
                    : 0}
                </span>
              ) : null}
              {payment == 3 ? (
                <span>
                  {cart?.codServiceCharge
                    ? parseFloat(cart?.codServiceCharge).toFixed(3)
                    : 0}
                </span>
              ) : null}{" "}
              {language === "rtl" ? "د.ك" : "KD"}
            </div>
          </div>
        ) : null}
        <div className="amount-sub-div">
          <div className="amount-sub-label-total">
            {language == "ltr" ? "Total" : "المجموع"}
          </div>

          <div className="amount-sub-amount-total">
            <span>
              {
                /* parseFloat( */
                areaDetails?.type == "delivery"
                  ? payment == 1
                    ? cart?.knetTotal
                    : payment == 2
                    ? cart?.creditCardTotal
                    : cart?.codTotal
                  : payment == 1
                  ? cart?.knetSelfPickUp
                  : payment == 2
                  ? cart?.creditCardSelfPickUp
                  : cart?.codSelfPickUp
                /* ).toFixed(3) */
              }
            </span>{" "}
            {language === "rtl" ? "د.ك" : "KD"}
          </div>
        </div>
      </div>
      <button
        className={`pay-now-button ${
          homePageDetails?.vendor_data?.home_page_type === "18" && "fashion-theme-pay-button"
        }`}
        onClick={(e) => {
          e.preventDefault();
          if (
            parseFloat(cart?.subTotal) >=
            (homePageDetails?.vendor_data?.minimum_charge != "" ||
            (areaDetails?.minimum != "" && areaDetails?.minimum)
              ? homePageDetails?.vendor_data?.minimum_charge != ""
                ? parseFloat(homePageDetails?.vendor_data?.minimum_charge)
                : parseFloat(areaDetails?.minimum)
              : 0)
          )
            onConfirmOrder();
        }}
      >
        {parseFloat(cart?.subTotal) >=
        (homePageDetails?.vendor_data?.minimum_charge != "" ||
        (areaDetails?.minimum != "" && areaDetails?.minimum)
          ? homePageDetails?.vendor_data?.minimum_charge != ""
            ? parseFloat(homePageDetails?.vendor_data?.minimum_charge)
            : parseFloat(areaDetails?.minimum)
          : 0)
          ? language == "ltr"
            ? payment == 1 || payment == 2 || payment == 4
              ? "Pay"
              : "Buy"
            : payment == 1 || payment == 2 || payment == 4
            ? "ادفع"
            : "شراء"
          : language == "ltr"
          ? `Minimum Order is ${
            homePageDetails?.vendor_data?.minimum_charge != ""
                ? homePageDetails?.vendor_data?.minimum_charge
                  ? parseFloat(homePageDetails?.vendor_data?.minimum_charge).toFixed(3)
                  : 0
                : areaDetails?.minimum
                ? parseFloat(areaDetails?.minimum).toFixed(3)
                : 0
            } KD`
          : `الحد الأدنى للطلب هو ${
            homePageDetails?.vendor_data?.minimum_charge != ""
                ? homePageDetails?.vendor_data?.minimum_charge
                  ? parseFloat(homePageDetails?.vendor_data?.minimum_charge).toFixed(3)
                  : 0
                : areaDetails?.minimum
                ? parseFloat(areaDetails?.minimum).toFixed(3)
                : 0
            } د.ك`}
      </button>
    </div>
  );
};

export default NewAmountDetails;
