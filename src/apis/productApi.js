import axios from "axios";

export const addToCartApi = async ({
  vendorSlug,
  vendors_id,
  area_id,
  itemId,
  user_string,
  quantity,
  branch_id,
  add_on_ids,
  variation_ids,
  product_notes,
}) => {
  let payload = {
    token: process.env.NEXT_PUBLIC_APP_TOKEN,
    vendor_slug: vendorSlug,
    vendor_id: vendors_id,
    area_id: area_id,
    id: itemId,
    user_string: user_string,
    quantity: quantity,
    branch_id: branch_id,
    add_on_ids: add_on_ids,
  };
  if (variation_ids) {
    payload = { ...payload, variation_ids: variation_ids };
  }
  if (product_notes) {
    payload = { ...payload, product_notes: product_notes };
  }
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/cart`,
    JSON.stringify(payload)
  );
  return response.data;
};

export const updateCartQauntity = async ({
  vendorSlug,
  vendors_id,
  area_id,
  user_string,
  quantity,
  branch_id,
  item_id,
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/update-cart-quantity`,
    JSON.stringify({
      token: process.env.NEXT_PUBLIC_APP_TOKEN,
      vendor_slug: vendorSlug,
      vendor_id: vendors_id,
      area_id: area_id,
      item_id: item_id,
      user_string: user_string,
      quantity: quantity,
      branch_id: branch_id,
    })
  );
  return response.data;
};

export const removeCartItem = async ({
  vendorSlug,
  vendors_id,
  area_id,
  user_string,
  item_id,
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/remove-cart-items`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        vendor_id: vendors_id,
        vendor_slug: vendorSlug,
        item_id: item_id,
        area_id: area_id,
        user_string: user_string,
      })
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
