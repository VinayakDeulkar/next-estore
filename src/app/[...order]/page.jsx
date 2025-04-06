import { getOrderDetails } from "@/apis";
import { getContextValues } from "@/context/getContextValues";
import { notFound } from "next/navigation";
import OrderPage from "./orderPage";
async function getData(orderId, vendor_id, vendor_slug, ecommerce_vendor_id) {
  const productDetails = await getOrderDetails({
    order_number: orderId,
    vendorSlug: vendor_slug,
    vendor_id: vendor_id,
    ecommerce_vendor_id: ecommerce_vendor_id,
  });
  return productDetails;
}
const Page = async ({ params }) => {
  const rawPath = params.order?.join("/");
  const path = decodeURIComponent(rawPath);
  const { vendor_id, vendor_slug, ecommerce_vendor_id } =
    await getContextValues();

  const match = path.match(/^order=(\d+)$/);

  if (!match) return notFound();
  const orderId = match[1];

  const props = await getData(
    orderId,
    vendor_id,
    vendor_slug,
    ecommerce_vendor_id
  );
  if (!props?.status) return notFound();
  return <OrderPage {...props} />;
};

export default Page;
