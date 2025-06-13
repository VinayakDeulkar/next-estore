"use client";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import HeadLine from "@/components/assetBoxDesign/Headline/headLine";
import TextInputField from "@/components/assetBoxDesign/TextField/textInputField";
import { tele, telecount } from "@/constants/constants";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "@/components/ContactInfo/contactInfo.css";
import { GetUserDetails, updateUserDetails } from "@/apis";
import { useSnackbar } from "notistack";
import { Box } from "@mui/material";
import BackComponent from "@/components/BackComponent";
const UserInformation = () => {
  const {
    homePageDetails,
    contactDetails,
    handleContactDetailsChange,
    language,
    internationalDelivery,
    handleUserDetailsChange,
    resetUserDetails,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

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
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value === "") {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        emailErrorMessage: "This field is compulsory",
        emailError: true,
        emailErrorMessagear: "مطلوب ملء هذا الحقل",
      }));
      return true;
    } else if (!pattern.test(value)) {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        emailErrorMessage: "Enter a valid email",
        emailError: true,
        emailErrorMessagear: "البريد الالكتروني غير صحيح",
      }));
      return true;
    } else {
      setErrorContactDetails((errorContactDetails) => ({
        ...errorContactDetails,
        emailErrorMessage: "",
        emailError: false,
        emailErrorMessagear: "",
      }));
      return false;
    }
  };

  useEffect(() => {
    if (internationalDelivery && internationalDelivery.country_code) {
      handleContactDetailsChange({
        ...contactDetails,
        phoneCode: internationalDelivery.country_code,
      });
    }
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("contactInfo"))) {
      const contactInfo = JSON.parse(localStorage.getItem("contactInfo"));

      handleContactDetailsChange({
        ...contactDetails,
        phoneCode: contactInfo.code,
      });
    }
  }, []);

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

  const updateUserInfo = async () => {
    let name = nameValidation(contactDetails.name?.trim());
    let email = emailValidation(contactDetails.email, true);
    let phone = phoneValidation(contactDetails.phone, true);

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
            name: userReponse?.data?.name ?? "",
            phone: userReponse?.data?.phone ?? "",
            email: userReponse?.data?.email ?? "",
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
            phone: userReponse?.data.phone,
            phoneCode:
              Object.keys(tele).find(
                (ele) =>
                  tele[ele] == userReponse?.data?.country_code.replace("+", "")
              ) ?? "KW",
          });
          router.push("/info");
        } else {
          enqueueSnackbar({
            variant: "error",
            message: userReponse?.message,
            anchorOrigin: { horizontal: "left", vertical: "top" },
            autoHideDuration: 2000,
          });
          localStorage.removeItem("token");
          localStorage.removeItem("contactInfo");
          resetUserDetails();
          router.push("/");
        }
      } else {
        enqueueSnackbar({
          variant: "error",
          message: response?.message,
          anchorOrigin: { horizontal: "left", vertical: "top" },
          autoHideDuration: 2000,
        });
      }
    } else {
      console.log("validation failed");
    }
  };

  return (
    <EstoreLayout1>
      <BackComponent />
      <div>
        <HeadLine enText={"My Information"} arText={"معلوماتي"} />
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          height:
            window.innerWidth > 900
              ? "calc(100dvh - 80px)"
              : "calc(100dvh - 150px)",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <>
            <div className="customerInputsFlex">
              <div className="form__group formSemi">
                <div className="inputFlag">
                  <div
                    style={
                      homePageDetails?.vendor_data?.checkout_method === "2"
                        ? {
                            backgroundColor: "#EAEAEA",
                            borderRadius: "10px",
                            height: "44px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }
                        : {}
                    }
                  >
                    <ReactFlagsSelect
                      selected={contactDetails?.phoneCode}
                      searchable={true}
                      showSelectedLabel={false}
                      customLabels={telecount}
                      disabled={
                        homePageDetails?.vendor_data?.checkout_method === "2"
                      }
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
                    ></ReactFlagsSelect>
                  </div>
                </div>
                <input
                  type="tel"
                  className="form__field hideBorder"
                  name="phone"
                  placeholder="98765432"
                  id="phone"
                  required="true"
                  disabled={
                    homePageDetails?.vendor_data?.checkout_method === "2"
                  }
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
                {contactDetails?.phone ? (
                  <div
                    style={{
                      position: "absolute",
                      right: language === "ltr" && "10px",
                      left: language !== "ltr" && 0,
                      top: "7px",
                      display: "flex",
                      alignItems: "center",
                      color: "#fff",
                      padding: language === "ltr" ? "5px 7px" : "5px 12px",
                      borderRadius: "50px",
                      fontSize: "12px",
                      gap: "5px",
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ fill: "#4CAF50", fontSize: "20px" }}
                    />
                  </div>
                ) : null}
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
              <div className="form__group formSemi" style={{ width: "100%" }}>
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
                {contactDetails?.name ? (
                  <div
                    style={{
                      position: "absolute",
                      right: language === "ltr" && "10px",
                      left: language !== "ltr" && 0,
                      top: "27px",
                      display: "flex",
                      alignItems: "center",
                      color: "#fff",
                      padding: language === "ltr" ? "5px 7px" : "5px 12px",
                      borderRadius: "50px",
                      fontSize: "12px",
                      gap: "5px",
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ fill: "#4CAF50", fontSize: "20px" }}
                    />
                  </div>
                ) : null}
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
              <div className="form__group formSemi" style={{ width: "100%" }}>
                <TextInputField
                  name={"email"}
                  label={"Email"}
                  arLabel={"البريد الإلكتروني"}
                  value={contactDetails?.email}
                  disabled={
                    homePageDetails?.vendor_data?.checkout_method === "1"
                  }
                  handleChange={(e) => {
                    handleContactDetailsChange({
                      ...contactDetails,
                      email: e.target.value,
                    });
                  }}
                />
                {contactDetails?.email ? (
                  <div
                    style={{
                      position: "absolute",
                      right: language === "ltr" && "10px",
                      left: language !== "ltr" && 0,
                      top: "27px",
                      display: "flex",
                      alignItems: "center",
                      padding: language === "ltr" ? "5px 7px" : "5px 12px",
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ fill: "#4CAF50", fontSize: "20px" }}
                    />
                  </div>
                ) : null}
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

        <div
          className={`contact-details-bottom-button contact-details-mobile-button`}
        >
          <div className="contact-details-next-button" onClick={updateUserInfo}>
            {language === "ltr" ? "Update" : "تحديث"}
          </div>
        </div>
      </Box>
    </EstoreLayout1>
  );
};

export default UserInformation;
