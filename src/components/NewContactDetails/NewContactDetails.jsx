import React, { useContext, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import { AppContext } from "@/context/AppContext";
import { telecount } from "@/constants/constants";

const NewContactDetails = ({ errorContactDetails }) => {
  const {
    language,
    contactDetails,
    internationalDelivery,
    handleContactDetailsChange,
  } = useContext(AppContext);

  useEffect(() => {
    if (internationalDelivery && internationalDelivery.country_code) {
      handleContactDetailsChange({
        ...contactDetails,
        phoneCode: internationalDelivery.country_code,
      });
    }
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("contactInfo"))) {
      const contactInfo = JSON.parse(localStorage.getItem("contactInfo"));

      handleContactDetailsChange({
        ...contactDetails,
        phoneCode: contactInfo.code,
      });
    }
  }, []);

  const modifyValue = (phoneNumber) => {
    if (phoneNumber.includes("+")) {
      const data = phoneNumber.split(" ");
      let finalNumber = "";
      if (data.length === 1) {
        const newData = data[0].split("").slice(4, 12);
        finalNumber = newData.join("");
      } else {
        data.map((num, i) => {
          if (i !== 0) {
            finalNumber += num;
          }
        });
      }
      return finalNumber;
    } else {
      return phoneNumber;
    }
  };
  return (
    <div style={{ position: "relative" }}>
      <div className="contact-details-form-maindiv">
        <>
          <div className="customerInputsFlex">
            <div className="form__group formSemi">
              <div className="inputFlag">
                <div>
                  <ReactFlagsSelect
                    selected={contactDetails?.phoneCode}
                    searchable={true}
                    showSelectedLabel={false}
                    customLabels={telecount}
                    onSelect={(code) => {
                      handleContactDetailsChange({
                        ...contactDetails,
                        phoneCode: code,
                        phone: contactDetails?.phone?.substring(
                          0,
                          code == "KW" ? 8 : 12
                        ),
                      });
                    }}
                  ></ReactFlagsSelect>
                </div>
              </div>
              <input
                type="tel"
                className="form__field hideBorder"
                placeholder=""
                name="phone"
                id="phone"
                required="true"
                value={contactDetails?.phone}
                autoComplete="tel"
                onChange={(e) => {
                  const newValue = modifyValue(e.target.value);
                  if (
                    (contactDetails.phoneCode === "KW" &&
                      newValue.length <= 8) ||
                    (contactDetails.phoneCode !== "KW" && newValue.length <= 10)
                  ) {
                    handleContactDetailsChange({
                      ...contactDetails,
                      phone: newValue,
                    });
                  }
                }}
              />

              <label
                htmlFor="phone"
                className="form__label phoneLabel dataFilled"
              >
                {language == "ltr" ? "Phone Number" : "رقم الهاتف"}
              </label>
            </div>
          </div>
          {errorContactDetails.phoneError && (
            <label className="error-text">
              {language == "ltr"
                ? errorContactDetails.phoneErrorMessage
                : errorContactDetails.phoneErrorMessagear}
            </label>
          )}
        </>
        <>
          <div className="customerInputsFlex">
            <div className="form__group formSemi">
              <input
                type="text"
                className="form__field hideBorder"
                placeholder=""
                id="name"
                name="name"
                required="true"
                autoComplete
                value={contactDetails.name}
                onChange={(e) => {
                  handleContactDetailsChange({
                    ...contactDetails,
                    name: e.target.value,
                  });
                }}
              />
              <label htmlFor="name" className="form__label">
                {language == "ltr" ? "Full Name" : "الاسم الكامل"}
              </label>
            </div>
          </div>
          {errorContactDetails.nameError && (
            <label className="error-text">
              {language == "ltr"
                ? errorContactDetails.nameErrorMessage
                : errorContactDetails.nameErrorMessagear}
            </label>
          )}
        </>
        <div className="customerInputsFlex">
          <div className="form__group formSemi">
            <input
              type="email"
              className="form__field hideBorder"
              placeholder=""
              id="email"
              name="email"
              required="true"
              autoComplete
              value={contactDetails.email}
              onChange={(e) => {
                handleContactDetailsChange({
                  ...contactDetails,
                  email: e.target.value,
                });
              }}
            />

            <label htmlFor="email" className="form__label">
              {language == "ltr" ? "Email" : "البريد الإلكتروني"}
            </label>
          </div>
        </div>
        {errorContactDetails.emailError && (
          <label className="error-text">
            {language == "ltr"
              ? errorContactDetails.emailErrorMessage
              : errorContactDetails.emailErrorMessagear}
          </label>
        )}
      </div>
    </div>
  );
};

export default NewContactDetails;
