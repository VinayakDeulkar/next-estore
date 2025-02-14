import { getVendorSlug } from "@/services";
import Homepage from "./Homepage";

const getData = async () => {
  const vendorSlugResponse = await getVendorSlug({
    host: "estore.payzah.support/beta",
  });
  if (vendorSlugResponse?.data?.statu) {
  }
  return { vendorSlugResponse };
};

export default async function Home() {
  const props = await getData();
  return <Homepage {...props} />;
}
