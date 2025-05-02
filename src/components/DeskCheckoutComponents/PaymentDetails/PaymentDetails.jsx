import NewDeliveryCompany from "@/components/NewDeliveryCompany/newDeliveryCompany";
import NewAmountDetails from "@/components/NewOrderDetailsPage/Components/NewAmountDetails";
import NewPaymentSelector from "@/components/NewOrderDetailsPage/Components/NewPaymentSelector";
import NewPromocode from "@/components/NewOrderDetailsPage/Components/NewPromocode";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import moment from "moment";
import React, { useContext, useState } from "react";
import snapchatPixel from "react-snapchat-pixel";
import TiktokPixel from "tiktok-pixel";
import ReactPixel from "react-facebook-pixel";
import { checkoutTag } from "@/constants/checkouttag";
import { saveOrderDetails } from "@/apis/submitOrderApi";
import { tele } from "@/constants/constants";

const PaymentDetails = () => {
  const {
    vendorSlug,
    homePageDetails,
    areaDetails,
    handleAreaDetailsChange,
    cart,
    userDetails,
    contactDetails,
    internationalDelivery,
    addressDetails,
    payment,
    handleSetPaymentChange,
    deliveryKm,
    companyData,
    deliveryCharge
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show_popup: 0 });
  const [width, setWidth] = useState(0);

  const [successPromocode, setSuccessPromocode] = useState("");
  const [promocode, setPromocode] = useState("");
  const [apply, setApply] = useState("");

  const getBranchCordinates = () => {
    const branchlatlng = areaDetails.data.branch.filter(
      (branch) => branch.id === areaDetails.branchForArea.id
    );
    if (branchlatlng[0]?.lat && branchlatlng[0]?.lng) {
      return { lat: branchlatlng[0].lat, lng: branchlatlng[0].lng };
    }
  };

  const submitFunc = async (method) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/save-order-details`,
        JSON.stringify({
          token: process.env.NEXT_PUBLIC_APP_TOKEN,
          user_string: localStorage.getItem("userID"),
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
          ecommerce_vendor_id:
            homePageDetails?.vendor_data?.ecommerce_vendor_id,
          first_name: contactDetails.name,
          country_code: tele[contactDetails?.phoneCode],
          phone: contactDetails.phone,
          email: contactDetails.email,
          type: areaDetails?.type,
          area_id: areaDetails?.type == "delivery" ? areaDetails?.area_id : "",
          area_name: areaDetails?.type == "delivery" ? areaDetails?.area : "",
          area_name_ar:
            areaDetails?.type == "delivery" ? areaDetails?.ar_area : "",
          branch_id: areaDetails?.branchForArea?.id,
          branch_name: areaDetails?.branchForArea?.english,
          branch_name_ar: areaDetails?.branchForArea?.arabic,
          address_type: addressDetails.addressType,
          block: addressDetails.block,
          street: addressDetails.street,
          avenue: addressDetails.avenue,
          house_no: addressDetails.house,
          floor_no: addressDetails.floor,
          flat_no: addressDetails.flat,
          special_directions: addressDetails.special_directions,
          payment_method:
            cart.knetTotal == 0.0 ||
            cart.codTotal == 0.0 ||
            cart.creditCardTotal == 0.0
              ? "3"
              : method,
          promocode: successPromocode,
          time: areaDetails?.now,
          schedule_time: areaDetails?.deliveryTiming,
          preorder_on: moment(areaDetails?.laterDeliveryTiming)
            .locale("en")
            .format("YYYY-MM-DD HH:mm:ss"),
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          success_url: window.location.origin + "/",
          error_url: window.location.origin + "/",

          // success_url: window.location.origin + "/dev/",
          // error_url: window.location.origin + "/dev/",
          is_pickup: areaDetails?.type == "pickup" ? 1 : 0,
          car_model: contactDetails?.model,
          car_color: contactDetails?.color,
          license_number: contactDetails?.license,
          selected_delivery_company: companyData?.delivery_partner_code || 0,
          user_lat: Number(addressDetails?.lat) || 0,
          user_lng: Number(addressDetails?.lng) || 0,
          distance_km: deliveryKm || 0,
          address_string: addressDetails.addressString,
          estimated_date: companyData?.estimated_date || 0,
          estimated_time: companyData?.estimated_time || 0,
          delivery_charge: deliveryCharge || "",
          ecom_delivery_co_id: companyData?.ecom_delivery_co_id || 0,
          branch_lat: getBranchCordinates()?.lat,
          branch_lng: getBranchCordinates()?.lng,
          country_id: "1",
          is_interNational: 0,
          user_address_id: addressDetails.id,
          ecom_user_id: userDetails.id,
        })
      )
      .then((res) => {
        localStorage?.setItem("check", "1");
        if (homePageDetails?.vendor_data?.fb_pixel_code != "")
          ReactPixel.track("InitiateCheckout", {
            content_ids: cart?.cartItems?.map((k) => k?.product_id),
            value: cart?.subTotal,
            num_items: cart?.cartCount,
            contents: cart?.cartItems?.map((k) => ({
              id: k?.product_id,
              item_id: k?.item_id,
              name: k?.english_name,
              quantity: k?.quantity,
              value: k?.original_price,
            })),
            currency: "KWD",
          });

        if (homePageDetails?.vendor_data?.snap_pixel_code != "")
          snapchatPixel.track("START_CHECKOUT", {
            item_ids: cart?.cartItems?.map((k) => k?.product_id),
            content_type: "product",
            price: cart?.subTotal,
            currency: "KWD",
          });

        if (homePageDetails?.vendor_data?.vendors_id === "132") {
          TiktokPixel.track("InitiateCheckout");
        }

        if (
          homePageDetails?.vendor_data?.google_tag_code != "" &&
          !/^GTM/.test(homePageDetails?.vendor_data?.google_tag_code)
        )
          checkoutTag(
            cart?.cartItems?.map((item) => ({
              item_id: item?.product_id,
              item_name: item?.english_name,
              currency: "KWD",
              discount: item?.discount_price,
              price: item?.original_price,
              quantity: item?.quantity,
            }))
          );
        window.location.assign(res.data.data.payment_url);
      })
      .catch((e) => console.log(e));
  };

  const checkAvailbility = async (method) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/change-area`,
        JSON.stringify({
          token: process.env.NEXT_PUBLIC_APP_TOKEN,
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          area_id: areaDetails?.area_id,
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
          user_string: localStorage.getItem("userID"),
        })
      )
      .then((res) => {
        let temp = res.data.data;
        if (temp?.show_popup == 0) {
          submitFunc(method);
        } else {
          setLoading((loading) => false);
          setPopup((pop) => temp);
        }
      })
      .catch((e) => console.log(e));
  };

  const onConfirmOrder = (method) => {
    setLoading((loading) => true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/branches`,
        JSON.stringify({
          token: process.env.NEXT_PUBLIC_APP_TOKEN,
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
        })
      )
      .then((res) => {
        handleAreaDetailsChange((areaDetails) => ({
          ...areaDetails,
          data: { ...areaDetails.data, branch: res.data.data },
        }));
        if (
          !(
            areaDetails?.branchForArea?.start > moment() ||
            moment() > areaDetails?.branchForArea?.end
          )
        ) {
          checkAvailbility(method);
        } else {
          if (
            !res.data.data?.filter(
              (k) => k?.id == areaDetails?.branchForArea?.id
            )[0]?.on_shop_close_purchase == 1
          ) {
            checkAvailbility(method);
          } else {
            setNote((m) => true);
            setLoading((loading) => false);
          }
        }
      })
      .catch((e) => console.log(e));
  };

  const submitInternational = async (method) => {
    const payload = {
      vendorSlug: vendorSlug?.data?.ecom_url_slug,
      details: homePageDetails,
      successPromocode: successPromocode,
      areaDetails: areaDetails,
      internationalDelivery: internationalDelivery,
      payment: method,
      domain: window.location.origin,
      contactDetails: contactDetails,
    };
    setLoading((loading) => true);
    const response = await saveOrderDetails(payload);
    if (response.status) {
      localStorage?.setItem("check", "1");
      if (homePageDetails?.vendor_data?.fb_pixel_code != "")
        ReactPixel.track("InitiateCheckout", {
          content_ids: cart?.cartItems?.map((k) => k?.product_id),
          value: cart?.subTotal,
          num_items: cart?.cartCount,
          contents: cart?.cartItems?.map((k) => ({
            id: k?.product_id,
            item_id: k?.item_id,
            name: k?.english_name,
            quantity: k?.quantity,
            value: k?.original_price,
          })),
          currency: "KWD",
        });

      if (homePageDetails?.vendor_data?.snap_pixel_code != "")
        snapchatPixel.track("START_CHECKOUT", {
          item_ids: cart?.cartItems?.map((k) => k?.product_id),
          content_type: "product",
          price: cart?.subTotal,
          currency: "KWD",
        });

      if (homePageDetails?.vendor_data?.vendors_id === "132") {
        TiktokPixel.track("InitiateCheckout");
      }

      if (
        homePageDetails?.vendor_data?.google_tag_code != "" &&
        !/^GTM/.test(homePageDetails?.vendor_data?.google_tag_code)
      )
        checkoutTag(
          cart?.cartItems?.map((item) => ({
            item_id: item?.product_id,
            item_name: item?.english_name,
            currency: "KWD",
            discount: item?.discount_price,
            price: item?.original_price,
            quantity: item?.quantity,
          }))
        );
      window.location.assign(response.data.data.payment_url);
    } else {
    }
  };

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "30px"}}>
        {companyData && areaDetails?.type !== "pickup" ? <NewDeliveryCompany companyData={companyData} /> : null}
        <NewPaymentSelector
          handleSetPaymentChange={handleSetPaymentChange}
          payment={payment}
          setWidth={setWidth}
          width={width}
        />
        {cart?.show_promocode == 1 ? (
          <NewPromocode
            promocode={promocode}
            setPromocode={setPromocode}
            setApply={setApply}
            apply={apply}
            setSuccessPromocode={setSuccessPromocode}
            deliveryCharge={deliveryCharge}
          />
        ) : null}
        <NewAmountDetails
          onConfirmOrder={() => {
            if (
              internationalDelivery.delivery_country_code.toLowerCase() ===
                "kw" ||
              homePageDetails?.vendor_data?.international_delivery === "3" ||
              homePageDetails?.vendor_data?.international_delivery === ""
            ) {
              onConfirmOrder(payment);
            } else {
              submitInternational(payment);
            }
          }}
        />
    </div>
  );
};

export default PaymentDetails;
