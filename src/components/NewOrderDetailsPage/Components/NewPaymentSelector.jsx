import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "../checkOrderDetails.css";
import Title from "@/components/common/Title/Title";
import SubTitle from "@/components/common/SubTitle/subTitle";

const NewPaymentSelector = ({
  payment,
  handleSetPaymentChange,
  setWidth,
  width,
}) => {
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
      handleSetPaymentChange(4);
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
        <Title enText={"Payment Method"} arText={"طريقة الدفع"} />
        <div>
          <img
            src="images/PaymentProviderImage.png"
            style={{ height: "23px" }}
          />
        </div>
      </div>

      <div
        className={`payment-details-mainDiv ${
          getMethodsCount() ? "fourbuttons" : ""
        }`}
      >
        {homePageDetails?.vendor_data?.is_apple_pay?.length > 0 && isSafari ? (
          <Box
            onClick={(e) => {
              e.preventDefault();
              handleSetPaymentChange(4);
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
                src={"images/newApplePayButton.png"}
                className="img-fluid"
              ></img>
            </span>
            <Title enText={"Apple Pay"} arText={"أبل الدفع"} />
          </Box>
        ) : null}
        <Box
          id="slider-width"
          onClick={(e) => {
            e.preventDefault();
            handleSetPaymentChange(1);
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
              src={"images/knet icon mini.png"}
              className="img-fluid"
            ></img>
          </span>
          <Title enText={"K-NET"} arText={"كي نت"} />
        </Box>
        {homePageDetails?.vendor_data?.is_credit_card != 0 ? (
          <Box
            onClick={(e) => {
              e.preventDefault();
              handleSetPaymentChange(2);
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
                src={"images/visa.png"}
                className="img-fluid"
              ></img>{" "}
              <img
                style={{
                  width: "40px",
                  height: "30px",
                  objectFit: "contain",
                }}
                src={"images/master.png"}
                className="img-fluid"
              ></img>
            </span>
            <Title enText={"Credit"} arText={"ائتمان"} />
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
              handleSetPaymentChange(3);
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
                src={"images/icons8-money-64.png"}
                className="img-fluid"
              ></img>
            </span>
            <Title enText={"Cash"} arText={"نقدي"} />
          </Box>
        ) : null}
      </div>
    </div>
  );
};

export default NewPaymentSelector;
