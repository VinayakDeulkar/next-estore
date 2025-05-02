import axios from "axios";

export const getTNC = async ({ vendorSlug, vendors_id }) => {
  let payload = {
    token: process.env.NEXT_PUBLIC_APP_TOKEN,
    vendor_slug: vendorSlug,
    vendor_id: vendors_id,
  };

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tnc`, JSON.stringify(payload));
  return response.data;
};
