import React from "react";
import DetailsCommon from "./DetailsCommon";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const AccordianContactStore = () => {
  const { homePageDetails } = useContext(AppContext);
  const vendor_Data = [
    {
      english_value: "Phone Number",
      arabic_value: "رقم الهاتف",
      value: homePageDetails?.vendor_data?.phone,
      is_phone: true,
    },
    {
      english_value: "Email Address",
      arabic_value: "عنوان البريد الإلكتروني",
      value: homePageDetails?.vendor_data?.support_mail,
    },
  ];
  return (
    <div>
      {vendor_Data &&
        vendor_Data.map((row, i) => <DetailsCommon key={i} data={row} />)}
    </div>
  );
};

export default AccordianContactStore;
