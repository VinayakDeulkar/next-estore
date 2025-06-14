import React from "react";
import NoVendor from "../NoVendor/noVendor";

const ErrorPage = ({ error, children }) => {
  if (error) return <NoVendor />;
  return <>{children}</>;
};

export default ErrorPage;
