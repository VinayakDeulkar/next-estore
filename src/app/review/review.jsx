"use client";
import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ModalClosed from "@/components/common/ModalClosed/ModalClosed";
import NewOrderProductList from "@/components/NewOrderProductList/NewOrderProductList";
import ReactPixel from "react-facebook-pixel";
import SubTitle from "@/components/common/SubTitle/subTitle";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import HeadLine from "@/components/assetBoxDesign/Headline/headLine";
import SubHeadline from "@/components/assetBoxDesign/SubHeadline/subHeadline";
import SnapPixel from "react-snapchat-pixel";
import BackComponent from "@/components/BackComponent";

const Review = () => {
  const {
    homePageDetails,
    areaDetails,
    userDetails,
    language,
    contactDetails,
    internationalDelivery,
    cart,
  } = useContext(AppContext);
  const [successPromocode, setSuccessPromocode] = useState();
  const [popup, setPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      homePageDetails?.vendor_data?.snap_pixel_code &&
      homePageDetails?.vendor_data?.snap_pixel_code != ""
    )
      SnapPixel.pageView();
    if (
      homePageDetails?.vendor_data?.fb_pixel_code &&
      homePageDetails?.vendor_data?.fb_pixel_code != ""
    ) {
      ReactPixel.init(
        homePageDetails?.vendor_data?.fb_pixel_code,
        {},
        { autoConfig: true, debug: false }
      );
      ReactPixel.pageView();
    }
  }, []);

  //   useEffect(() => {
  //     if (!cart?.cartCount) {
  //       router.push(`/`);
  //     }
  //   }, []);

  const onGoCheckoutClick = () => {
    if (
      !(
        areaDetails?.branchForArea?.start > moment() ||
        moment() > areaDetails?.branchForArea?.end
      )
    ) {
      if (areaDetails?.type == "pickup") {
        localStorage.setItem("newPath", "review");
        router.push(`/contact-details`);
      } else {
        if (
          !(
            homePageDetails?.vendor_data?.international_delivery === "3" ||
            homePageDetails?.vendor_data?.international_delivery === "" ||
            internationalDelivery.delivery_country.toLowerCase() === "kuwait"
          )
        ) {
          if (
            !(
              localStorage.getItem("contactInfo") &&
              contactDetails.name &&
              contactDetails.phone
            ) &&
            (homePageDetails?.vendor_data?.checkout_method === "2" ||
              homePageDetails?.vendor_data?.checkout_method === "1")
          ) {
            localStorage.setItem("newPath", "review");
            router.push(`/login`);
          } else if (
            !(
              localStorage.getItem("contactInfo") &&
              contactDetails.name &&
              contactDetails.phone
            )
          ) {
            localStorage.setItem("newPath", "review");
            router.push(`/contact-details`);
          } else {
            localStorage.setItem("newPath", "review");
            router.push(`/delivery-address`);
          }
        } else {
          if (
            !(
              localStorage.getItem("contactInfo") &&
              contactDetails.name &&
              contactDetails.phone
            ) &&
            (homePageDetails?.vendor_data?.checkout_method === "2" ||
              homePageDetails?.vendor_data?.checkout_method === "1")
          ) {
            localStorage.setItem("newPath", "review");
            router.push(`/login`);
          } else if (!localStorage.getItem("contactInfo")) {
            localStorage.setItem("newPath", "review");
            router.push(`/contact-details`);
          } else if (userDetails?.address?.length == 0) {
            localStorage.setItem("newPath", "review");
            router.push(`/delivery-address`);
          } else {
            router.push(`/checkout`);
          }
        }
      }
    } else {
      if (areaDetails?.type == "pickup") {
        localStorage.setItem("newPath", "review");
        router.push(`/contact-details`);
      } else {
        if (
          !(
            areaDetails?.data?.branch?.filter(
              (k) => k?.id == areaDetails?.branchForArea?.id
            )[0]?.on_shop_close_purchase == 1
          )
        ) {
          if (!localStorage.getItem("contactInfo")) {
            localStorage.setItem("newPath", "review");
            router.push(`/contact-details`);
          } else if (userDetails?.address?.length == 0) {
            localStorage.setItem("newPath", "review");
            router.push(`/delivery-address`);
          } else {
            router.push(`/checkout`);
          }
        } else {
          setPopup((loading) => true);
        }
      }
    }
  };

  return (
    <Box>
      <EstoreLayout1>
        <BackComponent backClick={() => router.push(`/`)} />
        <Box sx={{ position: "relative", height: "calc(100vh - 56px)" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {areaDetails.type == "delivery" ? (
              <HeadLine enText={"Review Order"} arText={"مراجعة الطلب"} />
            ) : (
              <HeadLine enText={"Pickup Info"} arText={"تفاصيل الإستلام"} />
            )}
            {/* {areaDetails.type == "delivery" &&
              (homePageDetails?.vendor_data?.international_delivery === "3" ||
                homePageDetails?.vendor_data?.international_delivery ===
                  "") && (
                <>
                  <Link href={`/timing`} className="deliveryInfoMainDIv">
                    <div className="buyer-details-firstDiv">
                      <div className="checkoutPageText">
                        {areaDetails?.now == 1
                          ? language === "ltr"
                            ? `${
                                !areaDetails?.customDelivery
                                  ? "Delivery Within"
                                  : ""
                              } ${areaDetails?.deliveryTiming}`
                            : `${
                                !areaDetails?.customDelivery
                                  ? "التوصيل سيكون خلال"
                                  : ""
                              } ${areaDetails?.ar_deliveryTiming}`
                          : moment(areaDetails?.laterDeliveryTiming)
                              .locale("en")
                              .format("DD") +
                            " " +
                            moment(areaDetails?.laterDeliveryTiming)
                              .locale(language == "ltr" ? "en" : "ar-sa")
                              .format("MMMM") +
                            moment(areaDetails?.laterDeliveryTiming)
                              .locale("en")
                              .format(", yyyy hh:mm ") +
                            moment(areaDetails?.laterDeliveryTiming)
                              .locale(language == "ltr" ? "en" : "ar-sa")
                              .format("A")}
                      </div>
                    </div>
                    <div className="buyer-details-secondDiv">
                      <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
                    </div>
                  </Link>
                </>
              )} */}

            <SubHeadline enText="Items Details" arText="تفاصيل عربة التسوق" />
            <NewOrderProductList
              setSuccessPromocode={setSuccessPromocode}
              successPromocode={successPromocode}
            />
            <div className="newreview-details-div">
              <SubHeadline
                enText={"Sub Total"}
                arText={"الإجمالي"}
                fontWeight="300"
              />

              <p className="newreview-text">
                <span>{parseFloat(cart?.subTotal).toFixed(3)}</span>{" "}
                {language === "rtl" ? "د.ك" : "KD"}
              </p>
            </div>
          </div>

          <div className="newreview-button-div">
            <div
              className={`contact-details-bottom-button review-order-mobile-button contact-details-mobile-button  ${
                homePageDetails?.vendor_data?.home_page_type === "18" &&
                "fashion-theme"
              }`}
              style={{ width: "100%", position: "absolute" }}
            >
              <Link
                href={``}
                className="contact-details-back-button background-issue"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                {language === "ltr" ? "+ Add More" : "+ أضف المزيد "}
              </Link>
              <Link
                className="contact-details-next-button"
                href={``}
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    parseFloat(cart?.subTotal) >=
                    (homePageDetails?.vendor_data?.minimum_charge != "" ||
                    (areaDetails?.minimum != "" && areaDetails?.minimum)
                      ? homePageDetails?.vendor_data?.minimum_charge != ""
                        ? parseFloat(
                            homePageDetails?.vendor_data?.minimum_charge
                          )
                        : parseFloat(areaDetails?.minimum)
                      : 0)
                  ) {
                    onGoCheckoutClick();
                  }
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
                    ? "Checkout"
                    : "متابعة الطلب"
                  : language == "ltr"
                  ? `Minimum Order is ${
                      areaDetails?.minimum != ""
                        ? parseFloat(areaDetails?.minimum).toFixed(3)
                        : parseFloat(
                            homePageDetails?.vendor_data?.minimum_charge
                          ).toFixed(3)
                    } KD`
                  : `الحد الأدنى للطلب هو ${
                      areaDetails?.minimum != ""
                        ? parseFloat(areaDetails?.minimum).toFixed(3)
                        : parseFloat(
                            homePageDetails?.vendor_data?.minimum_charge
                          ).toFixed(3)
                    } د.ك`}
              </Link>
            </div>
          </div>
          {popup ? (
            <ModalClosed note={popup} setNote={setPopup}></ModalClosed>
          ) : null}
        </Box>
      </EstoreLayout1>
    </Box>
  );
};

export default Review;
