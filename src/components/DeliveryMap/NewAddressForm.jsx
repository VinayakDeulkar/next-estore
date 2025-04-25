import ApparentIcon from "@/assets/icons/addressIcons/ApparentIcon";
import HomeIcon from "@/assets/icons/addressIcons/HomeIcon";
import OfficeIcons from "@/assets/icons/addressIcons/OfficeIcons";
import "@/components/ContactInfo/contactInfo.css";
import { AppContext } from "@/context/AppContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import AreaModal from "../AreaModal/areaModal";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";
import "./deliverymap.css";
import NewAddressFormField from "./NewAddressFormField";
import SchoolIcon from "@/SVGs/SchoolIcon";
import MosqueIcon from "@/SVGs/MosqueIcon";
import GovernmentIcon from "@/SVGs/GovernmentIcon";
import HeadLine from "../assetBoxDesign/Headline/headLine";

const NewAddressForm = ({
  areaDetails,
  errorState,
  houseValidation,
  streetValidation,
  blockValidation,
  addressNameValidation,
  handleMapChanges,
  setMarkerPosition,
  setShowMap,
}) => {
  const {
    language,
    addressDetails,
    handleAddressDetailsChange,
    userDetails,
    homePageDetails,
  } = useContext(AppContext);
  const router = useRouter();
  const [showAreaModal, setShowAreaModal] = useState(false);

  const getPlaceHolder = () => {
    switch (addressDetails.addressType) {
      case "1":
      case "2":
        return language === "ltr"
          ? "My House, Family House"
          : "بيتي، بيت العائلة";
      case "3":
        return language === "ltr" ? "My Office" : "مكتبي";
      case "4":
        return language === "ltr" ? "Sons School..." : "مدرسة أبناء...";

      default:
        return language === "ltr"
          ? "My House, Family House"
          : "بيتي، بيت العائلة";
    }
  };

  return (
    <div>
      <SubHeadline enText={"Delivery Details"} arText={"تفاصيل التوصيل"} />
      <div className="delivery-address-address-select">
        <div className="delivery-address-type-select nav nav-tabs">
          <div
            className={`delivery-address-type ${
              addressDetails.addressType === "1" ? "deliver-type-active" : ""
            } ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme-border"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleAddressDetailsChange((prev) => ({
                ...prev,
                addressType: "1",
              }));
            }}
          >
            <div className="Address-icon-names">
              <div className="navlink-icon">
                <HomeIcon height={34} />
              </div>
              <div
                className={
                  addressDetails.addressType === "1"
                    ? "navlink-text-active delivery-type-text"
                    : "navlink-text delivery-type-text"
                }
              >
                {language == "ltr" ? "House" : "منزل"}
              </div>
            </div>
          </div>

          <div
            className={`delivery-address-type ${
              addressDetails.addressType === "2" ? "deliver-type-active" : ""
            } ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme-border"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleAddressDetailsChange((prev) => ({
                ...prev,
                addressType: "2",
              }));
            }}
          >
            <div className="Address-icon-names">
              <div className="navlink-icon">
                <ApparentIcon height={32} />
              </div>
              <div
                className={
                  addressDetails.addressType === "2"
                    ? "navlink-text-active delivery-type-text"
                    : "navlink-text delivery-type-text"
                }
              >
                {language == "ltr" ? "Apartment" : "شقة"}
              </div>
            </div>
          </div>

          <div
            className={`delivery-address-type ${
              addressDetails.addressType === "3" ? "deliver-type-active" : ""
            } ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme-border"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleAddressDetailsChange((prev) => ({
                ...prev,
                addressType: "3",
              }));
            }}
          >
            <div className="Address-icon-names">
              <div className="navlink-icon">
                <OfficeIcons height={32} />
              </div>
              <div
                className={
                  addressDetails.addressType === "3"
                    ? "navlink-text-active delivery-type-text"
                    : "navlink-text delivery-type-text"
                }
              >
                {language == "ltr" ? "Office" : "مكتب"}
              </div>
            </div>
          </div>
          {homePageDetails?.vendor_data?.enable_address_types?.includes("4") ? (
            <div
              className={`delivery-address-type ${
                addressDetails.addressType === "4" ? "deliver-type-active" : ""
              } ${
                homePageDetails?.vendor_data?.home_page_type === "18" &&
                "fashion-theme-border"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleAddressDetailsChange((prev) => ({
                  ...prev,
                  addressType: "4",
                }));
              }}
            >
              <div className="Address-icon-names">
                <div className="navlink-icon">
                  <SchoolIcon height={32} />
                </div>
                <div
                  className={
                    addressDetails.addressType === "4"
                      ? "navlink-text-active delivery-type-text"
                      : "navlink-text delivery-type-text"
                  }
                >
                  {language == "ltr" ? "School" : "مدرسة"}
                </div>
              </div>
            </div>
          ) : null}
          {homePageDetails?.vendor_data?.enable_address_types?.includes("5") ? (
            <div
              className={`delivery-address-type ${
                addressDetails.addressType === "5" ? "deliver-type-active" : ""
              } ${
                homePageDetails?.vendor_data?.home_page_type === "18" &&
                "fashion-theme-border"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleAddressDetailsChange((prev) => ({
                  ...prev,
                  addressType: "5",
                }));
              }}
            >
              <div className="Address-icon-names">
                <div className="navlink-icon">
                  <MosqueIcon height={32} />
                </div>
                <div
                  className={
                    addressDetails.addressType === "5"
                      ? "navlink-text-active delivery-type-text"
                      : "navlink-text delivery-type-text"
                  }
                >
                  {language == "ltr" ? "Mosque" : "مسجد"}
                </div>
              </div>
            </div>
          ) : null}
          {homePageDetails?.vendor_data?.enable_address_types?.includes("6") ? (
            <div
              className={`delivery-address-type ${
                addressDetails.addressType === "6" ? "deliver-type-active" : ""
              } ${
                homePageDetails?.vendor_data?.home_page_type === "18" &&
                "fashion-theme-border"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleAddressDetailsChange((prev) => ({
                  ...prev,
                  addressType: "6",
                }));
              }}
            >
              <div className="Address-icon-names">
                <div className="navlink-icon">
                  <GovernmentIcon height={32} />
                </div>
                <div
                  className={
                    addressDetails.addressType === "6"
                      ? "navlink-text-active delivery-type-text"
                      : "navlink-text delivery-type-text"
                  }
                >
                  {language == "ltr" ? "Government" : "مبنى حكومة"}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {userDetails?.is_guest ? null : (
        <div
          className="delivery-address-form-div1"
          style={{ marginBottom: "20px" }}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <label
              className="label-name"
              style={{ position: "relative", top: 0 }}
            >
              {language == "ltr"
                ? "Name this location"
                : "قم بتسمية هذا الموقع"}{" "}
              <sup>*</sup>
            </label>
            <input
              type="text"
              className="form-control custom-placeholder"
              placeholder={getPlaceHolder()}
              id="addressName"
              name="addressName"
              required="true"
              value={addressDetails.addressName}
              onChange={(e) => {
                addressNameValidation(e.target.value.trim());
                handleAddressDetailsChange((k) => ({
                  ...k,
                  addressName: e.target.value,
                }));
              }}
            ></input>
          </div>
          {errorState.addressNameError && (
            <label className="error-text">
              {language == "ltr"
                ? errorState.addressNameErrorMessage
                : errorState.addressNameErrorMessagear}
            </label>
          )}
        </div>
      )}

      <div
        className="delivery-address-form-div1"
        onClick={() => setShowAreaModal(!showAreaModal)}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <label
            className="label-name"
            style={{ position: "relative", top: 0 }}
          >
            {language === "ltr" ? "Area" : "منطقة"}
          </label>
          <div className="delivery-selected-address">
            <span
              className="delivery-selected-address-area"
              style={
                areaDetails?.area === ""
                  ? { color: "#B3B3B3", fontWeight: "300" }
                  : {}
              }
            >
              {areaDetails?.area === ""
                ? language == "ltr"
                  ? "Select delivery location"
                  : "حدد موقع التسليم"
                : language == "ltr"
                ? areaDetails?.area
                : areaDetails?.ar_area}
            </span>
            <ArrowForwardIosIcon
              fontSize="small"
              sx={{ fill: areaDetails?.area === "" ? "#B3B3B3" : "" }}
            />
          </div>
        </div>
        <AreaModal
          setMarkerPosition={setMarkerPosition}
          showAreaModal={showAreaModal}
          handleClose={() => {
            setShowAreaModal(false);
            setShowMap?.();
          }}
          type={"deskCheckout"}
        />

        {errorState.areaNameError && (
          <label className="error-text">
            {language == "ltr"
              ? errorState.areaNameErrorMessage
              : errorState.areaNameErrorMessagear}
          </label>
        )}
      </div>
      <div
        className="form-tab-section checkout-one"
        style={{ paddingTop: "25px" }}
      >
        <NewAddressFormField
          blockValidation={blockValidation}
          streetValidation={streetValidation}
          houseValidation={houseValidation}
          errorState={errorState}
          addressType={addressDetails.addressType}
          // handleMapChanges={handleMapChanges}
        />
      </div>
      {!userDetails?.is_guest ? (
        <div
          className="blueBox"
          style={{ marginTop: "25px", marginBottom: "40px", gap: "20px" }}
        >
          <div>
            <div class="round">
              <input
                type="checkbox"
                value={addressDetails.is_primary}
                checked={
                  addressDetails.is_primary ||
                  userDetails?.address?.length === 0
                }
                onClick={(e) => {
                  if (userDetails?.address?.length !== 0) {
                    handleAddressDetailsChange((k) => ({
                      ...k,
                      is_primary: e.target.checked,
                    }));
                  }
                }}
                id="is_primary"
                name="is_primary"
              />
              <label for="is_primary"></label>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: language === "ltr" ? "14px" : "16px",
                fontWeight: 400,
              }}
            >
              {language === "ltr"
                ? "Mark it as default delivery address"
                : "ضع علامة عليه كعنوان التسليم الافتراضي"}
            </div>
            <div
              style={{
                color: "#636363",
                fontSize: language === "ltr" ? "14px" : "16px",
              }}
            >
              {language === "ltr"
                ? "Make this address the default address to deliver your orders to it."
                : "اجعل هذا العنوان هو العنوان الافتراضي لتوصيل طلباتك إليه."}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ margin: "50px 0" }}></div>
      )}
    </div>
  );
};

export default NewAddressForm;
