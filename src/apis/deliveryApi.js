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
