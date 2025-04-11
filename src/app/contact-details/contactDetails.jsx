"use client";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import MainTitle from "@/components/common/MainTitle/mainTitle";
import NewContactDetails from "@/components/NewContactDetails/NewContactDetails";
import PickupContainer from "@/components/PickupContainer/PickupContainer";
import {
  emailValidation,
  nameValidation,
  phoneValidation,
} from "@/constants/function";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const ContactDetails = () => {
  const router = useRouter();
  const {
    homePageDetails,
    language,
    contactDetails,
    areaDetails,
    internationalDelivery,
    vendorSlug,
  } = useContext(AppContext);
  const [stepper, setStepper] = useState(0);

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

  const handleGuestNext = () => {
    if (stepper === 0) {
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
            router.push("/checkout");
          } else {
            setStepper(1);
          }
        } else if (
          (homePageDetails?.vendor_data?.international_delivery !== "3" &&
            homePageDetails?.vendor_data?.international_delivery !== "") ||
          internationalDelivery.delivery_country_code.toUpperCase() !== "KW"
        ) {
          if (localStorage.getItem("newPath") == "review") {
            router.push("/delivery-address");
          } else {
            router.push("/");
          }
        } else {
          router.push("/delivery-address");
        }
      }
    } else if (stepper === 1) {
      if (contactDetails.model !== "" && contactDetails.color !== "") {
        router.push("/checkout");
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
    <Box>
      <HeaderBox />
      <GridLayout
        backgroundColor={"#fff"}
        padding={"20px"}
        sx={{ height: "calc(100vh - 50px)", color: "#000" }}
      >
        <Box>
          <MainTitle enText={"Contact Details"} arText={"ارقام التواصل"} />
          {stepper === 0 ? (
            <NewContactDetails
              errorContactDetails={errorContactDetails}
              setErrorContactDetails={setErrorContactDetails}
            />
          ) : null}
          {stepper === 1 ? <PickupContainer pickupError={pickupError} /> : null}
          <div
            className={`contact-details-bottom-button contact-details-mobile-button ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme"
            }`}
          >
            <Box
              className="contact-details-next-button"
              onClick={() => {
                handleGuestNext();
              }}
            >
              {language === "ltr" ? "Next" : "متابعة"}
            </Box>
          </div>
        </Box>
      </GridLayout>
    </Box>
  );
};

export default ContactDetails;
