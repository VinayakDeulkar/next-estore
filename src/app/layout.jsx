import { getHomepageDetails, getVendorSlug } from "@/apis";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

import { headers } from "next/headers";
import "../assets/Fonts/Orleen.css";
import "../assets/Fonts/SFTfont.css";

export async function generateMetadata({ params }) {
  const headersList = headers();
  const host = headersList.get("host");
  const vendorSlugResponse = await getVendorSlug({
    host: "estore.payzah.support/dev",
  });
  const { name, english_new_background, slogan } =
    vendorSlugResponse?.data?.vendor_data;
  const faviconType = english_new_background.endsWith(".png")
    ? "image/png"
    : "image/jpeg";
  return {
    title: name,
    description: slogan,
    icons: {
      icon: [{ url: english_new_background, type: faviconType }],
    },
    openGraph: {
      title: name,
      description: slogan,
      images: [
        {
          url: english_new_background,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: slogan,
      images: [english_new_background],
    },
  };
}

async function getData() {
  const headersList = headers();
  const host = headersList.get("host");
  const vendorSlugResponse = await getVendorSlug({
    host: "estore.payzah.support/dev",
  });
  const homePageResponse = vendorSlugResponse?.status
    ? await getHomepageDetails({
        vendorSlug: vendorSlugResponse?.data?.ecom_url_slug,
        vendors_id: vendorSlugResponse?.data?.vendor_data?.vendors_id,
        area_id: "",
      })
    : {};
  return { vendorSlugResponse, homePageResponse };
}

export default async function RootLayout({ children }) {
  const { vendorSlugResponse, homePageResponse } = await getData();

  return (
    <html lang="en">
      <head></head>
      <body style={{ backgroundColor: "#F3F3F3" }}>
        <AppProvider
          vendorSlugResponse={vendorSlugResponse}
          homePageResponse={homePageResponse}
        >
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
