import React, { useContext } from "react";
import CommonSectionHeader from "./CommonSectionHeader";
import { AppContext } from "@/context/AppContext";
import "@/components/ContactInfo/contactInfo.css";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";
import NormalText from "../assetBoxDesign/NormalText/normalText";
import { Box } from "@mui/material";

const PickupContainer = ({ pickupError }) => {
  const { language, contactDetails, handleContactDetailsChange } =
    useContext(AppContext);
  return (
    <Box>
      <SubHeadline
        enText="Pickup car information"
        arText="معلومات السيارة للاستلام "
      />
      <Box sx={{ marginTop: "5px" }}>
        <NormalText
          enText="Help us quickly identify your vehicle"
          arText="ساعدنا في التعرف على سيارتك بسرعة."
          color="#000"
        />
      </Box>
      <Box sx={{display: "flex", flexDirection: "column", gap: "35px", marginTop: "35px"}}>
        <div className="contact-details-form-maindiv">
          <div className="customerInputsFlex">
            <div className="form__group formSemi">
              <input
                type="text"
                className="form__field hideBorder"
                placeholder=""
                id="Model"
                name="Model"
                required="true"
                autoComplete
                value={contactDetails.model}
                onChange={(e) => {
                  handleContactDetailsChange({
                    ...contactDetails,
                    model: e.target.value,
                  });
                }}
                style={{ fontSize: "16px" }}
              />
              <label htmlFor="Model" className="form__label">
                {language == "ltr" ? "Model" : "نوع السيارة"}
              </label>
            </div>
          </div>
          {pickupError.modelError && (
            <label className="error-text">
              {language == "ltr"
                ? "This field is compulsory"
                : "مطلوب ملء هذا الحقل"}
            </label>
          )}
        </div>
        <div className="contact-details-form-maindiv">
          <div className="customerInputsFlex">
            <div className="form__group formSemi">
              <input
                type="text"
                className="form__field hideBorder"
                placeholder=""
                id="car_color"
                name="car_color"
                required="true"
                autoComplete
                value={contactDetails.color}
                onChange={(e) => {
                  handleContactDetailsChange({
                    ...contactDetails,
                    color: e.target.value,
                  });
                }}
                style={{ fontSize: "16px" }}
              />
              <label htmlFor="car_color" className="form__label">
                {language == "ltr" ? "Color" : "اللون"}
              </label>
            </div>
          </div>
          {pickupError.colorError && (
            <label className="error-text">
              {language == "ltr"
                ? "This field is compulsory"
                : "مطلوب ملء هذا الحقل"}
            </label>
          )}
        </div>
        <div className="contact-details-form-maindiv">
          <div className="customerInputsFlex">
            <div className="form__group formSemi">
              <input
                type="text"
                className="form__field hideBorder"
                placeholder=""
                id="car_plate"
                name="car_plate"
                required="true"
                autoComplete
                value={contactDetails.license}
                onChange={(e) => {
                  handleContactDetailsChange({
                    ...contactDetails,
                    license: e.target.value,
                  });
                }}
                style={{ fontSize: "16px" }}
              />
              <label htmlFor="car_plate" className="form__label">
                {language == "ltr"
                  ? "License Plate (Optional)"
                  : "رقم لوحة السيارة (اختياري)"}
              </label>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default PickupContainer;
