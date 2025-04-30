import React, { useContext, useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import "./contactInfo.css";
import { AppContext } from "@/context/AppContext";
import { telecount } from "@/constants/constants";
import Title from "../common/Title/Title";
import { useRouter } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SubTitle from "../common/SubTitle/subTitle";
import TextInputField from "../assetBoxDesign/TextField/textInputField";
const ContactInfo = ({
  errorContactDetails,
  showNameEmailFields,
  showGuestUser,
  stopRedirect = false,
  position = "unset",
}) => {
  const {
    language,
    handleUserDetailsChange,
    userDetails,
    homePageDetails,
    contactDetails,
    handleContactDetailsChange,
    internationalDelivery,
    handleInternationalDeliveryChange,
    activeBackgroundColor,
  } = useContext(AppContext);
  const router = useRouter();

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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {homePageDetails?.vendor_data?.checkout_method === "2" ||
          showNameEmailFields ? (
            <>
              <div className="customerInputsFlex">
                <div className="form__group formSemi">
                  <div className="inputFlag">
                    <div
                      style={
                        homePageDetails?.vendor_data?.checkout_method === "2" &&
                        showNameEmailFields
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
                          homePageDetails?.vendor_data?.checkout_method ===
                            "2" && showNameEmailFields
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
                      homePageDetails?.vendor_data?.checkout_method === "2" &&
                      showNameEmailFields
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
                  />
                  {contactDetails?.phone && showNameEmailFields ? (
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
          ) : null}

          {showNameEmailFields ? (
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
                  {contactDetails?.name && showNameEmailFields ? (
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
          ) : null}

          {homePageDetails?.vendor_data?.checkout_method === "1" ||
          showNameEmailFields ? (
            <>
              <div className="customerInputsFlex" style={{ width: "100%" }}>
                <div className="form__group formSemi" style={{ width: "100%" }}>
                  <TextInputField
                    name={"email"}
                    label={"Email"}
                    arLabel={"البريد الإلكتروني"}
                    disabled={
                      homePageDetails?.vendor_data?.checkout_method === "1" &&
                      showNameEmailFields
                    }
                    value={contactDetails?.email}
                    handleChange={(e) => {
                      handleContactDetailsChange({
                        ...contactDetails,
                        email: e.target.value,
                      });
                    }}
                  />
                  {contactDetails?.email && showNameEmailFields ? (
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
          ) : null}
        </div>
      </div>

      {!showNameEmailFields ? (
        <div className="blueBox" style={{ marginTop: "20px" }}>
          <img
            src={
              homePageDetails?.vendor_data?.checkout_method === "2"
                ? "images/SmsLogo.png"
                : "images/Envelope.png"
            }
            className="sentImg"
          />
          <div>
            <div
              style={{
                fontSize: language === "ltr" ? "16px" : "18px",
                fontWeight: 400,
              }}
            >
              {homePageDetails?.vendor_data?.checkout_method === "2"
                ? language === "ltr"
                  ? "Login via whatsapp"
                  : "تسجيل الدخول عبر الواتس اب"
                : language === "ltr"
                ? "Login via email"
                : "تسجيل الدخول عبر البريد الإلكتروني"}
            </div>
            <div
              style={{
                color: "#636363",
                fontSize: language === "ltr" ? "14px" : "16px",
              }}
            >
              {homePageDetails?.vendor_data?.checkout_method === "2"
                ? language === "ltr"
                  ? "Use your phone number to login to your account."
                  : "استخدم رقم هاتفك لتسجيل الدخول إلى حسابك."
                : language === "ltr"
                ? "Use your email to login to your account."
                : "استخدم بريدك الإلكتروني لتسجيل الدخول إلى حسابك."}
            </div>
          </div>
        </div>
      ) : null}

      {!showNameEmailFields && showGuestUser ? (
        <div
          style={{
            fontSize: language === "ltr" ? "16px" : "18px",
            marginTop: "30px",
            position: position,
            bottom: "100px",
            fontWeight: 400,
            textDecoration: "underline",
            width: "100%",
            textAlign: "center",
            left: 0,
            right: 0,
            cursor: "pointer",
          }}
          onClick={() => {
            handleUserDetailsChange({ ...userDetails, is_guest: true });
            if (!stopRedirect) {
              router.push("/contact-details");
            }
          }}
        >
          {language === "ltr" ? "Continue as Guest" : "الاستمرار كضيف"}
        </div>
      ) : null}
    </div>
  );
};

export default ContactInfo;
