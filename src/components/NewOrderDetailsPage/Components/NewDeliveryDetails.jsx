import { AppContext } from "@/context/AppContext";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { getAddressType } from "@/constants/function";
import ClockIcon from "@/SVGs/ClockIcon";
import SubHeadline from "@/components/assetBoxDesign/SubHeadline/subHeadline";

const NewDeliveryDetails = ({
  addressDetails,
  companyData,
  showAddress,
  setShowAddress,
}) => {
  const { areaDetails, language, userDetails, contactDetails } =
    useContext(AppContext);
  const history = useRouter();
  const houseLabel = () => {
    switch (addressDetails.addressType) {
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
    switch (addressDetails.addressType) {
      case "2":
        return language == "ltr" ? "Flat no." : "رقم الشقة";
      case "3":
        return language == "ltr" ? "Office no." : "رقم المكتب";

      default:
        return "";
    }
  };

  const getGovernarate = () => {
    let newData;
    areaDetails?.data?.governarate?.map((governrnate, i) =>
      governrnate?.area?.map((ele, j) => {
        if (ele.area_id == areaDetails?.area_id) {
          newData = governrnate;
        }
      })
    );
    return newData;
  };
  return (
    <div /* style={{ paddingTop: "10px" }} */>
      <div
        className="checkout-page-text"
        style={{ marginTop: "25px", marginBottom: "5px" }}
      >
        <SubHeadline
          enText={
            areaDetails?.type == "delivery"
              ? "Delivery Address"
              : "Pick Up Details"
          }
          arText={
            areaDetails?.type == "delivery" ? "عنوان التسليم" : "التقط التفاصيل"
          }
        />
      </div>
      <div
        onClick={() => {
          if (areaDetails.type === "delivery") {
            if (userDetails?.is_guest) {
              history.push("/delivery-address");
            } else {
              setShowAddress(true);
            }
          } else {
            history.push("/area");
          }
        }}
        to={areaDetails.type === "delivery" ? "/info" : "/area"}
        className=""
      >
        <div className="cardMain">
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "22px",
            }}
          >
            <div className={`firstCardDiv`}>
              {getAddressType(
                addressDetails.addressType,
                "",
                "28",
                areaDetails?.type !== "delivery"
              )}
            </div>
            <div className={`secondCardDiv`}>
              <div>
                <div className="headingText">{addressDetails.addressName}</div>
                <div className="headingText">
                  {language === "ltr"
                    ? getGovernarate().governarate_name
                    : getGovernarate().governarate_name_ar}
                </div>
                <div className="areaText">
                  {areaDetails.type === "delivery" ? (
                    <div>
                      {language === "ltr"
                        ? areaDetails?.area
                        : areaDetails?.ar_area}
                    </div>
                  ) : (
                    <div>
                      {language === "ltr"
                        ? areaDetails?.branch
                        : areaDetails?.ar_branch}
                    </div>
                  )}
                </div>
                <div className="secondText">
                  {areaDetails.type === "delivery" ? (
                    <>
                      <div className="delivery-alignment">
                        {language == "ltr" ? "Block" : "قطعة "}{" "}
                        {addressDetails?.block}
                        {", "}
                        {language == "ltr" ? "Street" : "شارع "}{" "}
                        {addressDetails?.street}
                        {addressDetails?.avenue ? (
                          <>
                            {", "}
                            {language == "ltr" ? "Ave." : "شارع"}{" "}
                            {addressDetails?.avenue}
                          </>
                        ) : null}
                        {", "}
                        {houseLabel()} {addressDetails?.house}
                      </div>
                      {addressDetails?.floor || addressDetails?.flat ? (
                        <div className="delivery-alignment">
                          {addressDetails?.floor ? (
                            <>
                              {language == "ltr" ? "Floor no." : "رقم الدور"}{" "}
                              {addressDetails.floor}
                            </>
                          ) : null}
                          {addressDetails?.flat ? (
                            <>
                              {/* {", "} */}
                              {addressDetails?.floor ? ", " : null}
                              {flatLabel()} {addressDetails?.flat}
                            </>
                          ) : null}
                        </div>
                      ) : null}
                      {addressDetails?.special_directions ? (
                        <div
                          className="delivery-alignment"
                          style={{ fontStyle: "italic", marginBottom: "3px" }}
                        >
                          {addressDetails.special_directions}
                        </div>
                      ) : null}
                    </>
                  ) : contactDetails.model ||
                    contactDetails.color ||
                    contactDetails.license ? (
                    <div className="delivery-alignment">
                      {contactDetails.model && (
                        <>
                          {language == "ltr" ? "Model" : "نوع السيارة"}{" "}
                          {contactDetails.model}
                        </>
                      )}
                      {contactDetails.color && (
                        <>
                          {", "}
                          {language == "ltr" ? "Color" : "اللون"}{" "}
                          {contactDetails.color}
                        </>
                      )}
                      {contactDetails.license && (
                        <>
                          {", "}
                          {language == "ltr"
                            ? "License Plate "
                            : "رقم لوحة السيارة"}{" "}
                          {contactDetails.license}
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
                <div>
                  {!companyData ? (
                    <div
                      className="secondText"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        marginLeft: "-4px",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ClockIcon color={"#838383"} />
                      </div>
                      <div style={{ color: "#838383" }}>
                        {areaDetails.type === "delivery" ? (
                          <span>
                            {areaDetails?.now == 1
                              ? language === "ltr"
                                ? `${
                                    !areaDetails?.customDelivery
                                      ? "Delivery Within"
                                      : ""
                                  } ${areaDetails?.deliveryTiming}`
                                : `${
                                    !areaDetails?.customDelivery
                                      ? "التوصيل سيكون خلال"
                                      : ""
                                  } ${areaDetails?.ar_deliveryTiming}`
                              : moment(areaDetails?.laterDeliveryTiming)
                                  .locale("en")
                                  .format("DD") +
                                " " +
                                moment(areaDetails?.laterDeliveryTiming)
                                  .locale(language == "ltr" ? "en" : "ar-sa")
                                  .format("MMMM") +
                                moment(areaDetails?.laterDeliveryTiming)
                                  .locale("en")
                                  .format(", yyyy hh:mm ") +
                                moment(areaDetails?.laterDeliveryTiming)
                                  .locale(language == "ltr" ? "en" : "ar-sa")
                                  .format("A")}
                          </span>
                        ) : (
                          <span>
                            {areaDetails?.now == 1
                              ? language === "ltr"
                                ? `${areaDetails?.deliveryTiming}`
                                : `${areaDetails?.ar_deliveryTiming}`
                              : moment(areaDetails?.laterDeliveryTiming)
                                  .locale("en")
                                  .format("DD") +
                                " " +
                                moment(areaDetails?.laterDeliveryTiming)
                                  .locale(language == "ltr" ? "en" : "ar-sa")
                                  .format("MMMM") +
                                moment(areaDetails?.laterDeliveryTiming)
                                  .locale("en")
                                  .format(", yyyy hh:mm ") +
                                moment(areaDetails?.laterDeliveryTiming)
                                  .locale(language == "ltr" ? "en" : "ar-sa")
                                  .format("A")}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="buyer-details-secondDiv">
            <i
              className="fa fa-angle-right right-arrow"
              style={{ fontSize: "26px" }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDeliveryDetails;
