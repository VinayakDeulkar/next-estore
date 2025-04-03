import axios from "axios";
import { API_URL, tele, DELIVERY_API } from "../../services/constants";
import moment from "moment";

export const saveOrderDetails = async ({
  vendorSlug,
  details,
  contactDetails,
  successPromocode,
  areaDetails,
  internationalDelivery,
  payment,
  domain,
}) => {
    const response = await axios.post(
      `${NEXT_PUBLIC_API_URL}/save-order-details`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        user_string: localStorage.getItem("userID"),
        vendor_slug: vendorSlug,
        ecommerce_vendor_id: details.vendor.ecommerce_vendor_id,
        first_name: contactDetails.name,
        country_code: tele[contactDetails?.phoneCode],
        phone: contactDetails.phone,
        email: contactDetails.email,
        type: "",
        area_id: "",
        area_name: "",
        area_name_ar: "",
        branch_id: "",
        branch_name: "",
        branch_name_ar: "",
        address_type: "",
        block: "",
        street: "",
        avenue: "",
        house_no: "",
        floor_no: "",
        flat_no: "",
        payment_method: payment,
        promocode: successPromocode,
        time: areaDetails?.now,
        schedule_time: "",
        preorder_on: "",
        vendor_id: details?.vendor?.vendors_id,
        success_url: domain + "/",
        error_url: domain + "/",

        // success_url: domain + "/dev/",
        // error_url: domain + "/dev/",
        is_pickup: 0,
        car_model: "",
        car_color: "",
        license_number: "",
        selected_delivery_company: 0,
        user_lat: "",
        user_lng: "",
        distance_km: "",
        address_string: "",
        estimated_date: "",
        estimated_time: "",
        delivery_charge: 0,
        ecom_delivery_co_id: "",
        branch_lat: "",
        branch_lng: "",
        country_name: internationalDelivery.delivery_country,
        is_interNational: 1,
        country_id: internationalDelivery.country_id,
        address1: internationalDelivery.delivery_address1,
        address2: internationalDelivery.delivery_address2,
        zipcode: internationalDelivery.delivery_zipCode,
        special_directions: internationalDelivery.delivery_specialInstruction,
      })
    );
    return response;
};

export const getVendorCountries = async ({
  vendor_id,
  ecom_vendor_id,
  vendor_slug,
}) => {
    const response = await axios.post(
      `${NEXT_PUBLIC_DELIVERY_URL}/get-vendor-countries`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        vendor_id: vendor_id,
        ecom_vendor_id: ecom_vendor_id,
        vendor_slug: vendor_slug,
      })
    );
    return response.data;
};
