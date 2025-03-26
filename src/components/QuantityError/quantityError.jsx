import React, { useContext } from "react";
import "./quantityError.css";
import { AppContext } from "@/context/AppContext";

const QuantityError = ({ errorMsg }) => {
  const { language } = useContext(AppContext);
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
