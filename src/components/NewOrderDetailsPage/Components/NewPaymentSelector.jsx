import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

const NewPaymentSelector = ({ payment, setPayment, setWidth, width }) => {
  const { homePageDetails, language, internationalDelivery } =
    useContext(AppContext);
  const resizer = () => {
    setWidth((i) => document.getElementById("slider-width")?.offsetWidth);
  };
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent.toLowerCase();
      const isSafariBrowser = /iPhone|iPad|iPod|Macintosh/i.test(
        navigator.userAgent
      );
      setIsSafari(isSafariBrowser);
    }
  }, []);

  useEffect(() => {
    if (isSafari && homePageDetails?.vendor_data?.is_apple_pay?.length > 0) {
      setPayment(4);
    }
  }, [isSafari]);

  useEffect(() => {
    resizer();
    window.addEventListener("resize", resizer);
    return window.removeEventListener("resize", resizer, true);
  }, []);

  const getMethodsCount = () => {
    return (
      homePageDetails?.vendor_data?.is_apple_pay?.length > 0 &&
      isSafari &&
      homePageDetails?.vendor_data?.is_credit_card != 0 &&
      homePageDetails?.vendor_data?.is_cod == 1 &&
      (homePageDetails?.vendor_data?.international_delivery === "3" ||
        homePageDetails?.vendor_data?.international_delivery === "" ||
        internationalDelivery.delivery_country_code.toLowerCase() === "kw")
    );
  };
  return (
    <div>
      {/* <div className="delivery-payment-details-heading">
        {language === "ltr" ? "Payments Details" : "طرق الدفع"}
      </div>
      <div
        className={`payby-payzah-section ${homePageDetails?.vendor_data?.home_page_type === "18" && "fashion-theme-border"
          }`}
      >
        <div className="payby-text">
          {language === "ltr" ? "Payment provider" : "الدفع بواسطة"}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="pictures/newLogo.png" className="payby-image" />
        </div>
        <div className="payzah-text">
          {" "}
          {language === "ltr" ? "Payzah" : " بــيـزة"}
        </div>
      </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="checkout-page-text"
          style={{ marginTop: "25px", marginBottom: "5px" }}
        >
          {language === "ltr" ? "Payment Method" : "طريقة الدفع"}
        </div>
        <div style={{ marginTop: "10px" }}>
          <img
            src="pictures/PaymentProviderImage.png"
            style={{ height: "23px" }}
          />
        </div>
      </div>

      <div
        className={`payment-details-mainDiv ${
          getMethodsCount() ? "fourbuttons" : ""
        }`}
      >
        {console.log(getMethodsCount())}
        {homePageDetails?.vendor_data?.is_apple_pay?.length > 0 && isSafari ? (
          <Box
            onClick={(e) => {
              e.preventDefault();
              setPayment(4);
            }}
            className={`intro-flex payment-details-holder  ${
              payment == 4 ? "active" : ""
            }  ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme-border"
            }`}
          >
            <span className="del-ic" style={{ padding: 0 }}>
              <img
                style={{
                  width: "40px",
                  height: "30px",
                  objectFit: "contain",
                }}
                src={"pictures/newApplePayButton.png"}
                className="img-fluid"
              ></img>
            </span>
            <div className="payButtonText">
              {language === "ltr" ? "Apple Pay" : "أبل الدفع"}
            </div>
          </Box>
        ) : null}
        <Box
          id="slider-width"
          onClick={(e) => {
            e.preventDefault();
            setPayment(1);
          }}
          className={`intro-flex payment-details-holder  ${
            payment == 1 ? "active" : ""
          }  ${
            homePageDetails?.vendor_data?.home_page_type === "18" &&
            "fashion-theme-border"
          }`}
        >
          <span className="del-ic" style={{ padding: 0 }}>
            <img
              style={{ width: 38, height: 28 }}
              src={"pictures/knet icon mini.png"}
              className="img-fluid"
            ></img>
          </span>
          <div className="payButtonText">
            {language === "ltr" ? "K-NET" : "كي نت"}
          </div>
        </Box>
        {homePageDetails?.vendor_data?.is_credit_card != 0 ? (
          <Box
            onClick={(e) => {
              e.preventDefault();
              setPayment(2);
            }}
            className={`intro-flex payment-details-holder  ${
              payment == 2 ? "active" : ""
            }  ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme-border"
            }`}
          >
            <span className="del-ic" style={{ padding: 0 }}>
              <img
                style={{
                  width: "40px",
                  height: "30px",
                  objectFit: "contain",
                }}
                src={"pictures/visa.png"}
                className="img-fluid"
              ></img>{" "}
              <img
                style={{
                  width: "40px",
                  height: "30px",
                  objectFit: "contain",
                }}
                src={"pictures/master.png"}
                className="img-fluid"
              ></img>
            </span>
            <div className="payButtonText">
              {language === "ltr" ? "Credit" : "ائتمان"}
            </div>
          </Box>
        ) : null}
        {homePageDetails?.vendor_data?.is_cod == 1 &&
        (homePageDetails?.vendor_data?.international_delivery === "3" ||
          homePageDetails?.vendor_data?.international_delivery === "" ||
          internationalDelivery.delivery_country_code.toLowerCase() ===
            "kw") ? (
          <Box
            onClick={(e) => {
              e.preventDefault();
              setPayment(3);
            }}
            className={`intro-flex payment-details-holder  ${
              payment == 3 ? "active" : ""
            }  ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme-border"
            }`}
          >
            <span className="del-ic" style={{ padding: 0 }}>
              <img
                style={{ width: "auto", height: 30, width: 35 }}
                src={"pictures/icons8-money-64.png"}
                className="img-fluid"
              ></img>
            </span>
            <div className="payButtonText">
              {language === "ltr" ? "Cash" : "نقدي"}
            </div>
          </Box>
        ) : null}
      </div>
    </div>
  );
};

export default NewPaymentSelector;
