import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import "./deliverymap.css";

const NewAddressFormField = ({
  blockValidation,
  streetValidation,
  houseValidation,
  errorState,
  addressType,
  handleMapChanges,
}) => {
  const { language, addressDetails, handleAddressDetailsChange } =
    useContext(AppContext);

  const houseLabel = () => {
    switch (addressType) {
      case "1":
        return language == "ltr" ? "House No." : "منزل";

      case "2":
      case "3":
        return language == "ltr" ? "Building Name" : "اسم المبنى";

      case "4":
        return language == "ltr" ? "School Name" : "اسم المدرسة";

      case "5":
        return language == "ltr" ? "Mosque Name" : "اسم المسجد";

      case "6":
        return language == "ltr" ? "Government Entity" : "مبنى حكومة";
      default:
        return "";
    }
  };
  const flatLabel = () => {
    switch (addressType) {
      case "2":
        return language == "ltr" ? "Flat no." : "رقم الشقة";
      case "3":
        return language == "ltr" ? "Office no." : "رقم المكتب";

      default:
        return "";
    }
  };
  return (
    <React.Fragment>
      <div className="delivery-address-form-div1">
        <div className="delivery-address-form">
          <input
            type="text"
            className="form-control"
            placeholder=""
            id="street"
            name="street"
            required="true"
            value={addressDetails.street}
            onChange={(e) => {
              streetValidation(e.target.value.trim());
              handleAddressDetailsChange((k) => ({
                ...k,
                street: e.target.value,
              }));
            }}
            style={{fontSize: "16px"}}
          ></input>
          <label for="street" className="label-name">
            {language == "ltr" ? "Street" : "شارع "} <sup>*</sup>
          </label>
        </div>
        {errorState.streetError && (
          <label className="error-text">
            {language == "ltr"
              ? errorState.streetErrorMessage
              : errorState.streetErrorMessagear}
          </label>
        )}
      </div>
      <div className="delivery-address-container1">
        <div className="delivery-address-form-div">
          <div className="delivery-address-form">
            <input
              type="number"
              className="form-control  delivery-form-field"
              placeholder=""
              id="block"
              name="block"
              required="true"
              pattern="[0-9]*"
              value={addressDetails.block}
              onChange={(e) => {
                blockValidation(e.target.value.trim());
                handleAddressDetailsChange((prev) => ({
                  ...prev,
                  block: e.target.validity.valid
                    ? e.target.value
                    : e.target.value === ""
                    ? ""
                    : addressDetails.block,
                }));
              }}
              style={{fontSize: "16px"}}
            ></input>
            <label for="block" className="label-name">
              {language == "ltr" ? "Block" : "قطعة "} <sup>*</sup>
            </label>
          </div>
          {errorState.blockError && (
            <label className="error-text">
              {language == "ltr"
                ? errorState.blockErrorMessage
                : errorState.blockErrorMessagear}
            </label>
          )}
        </div>
        <div className="delivery-address-form-div">
          <div className="delivery-address-form">
            <input
              type="text"
              className="form-control  delivery-form-field"
              placeholder=""
              id="avenue"
              name="first_name"
              required="true"
              value={addressDetails.avenue}
              onChange={(e) => {
                handleAddressDetailsChange((prev) => ({
                  ...prev,
                  avenue: e.target.value,
                }));
              }}
              style={{fontSize: "16px"}}
            ></input>
            <label for="avenue" className="label-name">
              {language == "ltr" ? "Avenue" : "جادة"}
            </label>
          </div>
        </div>
        <div className="delivery-address-form-div">
          <div
            className={`delivery-address-form  ${
              addressType == "4" || addressType == "5" || addressType == "6"
                ? "full-width"
                : ""
            }`}
          >
            <input
              type="text"
              className={`form-control  delivery-form-field ${
                addressType == "4" || addressType == "5" || addressType == "6"
                  ? "full-width"
                  : ""
              }`}
              placeholder=""
              id="house"
              name="house"
              required="true"
              value={addressDetails.house}
              onChange={(e) => {
                houseValidation(e.target.value.trim());
                handleAddressDetailsChange((prev) => ({
                  ...prev,
                  house: e.target.value,
                }));
              }}
              style={{fontSize: "16px"}}
            ></input>
            <label for="house" className="label-name">
              {houseLabel()}
              <sup>*</sup>
            </label>
          </div>
          {errorState.houseError && (
            <label className="error-text">
              {language == "ltr"
                ? errorState.houseErrorMessage
                : errorState.houseErrorMessagear}
            </label>
          )}
        </div>
      </div>
      {addressType === "2" || addressType === "3" ? (
        <div className="delivery-address-container2">
          <div className="delivery-address-form-div">
            <div className="delivery-address-form">
              <input
                type="text"
                className="form-control"
                placeholder=""
                id="floor"
                name="floor"
                required="true"
                value={addressDetails.floor}
                onChange={(e) => {
                  handleAddressDetailsChange((prev) => ({
                    ...prev,
                    floor: e.target.value,
                  }));
                }}
                style={{ width: "100%", fontSize: "16px"}}
              ></input>
              <label for="floor" className="label-name">
                {language == "ltr" ? "Floor no." : "رقم الدور"}
              </label>
            </div>
          </div>
          <div className="delivery-address-form-div">
            <div className={`delivery-address-form`}>
              <input
                type="text"
                className={`form-control`}
                placeholder=""
                id="flat"
                name="first_name"
                required="true"
                value={addressDetails.flat}
                style={{ width: "100%", fontSize: "16px"}}
                onChange={(e) => {
                  handleAddressDetailsChange((prev) => ({
                    ...prev,
                    flat: e.target.value,
                  }));
                }}
              ></input>
              <label for="flat" className="label-name">
                {flatLabel()}
              </label>
            </div>
          </div>
        </div>
      ) : null}

      <div className="delivery-address-form-div1">
        <div style={{ position: "relative", width: "100%" }}>
          <label
            className="label-name"
            style={{ position: "relative", top: 0 }}
          >
            {language == "ltr" ? "Special Instructions" : "تعليمات خاصة"}
          </label>
          <input
            type="text"
            className="form-control custom-placeholder"
            placeholder={
              language === "ltr"
                ? "Don’t ring the bell please, Call me..."
                : "لا تدق الجرس من فضلك، اتصل بي..."
            }
            id="special_directions"
            name="special_directions"
            required="true"
            value={addressDetails.special_directions}
            onChange={(e) => {
              handleAddressDetailsChange((prev) => ({
                ...prev,
                special_directions: e.target.value,
              }));
            }}
            style={{fontSize: "16px"}}
          ></input>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewAddressFormField;
