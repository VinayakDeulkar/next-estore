"use client";
import {
  changeArea,
  getDeliveryCompanies,
  GetUserDetails,
  RegisterUser,
  saveUserAddress,
  updateDeliveryCharges,
  updateUserDetails,
  verifyUserOTP,
} from "@/apis";
import AddressSection from "@/components/AddressSection/addressSection";
import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import DeliveryMapContainer from "@/components/DeliveryMap/DeliveryMapContainer";
import NewAddressForm from "@/components/DeliveryMap/NewAddressForm";
import DeskCheckoutSection from "@/components/DeskCheckoutSection/deskCheckoutSection";
import GoogleMapComponent from "@/components/MapComponent/GoogleMapComponent";
import NewContactDetails from "@/components/NewContactDetails/NewContactDetails";
import CheckoutModal from "@/components/NewOrderDetailsPage/Components/CheckoutModal";
import DeliveryNotServing from "@/components/NewOrderDetailsPage/Components/DeliveryNotServing";
import OtpVerification from "@/components/OtpVerification/OtpVerification";
import PickupContainer from "@/components/PickupContainer/PickupContainer";
import { mapArea } from "@/constants/areaConstant";
import { tele } from "@/constants/constants";
import {
  emailValidation,
  nameValidation,
  phoneValidation,
} from "@/constants/function";
import { AppContext } from "@/context/AppContext";
import { getDrivingDistance } from "@/getDrivingDistance";
import { Box, Dialog, Grid } from "@mui/material";
import { useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";

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
    vendorSlug,
    addressDetails,
    handleOpenAreaChange,
    handleAddressDetailsChange,
    handleAreaDetailsChange,
  } = useContext(AppContext);
  const [showGuestUser, setShowGuestUser] = useState(true);
  const [showNameEmailFields, setShowNameEmailFields] = useState(false);
  const [openOtpPage, setOpenOtpPage] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [popup, setPopup] = useState({ show_popup: 0 });
  const [deliveryKm, setDeliveryKm] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [notServing, setNotServing] = useState(0);
  const [selectedBounds, setSelectedBounds] = useState({
    north: 30.0978,
    south: 28.5244,
    east: 48.4161,
    west: 46.5682,
  });
  const [showMap, setShowMap] = useState(false);

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
  const [stepper, setStepper] = useState(0);

  const [pickupError, setPickupError] = useState({
    modelError: "",
    colorError: "",
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
  useEffect(() => {}, [contactDetails]);

  useEffect(() => {
    if (userDetails?.id && areaDetails?.type == "pickup") {
      setStepper(1);
    }
  }, [userDetails]);

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
          } else {
            setStepper(1);
          }
        } else if (
          (homePageDetails?.vendor_data?.international_delivery !== "3" &&
            homePageDetails?.vendor_data?.international_delivery !== "") ||
          internationalDelivery.delivery_country_code.toUpperCase() !== "KW"
        ) {
          setShowDeliveryAddress(true);
        } else {
          setShowDeliveryAddress(true);
        }
      }
    } else if (stepper === 1) {
      if (contactDetails.model !== "" && contactDetails.color !== "") {
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
            route: "/desk-checkout",
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
              // setShowPaymentMethod(true);
              getDistanceMatrix();
              getEstimatedDeliveryTime();
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
                  getDistanceMatrix();
                  getEstimatedDeliveryTime();
                  // setLoading(false);
                  // setShowPaymentMethod(true);
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
      if (
        internationalDelivery.delivery_address1 !== "" &&
        internationalDelivery.delivery_address2 !== ""
      ) {
        setShowPaymentMethod(true);
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

  const handleMapLoad = () => {
    const forClick = document.getElementById("forClickOnly");
    forClick?.click();
  };

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

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey:
  //     "https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=AIzaSyDK_1lc7uLQSGYHVpr0mGl-c1Zys2OPOdg", // Replace with your Google Maps API key
  // });

  // const getDistanceMatrix = async () => {
  //   const check = cart?.cartCount;
  //   if (
  //     check &&
  //     areaDetails?.type == "delivery" &&
  //     areaDetails?.data?.branch &&
  //     (internationalDelivery.delivery_country_code.toLowerCase() === "kw" ||
  //       homePageDetails?.vendor_data?.international_delivery === "3" ||
  //       homePageDetails?.vendor_data?.international_delivery === "")
  //   ) {
  //     if (areaDetails?.area == "Mutlaa") {
  //       const branch_latlng = areaDetails?.data?.branch?.filter(
  //         (branch) => branch.id == areaDetails?.branchForArea.id
  //       );
  //       if (window.google && window.google.maps) {
  //         const origin = new window.google.maps.LatLng(
  //           String(branch_latlng[0].lat),
  //           String(branch_latlng[0].lng)
  //         );
  //         const destination = new window.google.maps.LatLng(
  //           String(addressDetails.lat),
  //           String(addressDetails.lng)
  //         );
  //         const service = new window.google.maps.DistanceMatrixService();
  //         const request = {
  //           origins: [origin],
  //           destinations: [destination],
  //           travelMode: "DRIVING",
  //           unitSystem: window.google.maps.UnitSystem.METRIC,
  //         };

  //         service.getDistanceMatrix(request, (response, status) => {
  //           if (
  //             status === "OK" &&
  //             response.rows[0].elements[0].status === "OK"
  //           ) {
  //             const distanceInMeters =
  //               response.rows[0].elements[0].distance.value;
  //             const distanceInKilometers = distanceInMeters / 1000;
  //             setDeliveryKm(distanceInKilometers);
  //           } else {
  //             console.error("Error:", status);
  //           }
  //         });
  //       }
  //     } else {
  //       let selectedAra = mapArea.find(
  //         (ele) =>
  //           ele.area_name == areaDetails.area ||
  //           ele.area_name_ar == areaDetails.area_ar
  //       );

  //       const selectedArea = selectedAra.area_map;
  //       const encodedPlaceName = encodeURIComponent(
  //         `street ${addressDetails.street} ,block ${addressDetails.block} ,${selectedArea}, Kuwait`
  //       );
  //       const branch_latlng = areaDetails?.data?.branch?.filter(
  //         (branch) => branch.id == areaDetails?.branchForArea.id
  //       );
  //       const dataResponse = await getDrivingDistance(
  //         { lat: branch_latlng[0]?.lat, lng: branch_latlng[0]?.lng },
  //         { lat: addressDetails?.lat, lng: addressDetails?.lng }
  //       );
  //       console.log(dataResponse, "dataResponse");
  //       // const respones = await axios.get(
  //       //   `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedPlaceName}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
  //       // );
  //       // if (respones.status === 200) {
  //       //   let getSelectedAreaDetails = [];
  //       //   if (respones?.data?.results.length == 1) {
  //       //     getSelectedAreaDetails.push(respones?.data?.results[0]);
  //       //   } else {
  //       //     respones?.data?.results.map((ele) =>
  //       //       ele.address_components.map((element) => {
  //       //         if (
  //       //           element.short_name.toLowerCase() ==
  //       //             selectedArea.toLowerCase() ||
  //       //           element.long_name.toLowerCase() == selectedArea.toLowerCase()
  //       //         ) {
  //       //           getSelectedAreaDetails.push(ele);
  //       //         }
  //       //       })
  //       //     );
  //       //   }

  //       //   let lat = getSelectedAreaDetails[0]?.geometry?.location?.lat;
  //       //   let lng = getSelectedAreaDetails[0]?.geometry?.location?.lng;

  //       //   const branch_latlng = areaDetails?.data?.branch?.filter(
  //       //     (branch) => branch.id == areaDetails?.branchForArea.id
  //       //   );
  //       //   if (window.google && window.google.maps) {
  //       //     const origin = new window.google.maps.LatLng(
  //       //       String(branch_latlng[0]?.lat),
  //       //       String(branch_latlng[0]?.lng)
  //       //     );
  //       //     const destination = new window.google.maps.LatLng(
  //       //       String(addressDetails?.lat),
  //       //       String(addressDetails?.lng)
  //       //     );
  //       //     const service = new window.google.maps.DistanceMatrixService();
  //       //     const request = {
  //       //       origins: [origin],
  //       //       destinations: [destination],
  //       //       travelMode: "DRIVING",
  //       //       unitSystem: window.google.maps.UnitSystem.METRIC,
  //       //     };
  //       //     console.log(request, "request");

  //       //     service.getDistanceMatrix(request, (response, status) => {
  //       //       console.log(response, "response");
  //       //       if (
  //       //         status === "OK" &&
  //       //         response.rows[0].elements[0].status === "OK"
  //       //       ) {
  //       //         const distanceInMeters =
  //       //           response.rows[0].elements[0].distance.value;
  //       //         const distanceInKilometers = distanceInMeters / 1000;
  //       //         setDeliveryKm(distanceInKilometers);
  //       //       } else {
  //       //         console.error("Error:", status);
  //       //       }
  //       //     });
  //       //   }
  //       // }
  //     }
  //   }
  // };

  // const getEstimatedDeliveryTime = async () => {
  //   if (cart && cart.deliveryCharge) {
  //     setDeliveryCharge(cart.deliveryCharge);
  //   }
  //   if (
  //     deliveryKm &&
  //     areaDetails?.type == "delivery" &&
  //     areaDetails?.area != "Mutlaa"
  //   ) {
  //     setLoading(true);
  //     const response = await getDeliveryCompanies({
  //       vendor_id: homePageDetails?.vendor_data?.vendors_id,
  //       product: cart.cartItems,
  //       distance: deliveryKm,
  //       area_id: areaDetails?.area_id,
  //       block_id: addressDetails.block,
  //       ecommerce_vendor_id: homePageDetails?.vendor_data?.ecommerce_vendor_id,
  //       branch_id: areaDetails?.branchForArea.id,
  //       destination: {
  //         latitude: Number(addressDetails.lat),
  //         longitude: Number(addressDetails.lng),
  //       },
  //       block: addressDetails.block,
  //       street: addressDetails.street,
  //       avenue: addressDetails.avenue,
  //       house_no: addressDetails.house,
  //       floor_no: addressDetails.floor,
  //       flat_no: addressDetails.flat,
  //       time: areaDetails?.now,
  //       schedule_time: areaDetails?.deliveryTiming,
  //       preorder_on: moment(areaDetails?.laterDeliveryTiming)
  //         .locale("en")
  //         .format("YYYY-MM-DD HH:mm:ss"),
  //     });
  //     if (response?.status) {
  //       if (response.is_activated === "1") {
  //         if (response.data.is_serving === 0) {
  //           setNotServing(1);
  //           setLoading(false);
  //         } else {
  //           setCompanyData(response.data);
  //           setDeliveryCharge(response.data.delivery_charge);
  //           if (response.data.delivery_charge) {
  //             getDeliveryCharge(response.data.delivery_charge);
  //           }
  //           setShowPaymentMethod(true);
  //           setLoading(false);
  //         }
  //       } else {
  //         setShowPaymentMethod(true);
  //         setLoading(false);
  //       }
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //     }
  //   }
  // };

  // const getDeliveryCharge = async (delivery_charge) => {
  //   if (delivery_charge) {
  //     const response = await updateDeliveryCharges(
  //       vendorSlug?.data?.ecom_url_slug,
  //       homePageDetails?.vendor_data?.vendors_id,
  //       areaDetails?.area_id,
  //       delivery_charge
  //     );
  //     if (response && response.status) {
  //       setLoading(false);
  //       handleCartChange(response.data);
  //     } else {
  //       setLoading(false);
  //       router.push("/");
  //     }
  //   }
  // };

  const handleAddressClick = () => {};

  return (
    <Box sx={{ height: "100vh", padding: "20px" }}>
      <HeaderBox />
      <Grid container sx={{ padding: "0 10%", marginTop: "50px" }}>
        <Grid item md={6} sx={{ padding: "0 20px" }}>
          <Box sx={{ fontSize: "30px" }}>
            {language === "ltr" ? "Checkout" : "متابعة الطلب"}
          </Box>
          <CommonHeader
            englishHeader={
              showNameEmailFields
                ? "Profile"
                : stepper === 0
                ? userDetails?.is_guest
                  ? "Contact Details"
                  : "Login"
                : "Checkout"
            }
            arabicHeader={
              showNameEmailFields
                ? "حساب تعريفي"
                : stepper === 0
                ? userDetails?.is_guest
                  ? "ارقام التواصل"
                  : "تسجيل الدخول"
                : "تفاصيل الإتصال"
            }
            fontWeight={400}
          />
          {stepper === 0 ? (
            <>
              {userDetails?.is_guest ? (
                <NewContactDetails
                  errorContactDetails={errorContactDetails}
                  setErrorContactDetails={setErrorContactDetails}
                />
              ) : openOtpPage ? (
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
                  stopRedirect={true}
                />
              )}
            </>
          ) : null}
          {stepper === 1 ? <PickupContainer pickupError={pickupError} /> : null}
          {showDeliveryAddress && (
            <div style={{ marginTop: "50px" }}>
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
                  setShowMap={() => setShowMap(true)}
                />
              )}
            </div>
          )}
          <Dialog
            open={showMap}
            onClose={() => setShowMap(false)}
            maxWidth="lg"
          >
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
          {showDeliveryAddress && !showPaymentMethod && (
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
                  if (!selectAddress) {
                    handleAddressClick();
                  } else {
                    handleDeliveryAddressNext();
                  }
                }}
              >
                {language === "ltr" ? "Next" : "متابعة"}
              </Box>
            </div>
          )}
          {!showDeliveryAddress && !showPaymentMethod && (
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
                  if (userDetails?.is_guest) {
                    handleGuestNext();
                  } else {
                    handleNext();
                  }
                }}
              >
                {language === "ltr" ? "Next" : "متابعة"}
              </Box>
            </div>
          )}
          {popup?.show_popup == 1 && (
            <CheckoutModal popup={popup} setPopup={setPopup}></CheckoutModal>
          )}
          {notServing == 1 ? <DeliveryNotServing /> : null}
        </Grid>

        <Grid item md={6} sx={{ padding: "0 20px" }}>
          <Box>
            <DeskCheckoutSection showPaymentMethod={showPaymentMethod} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeskCheckout;
