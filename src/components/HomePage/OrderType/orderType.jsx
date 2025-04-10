"use client";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import styles from "./orderType.module.css";
import ModeSelector from "@/components/common/ModeSelector/modeSelector";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";

const OrderType = () => {
  const {
    language,
    homePageDetails,
    areaDetails,
    handleAreaDetailsChange,
    userDetails,
  } = useContext(AppContext);
  const router = useRouter();

  return (
    <div className={styles.mainDiv}>
      <ModeSelector />
      <div className={styles.dividerLine}></div>
      <div className="tab-content">
        <div
          role="tabpanel"
          className={`tab-pane ${
            areaDetails.type === "delivery" ? "active" : ""
          }`}
          id="delivery"
        >
          <div
            className="delivery-select"
            // onClick={() => {
            //   if (userDetails?.status == "1" && userDetails?.address?.length) {
            //     router.push("/info");
            //   } else {
            //     setOpenArea((prev) => ({ open: true, goHome: false }));
            //   }
            // }}
          >
            <div className="delivery-detail-selected">
              <div>{language === "ltr" ? "Area" : "منطقة"}</div>
              <div>
                <span
                  style={{ color: homePageDetails?.vendor_data?.vendor_color }}
                >
                  {areaDetails?.area != ""
                    ? language === "ltr"
                      ? "Kuwait"
                      : ""
                    : ""}
                  {areaDetails?.area != "" ? ", " : ""}
                  {language === "ltr"
                    ? areaDetails?.area != ""
                      ? areaDetails?.area
                      : "Select Your Delivery Location"
                    : areaDetails?.area != ""
                    ? areaDetails?.ar_area
                    : "حدد موقع التسليم الخاص بك"}
                </span>
                <KeyboardArrowRight
                  sx={{
                    fontSize: 26,
                    margin: "-1px -8px 0 5px",
                    color: homePageDetails?.vendor_data?.vendor_color,
                  }}
                />
              </div>
            </div>
            {areaDetails?.area != "" ? (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!areaDetails?.customDelivery) router.push("/timing");
                }}
                className="delivery-detail-selected"
              >
                <div
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  {language === "ltr" ? "Delivery Time" : "وقت التوصيل"}
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <span
                    style={{
                      color: homePageDetails?.vendor_data?.vendor_color,
                    }}
                  >
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
                  <KeyboardArrowRight
                    sx={{
                      fontSize: 26,
                      margin: "-1px -8px 0 5px",
                      color: homePageDetails?.vendor_data?.vendor_color,
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {homePageDetails?.vendor_data?.is_pickup == 1 && (
          <div
            role="tabpanel"
            className={`tab-pane ${
              areaDetails.type === "pickup" ? "active" : ""
            }`}
            id="pickup"
          >
            <div
              className="delivery-select"
              // onClick={() => {
              //   setOpenArea((prev) => ({ open: true, goHome: false }));
              // }}
            >
              <div className="delivery-detail-selected">
                <div>{language === "ltr" ? "Branch" : "أفرعنا"}</div>
                <div>
                  <span
                    style={{
                      color: homePageDetails?.vendor_data?.vendor_color,
                    }}
                  >
                    {language === "ltr"
                      ? areaDetails?.branch != ""
                        ? areaDetails?.branch
                        : "Select Branch"
                      : areaDetails?.branch != ""
                      ? areaDetails?.ar_branch
                      : "حدد الفرع"}
                  </span>
                  <KeyboardArrowRight
                    sx={{
                      fontSize: 26,
                      margin: "-1px -8px 0 5px",
                      color: homePageDetails?.vendor_data?.vendor_color,
                    }}
                  />
                </div>
              </div>

              {homePageDetails?.ecom_url_slug ===
              "alawael-bilingual-school" ? null : (
                <>
                  {areaDetails?.branch != "" ? (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push("/timing");
                      }}
                      className="delivery-detail-selected"
                    >
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {language === "ltr" ? "Pickup Time" : "وقت الإستلام"}
                      </div>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <span
                          style={{
                            color: homePageDetails?.vendor_data?.vendor_color,
                          }}
                        >
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
                        <KeyboardArrowRight
                          sx={{
                            fontSize: 26,
                            margin: "-1px -8px 0 5px",
                            color: homePageDetails?.vendor_data?.vendor_color,
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderType;
