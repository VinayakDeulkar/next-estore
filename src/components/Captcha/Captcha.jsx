import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = ({ setIsCountryBlocked }) => {
  const onChange = (value) => {
    if (value) {
      setIsCountryBlocked(2);
    } else {
      setIsCountryBlocked(3);
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Complete the Captcha</h1>
      <ReCAPTCHA
        sitekey="6Lfq1IQeAAAAAIywtQOm21iKzZXYEHyT2Hy7UN2C"
        onChange={onChange}
        onExpired={() => {}}
      />
    </div>
  );
};

export default Captcha;
