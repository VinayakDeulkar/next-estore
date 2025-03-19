export const getVendorCountries = async ({
  vendor_id,
  ecom_vendor_id,
  vendor_slug,
}) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
