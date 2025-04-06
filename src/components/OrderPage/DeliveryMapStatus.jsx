import React, { useContext } from "react";

import ReactFlagsSelect from "react-flags-select";
import { AppContext } from "@/context/AppContext";
import { tele, telecount } from "@/constants/constants";
import { getAddressType } from "@/constants/function";
import DeliveryMapLocation from "./DeliveryMapLocation";
import OrderDeliveryAddress from "./OrderDeliveryAddress";

const DeliveryMapStatus = ({
  location_coordinates,
  customer_details,
  payment_status,
}) => {
  const { language, homePageDetails, areaDetails, internationalDelivery } =
    useContext(AppContext);

  const houseLabel = () => {
    switch (customer_details?.address_type) {
      case "1":
        return language == "ltr" ? "House No." : "عمارة";

      case "2":
      case "3":
        return language == "ltr" ? "Building no." : "عمارة";

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
    switch (customer_details?.address_type) {
      case "2":
        return language == "ltr" ? "Flat no." : "رقم الشقة";
      case "3":
        return language == "ltr" ? "Office no." : "رقم المكتب";

      default:
        return "";
    }
  };
  const getFlag = () => {
    const countryCODE = Object.keys(tele).find(
      (key) => tele[key] === customer_details?.country_code.split("+")[1]
    );
    return countryCODE;
  };

  const getBranchAddress = () => {
    if (areaDetails.data.branch) {
      const currentBranch = areaDetails.data.branch.filter(
        (branch) => branch.name == customer_details?.branch
      );
      if (currentBranch.length) {
        return (
          <div>
            {language == "ltr"
              ? currentBranch[0].address
              : currentBranch[0].arabic_address}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div>
      {location_coordinates?.branch_lat &&
        location_coordinates.delivery_lat &&
        payment_status === "1" &&
        customer_details.is_international_delivery !== "1" && (
          <DeliveryMapLocation
            startLat={location_coordinates.branch_lat}
            startLng={location_coordinates.branch_lng}
            endLat={location_coordinates.delivery_lat}
            endLng={location_coordinates.delivery_lng}
          />
        )}
      <div
        className="orderStatus-userData"
        style={{ border: "none", marginTop: "0" }}
      >
        <div
          className={
            customer_details?.self_pickup == 1
              ? "common-delivery-status-order-number-grey"
              : "orderStatus-userData-deliverText"
          }
        >
          {customer_details?.self_pickup == 1
            ? language === "ltr"
              ? "Pickup From"
              : "تلتقط من"
            : language === "ltr"
            ? "Delivered To"
            : "تفاصيل الاستلام"}
        </div>
        {customer_details.is_international_delivery === "1" ? (
          <OrderDeliveryAddress customer_details={customer_details} />
        ) : (
          <>
            {customer_details.title && (
              <div
                className={
                  customer_details?.self_pickup == 1
                    ? `orderStatus-userData-deliverText ${"marginBottom"}`
                    : "orderStatus-userData-addressText"
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "#000",
                  fontSize: language === "ltr" ? "16px" : "18px",
                }}
              >
                {customer_details?.self_pickup != "1" ? (
                  <div
                    style={{
                      width: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "14px",
                    }}
                  >
                    {getAddressType(customer_details.address_type, "", "19")}
                  </div>
                ) : null}
                <div>
                  {customer_details?.self_pickup != "1" &&
                  customer_details?.title
                    ? customer_details.title
                    : null}
                </div>
              </div>
            )}
            <div
              className={
                customer_details?.self_pickup == 1
                  ? `orderStatus-userData-deliverText ${"marginBottom"}`
                  : "orderStatus-userData-addressText"
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#000",
                fontSize: language === "ltr" ? "16px" : "18px",
              }}
            >
              {customer_details?.self_pickup != "1" &&
              !customer_details.title ? (
                <div
                  style={{
                    width: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "14px",
                  }}
                >
                  {getAddressType(customer_details.address_type, "", "19")}
                </div>
              ) : null}
              <div>
                {customer_details?.self_pickup === "1"
                  ? language === "ltr"
                    ? customer_details?.branch
                    : customer_details?.branch_ar
                  : language === "ltr"
                  ? customer_details?.area
                  : customer_details?.area_ar}
              </div>
            </div>
            {customer_details?.self_pickup === "1" ? (
              <div className="orderStatus-userData-addressText">
                {getBranchAddress()}
                {customer_details?.car_model ? (
                  <>
                    {language == "ltr" ? "Model" : "نوع السيارة"}{" "}
                    {customer_details?.car_model}
                  </>
                ) : null}
                {customer_details?.car_color ? (
                  <>
                    {", "}
                    {language == "ltr" ? "Color" : "اللون"}{" "}
                    {customer_details?.car_color}
                  </>
                ) : null}
                {customer_details?.license_number ? (
                  <>
                    {", "}
                    {language == "ltr"
                      ? "License Plate "
                      : "رقم لوحة السيارة"}{" "}
                    {customer_details?.license_number}
                  </>
                ) : null}
              </div>
            ) : (
              <div
                className="orderStatus-userData-addressText delivery-alignment"
                style={{
                  marginLeft: language == "ltr" ? "25px" : "0px",
                  marginRight: language == "rtl" ? "25px" : "0px",
                }}
              >
                <div>
                  <div>
                    {language == "ltr" ? "Block" : "قطعة "}{" "}
                    {customer_details?.block}
                    {", "}
                    {language == "ltr" ? "Street" : "شارع "}{" "}
                    {customer_details?.street}
                    {customer_details?.avenue ? (
                      <>
                        {", "}
                        {language == "ltr" ? "Ave." : "شارع"}{" "}
                        {customer_details?.avenue}
                      </>
                    ) : null}
                    {", "}
                  </div>
                  <div>
                    {houseLabel()} {customer_details?.house_number}
                    {customer_details?.floor_number ? (
                      <>
                        {", "}
                        {language == "ltr" ? "Floor no." : "رقم الدور"}{" "}
                        {customer_details.floor_number}
                      </>
                    ) : null}
                    {customer_details?.flat_number ? (
                      <>
                        {", "}
                        {flatLabel()} {customer_details?.flat_number}
                      </>
                    ) : null}
                  </div>
                  <div style={{ fontStyle: "italic" }}>
                    {customer_details?.special_directions
                      ? customer_details?.special_directions
                      : null}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="orderStatus-userphone">
        {customer_details?.self_pickup === "1" ? (
          <div className="common-delivery-status-order-number-grey">
            {language === "ltr" ? "Buyer Name" : "اسم المشتري"}
          </div>
        ) : null}
        <div className="orderStatus-userData-deliverText">
          {customer_details?.name}
        </div>
        <div
          className="orderStatus-userphone-userName"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ReactFlagsSelect
            className="showFlag-only"
            selected={getFlag()}
            showSelectedLabel={false}
            disabled
            customLabels={telecount}
          />
          {customer_details?.country_code} {customer_details?.phone_number}
        </div>
        <div
          className="orderStatus-userphone-userName"
          style={{
            marginLeft: language == "ltr" ? "25px" : "0px",
            marginRight: language == "rtl" ? "25px" : "0px",
          }}
        >
          {customer_details?.email}
        </div>
      </div>
    </div>
  );
};

export default DeliveryMapStatus;
