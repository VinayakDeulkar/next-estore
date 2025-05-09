import {
  getDeliveryPickupList,
  getEstorebranches,
  getHomepageDetails,
  getVendorSlug,
} from "@/apis";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";
import { headers } from "next/headers";
import "../assets/Fonts/Orleen.css";
import "../assets/Fonts/SFTfont.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    icons: [
      {
        url: `${english_new_background}?v=${Date.now()}`, // Prevent caching
        type: "image/jpeg",
      },
    ],
    openGraph: {
      title: name,
      description: slogan,
      images: [english_new_background],
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
    // host: host,
  });
  const [homePageResponse, deliveryResponse, estoreBranchesResponse] =
    await Promise.all([
      getHomepageDetails({
        vendorSlug: vendorSlugResponse?.data?.ecom_url_slug,
        vendors_id: vendorSlugResponse?.data?.vendor_data?.vendors_id,
        area_id: "",
      }),
      getDeliveryPickupList({
        vendorSlug: vendorSlugResponse?.data?.ecom_url_slug,
        vendors_id: vendorSlugResponse?.data?.vendor_data?.vendors_id,
      }),
      getEstorebranches({
        vendorSlug: vendorSlugResponse?.data?.ecom_url_slug,
        vendors_id: vendorSlugResponse?.data?.vendor_data?.vendors_id,
      }),
    ]);
  return {
    vendorSlugResponse,
    homePageResponse,
    deliveryResponse,
    estoreBranchesResponse,
  };
}

export default async function RootLayout({ children }) {
  const {
    vendorSlugResponse,
    homePageResponse,
    deliveryResponse,
    estoreBranchesResponse,
  } = await getData();
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""
        />
      </head>
      <body
        style={{
          fontFamily: "SFT Schrifted Sans TRIAL Var",
        }}
      >
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossorigin=""
        ></script>
        <AppProvider
          vendorSlugResponse={vendorSlugResponse}
          homePageResponse={homePageResponse}
          deliveryResponse={deliveryResponse}
          estoreBranchesResponse={estoreBranchesResponse}
        >
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
