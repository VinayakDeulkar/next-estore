import React from "react";
import Products from "./products";
import { getContextValues } from "@/context/getContextValues";
import { getCategoryProduct } from "@/apis";

async function getData(id, vendor_id, vendor_slug) {
  const productDetails = await getCategoryProduct({
    category: id,
    vendor_slug: vendor_slug,
    vendor_id: vendor_id,
    area_id: "1",
    page: 0,
  });
  return productDetails;
}
const Page = async ({ searchParams }) => {
  const { id } = searchParams;
  const { vendor_id, vendor_slug } = await getContextValues();

  const props = await getData(id, vendor_id, vendor_slug);
  return <Products {...props} />;
};

export default Page;
