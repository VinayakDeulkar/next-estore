import React, { useContext } from "react";
import moment from "moment";
import ReactFlagsSelect from "react-flags-select";
import { AppContext } from "@/context/AppContext";
import { telecount } from "@/constants/constants";

const DetailsCommon = ({ data }) => {
  const { language } = useContext(AppContext);

  return (
    <>
      {data.value && (
        <div className="details-common-mainDIv">
          <div className="details-common-firstdiv">
            {language === "ltr" ? data.english_value : data.arabic_value}
          </div>
          <div className="details-common-seconddiv">
            {data.is_amount ? (
              <>
                <span>
                  {data?.value ? parseFloat(data?.value).toFixed(3) : 0}
                </span>{" "}
                {language === "rtl" ? "د.ك" : "KD"}
              </>
            ) : data.is_payment_type ? (
              <>
                {data.value == "1" && (language == "ltr" ? "K-NET" : "كي نت")}
                {data.value == "2" &&
                  (language == "ltr" ? "Credit Card" : "بطاقة الائتمان")}
                {data.value == "3" &&
                  (language == "ltr"
                    ? "Cash On Delivery"
                    : "الدفع عند الاستلام")}
                {data.value == "4" &&
                  (language == "ltr"
                    ? "Apple Pay Debit"
                    : "أبل بي - بطاقات الخصم")}
                {data.value == "5" &&
                  (language == "ltr"
                    ? "Apple Pay Credit"
                    : "أبل بي - بطاقات الإئتمان")}
              </>
            ) : data.is_Date ? (
              <>
                {moment(data.value).locale("en").format("DD") +
                  " " +
                  moment(data.value)
                    .locale(language === "ltr" ? "en" : "ar-sa")
                    .format("MMMM") +
                  moment(data.value).locale("en").format(", yyyy") +
                  " @ " +
                  moment(data.value).locale("en").format("hh:mm A")}
              </>
            ) : data.is_phone ? (
              <div
                className="contact-store-phonenumber"
                style={{ display: "flex", alignItems: "center" }}
              >
                <ReactFlagsSelect
                  className="showFlag-only"
                  selected={"KW"}
                  showSelectedLabel={false}
                  disabled
                  customLabels={telecount}
                />{" "}
                +965 {data.value}
              </div>
            ) : (
              <>{data.value}</>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsCommon;
