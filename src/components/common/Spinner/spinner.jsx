import React, { useEffect } from "react";
import "./loader.css";

const Spinner = ({ height, color, size, margin }) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--spinner-height",
      height ? height : "16px"
    );
    document.documentElement.style.setProperty(
      "--spinner-color",
      color ? color : "#fff"
    );
    document.documentElement.style.setProperty(
      "--spinner-size",
      size ? size : "2.5px"
    );

    document.documentElement.style.setProperty(
      "--spinner-margin",
      margin ? margin : "0px"
    );
  }, [height, color]);

  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
