import React, { useContext } from "react";
import moment from "moment";
import ReactFlagsSelect from "react-flags-select";
import { AppContext } from "@/context/AppContext";
import { telecount } from "@/constants/constants";
import NormalText from "../assetBoxDesign/NormalText/normalText";

const DetailsCommon = ({ data }) => {
  const { language } = useContext(AppContext);

  const getPaymentImg = () => {
    switch (data.value) {
      case "1":
        return (
          <img
            style={{ height: "20px", width: "20px" }}
            src="images/knet icon mini.png"
          />
        );

      case "2":
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ height: "15px", width: "35px" }}
              src="images/visa.png"
            />
            <img
              style={{ height: "15px", width: "35px" }}
              src="images/master.png"
            />
          </div>
        );

      case "3":
        return (
          <img
            style={{ height: "20px", width: "20px" }}
            src="images/icons8-money-64.png"
          />
        );

      case "4":
      case "5":
        return (
          <img
            style={{ height: "15px", width: "35px" }}
            src="images/newApplePayButton.png"
          />
        );

      default:
        break;
    }
  };

  const getPaymentText = () => {
    switch (data.value) {
      case "1":
        return { enText: "K-NET", arText: "كي نت" };
      case "2":
        return { enText: "Credit Card", arText: "بطاقة الائتمان" };
      case "3":
        return { enText: "Cash On Delivery", arText: "الدفع عند الاستلام" };
      case "4":
        return { enText: "Apple Pay Debit", arText: "أبل بي - بطاقات الخصم" };
      case "5":
        return {
          enText: "Apple Pay Credit",
          arText: "أبل بي - بطاقات الإئتمان",
        };

      default:
        break;
    }
  };
  return (
    <>
      {data.value && (
        <div className="details-common-mainDIv">
          <NormalText
            enText={data.english_value}
            arText={data.arabic_value}
            color="#a3a2a2"
          />

          <div className="details-common-seconddiv">
            {data.is_amount ? (
              <NormalText
                enText={`${
                  data?.value ? parseFloat(data?.value).toFixed(3) : 0
                } KD`}
                arText={`${
                  data?.value ? parseFloat(data?.value).toFixed(3) : 0
                } د.ك`}
              />
            ) : data.is_payment_type ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <div>{getPaymentImg()}</div>
                <div>
                  <NormalText
                    enText={getPaymentText().enText}
                    arText={getPaymentText().arText}
                  />
                </div>
              </div>
            ) : data.is_Date ? (
              <NormalText
                enText={`${
                  moment(data.value).locale("en").format("DD") +
                  " " +
                  moment(data.value)
                    .locale(language === "ltr" ? "en" : "ar-sa")
                    .format("MMMM") +
                  moment(data.value).locale("en").format(", yyyy") +
                  " @ " +
                  moment(data.value).locale("en").format("hh:mm A")
                }`}
                arText={`${
                  moment(data.value).locale("en").format("DD") +
                  " " +
                  moment(data.value)
                    .locale(language === "ltr" ? "en" : "ar-sa")
                    .format("MMMM") +
                  moment(data.value).locale("en").format(", yyyy") +
                  " @ " +
                  moment(data.value).locale("en").format("hh:mm A")
                }`}
              />
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
                <NormalText
                  enText={`+965 ${data.value}`}
                  arText={`+965 ${data.value}`}
                />
              </div>
            ) : (
              <NormalText enText={data.value} arText={data.value} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsCommon;
