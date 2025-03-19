import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";

function DeliveryTimeHeader() {
  const router = useRouter();
  const { language, areaDetails } = useContext(AppContext);

  return (
    <header className="delivery-order-header">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <p
            className="delivery-order-title text-center"
            style={{ position: "relative" }}
          >
            <div
              className="back-block-float"
              style={
                language == "ltr"
                  ? { position: "absolute", left: 0 }
                  : { position: "absolute", right: 0 }
              }
            >
              <Link
              href={``}
                onClick={(e) => {
                  e.preventDefault();
                  router.back();
                }}
              >
                <img
                  className="back-button"
                  src="https://payzah.net/production770/ecommercelayout/side/images/left-arrow.png"
                  alt="back button"
                ></img>
              </Link>
            </div>
            {areaDetails?.type == "delivery" ? language === "ltr" ? "Delivery Time" : "وقت التوصيل" :
              language === "ltr" ? "Pickup Time" : "وقت الاستلام"}
          </p>
        </div>
      </div>
    </header>
  );
}

export default DeliveryTimeHeader;
