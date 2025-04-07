import axios from "axios";
import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

function CheckoutModal({ popup, setPopup }) {
  const {
    homePageDetails,
    language,
    areaDetails,
    vendorSlug,
    cart,
    handleCartChange,
  } = useContext(AppContext);
  const router = useRouter();

  const onYesClick = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-cart-data`,
        JSON.stringify({
          token: process.env.NEXT_PUBLIC_APP_TOKEN,
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          area_id: areaDetails?.area_id,
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
          user_string: localStorage.getItem("userID"),
        })
      )
      .then((res) => {
        if (!res.data.data.cart?.cartCount) {
          handleCartChange((g) => {});
          router.push("/");
        } else handleCartChange((g) => res.data.data.cart);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setPopup((r) => ({
          show_popup: 0,
        }));
      });
  };

  const onNoClick = () => {
    setPopup((r) => ({
      show_popup: 0,
    }));
  };

  return (
    <div id="myModal" className="modal-made">
      <div className="modal-content-made">
        <p className="header-modal">
          {language == "ltr"
            ? "Items Currently Unavailable"
            : "العناصر غير متوفرة حاليا"}{" "}
        </p>
        <p className="text-modal">
          {" "}
          {language == "ltr"
            ? "We may need to remove/update the items added to your cart due to unavailability. Please choose if you want to continue and please review the cart if yes"
            : "قد نحتاج إلى إزالة / تحديث العناصر المضافة إلى سلة التسوق الخاصة بك بسبب عدم توفرها. الرجاء اختيار ما إذا كنت تريد المتابعة ويرجى مراجعة عربة التسوق إذا كانت الإجابة بنعم"}{" "}
          <ul
            style={{
              textAlign: language == "ltr" ? "left" : "right",
              paddingTop: 10,
              color: "red",
            }}
          >
            <span style={{ color: "black" }}>
              {language == "ltr"
                ? "Items not available:"
                : "العناصر غير متوفرة:"}
            </span>
            {cart?.cartItems
              ?.filter((c) => popup?.remove_items?.includes(c?.item_id))
              ?.map((f) => (
                <li
                  style={{
                    padding: language == "ltr" ? "0 5px 0 0" : "0 0 0 5px",
                  }}
                  key={f?.english_name}
                >
                  {language == "ltr" ? f?.english_name : f?.arabic_name}
                </li>
              ))}
          </ul>
        </p>
        <div className="button-container">
          <button onClick={() => onNoClick()} className="red">
            {language == "ltr" ? "No" : "لا"}
          </button>
          <button onClick={() => onYesClick()} className="green">
            {language == "ltr" ? "Yes" : "نعم"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
