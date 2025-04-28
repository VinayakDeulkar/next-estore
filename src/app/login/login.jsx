"use client";
import {
  GetUserDetails,
  RegisterUser,
  changeArea,
  getScheduleTime,
  updateUserDetails,
  verifyUserOTP,
} from "@/apis";
import BackComponent from "@/components/BackComponent";
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
import moment from "moment";
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
    handleAreaDetailsChange,
    handleAddressDetailsChange,
    vendorSlug
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

  const getAddressData = async (userReponseAddress) => {
    if (userReponseAddress) {
      const addresslist = userReponseAddress?.map((ele) => {
        return {
          id: ele.id,
          addressName: ele.title ?? ele.addressName,
          addressType: ele.address_type,
          area: ele.area,
          area_id: ele.area_id,
          ar_area: ele.ar_area,
          street: ele.street,
          block: ele.block,
          avenue: ele.avenue,
          house: ele.house_number,
          floor: ele.floor_number,
          flat: ele.flat_number,
          special_directions: ele?.special_directions,
          lat: ele?.latitude,
          lng: ele?.longitude,
          is_primary: ele?.is_primary,
        };
      });
      // setAddressData(addresslist);
      const pimaryAddress = addresslist?.filter(
        (element) => element?.is_primary === "1"
      );

      if (pimaryAddress.length) {
        handleAddressDetailsChange((prev) => ({
          ...prev,
          id: pimaryAddress[0]?.id,
          area_id: pimaryAddress[0]?.area_id,
          block: pimaryAddress[0]?.block,
          street: pimaryAddress[0]?.street,
          avenue: pimaryAddress[0]?.avenue,
          house: pimaryAddress[0]?.house,
          floor: pimaryAddress[0]?.floor_number ?? pimaryAddress[0]?.floor,
          flat: pimaryAddress[0]?.flat_number ?? pimaryAddress[0]?.flat,
          lat: pimaryAddress[0]?.latitude ?? pimaryAddress[0]?.lat,
          lng: pimaryAddress[0]?.longitude ?? pimaryAddress[0]?.lng,
          fixedLat: pimaryAddress[0]?.latitude ?? pimaryAddress[0]?.lat,
          fixedLng: pimaryAddress[0]?.longitude ?? pimaryAddress[0]?.lng,
          addressType: pimaryAddress[0]?.addressType,
          addressName: pimaryAddress[0]?.addressName,
          special_directions: pimaryAddress[0]?.special_directions,
        }));
        const addedAddress = [];
        areaDetails?.data?.governarate?.forEach((address) => {
          const foundAddress = address?.area?.find(
            (area) => area?.area_id == pimaryAddress[0]?.area_id
          );
          if (foundAddress) {
            addedAddress.push(foundAddress);
          }
        });

        const changeAreaResponse = await changeArea({
          vendors_id: homePageDetails?.vendor_data?.vendors_id,
          area_id: pimaryAddress[0]?.area_id,
          vendorSlug: vendorSlug?.data?.ecom_url_slug,
          user_string: localStorage.getItem("userID"),
        });
        if (changeAreaResponse.status === true) {
          if (changeAreaResponse.data.show_popup === 0) {
            const timeResponse = await getScheduleTime({
              vendors_id: homePageDetails?.vendor_data?.vendors_id,
              area_id: pimaryAddress[0]?.area_id,
              vendorSlug: vendorSlug?.data?.ecom_url_slug,
            });
            if (timeResponse.status) {
              let selectedBranch = timeResponse.data.branch;
              let activeBranch = areaDetails?.data?.branch?.filter(
                (branch) => branch?.id == selectedBranch?.id
              )[0];
              let estimationTime =
                timeResponse.data?.delivery_details?.delivery_expected_type != 6
                  ? timeResponse.data?.delivery_details?.delivery_expected_time
                  : 0;
              if (
                timeResponse.data.time == 1 &&
                addedAddress[0]?.availability_status == 1
              ) {
                handleAreaDetailsChange((k) => ({
                  ...k,
                  area: addedAddress[0].area_name,
                  minimum: addedAddress[0].minimum_charge,
                  shopOpen: timeResponse.data.time,
                  now: timeResponse.data.time,
                  branch: "",
                  ar_branch: "",
                  ar_area: addedAddress[0].area_name_ar,
                  area_id: addedAddress[0].area_id,
                  deliveryTiming: timeResponse.data.schedule_time,
                  ar_deliveryTiming: timeResponse.data.schedule_time_ar,
                  customDelivery:
                    timeResponse.data?.delivery_details
                      ?.delivery_expected_type == 6,
                  getDeliveryTiming: moment()
                    .add(estimationTime, "minutes")
                    .toDate(),
                  laterDeliveryTiming: moment()
                    .add(estimationTime, "minutes")
                    .toDate(),
                  branchForArea: {
                    ...timeResponse.data.branch,
                    end:
                      activeBranch?.office_end_time >
                      activeBranch?.office_start_time
                        ? moment(activeBranch?.office_end_time, "HH:mm:ss")
                        : moment(activeBranch?.office_end_time, "HH:mm:ss").add(
                            1,
                            "days"
                          ),
                    start: moment(activeBranch?.office_start_time, "HH:mm:ss"),
                  },
                }));
              } else {
                handleAreaDetailsChange((l) => ({
                  ...l,
                  area: addedAddress[0]?.area_name,
                  minimum: addedAddress[0]?.minimum_charge,
                  shopOpen:
                    addedAddress[0]?.availability_status == 1
                      ? timeResponse?.data?.time
                      : 2,
                  now:
                    addedAddress[0]?.availability_status == 1
                      ? timeResponse?.data?.time
                      : 2,
                  ar_area: addedAddress[0]?.area_name_ar,
                  area_id: addedAddress[0]?.area_id,
                  branch: "",
                  ar_branch: "",
                  deliveryTiming: timeResponse?.data?.schedule_time,
                  ar_deliveryTiming: timeResponse?.data?.schedule_time_ar,
                  customDelivery:
                    timeResponse.data?.delivery_details
                      ?.delivery_expected_type == 6,
                  getDeliveryTiming:
                    addedAddress[0]?.availability_status == 1 ||
                    timeResponse?.data?.time == 2
                      ? moment(
                          timeResponse?.data?.preorder_on,
                          "YYYY-MM-DD HH:mm:ss"
                        ).toDate()
                      : moment().add(estimationTime, "minutes").toDate(),
                  laterDeliveryTiming:
                    addedAddress[0]?.availability_status == 1 ||
                    timeResponse?.data?.time == 2
                      ? moment(
                          timeResponse?.data?.preorder_on,
                          "YYYY-MM-DD HH:mm:ss"
                        ).toDate()
                      : moment().add(estimationTime, "minutes").toDate(),
                  branchForArea: {
                    ...timeResponse?.data?.branch,
                    end:
                      activeBranch?.office_end_time >
                      activeBranch?.office_start_time
                        ? moment(activeBranch?.office_end_time, "HH:mm:ss")
                        : moment(activeBranch?.office_end_time, "HH:mm:ss").add(
                            1,
                            "days"
                          ),
                    start: moment(activeBranch?.office_start_time, "HH:mm:ss"),
                  },
                }));
              }
            } else {
            }
          } else {
          }
        }
      } else {
        handleAddressDetailsChange((prev) => ({
          ...prev,
          id: addresslist[0]?.id,
          area_id: addresslist[0]?.area_id,
          block: addresslist[0]?.block,
          street: addresslist[0]?.street,
          avenue: addresslist[0]?.avenue,
          house: addresslist[0]?.house,
          floor: addresslist[0]?.floor_number ?? addresslist[0]?.floor,
          flat: addresslist[0]?.flat_number ?? addresslist[0]?.flat,
          lat: addresslist[0]?.latitude ?? addresslist[0]?.lat,
          lng: addresslist[0]?.longitude ?? addresslist[0]?.lng,
          fixedLat: addresslist[0]?.latitude ?? addresslist[0]?.lat,
          fixedLng: addresslist[0]?.longitude ?? addresslist[0]?.lng,
          addressType: addresslist[0]?.addressType,
          addressName: addresslist[0]?.addressName,
          special_directions: addresslist[0]?.special_directions,
        }));
        const addedAddress = [];
        areaDetails?.data?.governarate?.forEach((address) => {
          const foundAddress = address?.area?.find(
            (area) => area?.area_id == addresslist[0]?.area_id
          );
          if (foundAddress) {
            addedAddress.push(foundAddress);
          }
        });

        const changeAreaResponse = await changeArea({
          vendors_id: homePageDetails?.vendor_data?.vendors_id,
          area_id: addresslist[0]?.area_id,
          vendorSlug: vendorSlug?.data?.ecom_url_slug,
          user_string: localStorage.getItem("userID"),
        });
        if (changeAreaResponse.status === true) {
          if (changeAreaResponse.data.show_popup === 0) {
            const timeResponse = await getScheduleTime({
              vendors_id: homePageDetails?.vendor_data?.vendors_id,
              area_id: addresslist[0]?.area_id,
              vendorSlug: vendorSlug?.data?.ecom_url_slug,
            });
            if (timeResponse.status) {
              let selectedBranch = timeResponse.data.branch;
              let activeBranch = areaDetails?.data?.branch?.filter(
                (branch) => branch?.id == selectedBranch?.id
              )[0];
              let estimationTime =
                timeResponse.data?.delivery_details?.delivery_expected_type != 6
                  ? timeResponse.data?.delivery_details?.delivery_expected_time
                  : 0;
              if (
                timeResponse.data.time == 1 &&
                addedAddress[0].availability_status == 1
              ) {
                handleAreaDetailsChange((k) => ({
                  ...k,
                  area: addedAddress[0].area_name,
                  minimum: addedAddress[0].minimum_charge,
                  shopOpen: timeResponse.data.time,
                  now: timeResponse.data.time,
                  branch: "",
                  ar_branch: "",
                  ar_area: addedAddress[0].area_name_ar,
                  area_id: addedAddress[0].area_id,
                  deliveryTiming: timeResponse.data.schedule_time,
                  ar_deliveryTiming: timeResponse.data.schedule_time_ar,
                  customDelivery:
                    timeResponse.data?.delivery_details
                      ?.delivery_expected_type == 6,
                  getDeliveryTiming: moment()
                    .add(estimationTime, "minutes")
                    .toDate(),
                  laterDeliveryTiming: moment()
                    .add(estimationTime, "minutes")
                    .toDate(),
                  branchForArea: {
                    ...timeResponse.data.branch,
                    end:
                      activeBranch?.office_end_time >
                      activeBranch?.office_start_time
                        ? moment(activeBranch?.office_end_time, "HH:mm:ss")
                        : moment(activeBranch?.office_end_time, "HH:mm:ss").add(
                            1,
                            "days"
                          ),
                    start: moment(activeBranch?.office_start_time, "HH:mm:ss"),
                  },
                }));
              } else {
                handleAreaDetailsChange((l) => ({
                  ...l,
                  area: addedAddress[0].area_name,
                  minimum: addedAddress[0].minimum_charge,
                  shopOpen:
                    addedAddress[0].availability_status == 1
                      ? timeResponse.data.time
                      : 2,
                  now:
                    addedAddress[0].availability_status == 1
                      ? timeResponse.data.time
                      : 2,
                  ar_area: addedAddress[0].area_name_ar,
                  area_id: addedAddress[0].area_id,
                  branch: "",
                  ar_branch: "",
                  deliveryTiming: timeResponse?.data?.schedule_time,
                  ar_deliveryTiming: timeResponse?.data?.schedule_time_ar,
                  customDelivery:
                    timeResponse.data?.delivery_details
                      ?.delivery_expected_type == 6,
                  getDeliveryTiming:
                    addedAddress[0].availability_status == 1 ||
                    timeResponse.data.time == 2
                      ? moment(
                          timeResponse.data.preorder_on,
                          "YYYY-MM-DD HH:mm:ss"
                        ).toDate()
                      : moment().add(estimationTime, "minutes").toDate(),
                  laterDeliveryTiming:
                    addedAddress[0].availability_status == 1 ||
                    timeResponse.data.time == 2
                      ? moment(
                          timeResponse.data.preorder_on,
                          "YYYY-MM-DD HH:mm:ss"
                        ).toDate()
                      : moment().add(estimationTime, "minutes").toDate(),
                  branchForArea: {
                    ...timeResponse.data.branch,
                    end:
                      activeBranch?.office_end_time >
                      activeBranch?.office_start_time
                        ? moment(activeBranch?.office_end_time, "HH:mm:ss")
                        : moment(activeBranch?.office_end_time, "HH:mm:ss").add(
                            1,
                            "days"
                          ),
                    start: moment(activeBranch?.office_start_time, "HH:mm:ss"),
                  },
                }));
              }
            } else {
            }
          } else {
          }
        }
      }
    }
  };

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
          phone_number: contactDetails?.phone,
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
                getAddressData(userReponse?.data?.address);
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
        <BackComponent />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: openOtpPage ? "20px" : "40px",
            position: "relative",
            height:
              window.innerWidth > 900
                ? "calc(100vh - 80px)"
                : "calc(100vh - 150px)",
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
