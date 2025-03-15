import React from "react";
import Product from "./product";
import { cookies } from "next/headers";
import { getProductDetails } from "@/apis";
import { getContextValues } from "@/context/getContextValues";

export async function generateMetadata({ searchParams }) {
  const { id } = searchParams;
  const { vendor_id, vendor_slug } = await getContextValues();
  const productDetails = await getProductDetails({
    product_id: id,
    vendor_slug: vendor_slug,
    vendor_id: vendor_id,
    area_id: "1",
  });

  const { name, short_description, image } = productDetails?.data;
  const faviconType = image.endsWith(".png") ? "image/png" : "image/jpeg";
  return {
    title: name,
    description: short_description,
    icons: {
      icon: [{ url: image, type: faviconType }],
    },
    openGraph: {
      title: name,
      description: short_description,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: short_description,
      images: [image],
    },
  };
}

async function getData(id, vendor_id, vendor_slug) {
  const productDetails = await getProductDetails({
    product_id: id,
    vendor_slug: vendor_slug,
    vendor_id: vendor_id,
    area_id: "1",
  });
  return productDetails;
}
const Page = async ({ searchParams }) => {
  const { id } = searchParams;
  const { vendor_id, vendor_slug } = await getContextValues();

  const props = await getData(id, vendor_id, vendor_slug);
  return <Product {...props} />;
};

export default Page;
