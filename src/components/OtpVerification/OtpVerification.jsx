import React, { useContext, useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { resendOTPApi } from "@/apis";
import { tele } from "@/constants/constants";
import { AppContext } from "@/context/AppContext";
import Title from "../common/Title/Title";
import Spinner from "../common/Spinner/spinner";
import "./otpVerification.css";
import { useSnackbar } from "notistack";

const OtpVerification = ({
  openOtpPage,
  setOpenOtpPage,
  otpSent,
  setOtpSent,
  otp,
  setOtp,
}) => {
  const {
    language,
    homePageDetails,
    contactDetails,
    handleContactDetailsChange,
  } = useContext(AppContext);
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(0);
  const [timerStatus, setTimerStatus] = useState(otpSent);
  const [loading, setLoading] = useState(false);
  const [otpSentMethod, setOtpSentMethod] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("contactInfo"))) {
      const contactInfo = JSON.parse(localStorage.getItem("contactInfo"));

      handleContactDetailsChange({
        ...contactDetails,
        phoneCode: contactInfo.code,
      });
    }
  }, []);

  function updateTime() {
    if (minutes == 0 && seconds == 1) {
      setTimerStatus(false);
    } else {
      if (seconds == 0) {
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
      } else {
        setSeconds((seconds) => seconds - 1);
      }
    }
  }

  useEffect(() => {
    if (timerStatus) {
      const token = setTimeout(updateTime, 1000);

      return function cleanUp() {
        clearTimeout(token);
      };
    }
  }, [timerStatus, minutes, seconds]);

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const resendOtpFunction = async (isSMS) => {
    setOtp("");
    setLoading(true);
    setOtpSentMethod(isSMS ? 2 : 1);
    const response = await resendOTPApi({
      country_code: `+${tele[contactDetails.phoneCode]}`,
      phone_number: contactDetails.phone,
      sendSMS: isSMS,
      vendor_ecom_id: homePageDetails?.vendor_data?.ecommerce_vendor_id,
      user_id: localStorage.getItem("id"),
      language: language,
    });
    setLoading(false);
    if (response?.status) {
      enqueueSnackbar({
        hideIconVariant: true,
        autoHideDuration: 2000,
        variant: "success",
        message: response?.message,
        anchorOrigin: { horizontal: "left", vertical: "top" },
      });
      setOtpSent(true);
      setSeconds(59);
      setMinutes(0);
      setTimerStatus(true);
    } else {
      enqueueSnackbar({
        variant: "error",
        message: response?.message,
        anchorOrigin: { horizontal: "left", vertical: "top" },
        autoHideDuration: 2000
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* <div className="toasterDiv">
        <Toaster position="top-left" reverseOrder={false} />
      </div> */}

      {/* <Title
        englishTitle="One Time Password Authentication"
        arabicTitle="مصادقة كلمة المرور لمرة واحدة"
      /> */}
      <div className="sentOtpDiv">
        {homePageDetails?.vendor_data?.checkout_method === "2"
          ? language === "ltr"
            ? `OTP sent to +${tele[contactDetails?.phoneCode]} ${
                contactDetails?.phone
              }`
            : `تم إرسال كلمة المرور لمرة واحدة (OTP) إلى +${
                tele[contactDetails?.phoneCode]
              } ${contactDetails?.phone}`
          : language === "ltr"
          ? `OTP sent to ${contactDetails?.email}`
          : `تم إرسال كلمة المرور لمرة واحدة (OTP) إلى ${contactDetails?.email}`}
      </div>
      <div>
        <div className="enterOtpText">
          {language === "ltr" ? "Enter OTP" : "أدخل كلمة المرور لمرة واحدة"}
        </div>

        <div style={{ marginTop: "5px" }}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputType="number"
            inputStyle={{
              height: "45px",
              width: "45px",
              borderRadius: "10px",
              border: "1px solid #E1E1E1",
              outline: "none",
              color: "#000",
              fontSize: "16px",
            }}
            containerStyle={{
              gap: "10px",
            }}
            renderSeparator={<span></span>}
            renderInput={(props, index) => (
              <input
                type="number"
                {...props}
                autoFocus={index === 0}
                autoComplete="one-time-code"
              />
            )}
          />
        </div>
      </div>

      <div className="blueBox" style={{ marginTop: "55px" }}>
        <img src="images/Sent.png" className="sentImg" />
        <div>
          <div
            style={{
              fontSize: language === "ltr" ? "16px" : "18px",
              fontWeight: 400,
            }}
          >
            {otpSentMethod == 1
              ? homePageDetails?.vendor_data?.checkout_method === "2"
                ? language === "ltr"
                  ? "OTP Sent Via Whatsapp"
                  : "يتم إرسال OTP عبر Whatsapp"
                : language === "ltr"
                ? "OTP sent via Email"
                : "يتم إرسال OTP عبر البريد الإلكتروني"
              : language === "ltr"
              ? "OTP Sent Via SMS"
              : "يتم إرسال OTP عبر الرسائل القصيرة"}
          </div>
          {timerStatus ? (
            <div
              style={{
                color: "#636363",
                fontSize: language === "ltr" ? "14px" : "16px",
              }}
            >
              {formatTime(minutes)}:{formatTime(seconds)}
            </div>
          ) : null}
        </div>
      </div>

      <div style={{ marginTop: "10px" }}>
        <div className="resendOtpText">
          {language === "ltr"
            ? "Didn't receive OTP?"
            : "لم تتلق كلمة المرور لمرة واحدة؟"}
        </div>

        <div
          className={"resendOtpText"}
          style={{ marginTop: "2px", color: timerStatus ? "#adb5bd" : "#000" }}
          onClick={() => {
            if (!timerStatus) {
              resendOtpFunction(false);
            }
          }}
        >
          <span>
            {language === "ltr"
              ? "Resend OTP"
              : "إعادة إرسال كلمة المرور لمرة واحدة"}
          </span>
        </div>
        {homePageDetails?.vendor_data?.checkout_method === "2" ? (
          <div
            className={"resendOtpText"}
            style={{
              marginTop: "15px",
              color: timerStatus ? "#adb5bd" : "#000",
            }}
            onClick={() => {
              if (!timerStatus) {
                resendOtpFunction(true);
              }
            }}
          >
            <span>
              {language === "ltr"
                ? "Resend via SMS"
                : "إعادة الإرسال عبر الرسائل القصيرة"}
            </span>
          </div>
        ) : null}
      </div>

      {loading && (
        <div
          style={{
            width: "100%",
            height: "100dvh",
            position: "fixed",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "8",
          }}
          className="order-spinner-background"
        >
          <Spinner
            height="50px"
            color={homePageDetails?.vendor_data?.vendor_color}
            size="6px"
          />
        </div>
      )}
    </div>
  );
};

export default OtpVerification;
