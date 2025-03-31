"use client";
import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import OtpVerification from "@/components/OtpVerification/OtpVerification";
import { AppContext } from "@/context/AppContext";
import { Box, Grid } from "@mui/material";
import React, { useContext, useState } from "react";

const DeskCheckout = () => {
  const { language } = useContext(AppContext);
  const [showGuestUser, setShowGuestUser] = useState(true);
  const [showNameEmailFields, setShowNameEmailFields] = useState(false);
  const [openOtpPage, setOpenOtpPage] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
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

  return (
    <Box sx={{ height: "100vh" }}>
      <HeaderBox />
      <Grid container sx={{ padding: "0 10%", marginTop: "50px" }}>
        <Grid item md={6}>
          <Box sx={{ fontSize: "30px" }}>
            {language === "ltr" ? "Checkout" : "متابعة الطلب"}
          </Box>
          <CommonHeader
            englishHeader={"Login"}
            arabicHeader={"تسجيل الدخول"}
            fontWeight={400}
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
        </Grid>
        <Grid item md={6}>
          Bhai
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeskCheckout;
