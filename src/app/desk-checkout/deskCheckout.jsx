"use client";
import {
  GetUserDetails,
  RegisterUser,
  updateUserDetails,
  verifyUserOTP,
} from "@/apis";
import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import NewOrderProductList from "@/components/NewOrderProductList/NewOrderProductList";
import OtpVerification from "@/components/OtpVerification/OtpVerification";
import {
  emailValidation,
  nameValidation,
  phoneValidation,
} from "@/constants/function";
import { AppContext } from "@/context/AppContext";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { tele } from "@/constants/constants";

const DeskCheckout = () => {
  const {
    language,
    areaDetails,
    cart,
    contactDetails,
    handleUserDetailsChange,
    handleContactDetailsChange,
  } = useContext(AppContext);
  const [showGuestUser, setShowGuestUser] = useState(true);
  const [showNameEmailFields, setShowNameEmailFields] = useState(false);
  const [openOtpPage, setOpenOtpPage] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [errorContactDetails, setErrorContactDetails] = useState({
    emailError: false,
    emailErrorMessage: "",
    emailErrorMessagear: "",
    nameError: false,
    nameErrorMessage: "",
    nameErrorMessagear: "",
    phoneError: false,
    phoneErrorMessage: "",
    phoneErrorMessagear: "",
  });

  const { homePageDetails } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [successPromocode, setSuccessPromocode] = useState();

  const handleNext = async () => {
    if (openOtpPage) {
      console.log("One");
      setLoading(true);

      const response = await verifyUserOTP({
        country_code: `+${tele[contactDetails.phoneCode]}`,
        phone_number: contactDetails.phone,
        verification_code: otp,
        user_id: localStorage.getItem("id"),
        vendor_ecom_id: homePageDetails?.vendor_data?.ecommerce_vendor_id,
        language: language,
      });

      setLoading(false);

      if (response?.status) {
        localStorage.setItem("token", response?.jwt_token);
        setOpenOtpPage(false);
        const userReponse = await GetUserDetails({
          vendor_id: homePageDetails?.vendor_data.vendors_id,
          sendSMS: false,
          country_code: `+${tele[contactDetails.phoneCode]}`,
          phone_number: contactDetails.phone,
          jwt_token: response?.jwt_token,
          user_id: localStorage.getItem("id"),
          language: language,
        });
        if (userReponse?.status) {
          if (
            userReponse?.data?.name &&
            userReponse?.data?.email &&
            userReponse?.data?.phone
          ) {
            setShowGuestUser(false);
            let data = {
              name: userReponse?.data?.name,
              phone: userReponse?.data?.phone,
              email: userReponse?.data?.email,
              code:
                Object.keys(tele).find(
                  (ele) =>
                    tele[ele] ==
                    userReponse?.data?.country_code.replace("+", "")
                ) ?? "KW",
              expire: new Date().getTime(),
            };
            if (data) {
              localStorage.setItem("contactInfo", JSON.stringify(data));
            }
            handleUserDetailsChange({ ...userReponse?.data });
            handleContactDetailsChange({
              ...contactDetails,
              name: userReponse?.data?.name,
              email: userReponse?.data?.email,
              phone: userReponse?.data?.phone,
              phoneCode:
                Object.keys(tele).find(
                  (ele) =>
                    tele[ele] ==
                    userReponse?.data?.country_code.replace("+", "")
                ) ?? "KW",
            });
            if (localStorage.getItem("newPath") == "review") {
              if (
                areaDetails?.type === "delivery" &&
                userReponse?.data?.address?.length == 0
              ) {
                router.push("/delivery-address");
              } else if (
                (homePageDetails?.vendor_data?.international_delivery !== "3" &&
                  homePageDetails?.vendor_data?.international_delivery !==
                    "") ||
                internationalDelivery.delivery_country_code.toUpperCase() !==
                  "KW"
              ) {
                router.push("/delivery-address");
              } else {
                router.push("/");
              }
            } else {
              router.push("/");
            }
          } else {
            setShowNameEmailFields(true);
            setShowGuestUser(false);
          }
        } else {
          enqueueSnackbar({ variant: "error", message: userReponse?.message });

          localStorage.removeItem("token");
          localStorage.removeItem("contactInfo");
          resetUserDetails();
          router.push("/");
        }
      } else {
        enqueueSnackbar({ variant: "error", message: response?.message });
      }
    } else if (showNameEmailFields) {
      console.log("Two");
      let name = nameValidation(contactDetails.name, setErrorContactDetails);
      let phone = phoneValidation(
        contactDetails.phone,
        true,
        setErrorContactDetails,
        contactDetails
      );
      let email = emailValidation(
        contactDetails.email,
        true,
        setErrorContactDetails
      );

      if (!name && !email && !phone) {
        setLoading(true);

        const response = await updateUserDetails({
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          country_code: `+${tele[contactDetails.phoneCode]}`,
          phone_number: contactDetails.phone,
          full_name: contactDetails.name,
          email: contactDetails.email,
          jwt_token: localStorage.getItem("token"),
          user_id: localStorage.getItem("id"),
          language: language,
        });

        setLoading(false);

        if (response?.status) {
          const userReponse = await GetUserDetails({
            vendor_id: homePageDetails?.vendor_data?.vendors_id,
            sendSMS: false,
            country_code: `+${tele[contactDetails.phoneCode]}`,
            phone_number: contactDetails.phone,
            jwt_token: localStorage.getItem("token"),
            user_id: localStorage.getItem("id"),
            language: language,
          });
          if (userReponse?.status) {
            let data = {
              name: userReponse?.data?.name,
              phone: userReponse?.data?.phone,
              email: userReponse?.data?.email,
              code:
                Object.keys(tele).find(
                  (ele) =>
                    tele[ele] ==
                    userReponse?.data?.country_code.replace("+", "")
                ) ?? "KW",
              expire: new Date().getTime(),
            };
            if (data) {
              localStorage.setItem("contactInfo", JSON.stringify(data));
            }
            handleUserDetailsChange({ ...userReponse?.data });
            handleContactDetailsChange({
              ...contactDetails,
              name: userReponse?.data?.name,
              email: userReponse?.data?.email,
              phone: userReponse?.data?.phone,
              phoneCode:
                Object.keys(tele).find(
                  (ele) =>
                    tele[ele] ==
                    userReponse?.data?.country_code.replace("+", "")
                ) ?? "KW",
            });
            if (localStorage.getItem("newPath") == "review") {
              if (areaDetails?.type === "pickup") {
                setStepper(1);
              } else if (
                areaDetails?.type === "delivery" &&
                userDetails?.address?.length == 0
              ) {
                router.push("/delivery-address");
              } else if (
                (homePageDetails?.vendor_data?.international_delivery !== "3" &&
                  homePageDetails?.vendor_data?.international_delivery !==
                    "") ||
                internationalDelivery.delivery_country_code.toUpperCase() !==
                  "KW"
              ) {
                router.push("/delivery-address");
              } else {
                router.push("/");
              }
            } else {
              router.push("/");
            }
          } else {
            enqueueSnackbar({ variant: "error", message: response?.message });
            localStorage.removeItem("token");
            localStorage.removeItem("contactInfo");
            resetUserDetails();
            router.push("/");
          }
        } else {
          enqueueSnackbar({ variant: "error", message: response?.message });
        }
      } else {
        console.log("validation failed");
      }
    } else {
      console.log("Three");
      const contactInfo = JSON.parse(
        localStorage.getItem("contactInfo") || "{}"
      );
      let phone = phoneValidation(
        contactDetails.phone,
        homePageDetails?.vendor_data?.checkout_method === "2",
        setErrorContactDetails,
        contactDetails
      );
      let email = emailValidation(
        contactDetails.email,
        homePageDetails?.vendor_data?.checkout_method === "1",
        setErrorContactDetails
      );
      console.log(phone, "phone");
      console.log(email, "email");

      if (!phone && !email) {
        console.log("Three one");
        let data = {
          phone: contactDetails.phone,
          email: contactDetails.email,
          code: contactDetails.phoneCode,
          expire: new Date().getTime(),
        };
        if (data) {
          localStorage.setItem("contactInfo", JSON.stringify(data));
        }
        if (
          areaDetails?.type === "pickup" &&
          contactDetails.name &&
          nameValidation(contactDetails.name)
        ) {
          setStepper(1);
        } else {
          setLoading(true);
          const response = await RegisterUser({
            vendor_id: homePageDetails?.vendor_data?.vendors_id,
            vendor_ecom_id: homePageDetails?.vendor_data?.ecommerce_vendor_id,
            sendSMS: false,
            country_code: `+${tele[contactDetails.phoneCode]}`,
            phone_number: contactDetails.phone,
            email: contactDetails.email,
            language: language,
          });
          setLoading(false);

          if (response?.data?.is_otp_sent) {
            localStorage.setItem("id", response?.data?.id);

            enqueueSnackbar({ variant: "success", message: response?.message });
            setOtpSent(true);
            setOpenOtpPage(true);
          } else {
            enqueueSnackbar({ variant: "error", message: response?.message });
          }
        }
      }
    }
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <HeaderBox />
      <Grid container sx={{ padding: "0 10%", marginTop: "50px" }}>
        <Grid item md={6} sx={{ padding: "0 20px" }}>
          <Box sx={{ fontSize: "30px" }}>
            {language === "ltr" ? "Checkout" : "متابعة الطلب"}
          </Box>
          <CommonHeader
            englishHeader={"Login"}
            arabicHeader={"تسجيل الدخول"}
            fontWeight={400}
          />

          {openOtpPage ? (
            <OtpVerification
              openOtpPage={openOtpPage}
              setOpenOtpPage={setOpenOtpPage}
              otpSent={otpSent}
              setOtpSent={setOtpSent}
              otp={otp}
              setOtp={setOtp}
            />
          ) : (
            <ContactInfo
              errorContactDetails={errorContactDetails}
              showNameEmailFields={showNameEmailFields}
              showGuestUser={showGuestUser}
            />
          )}

          <div
            className={`contact-details-bottom-button contact-details-mobile-button ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme"
            }`}
            style={{ position: "relative", padding: 0, marginTop: "40px" }}
          >
            <Box
              className="contact-details-next-button"
              onClick={() => {
                handleNext();
              }}
            >
              {language === "ltr" ? "Next" : "متابعة"}
            </Box>
          </div>
        </Grid>
        <Grid item md={6} sx={{ padding: "0 20px" }}>
          <Box>
            <div>
              {areaDetails.type == "delivery" &&
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
                )}
              <div
                className="checkoutPageText"
                style={{ marginTop: "5px", marginBottom: "10px" }}
              >
                {language === "ltr" ? "Items Details" : "تفاصيل عربة التسوق"}
              </div>
              <NewOrderProductList
                setSuccessPromocode={setSuccessPromocode}
                successPromocode={successPromocode}
              />
              <div className="newreview-details-div">
                <p className="newreview-text">
                  {language === "ltr" ? "Sub Total" : "الإجمالي"}
                </p>
                <p className="newreview-text">
                  <span>{parseFloat(cart?.subTotal).toFixed(3)}</span>{" "}
                  {language === "rtl" ? "د.ك" : "KD"}
                </p>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeskCheckout;
