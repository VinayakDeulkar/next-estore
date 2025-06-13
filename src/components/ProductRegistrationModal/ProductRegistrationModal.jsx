import React, { useContext, useEffect, useState } from "react";

import "./ProductRegistrationModal.css";
import ReactFlagsSelect from "react-flags-select";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import BackComponent from "../BackComponent";
import Spinner from "../common/Spinner/spinner";
import { useRouter } from "next/navigation";
import { registerProductApi } from "@/apis/registerProduct";
import { tele, telecount } from "@/constants/constants";
import { Box, Dialog, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";
import TextInputField from "../assetBoxDesign/TextField/textInputField";

const ProductRegistrationModal = ({
  showRegister,
  handleClose,
  product,
  addedVariaton,
  addedAddons,
  addon,
  productvariation,
  prodNumber,
  note,
  type,
}) => {
  const {
    language,
    handleLanguageChange,
    vendorSlug,
    handleVendorSlugChange,
    homePageDetails,
    handleHomePageDetailsChange,
    areaDetails,
    handleAreaDetailsChange,
    cart,
    handleCartChange,
    userDetails,
    handleUserDetailsChange,
    contactDetails,
    handleContactDetailsChange,
    internationalDelivery,
    handleInternationalDeliveryChange,
    resetUserDetails,
    openArea,
    handleOpenAreaChange,
    addressDetails,
    handleAddressDetailsChange,
    payment,
    handleSetPaymentChange,
    search,
    handleSearchProduct,
    layout14ToggleView,
    handleSetLayout14ToggleViewChange,
  } = useContext(AppContext);
  const [registrationFailed, setRegistrationFailed] = useState({
    status: false,
    message: "",
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [spinLoader, setSpinLoader] = useState(false);
  const [orderDetails, setOrderDetails] = useState();
  const [variationName, setVariationName] = useState({
    eng: "",
    ar: "",
  });
  const [addonName, setAddonName] = useState({
    eng: "",
    ar: "",
  });
  const router = useRouter();
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

  const nameValidation = (value) => {
    let pattern =
      /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z ]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_ ]*$/;
    if (value == "" || !value) {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        nameErrorMessage: "This field is compulsory",
        nameErrorMessagear: "مطلوب ملء هذا الحقل",
        nameError: true,
      }));
      return true;
    } else if (value.match(pattern)) {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        nameErrorMessage: "",
        nameError: false,
        nameErrorMessagear: "",
      }));
      return false;
    } else {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        nameErrorMessage: "Only alphabets are allowed",
        nameError: true,
        nameErrorMessagear: "يسمح فقط الحروف الهجائية",
      }));
      return true;
    }
  };

  const phoneValidation = (value) => {
    let pattern = /^[0-9]+$/;
    let kwpattern = /^[124965]\d+$/;
    if (value === "") {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        phoneErrorMessage: "This field is compulsory",
        phoneError: true,
        phoneErrorMessagear: "مطلوب ملء هذا الحقل",
      }));
      return true;
    } else if (value.length < 8) {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        phoneErrorMessage: "Please enter at least 8 characters",
        phoneError: true,
        phoneErrorMessagear: "الرجاء إدخال 8 أرقام",
      }));
      return true;
    } else if (!value.match(pattern)) {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        phoneErrorMessage: "Only numbers allowed",
        phoneError: true,
        phoneErrorMessagear: "مسموح بالأرقام فقط",
      }));
      return true;
    } else if (contactDetails?.phoneCode == "KW" && !value.match(kwpattern)) {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        phoneErrorMessage: "Enter a valid phone number",
        phoneError: true,
        phoneErrorMessagear: "أدخل رقم هاتف صالح",
      }));
      return true;
    } else {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        phoneErrorMessage: "",
        phoneError: false,
        phoneErrorMessagear: "",
      }));
      return false;
    }
  };

  const emailValidation = (value) => {
    let pattern =
      /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|co.in)\b/;
    if (
      value.match(pattern) ||
      (value === "" && homePageDetails?.vendor_data.vendors_id !== "1250")
    ) {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        emailErrorMessage: "",
        emailError: false,
        emailErrorMessagear: "",
      }));
      return false;
    } else {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        emailErrorMessage: "Enter a valid email",
        emailError: true,
        emailErrorMessagear: "البريد الالكتروني غير صحيح",
      }));
      return true;
    }
  };

  // useEffect(() => {
  //   const modalContainer = document.getElementById("termsmodal-container");
  //   const body = document.body;
  //   if (modalContainer && body) {
  //     if (showRegister && modalContainer) {
  //       modalContainer.removeAttribute("class");
  //       modalContainer.classList.add("open");
  //       body.classList.add("modal-active");
  //     } else {
  //       modalContainer.classList.add("out");
  //       body.classList.remove("modal-active");
  //     }
  //   }
  // }, [showRegister]);

  const modifyValue = (phoneNumber) => {
    if (phoneNumber.includes("+")) {
      const data = phoneNumber.split(" ");
      let finalNumber = "";
      if (data.length === 1) {
        const newData = data[0].split("").slice(4, 12);
        finalNumber = newData.join("");
      } else {
        data.map((num, i) => {
          if (i !== 0) {
            finalNumber += num;
          }
        });
      }
      return finalNumber;
    } else {
      return phoneNumber;
    }
  };

  useEffect(() => {
    if (addedVariaton.length > 0) {
      let tempEngVariant = [];
      let tempArbVariant = [];
      Object.keys(productvariation).map((key, index) => {
        const value = productvariation[key].find((ele) =>
          addedVariaton.includes(Number(ele.variation_detail_id))
        );
        tempEngVariant.push(value.value);
        tempArbVariant.push(value.value_ar);
      });
      setVariationName({
        eng: tempEngVariant.join(", "),
        ar: tempArbVariant.join(", "),
      });
    }
  }, [addedVariaton]);

  useEffect(() => {
    if (addedAddons.length > 0) {
      let tempEngAddon = [];
      let tempArbAddon = [];
      addon.map((key, index) => {
        key.child
          .filter((ele) => addedAddons.includes(ele.child_id))
          .map((element) => {
            tempEngAddon.push(element.english_name);
            tempArbAddon.push(element.arabic_name);
          });
      });
      setAddonName({
        eng: tempEngAddon.join(", "),
        ar: tempArbAddon.join(", "),
      });
    }
  }, [addedAddons]);

  const registerProduct = async (e) => {
    let email = emailValidation(contactDetails.email);
    let phone = phoneValidation(contactDetails.phone);
    let name = nameValidation(contactDetails.name?.trim());
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
        setSpinLoader(true);
        const response = await registerProductApi({
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          ecom_vendor_id: homePageDetails?.vendor_data?.ecommerce_vendor_id,
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
          full_name: contactDetails?.name,
          country_code: `+${tele[contactDetails?.phoneCode]}`,
          phone_number: contactDetails?.phone,
          email: contactDetails?.email,
          product_id: product?.id,
          quantity: prodNumber,
          add_on_ids: addedAddons,
          variation_ids: addedVariaton.join(","),
          product_notes: note,
          branch_id: areaDetails?.branchForArea?.id,
          branch_name: areaDetails?.branchForArea?.english,
          is_pickup: areaDetails?.type == "pickup" ? 1 : 0,
        });
        if (response?.data?.status) {
          await axios
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}/get-order-details`,
              JSON.stringify({
                token: process.env.NEXT_PUBLIC_APP_TOKEN,
                vendor_slug: vendorSlug?.data?.ecom_url_slug,
                vendor_id: homePageDetails?.vendor_data?.vendors_id,
                ecommerce_vendor_id:
                  homePageDetails?.vendor_data?.ecommerce_vendor_id,
                order_number: response?.data?.data?.order_number,
              })
            )
            .then((res) => {
              setOrderDetails({
                ...res?.data?.data?.customer_details,
                order_number: res?.data?.data?.order_number,
              });
              setRegistrationSuccess(true);
              setSpinLoader(false);
            })
            .catch((e) => {
              setRegistrationFailed({
                status: true,
              });
              setSpinLoader(false);
            });
        } else {
          setRegistrationFailed({
            status: true,
            message: response.data.message,
          });
          setSpinLoader(false);
        }
      }
    }
  };

  const getBranchAddress = () => {
    if (areaDetails.data.branch) {
      const currentBranch = areaDetails.data.branch.filter(
        (branch) => branch.name == orderDetails?.branch
      );
      if (currentBranch.length) {
        return (
          <div>
            {language == "ltr"
              ? currentBranch[0].address
              : currentBranch[0].arabic_address}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <>
      {/* <div
        id="termsmodal-container"
        style={{ top: "-53px", height: "100dvh", overflow: "hidden" }}
      >
        <div
          className={"modal-background"}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={"modal"}
            style={{ padding: "10px", width: "100%", position: "relative" }}
          >
            <div
              style={{
                overflowY: "auto",
                paddingRight: 10,
                maxHeight: "90vh",
                overflowX: "hidden",
                paddingLeft: 10,
                color: "#000",
                background: "#fff",
                borderRadius: "20px",
                width: "100%",
                position: "relative",
              }}
              className="paymentTypeMain firstDetailsTab scrollbarPaylinkCard"
            >
              <div
                className="headerModal"
                style={{
                  position: "sticky",
                  top: "0",
                  width: "100%",
                  background: "white",
                }}
              >
                <div
                  style={{
                    margin: 0,
                    position: "absolute",
                  }}
                  className="goBackButton"
                >
                  <div
                    onClick={() => {
                      handleClose(false, "");
                    }}
                    style={{
                      marginBottom: "0",
                      paddingTop: "15px",
                      marginLeft: language === "ltr" ? 0 : "-15px",
                      marginRight: language === "ltr" ? "-15px" : 0,
                    }}
                  >
                    <BackComponent />
                  </div>
                </div>
              </div>

              <div className="productRegistrationHeader">
                {language === "ltr" ? "Product Registration" : "تسجيل المنتج"}
              </div>

              <div className="registerProductDetails">
                <div style={{ marginBottom: "10px" }}>
                  <img
                    src={product?.image}
                    alt=""
                    className="registerProductImg"
                  />
                </div>
                <div>
                  <div className="registerProductName">
                    {language === "ltr" ? product?.name : product?.name_ar}
                  </div>
                  <div
                    className="selectedVariation"
                    style={{ marginTop: "5px" }}
                  >
                    {addedVariaton.length > 0
                      ? language === "ltr"
                        ? variationName.eng
                        : variationName.ar
                      : null}
                    {addedAddons.length > 0
                      ? language === "ltr"
                        ? addonName.eng
                        : addonName.ar
                      : null}
                  </div>
                  {prodNumber > 0 ? (
                    <div
                      style={
                        language === "ltr"
                          ? {
                              fontSize: "14px",
                              fontWeight: "400",
                              marginTop: "5px",
                            }
                          : {
                              fontSize: "16px",
                              fontWeight: "400",
                              marginTop: "5px",
                            }
                      }
                    >
                      {language === "ltr" ? "Quantity:" : "كمية:"}&nbsp;
                      <span>{prodNumber}</span>
                    </div>
                  ) : null}
                </div>
              </div>

              {spinLoader ? (
                <div style={{ padding: "30px" }}>
                  <Spinner
                    height="45px"
                    size="5px"
                    color={homePageDetails?.vendor_data?.vendor_color}
                  />
                </div>
              ) : null}

              {spinLoader ||
              registrationSuccess ||
              registrationFailed?.status ? null : (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    padding: "20px",
                    direction: language,
                    paddingBottom: "50px",
                  }}
                >
                  <form action="javascript/void" autoComplete="on">
                    <div className="contact-details-form-maindiv">
                      <form>
                        <div className="contact-details-form-div">
                          <label
                            className="contact-details-label-name"
                            style={{ width: "100%", textAlign: "start" }}
                          >
                            {language == "ltr" ? "Phone Number" : "رقم الهاتف"}
                          </label>
                          <div className="contact-form-container">
                            <ReactFlagsSelect
                              selected={contactDetails?.phoneCode}
                              searchable={true}
                              showSelectedLabel={false}
                              customLabels={telecount}
                              className="contact-details-flag"
                              onSelect={(code) => {
                                handleContactDetailsChange({
                                  ...contactDetails,
                                  phoneCode: code,
                                  phone: contactDetails?.phone?.substring(
                                    0,
                                    code == "KW" ? 8 : 12
                                  ),
                                });
                              }}
                            />
                            <input
                              type="tel"
                              className="contact-details-form-control contact-details-phone-number"
                              placeholder=""
                              id="phone"
                              name="phone"
                              required="true"
                              value={contactDetails.phone}
                              autoComplete="tel"
                              onChange={(e) => {
                                const newValue = modifyValue(e.target.value);
                                if (
                                  (contactDetails.phoneCode === "KW" &&
                                    newValue.length <= 8) ||
                                  (contactDetails.phoneCode !== "KW" &&
                                    newValue.length <= 10)
                                ) {
                                  handleContactDetailsChange({
                                    ...contactDetails,
                                    phone: newValue,
                                  });
                                }
                              }}
                              style={{ fontSize: "16px" }}
                            ></input>
                          </div>
                          {errorContactDetails.phoneError && (
                            <label
                              className="error-text"
                              style={{ textAlign: "start", width: "100%" }}
                            >
                              {language == "ltr"
                                ? errorContactDetails.phoneErrorMessage
                                : errorContactDetails.phoneErrorMessagear}
                            </label>
                          )}
                        </div>
                        <div
                          className="contact-details-form-div"
                          style={{ display: "flex", alignItems: "flex-end" }}
                        >
                          <div style={{ width: "100%" }}>
                            <div className="contact-form-container">
                              <input
                                type="text"
                                className="contact-details-form-control"
                                placeholder=""
                                id="name"
                                name="name"
                                required="true"
                                autoComplete
                                value={contactDetails.name}
                                onChange={(e) => {
                                  handleContactDetailsChange({
                                    ...contactDetails,
                                    name: e.target.value,
                                  });
                                }}
                                style={{ fontSize: "16px" }}
                              ></input>
                              <label
                                for="name"
                                className="contact-details-label-name contact-details-label-name1"
                                style={{ width: "100%", textAlign: "start" }}
                              >
                                {language == "ltr"
                                  ? "Full Name"
                                  : "الاسم الكامل"}
                              </label>
                            </div>
                            {errorContactDetails.nameError && (
                              <label
                                className="error-text"
                                style={{ textAlign: "start", width: "100%" }}
                              >
                                {language == "ltr"
                                  ? errorContactDetails.nameErrorMessage
                                  : errorContactDetails.nameErrorMessagear}
                              </label>
                            )}
                          </div>
                        </div>
                      </form>
                      <div
                        className="contact-details-form-div"
                        style={{
                          marginBottom: "0",
                          display: "flex",
                          alignItems: "flex-end",
                        }}
                      >
                        <div style={{ width: "100%" }}>
                          <div className="contact-form-container">
                            <input
                              type="email"
                              className="contact-details-form-control"
                              placeholder=""
                              id="email"
                              name="email"
                              required="true"
                              autoComplete
                              value={contactDetails.email}
                              onChange={(e) => {
                                handleContactDetailsChange({
                                  ...contactDetails,
                                  email: e.target.value,
                                });
                              }}
                              style={{ fontSize: "16px" }}
                            ></input>
                            <label
                              for="email"
                              className="contact-details-label-name contact-details-label-name1"
                              style={{ width: "100%", textAlign: "start" }}
                            >
                              {language == "ltr"
                                ? "Email"
                                : "البريد الإلكتروني"}
                            </label>
                          </div>
                          {errorContactDetails.emailError && (
                            <label
                              className="error-text"
                              style={{ textAlign: "start", width: "100%" }}
                            >
                              {language == "ltr"
                                ? errorContactDetails.emailErrorMessage
                                : errorContactDetails.emailErrorMessagear}
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {registrationSuccess ? (
                <div style={{ width: "100%" }}>
                  <div
                    className="responseText"
                    style={{ color: "green", padding: "20px" }}
                  >
                    {language === "ltr"
                      ? "Product registered successfully"
                      : "تم تسجيل المنتج بنجاح"}
                  </div>
                  <div
                    style={{ textAlign: "start", padding: "0 20px 20px 20px" }}
                  >
                    <div>
                      <div className="common-delivery-status-order-number-grey">
                        {language === "ltr" ? "Order No." : "رقم الطلب"}
                      </div>
                      <div className="common-delivery-status-order-number-black">
                        {orderDetails?.order_number}
                      </div>
                    </div>

                    <div
                      className={"common-delivery-status-order-number-grey"}
                      style={{ marginTop: "15px" }}
                    >
                      {orderDetails?.self_pickup === "1"
                        ? language === "ltr"
                          ? "Pickup From"
                          : "تلتقط من"
                        : language === "ltr"
                        ? "Delivered To"
                        : "التوصيل إلى"}
                    </div>

                    <div className="orderStatus-userData-deliverText">
                      {orderDetails?.self_pickup === "1"
                        ? language === "ltr"
                          ? orderDetails?.branch
                          : orderDetails?.branch_ar
                        : language === "ltr"
                        ? orderDetails?.area
                        : orderDetails?.area_ar}
                    </div>

                    <div className="orderStatus-userData-addressText">
                      {getBranchAddress()}
                    </div>
                  </div>
                </div>
              ) : null}

              {registrationFailed?.status ? (
                <div
                  className="responseText"
                  style={{ color: "red", padding: "20px" }}
                >
                  {registrationFailed?.message
                    ? registrationFailed.message
                    : language === "ltr"
                    ? "Something went wrong. Please try again later"
                    : "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقا"}
                </div>
              ) : null}

              {!spinLoader ? (
                <div
                  className={`bottom-button`}
                  style={{ width: "100%", position: "sticky", bottom: 0 }}
                >
                  <Box
                    component={"a"}
                    className={`text-center checkout-button `}
                    onClick={(e) => {
                      registrationSuccess || registrationFailed?.status
                        ? router.push("/")
                        : registerProduct(e);
                    }}
                  >
                    {registrationSuccess || registrationFailed?.status
                      ? language === "ltr"
                        ? "Continue Shopping"
                        : "مواصلة التسوق"
                      : language === "ltr"
                      ? "Register"
                      : "يسجل"}
                  </Box>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div> */}

      <Dialog
        open={showRegister}
        onClose={handleClose}
        maxWidth="md"
        sx={{
          "& .MuiDialog-container > .MuiPaper-root": {
            borderRadius: "16px", // Change this value as needed
            minWidth: "340px",
            margin: "15px",
            overflow: "hidden",
          },
          "& .MuiDialog-container": {
            justifyContent:
              type === "deskCheckout" || window.innerWidth < 991
                ? "center"
                : "flex-start",
          },
        }}
      >
        <Box
          sx={{
            height: "calc(100dvh - 50px)",
            padding: "20px",
            width: window.innerWidth > 990 ? "560px" : "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              "& .MuiIconButton-root": {
                padding: 0,
              },
            }}
          >
            <IconButton onClick={handleClose}>
              <ClearIcon
                sx={{
                  fill: "#000",
                }}
              />
            </IconButton>
          </Box>

          {/* <div className="productRegistrationHeader">
            {language === "ltr" ? "Product Registration" : "تسجيل المنتج"}
          </div> */}

          <Box sx={{ textAlign: "center" }}>
            <SubHeadline
              enText={"Product Registration"}
              arText={"تسجيل المنتج"}
              fontSize="24px"
            />
          </Box>

          <div className="registerProductDetails">
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={product?.image} alt="" className="registerProductImg" />
            </div>
            <div>
              <div style={{ textAlign: "center" }}>
                <SubHeadline
                  enText={product?.name}
                  arText={product?.name_ar}
                  fontSize="18px"
                />
              </div>
              <div
                className="selectedVariation"
                style={{ marginTop: "5px", textAlign: "center" }}
              >
                {addedVariaton.length > 0
                  ? language === "ltr"
                    ? variationName.eng
                    : variationName.ar
                  : null}
                {addedAddons.length > 0
                  ? language === "ltr"
                    ? addonName.eng
                    : addonName.ar
                  : null}
              </div>
              {prodNumber > 0 ? (
                <div
                  style={
                    language === "ltr"
                      ? {
                          fontSize: "14px",
                          fontWeight: "400",
                          marginTop: "5px",
                          textAlign: "center",
                        }
                      : {
                          fontSize: "16px",
                          fontWeight: "400",
                          marginTop: "5px",
                          textAlign: "center",
                        }
                  }
                >
                  {language === "ltr" ? "Quantity:" : "كمية:"}&nbsp;
                  <span>{prodNumber}</span>
                </div>
              ) : null}
            </div>
          </div>

          {spinLoader ? (
            <div
              style={{
                padding: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner
                height="45px"
                size="5px"
                color={homePageDetails?.vendor_data?.vendor_color}
              />
            </div>
          ) : null}

          {spinLoader ||
          registrationSuccess ||
          registrationFailed?.status ? null : (
            <div
              style={{
                position: "relative",
                width: "100%",
                padding: "20px",
                direction: language,
                paddingBottom: "50px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <>
                  <div className="customerInputsFlex">
                    <div className="form__group formSemi">
                      <div className="inputFlag">
                        <div>
                          <ReactFlagsSelect
                            key={contactDetails?.phoneCode}
                            selected={contactDetails?.phoneCode}
                            searchable={true}
                            showSelectedLabel={false}
                            customLabels={telecount}
                            onSelect={(code) => {
                              handleContactDetailsChange({
                                ...contactDetails,
                                phoneCode: code,
                                phone: contactDetails?.phone?.substring(
                                  0,
                                  code == "KW" ? 8 : 12
                                ),
                              });
                            }}
                          />
                        </div>
                      </div>
                      <input
                        type="tel"
                        className="form__field hideBorder"
                        name="phone"
                        placeholder="98765432"
                        id="phone"
                        required="true"
                        value={contactDetails?.phone}
                        autoComplete="tel"
                        onChange={(e) => {
                          const newValue = modifyValue(e.target.value);
                          if (
                            (contactDetails.phoneCode === "KW" &&
                              newValue.length <= 8) ||
                            (contactDetails.phoneCode !== "KW" &&
                              newValue.length <= 10)
                          ) {
                            handleContactDetailsChange({
                              ...contactDetails,
                              phone: newValue,
                            });
                          }
                        }}
                        style={{ fontSize: "16px" }}
                      />
                      <label
                        htmlFor="phone"
                        className="form__label phoneLabel dataFilled"
                      >
                        {language == "ltr" ? "Phone Number" : "رقم الهاتف"}
                      </label>
                    </div>
                  </div>
                  {errorContactDetails.phoneError && (
                    <label className="error-text">
                      {language == "ltr"
                        ? errorContactDetails.phoneErrorMessage
                        : errorContactDetails.phoneErrorMessagear}
                    </label>
                  )}
                </>

                <>
                  <div className="customerInputsFlex" style={{ width: "100%" }}>
                    <div
                      className="form__group formSemi"
                      style={{ width: "100%" }}
                    >
                      <TextInputField
                        name="fullName"
                        label={"Full Name"}
                        arLabel={"الاسم الكامل"}
                        handleChange={(e) =>
                          handleContactDetailsChange({
                            ...contactDetails,
                            name: e.target.value,
                          })
                        }
                        value={contactDetails?.name}
                      />
                    </div>
                  </div>
                  {errorContactDetails.nameError && (
                    <label className="error-text">
                      {language == "ltr"
                        ? errorContactDetails.nameErrorMessage
                        : errorContactDetails.nameErrorMessagear}
                    </label>
                  )}
                </>

                <>
                  <div className="customerInputsFlex" style={{ width: "100%" }}>
                    <div
                      className="form__group formSemi"
                      style={{ width: "100%" }}
                    >
                      <TextInputField
                        name={"email"}
                        label={"Email"}
                        arLabel={"البريد الإلكتروني"}
                        value={contactDetails?.email}
                        handleChange={(e) => {
                          handleContactDetailsChange({
                            ...contactDetails,
                            email: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  {errorContactDetails.emailError && (
                    <label className="error-text">
                      {language == "ltr"
                        ? errorContactDetails.emailErrorMessage
                        : errorContactDetails.emailErrorMessagear}
                    </label>
                  )}
                </>
              </div>
            </div>
          )}

          {registrationSuccess ? (
            <div style={{ width: "100%" }}>
              <div
                className="responseText"
                style={{ color: "green", padding: "20px", textAlign: "center" }}
              >
                {language === "ltr"
                  ? "Product registered successfully"
                  : "تم تسجيل المنتج بنجاح"}
              </div>
              <div style={{ textAlign: "start", padding: "0 20px 20px 20px" }}>
                <div>
                  <div className="common-delivery-status-order-number-grey">
                    {language === "ltr" ? "Order No." : "رقم الطلب"}
                  </div>
                  <div className="common-delivery-status-order-number-black">
                    {orderDetails?.order_number}
                  </div>
                </div>

                <div
                  className={"common-delivery-status-order-number-grey"}
                  style={{ marginTop: "15px" }}
                >
                  {orderDetails?.self_pickup === "1"
                    ? language === "ltr"
                      ? "Pickup From"
                      : "تلتقط من"
                    : language === "ltr"
                    ? "Delivered To"
                    : "التوصيل إلى"}
                </div>

                <div className="orderStatus-userData-deliverText">
                  {orderDetails?.self_pickup === "1"
                    ? language === "ltr"
                      ? orderDetails?.branch
                      : orderDetails?.branch_ar
                    : language === "ltr"
                    ? orderDetails?.area
                    : orderDetails?.area_ar}
                </div>

                <div className="orderStatus-userData-addressText">
                  {getBranchAddress()}
                </div>
              </div>
            </div>
          ) : null}

          {registrationFailed?.status ? (
            <div
              className="responseText"
              style={{ color: "red", padding: "20px", textAlign: "center" }}
            >
              {registrationFailed?.message
                ? registrationFailed.message
                : language === "ltr"
                ? "Something went wrong. Please try again later"
                : "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقا"}
            </div>
          ) : null}

          {!spinLoader ? (
            <div
              className={`bottom-button`}
              style={{ width: "100%", position: "sticky", bottom: 0 }}
            >
              <Box
                component={"a"}
                className={`text-center checkout-button `}
                onClick={(e) => {
                  registrationSuccess || registrationFailed?.status
                    ? router.push("/")
                    : registerProduct(e);
                }}
              >
                {registrationSuccess || registrationFailed?.status
                  ? language === "ltr"
                    ? "Continue Shopping"
                    : "مواصلة التسوق"
                  : language === "ltr"
                  ? "Register"
                  : "يسجل"}
              </Box>
            </div>
          ) : null}
        </Box>
      </Dialog>
    </>
  );
};

export default ProductRegistrationModal;
