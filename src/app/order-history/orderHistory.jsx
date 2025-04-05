"use client";
import OrderHistoryIcon from "@/SVGs/OrderHistoryIcon";
import { getUserOrderDetails } from "@/apis";
import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";

const OrderHistory = () => {
  const { language, homePageDetails, userDetails } = useContext(AppContext);
  const [orderData, setOrderData] = useState([]);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     history.push("/");
  //   }
  // }, []);

  useEffect(() => {
    if (userDetails?.id) {
      (async () => {
        const response = await getUserOrderDetails({
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          ecom_user_id: userDetails?.id,
          vendor_ecom_id: homePageDetails?.vendor_data?.ecommerce_vendor_id,
          phone_number: userDetails?.phone,
          country_code: `+${userDetails?.country_code}`,
          jwt_token: localStorage.getItem("token"),
          user_id: localStorage.getItem("id"),
          language: language,
        });
        if (response?.status) {
          setOrderData(response?.data);
        } else {
          enqueueSnackbar({ variant: "error", message: response?.message });
        }
      })();
    }
  }, [userDetails?.id]);

  const convertMonthToArabic = (month, year) => {
    const months = {
      January: "يناير",
      February: "فبراير",
      March: "مارس",
      April: "أبريل",
      May: "مايو",
      June: "يونيو",
      July: "يوليو",
      August: "أغسطس",
      September: "سبتمبر",
      October: "أكتوبر",
      November: "نوفمبر",
      December: "ديسمبر",
    };

    return `${months[month]} ${year}`;
  };

  const getBackgroundColor = (id) => {
    switch (id) {
      case "1":
      case "2":
        return "#f39c12";

      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
        return "#00c0ef";

      case "8":
      case "9":
        return "#00a65a";

      case "10":
      case "12":
        return "#dd4b39";

      case "11":
        return "#800080";
      default:
        return "var(--vendor-color)";
    }
  };

  return (
    <Box>
      <HeaderBox />
      <GridLayout
        backgroundColor={"#fff"}
        padding={"20px"}
        sx={{ height: "calc(100vh - 50px)" }}
      >
        <Box>
          <CommonHeader
            englishHeader="My Orders"
            arabicHeader="مشترياتي"
            fontWeight={400}
          />
          {orderData ? (
            Object.keys(orderData)?.map((order, i) => (
              <div className="orderHistoryMain" key={i}>
                <div className="monthText">
                  {language === "ltr"
                    ? order
                    : convertMonthToArabic(
                        order.split(" ")[0],
                        order.split(" ")[1]
                      )}
                </div>
                <div className="historycard">
                  {orderData[order]?.map((ele, i) => (
                    <React.Fragment key={ele?.order_number}>
                      <div
                        className="historyRow"
                        onClick={() =>
                          history.push(`/order=${ele?.order_number}`)
                        }
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={{ marginRight: "20px" }}>
                            <OrderHistoryIcon />
                          </div>

                          <div style={{ width: "100%" }}>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div className="orderNumber">
                                {ele?.order_number}
                              </div>
                              <div
                                className="orderStatusDiv"
                                style={{
                                  backgroundColor: getBackgroundColor(
                                    ele?.delivery_status_id
                                  ),
                                }}
                              >
                                {language === "ltr"
                                  ? ele?.delivery_status
                                  : ele.delivery_status_ar}
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "end",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  marginTop: "7px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#838383",
                                    fontWeight: "500",
                                    fontSize:
                                      language === "ltr" ? "12px" : "16px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {moment(
                                    new Date(ele?.created_at),
                                    "YYYY-MM-DD HH:mm:ss"
                                  )
                                    .locale("en")
                                    .format("YYYY MMMM D")}
                                </div>
                                <div
                                  style={{
                                    fontWeight: "500",
                                    fontSize:
                                      language === "ltr" ? "12px" : "15px",
                                  }}
                                >
                                  {ele?.order_items.length > 1
                                    ? `${ele?.order_items.length} ${
                                        language === "ltr" ? "Items" : "أغراض"
                                      }`
                                    : `${ele?.order_items.length} x ${
                                        language === "ltr"
                                          ? ele?.order_items[0].product_name
                                          : ele?.order_items[0].product_name_ar
                                      }`}
                                </div>
                              </div>

                              <div
                                style={{
                                  fontWeight: "500",
                                  fontSize:
                                    language === "ltr" ? "13px" : "17px",
                                }}
                              >
                                <span>
                                  {parseFloat(ele?.total_amount).toFixed(3)}
                                  &nbsp;
                                </span>
                                {language === "rtl" ? "د.ك" : "KD"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {i !== orderData[order].length - 1 && (
                        <div className="full-width-divider"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div style={{ fontSize: language === "ltr" ? "16px" : "18px" }}>
              {language === "ltr"
                ? "No orders found"
                : "لم يتم العثور على أي أوامر"}
            </div>
          )}
        </Box>
      </GridLayout>
    </Box>
  );
};

export default OrderHistory;
