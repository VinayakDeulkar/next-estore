import axios from "axios";

export const getVendorSlug = async ({ host }) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/get-vendor-slug`,
        JSON.stringify({
            token: process.env.NEXT_PUBLIC_APP_TOKEN,
            host: host
        })
    );
    return response.data
}

export const getHomepageDetails = async ({ vendorSlug, vendors_id, area_id }) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/homepage`,
        JSON.stringify({
            token: process.env.NEXT_PUBLIC_APP_TOKEN,
            vendor_slug: vendorSlug,
            vendor_id: vendors_id,
            area_id: area_id,
        })
    );
    return response.data
}