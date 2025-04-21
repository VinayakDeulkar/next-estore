import {
  GetUserDetails,
  RegisterUser,
  updateUserDetails,
  verifyUserOTP,
} from "@/apis";
import AreaModal from "@/components/AreaModal/areaModal";
import SubHeadline from "@/components/assetBoxDesign/SubHeadline/subHeadline";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import NewContactDetails from "@/components/NewContactDetails/NewContactDetails";
import OtpVerification from "@/components/OtpVerification/OtpVerification";
import PickupContainer from "@/components/PickupContainer/PickupContainer";
import { tele } from "@/constants/constants";
import {
  emailValidation,
  nameValidation,
  phoneValidation,
} from "@/constants/function";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";

const UserDetails = ({
  triggerDeliveryAddress,
  showAddressComponents,
  setSelectAddress,
  triggerPaymentMethod,
}) => {
  const {
    language,
    vendorSlug,
    homePageDetails,
    areaDetails,
    userDetails,
    handleUserDetailsChange,
    contactDetails,
    handleContactDetailsChange,
    internationalDelivery,
    resetUserDetails,
    handleOpenAreaChange,
    openArea,
  } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [showPickUpForm, setshowPickUpForm] = useState(false);
  const [openOtpPage, setOpenOtpPage] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [showGuestUser, setShowGuestUser] = useState(true);
  const [showNameEmailFields, setShowNameEmailFields] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetails?.name) {
      setShowNameEmailFields(true);
      setShowGuestUser(false);
      triggerDeliveryAddress();
      if (userDetails?.address?.length) {
        setSelectAddress(true);
      }
    }
  }, [userDetails?.name]);

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

  const [pickupError, setPickupError] = useState({
    modelError: "",
    colorError: "",
  });
  const renderContactType = () => {
    if (userDetails?.is_guest) {
      return (
        <NewContactDetails
          errorContactDetails={errorContactDetails}
          setErrorContactDetails={setErrorContactDetails}
        />
      );
    } else if (openOtpPage) {
      return (
        <OtpVerification
          openOtpPage={openOtpPage}
          setOpenOtpPage={setOpenOtpPage}
          otpSent={otpSent}
          setOtpSent={setOtpSent}
          otp={otp}
          setOtp={setOtp}
        />
      );
    } else {
      return (
        <ContactInfo
          errorContactDetails={errorContactDetails}
          showNameEmailFields={showNameEmailFields}
          showGuestUser={showGuestUser}
          stopRedirect={true}
        />
      );
    }
  };

  const handleOtpValidation = async () => {
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
                  tele[ele] == userReponse?.data?.country_code.replace("+", "")
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
                  tele[ele] == userReponse?.data?.country_code.replace("+", "")
              ) ?? "KW",
          });
          if (
            areaDetails?.type === "delivery" &&
            userReponse?.data?.address?.length == 0
          ) {
            triggerDeliveryAddress();
          } else if (
            (homePageDetails?.vendor_data?.international_delivery !== "3" &&
              homePageDetails?.vendor_data?.international_delivery !== "") ||
            internationalDelivery.delivery_country_code.toUpperCase() !== "KW"
          ) {
            triggerDeliveryAddress();
          } else {
            setShowNameEmailFields(true);
            setShowGuestUser(false);
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
  };
  const handleOTPSend = async () => {
    const contactInfo = JSON.parse(localStorage.getItem("contactInfo") || "{}");
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
        setshowPickUpForm(true);
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
  };
  const handleUserChange = async () => {
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
                  tele[ele] == userReponse?.data?.country_code.replace("+", "")
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
                  tele[ele] == userReponse?.data?.country_code.replace("+", "")
              ) ?? "KW",
          });
          if (areaDetails?.type === "pickup") {
            setshowPickUpForm(true);
          } else if (
            areaDetails?.type === "delivery" &&
            userDetails?.address?.length == 0
          ) {
            triggerDeliveryAddress();
          } else if (
            (homePageDetails?.vendor_data?.international_delivery !== "3" &&
              homePageDetails?.vendor_data?.international_delivery !== "") ||
            internationalDelivery.delivery_country_code.toUpperCase() !== "KW"
          ) {
            triggerDeliveryAddress();
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
  };
  const handleNext = () => {
    if (openOtpPage) {
      handleOtpValidation();
    } else if (showNameEmailFields) {
      handleUserChange();
    } else {
      handleOTPSend();
    }
  };
  const handleGuestNext = () => {
    if (!showPickUpForm) {
      let email = emailValidation(
        contactDetails.email,
        false,
        setErrorContactDetails
      );
      let phone = phoneValidation(
        contactDetails.phone,
        true,
        setErrorContactDetails,
        contactDetails
      );
      let name = nameValidation(contactDetails.name, setErrorContactDetails);
      if (!email && !phone && !name) {
        let data = {
          email: contactDetails.email,
          phone: contactDetails.phone,
          name: contactDetails.name,
          code: contactDetails.phoneCode,
          expire: new Date().getTime(),
        };
        if (data) {
          localStorage.setItem("contactInfo", JSON.stringify(data));
        }
        if (areaDetails?.type === "pickup") {
          if (vendorSlug?.data?.ecom_url_slug === "alawael-bilingual-school") {
          } else {
            setshowPickUpForm(true);
          }
        } else if (
          (homePageDetails?.vendor_data?.international_delivery !== "3" &&
            homePageDetails?.vendor_data?.international_delivery !== "") ||
          internationalDelivery.delivery_country_code.toUpperCase() !== "KW"
        ) {
          triggerDeliveryAddress();
        } else {
          triggerDeliveryAddress();
        }
      }
    } else {
      console.log("In pickup container");
      if (!areaDetails?.branch) {
        handleOpenAreaChange((prev) => ({ open: true, route: "/checkout-desktop" }));
      } else if (contactDetails.model !== "" && contactDetails.color !== "") {
        triggerPaymentMethod();
      } else {
        if (contactDetails.model == "" && contactDetails.color !== "") {
          setPickupError({ ...pickupError, modelError: true });
        } else if (contactDetails.model !== "" && contactDetails.color == "") {
          setPickupError({ ...pickupError, colorError: true });
        } else {
          setPickupError({
            ...pickupError,
            colorError: true,
            modelError: true,
          });
        }
      }
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <SubHeadline enText={"Contact Details"} arText={"ارقام التواصل"} />
      {renderContactType()}
      {showPickUpForm ? <PickupContainer pickupError={pickupError} /> : null}
      {!showAddressComponents ? (
        <Box
          className="contact-details-next-button"
          onClick={() => {
            if (userDetails?.is_guest) {
              handleGuestNext();
            } else {
              handleNext();
            }
          }}
        >
          {language === "ltr" ? "Next" : "متابعة"}
        </Box>
      ) : null}
      <AreaModal
        handleClose={() => {
          triggerPaymentMethod()
          handleOpenAreaChange({ open: false, route: "/" });
        }}
        showAreaModal={openArea.open}
      />
    </Box>
  );
};

export default UserDetails;
