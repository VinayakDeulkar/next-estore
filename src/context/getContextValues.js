import { cookies } from "next/headers";

export async function getContextValues() {
  const vendor_id = cookies().get("vendors_id")?.value || "fallbackValue1";
  const vendor_slug = cookies().get("ecom_url_slug")?.value || "fallbackValue2";
  const vendor_slecommerce_vendor_idug =
    cookies().get("ecommerce_vendor_id")?.value || "fallbackValue3";
  return { vendor_id, vendor_slug };
}
