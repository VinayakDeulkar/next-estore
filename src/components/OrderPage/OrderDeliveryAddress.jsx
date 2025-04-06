import React, { useContext } from "react";
import ReactFlagsSelect from "react-flags-select";
import { AppContext } from "@/context/AppContext";
import { telecount } from "@/constants/constants";

const OrderDeliveryAddress = ({ customer_details }) => {
  const { language } = useContext(AppContext);
  return (
    <div>
      <div
        className="orderStatus-userData-addressText"
        style={{ display: "flex", alignItems: "center" }}
      >
        <ReactFlagsSelect
          className="showFlag-only"
          selected={customer_details.abbr}
          showSelectedLabel={false}
          disabled
          customLabels={telecount}
        />
        {customer_details?.country_name}
      </div>
      <div className="orderStatus-userData-addressText delivery-alignment">
        <div>
          <div>{customer_details.address1}</div>
          <div>{customer_details.address2}</div>
          <div>
            {customer_details.zipcode ? (
              <>
                {language === "ltr" ? "Zip Code" : "الرمز البريدي"}{" "}
                {customer_details.zipcode}{" "}
              </>
            ) : null}
          </div>
          {customer_details?.special_directions ? (
            <div>{customer_details.special_directions}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrderDeliveryAddress;
