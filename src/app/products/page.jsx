import React from "react";
import Products from "./products";
import { getContextValues } from "@/context/getContextValues";
import { getCategoryProduct } from "@/apis";

async function getData(category, vendor_id, vendor_slug) {
  const productDetails = await getCategoryProduct({
    category: category,
    vendor_slug: vendor_slug,
    vendor_id: vendor_id,
    area_id: "1",
    page: 0,
  });
  return productDetails;
}
const Page = async ({ searchParams, query }) => {
  const searchParamsObj = searchParams;
  const { vendor_id, vendor_slug } = await getContextValues();

  const keysExceptId = Object.keys(searchParamsObj).filter(
    (key) => key !== "id"
  );
  let category = searchParams?.id;
  if (keysExceptId.length) {
    keysExceptId.forEach((ele) => (category = `${category}&${ele}`));
  }

  const props = await getData(category, vendor_id, vendor_slug);
  return <Products {...props} />;
};

export default Page;
