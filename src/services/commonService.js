import axios from "axios";

export const getVendorSlug = async ({ host }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/get-vendor-slug`,
    JSON.stringify({
      token: process.env.NEXT_PUBLIC_APP_TOKEN,
      host: host,
    })
  );
  return response;
};
