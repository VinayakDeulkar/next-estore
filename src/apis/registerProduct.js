import axios from "axios";

export const registerProductApi = async ({
  vendor_id,
  ecom_vendor_id,
  vendor_slug,
  full_name,
  country_code,
  phone_number,
  email,
  product_id,
  quantity,
  add_on_ids,
  variation_ids,
  product_notes,
  branch_id,
  branch_name,
  is_pickup,
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register-product-order`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        vendor_id: vendor_id,
        ecom_vendor_id: ecom_vendor_id,
        vendor_slug: vendor_slug,
        full_name: full_name,
        country_code: country_code,
        phone_number: phone_number,
        email: email,
        product_id: product_id,
        quantity: quantity,
        add_on_ids: add_on_ids,
        variation_ids: variation_ids,
        product_notes: product_notes,
        branch_id: branch_id,
        branch_name: branch_name,
        is_pickup: is_pickup,
      })
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
