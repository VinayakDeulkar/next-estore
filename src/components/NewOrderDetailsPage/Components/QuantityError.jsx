import React, { useContext } from "react";
import { LanguageContext } from "../../../App";

const QuantityError = ({ errorMsg }) => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="outOfStock-mainDiv">
      <div>
        <div className="warning-icon">!</div>
        <div>{language === "ltr" ? errorMsg?.en : errorMsg?.ar}</div>
      </div>
    </div>
  );
};

export default QuantityError;
