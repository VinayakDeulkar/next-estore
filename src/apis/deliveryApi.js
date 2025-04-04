import axios from "axios";

export const getVendorCountries = async ({
  vendor_id,
  ecom_vendor_id,
  vendor_slug,
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_DELIVERY_URL}/get-vendor-countries`,
    JSON.stringify({
      token: process.env.NEXT_PUBLIC_APP_TOKEN,
      vendor_id: vendor_id,
      ecom_vendor_id: ecom_vendor_id,
      vendor_slug: vendor_slug,
    })
  );
  return response.data;
};

export const changeArea = async ({
  vendors_id,
  area_id,
  vendorSlug,
  user_string,
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/change-area`,
    JSON.stringify({
      token: process.env.NEXT_PUBLIC_APP_TOKEN,
      vendor_id: vendors_id,
      area_id: area_id,
      vendor_slug: vendorSlug,
      user_string: user_string,
    })
  );
  return response.data;
};

export const getScheduleTime = async ({ vendors_id, area_id, vendorSlug }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/get-schedule-time`,
    JSON.stringify({
      token: process.env.NEXT_PUBLIC_APP_TOKEN,
      vendor_id: vendors_id,
      area_id: area_id,
      vendor_slug: vendorSlug,
      lang: "ar",
    })
  );
  return response.data;
};

export const updateDeliveryCharges = async (
  vendorSlug,
  vendors_id,
  area_id,
  delivery_charge,
  successPromocode
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/update-cart-delivery-charge`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        vendor_slug: vendorSlug,
        vendor_id: vendors_id,
        deliveryCharge: delivery_charge,
        area_id: area_id,
        user_string: localStorage.getItem("userID"),
        successPromocode: successPromocode,
      })
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDeliveryCompanies = async ({
  vendor_id,
  product,
  distance,
  block_id,
  area_id,
  ecommerce_vendor_id,
  branch_id,
  destination,
  block,
  street,
  avenue,
  house_no,
  floor_no,
  flat_no,
  time,
  schedule_time,
  preorder_on,
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DELIVERY_URL}/get-estimated-delivery-time`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        vendor_id: vendor_id,
        ecommerce_vendor_id: ecommerce_vendor_id,
        // product: product,
        distance: distance,
        area_id: area_id,
        block_id: block_id,
        branch_id: branch_id,
        destination: destination,
        block: block,
        street: street,
        avenue: avenue,
        house_no: house_no,
        floor_no: floor_no,
        flat_no: flat_no,
        time: time,
        schedule_time: schedule_time,
        preorder_on: preorder_on,
      })
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
