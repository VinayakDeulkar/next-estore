import React, { useContext, useEffect, useState } from "react";
import { AreaContext, LanguageContext } from "../../../App";
import moment from "moment";

const NewDeliveryCompany = ({ companyData }) => {
  const { language } = useContext(LanguageContext);
  const [timeLeftToShow, setTimeLeftToShow] = useState();
  const { areaDetails } = useContext(AreaContext);
  useEffect(() => {
    if (companyData?.estimated_time) {
      const time = calculateTimeLeft(companyData?.estimated_time);
      if (time) {
        setTimeLeftToShow(time);
      }
    }
  }, [companyData?.estimated_time]);

  const calculateTimeLeft = (deliveryTime) => {
    // Parse the delivery time using moment.js
    const deliveryMoment = moment(deliveryTime, "HH:mm:ss");

    // Get the current time using moment.js
    const currentTime = moment();

    // Calculate the difference in minutes
    const timeDifference = deliveryMoment.diff(currentTime, "minutes");

    if (timeDifference <= 0) {
      return (
        moment(companyData?.estimated_time, "HH:mm:ss")
          .locale("en")
          .format("hh:mm") +
        moment(companyData?.estimated_time, "HH:mm:ss")
          .locale(language == "ltr" ? "en" : "ar-sa")
          .format("A")
      );
    }

    // Calculate hours and remaining minutes
    const hours = Math.floor(timeDifference / 60);
    const remainingMinutes = timeDifference % 60;

    // Format the result
    let formattedTimeLeft = "";
    if (hours) {
      formattedTimeLeft =
        language === "ltr"
          ? `${hours} hour${hours !== 1 ? "s" : ""}`
          : `${hours} ساعة`;
    }

    formattedTimeLeft =
      language === "ltr"
        ? `${formattedTimeLeft} ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""
        }`
        : `${formattedTimeLeft} ${remainingMinutes} دقيقة`;

    return formattedTimeLeft;
  };
  return (
    // <div className="delivery-company-mainDiv">
    //   <div className="delivery-company-imageDiv">
    //     <img
    //       src={companyData.logo}
    //       style={{ height: "50px", width: "50px", borderRadius: "10px" }}
    //     />
    //   </div>
    //   <div style={{ width: "100%" }}>
    //     <div className="delivery-company-secondDiv">
    //       <div className="delivery-company-delivery-by-text">
    //         {language === "ltr" ? "Delivered By" : "التوصيل بواسطة"}
    //       </div>
    //       <div
    //         className="delivery-company-delivery-by-text"
    //         style={{ color: "#000" }}
    //       >
    //         {companyData?.estimated_date && (
    //           <>
    //             {moment(companyData?.estimated_date).locale("en").format("DD") +
    //               " " +
    //               moment(companyData?.estimated_date)
    //                 .locale(language == "ltr" ? "en" : "ar-sa")
    //                 .format("MMMM") +
    //               moment(companyData?.estimated_date)
    //                 .locale("en")
    //                 .format(", yyyy")}
    //           </>
    //         )}
    //       </div>
    //     </div>
    //     <div className="delivery-company-secondDiv">
    //       <div className="delivery-company-delivery-name">
    //         {language === "ltr"
    //           ? companyData.delivery_partner_name
    //           : companyData?.delivery_partner_name_ar}
    //       </div>
    //       <div className="delivery-company-delivery-time">
    //         {areaDetails.deliveryTiming &&
    //         companyData.delivery_partner_name == "Armada"
    //           ? language === "ltr"
    //             ? areaDetails.deliveryTiming
    //             : areaDetails.ar_deliveryTiming
    //           : timeLeftToShow}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <div
        className="checkout-page-text"
        style={{ marginTop: "25px", marginBottom: "5px" }}
      >
        {language === "ltr" ? "Delivery Done By" : "تم التسليم بواسطة"}
      </div>
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
            <img
              src={companyData.logo}
              style={{ height: "50px", width: "50px", borderRadius: "10px" }}
            />
          </div>
          <div className={`secondCardDiv`}>
            <div className="headingText">
              {areaDetails.deliveryTiming &&
                companyData.delivery_partner_name == "Armada"
                ? language === "ltr"
                  ? areaDetails.deliveryTiming
                  : areaDetails.ar_deliveryTiming
                : timeLeftToShow}
            </div>
            <div className="areaText" style={{ fontSize: language === "ltr" ? "13px" : "14px" }}>
              {companyData?.estimated_date && (
                <>
                  {moment(companyData?.estimated_date).locale("en").format("DD") +
                    " " +
                    moment(companyData?.estimated_date)
                      .locale(language == "ltr" ? "en" : "ar-sa")
                      .format("MMMM") +
                    moment(companyData?.estimated_date)
                      .locale("en")
                      .format(", yyyy")}
                </>
              )}
            </div>
            <div className="secondText" style={{ fontSize: language === "ltr" ? "13px" : "14px" }}>
              {language === "ltr"
                ? companyData.delivery_partner_name
                : companyData?.delivery_partner_name_ar}
              &nbsp;
              {
                language === "ltr" ? "Delivery" : "توصيل"
              }
            </div>
            <div className="descText"></div>
            <div className="secondText"></div>
            <div className="secondText"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDeliveryCompany;
