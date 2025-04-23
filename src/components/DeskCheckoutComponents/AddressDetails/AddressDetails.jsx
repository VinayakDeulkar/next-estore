import {
  GetUserDetails,
  getDeliveryCompanies,
  saveUserAddress,
  updateDeliveryCharges,
} from "@/apis";
import AddressSection from "@/components/AddressSection/addressSection";
import DeliveryMapContainer from "@/components/DeliveryMap/DeliveryMapContainer";
import NewAddressForm from "@/components/DeliveryMap/NewAddressForm";
import InternationalAddress from "@/components/InternationalDelivery/InternationalAddress";
import { mapArea } from "@/constants/areaConstant";
import { tele } from "@/constants/constants";
import { AppContext } from "@/context/AppContext";
import { Box, Dialog } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
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
    handleCartChange,
    cart,
    vendorSlugResponse,
  } = useContext(AppContext);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deliveryKm, setDeliveryKm] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [companyData, setCompanyData] = useState();
  const [notServing, setNotServing] = useState(0);
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

  const checkAllCondition = () => {
    if (!cart?.cartCount) {
      router.push(`/`);
    }
  };

  useEffect(() => {
    if (selectAddress) {
      setShowAddressForm(false);
      triggerPaymentMethod(true);
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
      triggerPaymentMethod(true);
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
              triggerPaymentMethod(true);
            } else {
              setLoading(true);
              const addResponse = await saveUserAddress({
                vendor_id: homePageDetails?.vendor_data.vendor_id,
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
                  getDistanceMatrix();
                  // setLoading(false);
                  setShowAddressForm(false);
                  triggerPaymentMethod(true);
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

  const getDistanceMatrix = async () => {
    if (
      areaDetails?.type == "delivery" &&
      areaDetails?.data?.branch &&
      (internationalDelivery.delivery_country_code.toLowerCase() === "kw" ||
        homePageDetails?.vendor_data?.international_delivery === "3" ||
        homePageDetails?.vendor_data?.international_delivery === "")
    ) {
      // let selectedArea = areaDetails?.area;
      if (areaDetails?.area == "Mutlaa") {
        const branch_latlng = areaDetails?.data?.branch?.filter(
          (branch) => branch.id == areaDetails?.branchForArea.id
        );
        if (window.google && window.google.maps) {
          const origin = new window.google.maps.LatLng(
            String(branch_latlng[0].lat),
            String(branch_latlng[0].lng)
          );
          const destination = new window.google.maps.LatLng(
            String(addressDetails.lat),
            String(addressDetails.lng)
          );
          const service = new window.google.maps.DistanceMatrixService();
          const request = {
            origins: [origin],
            destinations: [destination],
            travelMode: "DRIVING",
            unitSystem: window.google.maps.UnitSystem.METRIC, // Specify metric units for kilometers
          };
          service.getDistanceMatrix(request, (response, status) => {
            if (
              status === "OK" &&
              response.rows[0].elements[0].status === "OK"
            ) {
              const distanceInMeters =
                response.rows[0].elements[0].distance.value;
              const distanceInKilometers = distanceInMeters / 1000;
              setDeliveryKm(distanceInKilometers);
            } else {
              console.error("Error:", status);
            }
          });
        }
      } else {
        let selectedAra = mapArea.find(
          (ele) =>
            ele.area_name == areaDetails.area ||
            ele.area_name_ar == areaDetails.area_ar
        );
        const selectedArea = selectedAra.area_map;

        const encodedPlaceName = encodeURIComponent(
          `street ${addressDetails.street} ,block ${addressDetails.block} ,${selectedArea}, Kuwait`
        );
        const respones = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedPlaceName}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
        );
        if (respones.status === 200) {
          let getSelectedAreaDetails = [];
          if (respones?.data?.results.length == 1) {
            getSelectedAreaDetails.push(respones?.data?.results[0]);
          } else {
            respones?.data?.results.map((ele) =>
              ele.address_components.map((element) => {
                if (
                  element.short_name.toLowerCase() ==
                    selectedArea.toLowerCase() ||
                  element.long_name.toLowerCase() == selectedArea.toLowerCase()
                ) {
                  getSelectedAreaDetails.push(ele);
                }
              })
            );
          }

          let lat = getSelectedAreaDetails[0]?.geometry?.location?.lat;
          let lng = getSelectedAreaDetails[0]?.geometry?.location?.lng;

          const branch_latlng = areaDetails?.data?.branch?.filter(
            (branch) => branch.id == areaDetails?.branchForArea.id
          );
          if (window.google && window.google.maps) {
            const origin = new window.google.maps.LatLng(
              String(branch_latlng[0].lat),
              String(branch_latlng[0].lng)
            );
            const destination = new window.google.maps.LatLng(
              String(addressDetails.lat),
              String(addressDetails.lng)
            );
            const service = new window.google.maps.DistanceMatrixService();
            const request = {
              origins: [origin],
              destinations: [destination],
              travelMode: "DRIVING",
              unitSystem: window.google.maps.UnitSystem.METRIC, // Specify metric units for kilometers
            };
            service.getDistanceMatrix(request, (response, status) => {
              if (
                status === "OK" &&
                response.rows[0].elements[0].status === "OK"
              ) {
                const distanceInMeters =
                  response.rows[0].elements[0].distance.value;
                const distanceInKilometers = distanceInMeters / 1000;
                setDeliveryKm(distanceInKilometers);
              } else {
                console.error("Error:", status);
              }
            });
          }
        }
      }
    }
  };
  useEffect(() => {
    if (window && window.google && window.google.maps && areaDetails?.area) {
      getDistanceMatrix();
    }
  }, [window, window.google, window.google?.maps, areaDetails?.area, cart]);

  useEffect(() => {
    (async () => {
      if (
        deliveryKm &&
        areaDetails?.type == "delivery" &&
        areaDetails?.area != "Mutlaa"
      ) {
        setLoading(true);
        const response = await getDeliveryCompanies({
          vendor_id: homePageDetails?.vendor_data.vendors_id,
          product: cart.cartItems,
          distance: deliveryKm,
          area_id: areaDetails?.area_id,
          block_id: addressDetails.block,
          ecommerce_vendor_id: homePageDetails?.vendor_data.ecommerce_vendor_id,
          branch_id: areaDetails?.branchForArea.id,
          destination: {
            latitude: Number(addressDetails.lat),
            longitude: Number(addressDetails.lng),
          },
          block: addressDetails.block,
          street: addressDetails.street,
          avenue: addressDetails.avenue,
          house_no: addressDetails.house,
          floor_no: addressDetails.floor,
          flat_no: addressDetails.flat,
          time: areaDetails?.now,
          schedule_time: areaDetails?.deliveryTiming,
          preorder_on: moment(areaDetails?.laterDeliveryTiming)
            .locale("en")
            .format("YYYY-MM-DD HH:mm:ss"),
        });
        if (response?.status) {
          if (response.is_activated === "1") {
            if (response.data.is_serving === 0) {
              setNotServing(1);
              setLoading(false);
            } else {
              setCompanyData(response.data);
              setDeliveryCharge(response.data.delivery_charge);
              if (response.data.delivery_charge) {
                getDeliveryCharge(response.data.delivery_charge);
              }
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    })();
  }, [deliveryKm]);
  const getDeliveryCharge = async (delivery_charge) => {
    if (delivery_charge) {
      const response = await updateDeliveryCharges(
        vendorSlugResponse?.data?.ecom_url_slug,
        homePageDetails?.vendor_data?.vendors_id,
        areaDetails?.area_id,
        delivery_charge
      );
      if (response && response.status) {
        setLoading(false);
        handleCartChange(response.data);
      } else {
        setLoading(false);
        router.push("/");
      }
    }
  };
  return (
    <Box>
      {homePageDetails?.vendor_data?.international_delivery === "3" ||
      homePageDetails?.vendor_data?.international_delivery === "" ||
      internationalDelivery.delivery_country_code.toUpperCase() === "KW" ||
      areaDetails.area_id !== "" ? (
        !showAddressForm ? (
          <AddressSection
            setShowAddressForm={setShowAddressForm}
            triggerPaymentMethod={triggerPaymentMethod}
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
            setShowMap={() => setShowMap(true)}
          />
        )
      ) : (
        <InternationalAddress internationalError={internationalError} />
      )}
      <Dialog
        open={showMap}
        onClose={() => setShowMap(false)}
        maxWidth="md"
        sx={{
          "& .MuiDialog-container > .MuiPaper-root": {
            borderRadius: "16px", // Change this value as needed
            minWidth: "400px",
          },
        }}
      >
        <Box
          sx={{
            padding: "20px",
            width: window.innerWidth > 600 ? "560px" : "auto",
          }}
        >
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
