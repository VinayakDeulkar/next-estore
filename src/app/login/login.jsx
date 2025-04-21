"use client";
import {
  GetUserDetails,
  RegisterUser,
  updateUserDetails,
  verifyUserOTP,
} from "@/apis";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import OtpVerification from "@/components/OtpVerification/OtpVerification";
import HeadLine from "@/components/assetBoxDesign/Headline/headLine";
import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import { tele } from "@/constants/constants";
import {
  emailValidation,
  nameValidation,
  phoneValidation,
} from "@/constants/function";
import { AppContext } from "@/context/AppContext";
import { Box, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";

const Login = () => {
  const [showNameEmailFields, setShowNameEmailFields] = useState(false);
  const [openOtpPage, setOpenOtpPage] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [stepper, setStepper] = useState(0);

  const router = useRouter();

  const {
    userDetails,
    homePageDetails,
    handleUserDetailsChange,
    language,
    contactDetails,
    areaDetails,
    resetUserDetails,
    handleContactDetailsChange,
    internationalDelivery,
    handleInternationalDeliveryChange,
  } = useContext(AppContext);

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

  const [showGuestUser, setShowGuestUser] = useState(true);
  useEffect(() => {
    handleUserDetailsChange({ ...userDetails, is_guest: false });
  }, []);

  const handleNext = async () => {
    if (openOtpPage) {
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
                router.push("/checkout");
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
          vendor_id: homePageDetails?.vendor_data.vendors_id,
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
            vendor_id: homePageDetails?.vendor_data.vendors_id,
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

      if (!phone && !email) {
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
            vendor_id: homePageDetails?.vendor_data.vendors_id,
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
    <Box>
      <EstoreLayout1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: openOtpPage ? "20px" : "40px",
            position: "relative",
            height: "calc(100vh - 50px)",
          }}
        >
          <HeadLine
            arText={showNameEmailFields ? "حساب تعريفي" : "تسجيل الدخول"}
            enText={showNameEmailFields ? "Profile" : "Login"}
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
        </Box>
      </EstoreLayout1>
    </Box>
  );
};

export default Login;
