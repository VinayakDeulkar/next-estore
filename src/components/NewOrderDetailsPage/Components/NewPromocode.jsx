import SubHeadline from "@/components/assetBoxDesign/SubHeadline/subHeadline";
import { AppContext } from "@/context/AppContext";
import CrossIcon from "@/SVGs/CrossIcon";
import axios from "axios";
import { useContext, useState } from "react";

const NewPromocode = ({
  setPromocode,
  promocode,
  setSuccessPromocode,
  setApply,
  apply,
  afterPromocode,
  deliveryCharge,
}) => {
  const {
    language,
    homePageDetails,
    vendorSlug,
    handleCartChange,
    areaDetails,
    activeBackgroundColor,
  } = useContext(AppContext);
  const [apiCalled, setApiCalled] = useState(false);

  const onApplyClick = () => {
    if (!apiCalled) {
      setApiCalled(true);
      if (promocode != "") {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/apply-promocode`,
            JSON.stringify({
              token: process.env.NEXT_PUBLIC_APP_TOKEN,
              user_string: localStorage.getItem("userID"),
              vendor_slug: vendorSlug?.data?.ecom_url_slug,
              vendor_id: homePageDetails?.vendor_data?.vendors_id,
              area_id: areaDetails?.area_id,
              promocode: promocode,
              deliveryCharge: deliveryCharge,
            })
          )
          .then((res) => {
            if (res.data.status) {
              setApply((apply) => res.data.status);
              setSuccessPromocode((pro) => res.data.result.promo_code);
              handleCartChange((cart) => res.data.result);
              setApiCalled(false);
            } else {
              setApply((apply) => res.data.status);
              setApiCalled(false);
            }
          })
          .catch((e) => console.log(e));
      }
    }
  };
  return (
    <div>
      <SubHeadline enText={"Promotion Code"} arText={"الرمز الترويجي"} />
      <div
        className={`promocode-input-div ${
          homePageDetails?.vendor_data?.home_page_type === "18" &&
          "fashion-theme"
        }`}
      >
        <div className="promocode-input-div1">
          <input
            type="text"
            className={`form-control ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme-border"
            }`}
            style={{
              backgroundColor:
                window.innerWidth > 990 ? "#fff" : activeBackgroundColor,
              fontSize: "16px",
            }}
            id="name"
            name="first_name"
            required="true"
            value={promocode}
            onChange={(e) => setPromocode(e.target.value)}
          ></input>
          {promocode && (
            <div
              className="promocode-cross-button"
              onClick={(e) => {
                e.preventDefault();
                setPromocode("");
                setApply("");
              }}
            >
              <CrossIcon size={"26"} />
            </div>
          )}
        </div>
        <div className="apply-button" onClick={() => onApplyClick()}>
          {language == "ltr" ? "Apply" : "تفعيل"}
        </div>
      </div>
      {apply !== "" && (
        <p
          className="error-text"
          style={{
            marginTop: "10px",
            color: apply ? "#02b201" : "red",
          }}
        >
          {apply ? (
            <>
              <i style={{ fontSize: 15 }} className="fa fa-check-circle-o"></i>
              &nbsp;
              {language == "ltr"
                ? "Promocode is applied"
                : "تم تفعيل الرمز الترويجي"}
            </>
          ) : language == "ltr" ? (
            "Invalid Promo code passed"
          ) : (
            "الرمز الترويجي غير صحيح"
          )}
        </p>
      )}
    </div>
  );
};

export default NewPromocode;
