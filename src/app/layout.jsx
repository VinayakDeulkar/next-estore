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
import LoadingWrapper from "@/components/Animations/LoadingWrapper";

export async function generateMetadata({ params }) {
  const headersList = headers();
  const host = headersList.get("host");
  const vendorSlugResponse = await getVendorSlug({
    host: "estore.payzah.support/beta",
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
        url: `${english_new_background}?v=${Date.now()}`, 
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
    host: "estore.payzah.support/beta",
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
      <head></head>
      <body
        style={{
          fontFamily: "SFT Schrifted Sans TRIAL Var",
        }}
      >
        <AppProvider
          vendorSlugResponse={vendorSlugResponse}
          homePageResponse={homePageResponse}
          deliveryResponse={deliveryResponse}
          estoreBranchesResponse={estoreBranchesResponse}
        >
          <LoadingWrapper>{children}</LoadingWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
