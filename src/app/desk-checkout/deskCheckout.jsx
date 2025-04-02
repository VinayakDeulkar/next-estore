"use client";
import {
  GetUserDetails,
  RegisterUser,
  updateUserDetails,
  verifyUserOTP,
} from "@/apis";
import AddressSection from "@/components/AddressSection/addressSection";
import Card from "@/components/common/AddressCard/AddressCard";
import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import NewAddressForm from "@/components/DeliveryMap/NewAddressForm";
import DeskCheckoutSection from "@/components/DeskCheckoutSection/deskCheckoutSection";
import NewOrderProductList from "@/components/NewOrderProductList/NewOrderProductList";
import OtpVerification from "@/components/OtpVerification/OtpVerification";
import { tele } from "@/constants/constants";
import {
  emailValidation,
  getAddressType,
  nameValidation,
  phoneValidation,
} from "@/constants/function";
import { AppContext } from "@/context/AppContext";
import ThreeDots from "@/SVGs/ThreeDots";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Grid } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useContext, useState } from "react";

const DeskCheckout = () => {
  const {
    language,
    areaDetails,
    cart,
    contactDetails,
    handleUserDetailsChange,
    handleContactDetailsChange,
    resetUserDetails,
    homePageDetails,
    userDetails,
    internationalDelivery,
  } = useContext(AppContext);
  const [showGuestUser, setShowGuestUser] = useState(true);
  const [showNameEmailFields, setShowNameEmailFields] = useState(false);
  const [openOtpPage, setOpenOtpPage] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedBounds, setSelectedBounds] = useState({
    north: 30.0978,
    south: 28.5244,
    east: 48.4161,
    west: 46.5682,
  });
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
  const [errorState, setErrorState] = useState({
    blockError: false,
    blockErrorMessage: "",
    blockErrorMessagear: "",
    streetError: false,
    streetErrorMessage: "",
    streetErrorMessagear: "",
    houseError: false,
    houseErrorMessage: "",
    houseErrorMessagear: "",
    addressNameError: false,
    addressNameErrorMessage: "",
    addressNameErrorMessagear: "",
    areaNameError: false,
    areaNameErrorMessage: "",
    areaNameErrorMessagear: "",
  });
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectAddress, setSelectAddress] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    if (userDetails?.name) {
      setShowNameEmailFields(true);
      setShowGuestUser(false);
      setShowDeliveryAddress(true);
      if (userDetails?.address?.length) {
        setSelectAddress(true);
      }
    }
  }, [userDetails?.name]);

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
            if (
              areaDetails?.type === "delivery" &&
              userReponse?.data?.address?.length == 0
            ) {
              setShowDeliveryAddress(true);
            } else if (
              (homePageDetails?.vendor_data?.international_delivery !== "3" &&
                homePageDetails?.vendor_data?.international_delivery !== "") ||
              internationalDelivery.delivery_country_code.toUpperCase() !== "KW"
            ) {
              setShowDeliveryAddress(true);
            } else {
              setShowNameEmailFields(true);
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
            if (areaDetails?.type === "pickup") {
              setStepper(1);
            } else if (
              areaDetails?.type === "delivery" &&
              userDetails?.address?.length == 0
            ) {
              setShowDeliveryAddress(true);
            } else if (
              (homePageDetails?.vendor_data?.international_delivery !== "3" &&
                homePageDetails?.vendor_data?.international_delivery !== "") ||
              internationalDelivery.delivery_country_code.toUpperCase() !== "KW"
            ) {
              setShowDeliveryAddress(true);
            } else {
              setShowNameEmailFields(true);
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

  const blockValidation = (value) => {
    if (value == "") {
      setErrorState((errorState) => ({
        ...errorState,
        blockErrorMessage: "This field is compulsory",
        blockError: true,
        blockErrorMessagear: "مطلوب ملء هذا الحقل",
      }));
      return true;
    } else {
      setErrorState((errorState) => ({
        ...errorState,
        blockErrorMessage: "",
        blockError: false,
        blockErrorMessagear: "",
      }));
      return false;
    }
  };

  const streetValidation = (value) => {
    if (value == "") {
      setErrorState((errorState) => ({
        ...errorState,
        streetErrorMessage: "This field is compulsory",
        streetError: true,
        streetErrorMessagear: "مطلوب ملء هذا الحقل",
      }));
      return true;
    } else {
      setErrorState((errorState) => ({
        ...errorState,
        streetErrorMessage: "",
        streetError: false,
        streetErrorMessagear: "",
      }));
      return false;
    }
  };

  const houseValidation = (value) => {
    if (value == "") {
      setErrorState((errorState) => ({
        ...errorState,
        houseErrorMessage: "This field is compulsory",
        houseError: true,
        houseErrorMessagear: "مطلوب ملء هذا الحقل",
      }));
      return true;
    } else {
      setErrorState((errorState) => ({
        ...errorState,
        houseErrorMessage: "",
        houseError: false,
        houseErrorMessagear: "",
      }));
      return false;
    }
  };

  const addressNameValidation = (value) => {
    if (value == "" || !value || undefined) {
      setErrorState((errorState) => ({
        ...errorState,
        addressNameErrorMessage: "This field is compulsory",
        addressNameError: true,
        addressNameErrorMessagear: "مطلوب ملء هذا الحقل",
      }));
      return true;
    } else {
      setErrorState((errorState) => ({
        ...errorState,
        addressNameErrorMessage: "",
        addressNameError: false,
        addressNameErrorMessagear: "",
      }));
      return false;
    }
  };

  const handleDeliveryAddressNext = () => {};

  return (
    <Box sx={{ height: "100vh" }}>
      <HeaderBox />
      <Grid container sx={{ padding: "0 10%", marginTop: "50px" }}>
        <Grid item md={6} sx={{ padding: "0 20px" }}>
          <Box sx={{ fontSize: "30px" }}>
            {language === "ltr" ? "Checkout" : "متابعة الطلب"}
          </Box>
          <CommonHeader
            englishHeader={showNameEmailFields ? "Contact Details" : "Login"}
            arabicHeader={
              showNameEmailFields ? "ارقام التواصل" : "تسجيل الدخول"
            }
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

          {showDeliveryAddress && (
            <div style={{marginTop: "50px"}}>
              {selectAddress ? (
                <AddressSection />
              ) : (
                <NewAddressForm
                  areaDetails={areaDetails}
                  blockValidation={blockValidation}
                  streetValidation={streetValidation}
                  houseValidation={houseValidation}
                  addressNameValidation={addressNameValidation}
                  errorState={errorState}
                  setMarkerPosition={setMarkerPosition}
                />
              )}
            </div>
          )}  

          {showDeliveryAddress && (
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
                  handleDeliveryAddressNext();
                }}
              >
                {language === "ltr" ? "Next" : "متابعة"}
              </Box>
            </div>
          )}

          {!showDeliveryAddress && (
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
          )}
        </Grid>

        <Grid item md={6} sx={{ padding: "0 20px" }}>
          <Box>
            <DeskCheckoutSection />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeskCheckout;
