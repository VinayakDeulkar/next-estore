import React, { useContext, useState } from "react";
import "./deskCheckoutSection.css";
import { AppContext } from "@/context/AppContext";
import moment from "moment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NewOrderProductList from "../NewOrderProductList/NewOrderProductList";
import Link from "next/link";

const DeskCheckoutSection = () => {
  const { homePageDetails, areaDetails, language } = useContext(AppContext);
  const [successPromocode, setSuccessPromocode] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [companyData, setCompanyData] = useState();

  return (
    <div>
      {areaDetails.type == "delivery" &&
        (homePageDetails?.vendor_data?.international_delivery === "3" ||
          homePageDetails?.vendor_data?.international_delivery === "") && (
          <>
            <Link href={`/timing`} className="deliveryInfoMainDIv">
              <div className="buyer-details-firstDiv">
                <div className="checkoutPageText">
                  {areaDetails?.now == 1
                    ? language === "ltr"
                      ? `${
                          !areaDetails?.customDelivery ? "Delivery Within" : ""
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
                </div>
              </div>
              <div className="buyer-details-secondDiv">
                <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
              </div>
            </Link>
          </>
        )}
      <div
        className="checkoutPageText"
        style={{ marginTop: "5px", marginBottom: "10px" }}
      >
        {language === "ltr" ? "Items Details" : "تفاصيل عربة التسوق"}
      </div>
      <NewOrderProductList
        setSuccessPromocode={setSuccessPromocode}
        successPromocode={successPromocode}
        deliveryCharge={deliveryCharge}
      />
      <div
        className="checkout-page-text"
        style={{ marginTop: "25px", marginBottom: "5px" }}
      >
        {areaDetails?.type === "delivery"
          ? language === "ltr"
            ? "Delivery For"
            : "التسليم ل"
          : language === "ltr"
          ? "Pickup For"
          : "بيك اب ل"}
      </div>
    </div>
  );
};

export default DeskCheckoutSection;
