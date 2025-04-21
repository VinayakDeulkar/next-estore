import { AppContext } from "@/context/AppContext";
import { useContext, useEffect } from "react";
import TextInputField from "../assetBoxDesign/TextField/textInputField";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";
import HeadLine from "../assetBoxDesign/Headline/headLine";

const InternationalAddress = ({ internationalError }) => {
  const { internationalDelivery, handleInternationalDeliveryChange, language } =
    useContext(AppContext);

  useEffect(() => {}, [internationalDelivery.delivery_country_code]);

  return (
    <div>
      <HeadLine enText={"Delivery Details"} arText={"تفاصيل التوصيل"} />
      <div
        className="contact-details-form-maindiv"
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          className="contact-details-form-div"
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <div style={{ width: "100%" }}>
            <TextInputField
              label={"Address 1"}
              arLabel={"العنوان 1"}
              handleChange={(e) => {
                handleInternationalDeliveryChange({
                  ...internationalDelivery,
                  delivery_address1: e.target.value,
                });
              }}
              value={internationalDelivery.delivery_address1}
              name={"address1"}
            />
            {internationalError.delivery_address1 && (
              <label className="error-text">
                {language == "ltr"
                  ? "Please enter address 1"
                  : "الرجاء إدخال العنوان 1"}
              </label>
            )}
          </div>
        </div>
        <div
          className="contact-details-form-div"
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <div style={{ width: "100%" }}>
            <TextInputField
              label={"Address 2"}
              arLabel={"العنوان 2"}
              handleChange={(e) => {
                handleInternationalDeliveryChange({
                  ...internationalDelivery,
                  delivery_address2: e.target.value,
                });
              }}
              value={internationalDelivery.delivery_address2}
              name={"address2"}
            />
            {internationalError.delivery_address2 && (
              <label className="error-text">
                {language == "ltr"
                  ? "Please enter address 2"
                  : "الرجاء إدخال العنوان 2"}
              </label>
            )}
          </div>
        </div>
        <div
          className="contact-details-form-div"
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <div style={{ width: "100%" }}>
            <TextInputField
              label={"Zip Code"}
              arLabel={"الرمز البريدي"}
              handleChange={(e) => {
                handleInternationalDeliveryChange({
                  ...internationalDelivery,
                  delivery_zipCode: e.target.value,
                });
              }}
              value={internationalDelivery.delivery_zipCode}
              name={"zipCode"}
            />
          </div>
        </div>
        <div
          className="contact-details-form-div"
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <div style={{ width: "100%" }}>
            <TextInputField
              label={"Special Instructions"}
              arLabel={"تعليمات خاصة"}
              handleChange={(e) => {
                handleInternationalDeliveryChange({
                  ...internationalDelivery,
                  delivery_specialInstruction: e.target.value,
                });
              }}
              value={internationalDelivery.delivery_specialInstruction}
              name={"Special Instructions"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalAddress;
