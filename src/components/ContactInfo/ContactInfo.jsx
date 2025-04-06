import React, { useContext, useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import "./contactInfo.css";
import { AppContext } from "@/context/AppContext";
import { telecount } from "@/constants/constants";
import Title from "../common/Title/Title";
import { useRouter } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const ContactInfo = ({
  errorContactDetails,
  showNameEmailFields,
  showGuestUser,
  stopRedirect = false,
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
    <div>
      <Title
        englishTitle={
          showNameEmailFields
            ? "Complete your profile details"
            : homePageDetails?.vendor_data?.checkout_method === "1"
            ? "Enter your email to login"
            : "Enter your phone number to login"
        }
        arabicTitle={
          showNameEmailFields
            ? "أكمل تفاصيل ملفك الشخصي"
            : homePageDetails?.vendor_data?.checkout_method === "1"
            ? "أدخل بريدك الإلكتروني لتسجيل الدخول"
            : "أدخل رقم هاتفك لتسجيل الدخول"
        }
      />

      <div style={{ marginTop: "30px" }}>
        <div style={{ position: "relative" }}>
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
                    placeholder=""
                    name="phone"
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
                  {homePageDetails?.vendor_data?.checkout_method === "2" &&
                  showNameEmailFields ? (
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "25px",
                        display: "flex",
                        alignItems: "center",
                        color: "#fff",
                        padding: "5px 7px",
                        backgroundColor: "#4CAF50",
                        borderRadius: "50px",
                        fontSize: "12px",
                        gap: "5px",
                      }}
                    >
                      <span>✔</span>
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
              <div className="customerInputsFlex">
                <div className="form__group formSemi">
                  <input
                    type="text"
                    className="form__field hideBorder"
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
                  />
                  <label htmlFor="name" className="form__label">
                    {language == "ltr" ? "Full Name" : "الاسم الكامل"}
                  </label>
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
              <div className="customerInputsFlex">
                <div className="form__group formSemi">
                  <input
                    type="email"
                    className="form__field hideBorder"
                    placeholder=""
                    id="email"
                    name="email"
                    required="true"
                    autoComplete
                    disabled={
                      homePageDetails?.vendor_data?.checkout_method === "1" &&
                      showNameEmailFields
                    }
                    value={contactDetails.email}
                    onChange={(e) => {
                      handleContactDetailsChange({
                        ...contactDetails,
                        email: e.target.value,
                      });
                    }}
                  />
                  {homePageDetails?.vendor_data?.checkout_method === "1" &&
                  showNameEmailFields ? (
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "25px",
                        display: "flex",
                        alignItems: "center",
                        padding: "5px 7px",
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ fill: "#4CAF50", fontSize: "20px" }}
                      />
                    </div>
                  ) : null}
                  <label htmlFor="email" className="form__label">
                    {language == "ltr" ? "Email" : "البريد الإلكتروني"}
                  </label>
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

      <div className="blueBox" style={{ marginTop: "20px" }}>
        {showNameEmailFields ? null : (
          <img
            src={
              homePageDetails?.vendor_data?.checkout_method === "2"
                ? "images/SmsLogo.png"
                : "images/Envelope.png"
            }
            className="sentImg"
          />
        )}

        <div>
          <div
            style={{
              fontSize: language === "ltr" ? "13px" : "14px",
              fontWeight: 500,
            }}
          >
            {showNameEmailFields
              ? language === "ltr"
                ? "Add your details so your checkout next time will be quick"
                : "أضف التفاصيل الخاصة بك حتى تكون عملية الدفع الخاصة بك في المرة القادمة سريعة"
              : homePageDetails?.vendor_data?.checkout_method === "2"
              ? language === "ltr"
                ? "Login via whatsapp"
                : "تسجيل الدخول عبر الواتس اب"
              : language === "ltr"
              ? "Login via email"
              : "تسجيل الدخول عبر البريد الإلكتروني"}
          </div>
          {showNameEmailFields ? null : (
            <div
              style={{
                color: "#636363",
                fontSize: language === "ltr" ? "11px" : "12px",
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
          )}
        </div>
      </div>

      {!showNameEmailFields && showGuestUser ? (
        <div
          style={{
            fontSize: language === "ltr" ? "13px" : "14px",
            marginTop: "30px",
            // position: "absolute",
            bottom: "100px",
            fontWeight: 500,
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
