import { GetUserDetails } from "@/apis";
import AddressSection from "@/components/AddressSection/addressSection";
import DeliveryMapContainer from "@/components/DeliveryMap/DeliveryMapContainer";
import NewAddressForm from "@/components/DeliveryMap/NewAddressForm";
import InternationalAddress from "@/components/InternationalDelivery/InternationalAddress";
import { mapArea } from "@/constants/areaConstant";
import { tele } from "@/constants/constants";
import { AppContext } from "@/context/AppContext";
import { Box, Dialog } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AddressDetails = ({
  triggerPaymentMethod,
  showPaymentMethod,
  selectAddress,
}) => {
  const {
    language,
    areaDetails,
    contactDetails,
    handleUserDetailsChange,
    resetUserDetails,
    homePageDetails,
    userDetails,
    internationalDelivery,
    addressDetails,
    handleOpenAreaChange,
    handleAddressDetailsChange,
  } = useContext(AppContext);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [selectedBounds, setSelectedBounds] = useState({
    north: 30.0978,
    south: 28.5244,
    east: 48.4161,
    west: 46.5682,
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

  useEffect(() => {
    if (selectAddress) {
      setShowAddressForm(false);
      triggerPaymentMethod();
    }
  }, [selectAddress]);

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
              north: Number(
                respones?.data?.results[0]?.geometry?.viewport?.northeast.lat
              ),
              south: Number(
                respones?.data?.results[0]?.geometry?.viewport?.southwest.lat
              ),
              east: Number(
                respones?.data?.results[0]?.geometry?.viewport?.northeast.lng
              ),
              west: Number(
                respones?.data?.results[0]?.geometry?.viewport?.southwest.lng
              ),
            });
          }
        }
      })();
    }
  }, [areaDetails?.area]);

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

  const handleInternationalDelivery = () => {
    if (
      internationalDelivery.delivery_address1 !== "" &&
      internationalDelivery.delivery_address2 !== ""
    ) {
      triggerPaymentMethod();
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
  };
  const handleDeliveryAddressNext = async () => {
    if (
      homePageDetails?.vendor_data?.international_delivery === "3" ||
      homePageDetails?.vendor_data?.international_delivery === "" ||
      internationalDelivery.delivery_country_code.toUpperCase() === "KW"
    ) {
      if (markerPosition?.lat) {
        if (!areaDetails?.area && !areaDetails?.branch) {
          handleOpenAreaChange((prev) => ({
            open: true,
            route: "/checkout-desktop",
          }));
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
              getDistanceMatrix();
              getEstimatedDeliveryTime();
              triggerPaymentMethod();
            } else {
              setLoading(true);
              const addResponse = await saveUserAddress({
                vendor_id: details.vendor.vendor_id,
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
                  vendor_id: homePageDetails?.vendor_data.vendors_id,
                  sendSMS: false,
                  country_code: `+${tele[contactDetails?.phoneCode]}`,
                  phone_number: contactDetails.phone,
                  jwt_token: localStorage.getItem("token"),
                  user_id: localStorage.getItem("id"),
                  language: language,
                });
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
                  // getDistanceMatrix();
                  // getEstimatedDeliveryTime();
                  // setLoading(false);
                  triggerPaymentMethod();
                } else {
                  enqueueSnackbar({
                    variant: "error",
                    message: response?.message,
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
        let areaName = areaNameValidation(areaDetails.area);
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
      handleInternationalDelivery();
    }
  };
  const handleMapLoad = () => {
    const forClick = document.getElementById("forClickOnly");
    forClick?.click();
  };

  const [internationalError, setInternationalError] = useState({
    delivery_state: false,
    delivery_city: false,
    delivery_address1: false,
    delivery_address2: false,
  });
  return (
    <Box>
      {homePageDetails?.vendor_data?.international_delivery === "3" ||
      homePageDetails?.vendor_data?.international_delivery === "" ||
      internationalDelivery.delivery_country_code.toUpperCase() === "KW" ||
      areaDetails.area_id !== "" ? (
        !showAddressForm ? (
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
            setShowMap={() => setShowMap(true)}
          />
        )
      ) : (
        <InternationalAddress internationalError={internationalError} />
      )}
      <Dialog open={showMap} onClose={() => setShowMap(false)} maxWidth="lg">
        <Box height={"80vh"} width="40vw" sx={{ padding: "20px" }}>
          <DeliveryMapContainer
            selectedArea={areaDetails?.area}
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
            selectedBounds={selectedBounds}
            setSelectedBounds={setSelectedBounds}
            triggerClick={handleMapLoad}
          />
          <Box
            className="contact-details-next-button"
            onClick={() => {
              if (markerPosition?.lat) {
                setShowMap(false);
              }
            }}
            style={!markerPosition?.lat ? { backgroundColor: "grey" } : {}}
          >
            {language === "ltr" ? "Save" : "يحفظ"}
          </Box>
        </Box>
      </Dialog>
      {showAddressForm && !showPaymentMethod ? (
        <Box
          className="contact-details-next-button"
          onClick={() => {
            handleDeliveryAddressNext();
          }}
        >
          {language === "ltr" ? "Next" : "متابعة"}
        </Box>
      ) : null}
    </Box>
  );
};

export default AddressDetails;
