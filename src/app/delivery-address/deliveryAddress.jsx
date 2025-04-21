"use client";
import { GetUserDetails, getVendorCountries, saveUserAddress } from "@/apis";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import DeliveryMapContainer from "@/components/DeliveryMap/DeliveryMapContainer";
import NewAddressForm from "@/components/DeliveryMap/NewAddressForm";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import InternationalAddress from "@/components/InternationalDelivery/InternationalAddress";
import { mapArea } from "@/constants/areaConstant";
import { tele } from "@/constants/constants";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";

const DeliveryAddress = () => {
  const {
    language,
    homePageDetails,
    areaDetails,
    handleAreaDetailsChange,
    handleOpenAreaChange,
    userDetails,
    addressDetails,
    handleAddressDetailsChange,
    contactDetails,
    resetUserDetails,
    handleUserDetailsChange,
    internationalDelivery,
    handleInternationalDeliveryChange,
    vendorSlug,
  } = useContext(AppContext);
  const [countryDropDown, setCountryDropDown] = useState();
  const [countryArray, setCountryArray] = useState();
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedBounds, setSelectedBounds] = useState({
    north: 30.0978,
    south: 28.5244,
    east: 48.4161,
    west: 46.5682,
  });
  const [internationalError, setInternationalError] = useState({
    delivery_state: false,
    delivery_city: false,
    delivery_address1: false,
    delivery_address2: false,
  });
  const { enqueueSnackbar } = useSnackbar();

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

  const areaNameValidation = (value) => {
    if (value == "" || !value || undefined) {
      setErrorState((errorState) => ({
        ...errorState,
        areaNameErrorMessage: "This field is compulsory",
        areaNameError: true,
        areaNameErrorMessagear: "مطلوب ملء هذا الحقل",
      }));
      return true;
    } else {
      setErrorState((errorState) => ({
        ...errorState,
        areaNameErrorMessage: "",
        areaNameError: false,
        areaNameErrorMessagear: "",
      }));
      return false;
    }
  };

  const handleNext = async () => {
    if (
      homePageDetails?.vendor_data?.international_delivery === "3" ||
      homePageDetails?.vendor_data?.international_delivery === "" ||
      internationalDelivery.delivery_country_code.toUpperCase() === "KW"
    ) {
      if (showMap && markerPosition?.lat) {
        if (!areaDetails?.area && !areaDetails?.branch) {
          handleOpenAreaChange((prev) => ({ open: true, route: "/checkout" }));
        } else {
          let block =
            homePageDetails?.vendor_data?.enable_address_types?.includes(
              addressDetails.addressType
            )
              ? false
              : blockValidation(addressDetails.block);
          let street =
            homePageDetails?.vendor_data?.enable_address_types?.includes(
              addressDetails.addressType
            )
              ? false
              : streetValidation(addressDetails.street);
          let addressName = addressNameValidation(addressDetails.addressName);
          let areaName = areaNameValidation(areaDetails.area);
          let house = houseValidation(addressDetails.house);
          if (
            !block &&
            !street &&
            !house &&
            !(addressName && !userDetails?.is_guest) &&
            !areaName
          ) {
            if (userDetails?.is_guest) {
              localStorage.removeItem("newPath");
              router.push("/checkout");
            } else {
              setLoading(true);
              const addResponse = await saveUserAddress({
                vendor_id: homePageDetails?.vendor_data?.vendor_id,
                ecom_user_id: userDetails.id,
                address_type: addressDetails.addressType,
                area: areaDetails?.area,
                area_id: areaDetails?.area_id,
                country: tele[contactDetails?.phoneCode],
                country_id: `+${tele[contactDetails?.phoneCode]}`,
                block: addressDetails.block,
                street: addressDetails.street,
                avenue: addressDetails.avenue,
                house_number: addressDetails.house,
                floor_number: addressDetails.floor,
                flat_number: addressDetails.flat,
                user_lat: addressDetails?.lat || 0,
                user_long: addressDetails?.lng || 0,
                is_primary:
                  userDetails?.address?.length === 0
                    ? true
                    : addressDetails?.is_primary,
                special_directions: addressDetails?.special_directions,
                title: addressDetails.addressName,
                address_id: addressDetails.id ? addressDetails.id : null,
                jwt_token: localStorage.getItem("token"),
                user_id: localStorage.getItem("id"),
                language: language,
              });
              if (addResponse?.status) {
                const response = await GetUserDetails({
                  vendor_id: homePageDetails?.vendor_data?.vendors_id,
                  sendSMS: false,
                  country_code: `+${tele[contactDetails?.phoneCode]}`,
                  phone_number: contactDetails.phone,
                  jwt_token: localStorage.getItem("token"),
                  user_id: localStorage.getItem("id"),
                  language: language,
                });
                console.log(response, "response");
                if (response?.status) {
                  handleUserDetailsChange({ ...response?.data });
                  handleAddressDetailsChange((k) => ({
                    ...k,
                    addressName: addressDetails.addressName,
                    id: addResponse.data,
                    addressType: addressDetails.addressType,
                    street: addressDetails.street,
                    block: addressDetails.block,
                    avenue: addressDetails.avenue,
                    house: addressDetails.house,
                    floor: addressDetails.floor,
                    flat: addressDetails.flat,
                    special_directions: addressDetails.special_directions,
                    lat: addressDetails.lat,
                    lng: addressDetails.lng,
                    is_primary: addressDetails.is_primary,
                  }));
                  setLoading(false);
                  if (localStorage.getItem("newPath") == "review") {
                    localStorage.removeItem("newPath");
                    router.push("/checkout");
                  } else {
                    router.push("/");
                  }
                } else {
                  enqueueSnackbar({
                    variant: "error",
                    message: response?.message,
                    anchorOrigin: { horizontal: "left", vertical: "top" },
                  });
                  localStorage.removeItem("token");
                  localStorage.removeItem("contactInfo");
                  resetUserDetails();
                  router.push("/");
                }
              } else {
                enqueueSnackbar({
                  variant: "error",
                  message: addResponse?.message,
                  anchorOrigin: { horizontal: "left", vertical: "top" },
                });
              }
            }
          }
        }
        setShowMap(false);
      } else {
        let block =
          homePageDetails?.vendor_data?.enable_address_types?.includes(
            addressDetails.addressType
          )
            ? false
            : blockValidation(addressDetails.block);
        let street =
          homePageDetails?.vendor_data?.enable_address_types?.includes(
            addressDetails.addressType
          )
            ? false
            : streetValidation(addressDetails.street);
        let addressName = addressNameValidation(addressDetails.addressName);
        let house = houseValidation(addressDetails.house);

        if (
          !block &&
          !street &&
          !house &&
          !(addressName && !userDetails?.is_guest)
        ) {
          setShowMap(true);
        }
      }
    } else {
      if (
        internationalDelivery.delivery_address1 !== "" &&
        internationalDelivery.delivery_address2 !== ""
      ) {
        localStorage.removeItem("newPath");
        router.push("/checkout");
      } else {
        let errorData = {};
        if (internationalDelivery.delivery_address1 === "") {
          errorData = { ...errorData, delivery_address1: true };
        } else {
          errorData = { ...errorData, delivery_address1: false };
        }
        if (internationalDelivery.delivery_address2 === "") {
          errorData = { ...errorData, delivery_address2: true };
        } else {
          errorData = { ...errorData, delivery_address2: false };
        }
        setInternationalError(errorData);
      }
    }
  };

  const convertArabicIndicToRegularArabic = (arabicIndicNumber) => {
    const arabicIndicDigits = [
      "٠",
      "١",
      "٢",
      "٣",
      "٤",
      "٥",
      "٦",
      "٧",
      "٨",
      "٩",
    ];
    let regularArabicNumber = "";

    for (let i = 0; i < arabicIndicNumber.length; i++) {
      const char = arabicIndicNumber.charAt(i);
      const digitIndex = arabicIndicDigits.indexOf(char);

      if (digitIndex !== -1) {
        regularArabicNumber += digitIndex;
      } else {
        regularArabicNumber += char;
      }
    }

    return regularArabicNumber;
  };

  useEffect(() => {
    if (
      internationalDelivery.delivery_country_code &&
      homePageDetails?.vendor_data?.international_delivery !== "3" &&
      homePageDetails?.vendor_data?.international_delivery !== ""
    ) {
      (async () => {
        const response = await getVendorCountries({
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          ecom_vendor_id: homePageDetails?.vendor_data?.ecommerce_vendor_id,
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
        });
        if (response?.status) {
          let countryArray = [];
          response.data.map((ele) => {
            countryArray.push(ele.abbr);
          });
          const currentCountry = response.data.filter(
            (ele) => ele.abbr === internationalDelivery.delivery_country_code
          );
          if (currentCountry && currentCountry.length > 0) {
            handleInternationalDeliveryChange({
              ...internationalDelivery,
              delivery_country_code: currentCountry[0].abbr,
              country_id: currentCountry[0].country_id,
              delivery_expected_time: currentCountry[0]?.delivery_expected_time,
              delivery_expected_type: currentCountry[0]?.delivery_expected_type,
            });
          }
          setCountryArray(countryArray);
          setCountryDropDown(response.data);
        }
      })();
    }
  }, [homePageDetails]);

  useEffect(() => {
    if (areaDetails?.area) {
      (async () => {
        if (areaDetails?.area == "Mutlaa") {
          setSelectedBounds({
            north: 29.5761,
            south: 29.38842,
            east: 47.66437,
            west: 47.538132,
          });
        } else {
          const selectedAra = mapArea.find(
            (ele) =>
              ele.area_name == areaDetails?.area ||
              ele.area_name_ar == areaDetails?.ar_area
          );
          const encodedPlaceName = encodeURIComponent(
            selectedAra.area_map + " Kuwait"
          );
          const respones = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedPlaceName}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
          );

          if (respones.status === 200) {
            setSelectedBounds({
              north:
                respones?.data?.results[0]?.geometry?.viewport?.northeast.lat,
              south:
                respones?.data?.results[0]?.geometry?.viewport?.southwest.lat,
              east: respones?.data?.results[0]?.geometry?.viewport?.northeast
                .lng,
              west: respones?.data?.results[0]?.geometry?.viewport?.southwest
                .lng,
            });
          }
        }
      })();
    }
  }, [areaDetails?.area]);

  const handleMapLoad = () => {
    const forClick = document.getElementById("forClickOnly");
    forClick?.click();
  };
  console.log(
    internationalDelivery.delivery_country_code,
    "internationalDelivery.delivery_country_code"
  );
  return (
    <Box>
      <EstoreLayout1>
        <Box
          sx={{
            position: "relative",
            height: "calc(100vh - 50px)",
          }}
        >
          {homePageDetails?.vendor_data?.international_delivery === "3" ||
          homePageDetails?.vendor_data?.international_delivery === "" ||
          internationalDelivery.delivery_country_code.toUpperCase() === "KW" ||
          areaDetails.area_id !== "" ? (
            <>
              {showMap ? (
                <DeliveryMapContainer
                  selectedArea={areaDetails?.area}
                  markerPosition={markerPosition}
                  setMarkerPosition={setMarkerPosition}
                  selectedBounds={selectedBounds}
                  setSelectedBounds={setSelectedBounds}
                  triggerClick={handleMapLoad}
                />
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
            </>
          ) : (
            <InternationalAddress internationalError={internationalError} />
          )}
          <div
            className={`contact-details-bottom-button contact-details-mobile-button ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme"
            }`}
            style={{ padding: "20px", position: "sticky" }}
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

export default DeliveryAddress;
