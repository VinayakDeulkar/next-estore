import React, { useContext, useEffect, useState } from "react";

import moment from "moment";
import { AppContext } from "@/context/AppContext";
import CheckMark from "@/SVGs/CheckMark";
import OrderCancelIcon from "@/SVGs/OrderCancelIcon";

const CommonDeliveryStatus = ({ orderDetails }) => {
  const { language, areaDetails, vendorSlug, homePageDetails } =
    useContext(AppContext);
  const [imagePath, setTmagePath] = useState(
    "61dabb82cfb5bea3434fe8ff75fe3af2.gif"
  );
  console.log(imagePath, "imagePath");

  const calculateTimeLeft = (deliveryTime) => {
    // Parse the delivery time using moment.js
    const deliveryMoment = moment(deliveryTime, "HH:mm:ss");

    // Get the current time using moment.js
    const currentTime = moment();

    // Calculate the difference in minutes
    const timeDifference = deliveryMoment.diff(currentTime, "minutes");

    if (timeDifference <= 0) {
      return (
        moment(orderDetails?.estimated_time, "HH:mm:ss")
          .locale("en")
          .format("hh:mm") +
        moment(orderDetails?.estimated_time, "HH:mm:ss")
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
        ? `${formattedTimeLeft} ${remainingMinutes} minute${
            remainingMinutes !== 1 ? "s" : ""
          }`
        : `${formattedTimeLeft} ${remainingMinutes} دقيقة`;

    return formattedTimeLeft;
  };
  useEffect(() => {
    if (orderDetails?.current_status?.id) {
      switch (orderDetails?.current_status?.id) {
        // switch (8) {
        case 1:
        case 2:
        case 3:
          setTmagePath("61dabb82cfb5bea3434fe8ff75fe3af2.gif");
          break;

        case 4:
        case 5:
        case 6:
        case 7:
          setTmagePath("delivery-onTheWay-image.png");
          break;

        case 8:
        case 9:
          setTmagePath("61dabb82cfb5bea3434fe8ff75fe3af2.gif");
          break;

        case 10:
          setTmagePath("delivery-done-image.png");
          break;
        default:
          break;
      }
    }
  }, []);

  const convertToAmPm = (time) => {
    return `${
      moment(time, "HH:mm:ss").locale("en").format("hh:mm") +
      moment(time, "HH:mm:ss")
        .locale(language == "ltr" ? "en" : "ar-sa")
        .format(" A")
    } `;
  };

  const getBranchAddress = () => {
    if (areaDetails.data.branch) {
      const currentBranch = areaDetails.data.branch.filter(
        (branch) => branch.name == orderDetails?.customer_details?.branch
      );
      if (currentBranch.length) {
        return (
          <>
            {vendorSlug === "alawael-bilingual-school" &&
            homePageDetails?.vendor_data?.custom_message ? (
              <div>
                {language === "ltr"
                  ? homePageDetails?.vendor_data?.custom_message
                  : homePageDetails?.vendor_data?.custom_message_ar}
              </div>
            ) : (
              <div>
                {language == "ltr"
                  ? `Pickup from ${convertToAmPm(
                      currentBranch[0]?.office_start_time
                    )} to ${convertToAmPm(currentBranch[0]?.office_end_time)}`
                  : `الاستلام من ${convertToAmPm(
                      currentBranch[0]?.office_start_time
                    )} إلى ${convertToAmPm(currentBranch[0]?.office_end_time)}`}
              </div>
            )}
          </>
        );
      }
    }
    return null;
  };

  return (
    <div>
      <div className="common-deliveery-status-div">
        <div>
          <div
            className="common-delivery-status-current-status"
            style={
              orderDetails?.customer_details?.self_pickup !== "1"
                ? { marginBottom: "9px" }
                : {}
            }
          >
            {orderDetails?.has_register_item
              ? language === "ltr"
                ? "Product Registered"
                : "المنتج مسجل"
              : orderDetails?.payment_status === "1"
              ? orderDetails?.current_status?.name
                ? language === "ltr"
                  ? orderDetails?.current_status?.name
                  : orderDetails?.current_status?.arabic_name
                : language === "ltr"
                ? "Order Placed"
                : "تم استلام الطلب"
              : language === "ltr"
              ? "Order Not Placed"
              : "لم يتم تقديم الطلب"}
          </div>
          {orderDetails?.payment_status === "1" && (
            <>
              <div
                className="common-delivery-status-delivery-date"
                style={
                  orderDetails?.customer_details?.self_pickup !== "1"
                    ? { height: "57px", lineHeight: "27px" }
                    : {}
                }
              >
                {orderDetails?.customer_details?.self_pickup === "1" ? null : (
                  <div>
                    {orderDetails?.estimated_date ? (
                      <>
                        {moment(orderDetails?.estimated_date)
                          .locale("en")
                          .format("DD") +
                          " " +
                          moment(orderDetails?.estimated_date)
                            .locale(language == "ltr" ? "en" : "ar-sa")
                            .format("MMMM") +
                          moment(orderDetails?.estimated_date)
                            .locale("en")
                            .format(", yyyy")}
                      </>
                    ) : (
                      <>
                        {moment(orderDetails?.delivery_time)
                          .locale("en")
                          .format("DD") +
                          " " +
                          moment(orderDetails?.delivery_time)
                            .locale(language == "ltr" ? "en" : "ar-sa")
                            .format("MMMM") +
                          moment(orderDetails?.delivery_time)
                            .locale("en")
                            .format(", yyyy")}
                      </>
                    )}
                  </div>
                )}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  {orderDetails?.customer_details?.self_pickup === "1"
                    ? null
                    : language === "ltr"
                    ? "ETA "
                    : "موعد الاستلام"}
                  {orderDetails?.customer_details?.self_pickup ===
                  "1" ? null : (
                    <div>
                      {orderDetails?.estimated_time ? (
                        <>
                          {moment(orderDetails?.estimated_time, "HH:mm:ss")
                            .locale("en")
                            .format("hh:mm") +
                            " " +
                            moment(orderDetails?.estimated_time, "HH:mm:ss")
                              .locale(language == "ltr" ? "en" : "ar-sa")
                              .format("A")}
                        </>
                      ) : (
                        <>
                          {moment(orderDetails?.delivery_time)
                            .locale("en")
                            .format("hh:mm") +
                            " " +
                            moment(orderDetails?.delivery_time)
                              .locale(language == "ltr" ? "en" : "ar-sa")
                              .format("A")}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {orderDetails?.customer_details?.self_pickup === "1" ? (
                <div className="pickupRangeTime">{getBranchAddress()}</div>
              ) : null}
            </>
          )}
        </div>
        <div className="common-delivery-status-image">
          {orderDetails?.payment_status === "1" ||
          orderDetails?.has_register_item ? (
            orderDetails?.customer_details?.self_pickup === "1" ? (
              <CheckMark />
            ) : orderDetails?.current_status?.id !== 10 ? (
              <img src={`images/${imagePath}`} />
            ) : (
              <OrderCancelIcon />
            )
          ) : (
            <OrderCancelIcon />
          )}
        </div>
      </div>
      <div className="common-delivery-status-order-number-div">
        <div
          style={{
            height: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="common-delivery-status-order-number-grey">
            {language === "ltr" ? "Order No." : "رقم الطلب"}
          </div>
          <div className="common-delivery-status-order-number-black ">
            {orderDetails?.order_number}
          </div>
        </div>
        {orderDetails?.tracking_no && (
          <div
            style={{
              height: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="common-delivery-status-order-number-grey"
              style={{ textAlign: "end" }}
            >
              {language === "ltr" ? "Tracking No." : "رمز التتبع"}
            </div>
            <div
              className="common-delivery-status-order-number-black "
              style={{ textAlign: "end" }}
            >
              {orderDetails.tracking_no}
            </div>
          </div>
        )}
      </div>
      {orderDetails?.delivery_details?.name &&
      orderDetails?.payment_status === "1" &&
      orderDetails.customer_details.self_pickup !== "1" ? (
        <div className="delivery-company-mainDiv" style={{ gap: "15px" }}>
          <div className="delivery-company-imageDiv">
            <img
              src={orderDetails?.delivery_details?.logo}
              alt="logo"
              style={{ height: "50px", width: "50px", borderRadius: "10px" }}
            />
          </div>
          <div>
            <div className="delivery-company-secondDiv">
              <div className="delivery-company-delivery-by-text">
                {language === "ltr" ? "Delivered By" : "التوصيل بواسطة"}
              </div>
              <div
                className="delivery-company-delivery-by-text"
                style={{ color: "#000" }}
              >
                {orderDetails?.estimated_date && (
                  <>
                    {moment(orderDetails?.estimated_date)
                      .locale("en")
                      .format("DD") +
                      " " +
                      moment(orderDetails?.estimated_date)
                        .locale(language == "ltr" ? "en" : "ar-sa")
                        .format("MMMM") +
                      moment(orderDetails?.estimated_date)
                        .locale("en")
                        .format(", yyyy")}
                  </>
                )}
              </div>
            </div>
            <div className="delivery-company-secondDiv">
              <div className="delivery-company-delivery-name">
                {language === "ltr"
                  ? orderDetails?.delivery_details?.name
                  : orderDetails?.delivery_details?.arabic_name}
              </div>
              {orderDetails?.estimated_time && (
                <div className="delivery-company-delivery-text">
                  {calculateTimeLeft(orderDetails?.estimated_time)}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CommonDeliveryStatus;
