import axios from "axios";

export const getVendorSlug = async ({ host }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/get-vendor-slug`,
    JSON.stringify({
      token: process.env.NEXT_PUBLIC_APP_TOKEN,
      host: host,
    })
  );
  return response.data;
};

export const getHomepageDetails = async ({
  vendorSlug,
  vendors_id,
  area_id,
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/homepage`,
    JSON.stringify({
      token: process.env.NEXT_PUBLIC_APP_TOKEN,
      vendor_slug: vendorSlug,
      vendor_id: vendors_id,
      area_id: area_id,
    })
  );
  return response.data;
};

export const getDeliveryPickupList = async ({ vendors_id, vendorSlug }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/delivery-pickup-list`,
    JSON.stringify({
      token: process.env.NEXT_PUBLIC_APP_TOKEN,
      vendor_id: vendors_id,
      vendor_slug: vendorSlug,
    })
  );
  return response.data;
};

export const getEstorebranches = async ({ vendors_id, vendorSlug }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/branches`,
    JSON.stringify({
      token: process.env.NEXT_PUBLIC_APP_TOKEN,
      vendor_id: vendors_id,
      vendor_slug: vendorSlug,
    })
  );
  return response.data;
};

export const getProductDetails = async ({
  product_id,
  vendor_slug,
  vendor_id,
  area_id,
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/product-details`,
    JSON.stringify({
      token: process.env.NEXT_PUBLIC_APP_TOKEN,
      product_slug: product_id,
      vendor_slug: vendor_slug,
      vendor_id: vendor_id,
      area_id: area_id,
    })
  );
  return response.data;
};

export const getCategoryProduct = async ({
  category,
  vendor_slug,
  vendor_id,
  area_id,
  page,
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/category-product`,
    JSON.stringify({
      token: process.env.NEXT_PUBLIC_APP_TOKEN,
      category: category,
      vendor_slug: vendor_slug,
      vendor_id: vendor_id,
      area_id: area_id,
      page: page,
    })
  );
  return response.data;
};

export const emptyUserCart = async ({ vendorSlug, vendor_id, user_string }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/empty-cart`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        vendor_id: vendor_id,
        vendor_slug: vendorSlug,
        user_string: user_string,
      })
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserCart = async ({
  vendorSlug,
  vendor_id,
  user_string,
  area_id,
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/get-user-cart`,
      JSON.stringify({
        token: process.env.NEXT_PUBLIC_APP_TOKEN,
        vendor_id: vendor_id,
        vendor_slug: vendorSlug,
        area_id: area_id,
        user_string: user_string,
      })
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderDetails = async ({
  vendorSlug,
  vendor_id,
  ecommerce_vendor_id,
  order_number,
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/get-order-details`,
    JSON.stringify({
      token: process.env.NEXT_PUBLIC_APP_TOKEN,
      vendor_slug: vendorSlug,
      vendor_id: vendor_id,
      ecommerce_vendor_id: ecommerce_vendor_id,
      order_number: order_number,
    })
  );
  return response.data;
};
