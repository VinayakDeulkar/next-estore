import { displayInternationalTime, getAddressType } from "@/constants/function";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";

const DeliveryAddressSection = ({ internationalDelivery }) => {
  const { language } = useContext(AppContext);
  const [deliveryTime, setDeliveryTime] = useState();
  const router = useRouter();

  useEffect(() => {
    if (
      internationalDelivery.delivery_expected_time &&
      internationalDelivery.delivery_expected_type
    ) {
      const respones = displayInternationalTime(
        internationalDelivery.delivery_expected_time,
        internationalDelivery.delivery_expected_type
      );
      setDeliveryTime(respones);
    }
  }, [
    internationalDelivery.delivery_expected_time,
    internationalDelivery.delivery_expected_type,
  ]);

  return (
    <div>
      <div
        className="checkout-page-text"
        style={{ marginTop: "25px", marginBottom: "5px" }}
      >
        {language === "ltr" ? "Delivery Address" : "عنوان التسليم"}
      </div>
      <div
        onClick={() => {
          router.push("/delivery-address");
        }}
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
              {getAddressType("", "", "28", true)}
            </div>
            <div className={`secondCardDiv`}>
              <div className="delivery-address-details-firstDiv">
                <div className="dontchane-direction">
                  <ReactFlagsSelect
                    className="showFlag-only"
                    selected={internationalDelivery?.delivery_country_code}
                    showSelectedLabel={false}
                    disabled
                  />
                  {internationalDelivery.delivery_country}
                </div>
                <div className="secondText">
                  {internationalDelivery.delivery_address1}
                </div>
                <div className="secondText">
                  {internationalDelivery.delivery_address2}
                </div>
                {internationalDelivery.delivery_zipCode ? (
                  <div className="secondText">
                    {internationalDelivery.delivery_zipCode ? (
                      <span>
                        {language == "ltr" ? "Zip Code" : "الرمز البريدي"}{" "}
                        {internationalDelivery.delivery_zipCode}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                {internationalDelivery.delivery_specialInstruction && (
                  <div className="secondText">
                    {internationalDelivery.delivery_specialInstruction}
                  </div>
                )}
                {deliveryTime ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div>
                      {language === "ltr" ? "Delivery after" : "التسليم بعد"}{" "}
                      {internationalDelivery.delivery_expected_time}{" "}
                      {language === "ltr" ? deliveryTime.eng : deliveryTime.arb}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressSection;
