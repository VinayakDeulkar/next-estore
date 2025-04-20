import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import "./international.css";
import { getVendorCountries } from "@/apis";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";

const HomepageDesign = ({ handleCountryChange }) => {
  const {
    language,
    internationalDelivery,
    handleInternationalDeliveryChange,
    handleAreaDetailsChange,
    homePageDetails,
    vendorSlug,
  } = useContext(AppContext);
  const [countryDropDown, setCountryDropDown] = useState();
  const [countryArray, setCountryArray] = useState();

  useEffect(() => {
    if (
      internationalDelivery.delivery_country_code &&
      homePageDetails?.vendor_data?.international_delivery !== "3" &&
      homePageDetails?.vendor_data?.international_delivery !== "" &&
      vendorSlug?.data?.ecom_url_slug
    ) {
      (async () => {
        const response = await getVendorCountries({
          vendor_id: homePageDetails?.vendor_data.vendors_id,
          ecom_vendor_id: homePageDetails?.vendor_data.ecommerce_vendor_id,
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
        });
        if (response.status) {
          let countryArray = [];
          response.data.map((ele) => {
            countryArray.push(ele.abbr);
          });
          const currentCountry = response.data.filter(
            (ele) => ele.abbr === internationalDelivery.delivery_country_code
          );
          if (currentCountry && currentCountry.length > 0) {
            handleInternationalDeliveryChange({
              ...internationalDelivery,
              delivery_country_code: currentCountry[0].abbr,
              country_id: currentCountry[0].country_id,
              delivery_expected_time: currentCountry[0]?.delivery_expected_time,
              delivery_expected_type: currentCountry[0]?.delivery_expected_type,
            });
          }
          setCountryArray(countryArray);
          setCountryDropDown(response.data);
        }
      })();
    }
  }, []);

  return (
    <div className="international-delivery-home-container">
      <SubHeadline enText={"Delivery"} arText={"توصيل"} />
      <div className="international-map-div">
        <div>
          <ReactFlagsSelect
            selected={internationalDelivery.delivery_country_code}
            showSelectedLabel={true}
            searchable
            countries={countryArray}
            onSelect={(code) => {
              const filterCountry = countryDropDown.filter(
                (country) => country.abbr === code
              );
              handleInternationalDeliveryChange({
                ...internationalDelivery,
                delivery_country_code: code,
                country_id: filterCountry[0].country_id,
                delivery_country: filterCountry[0].country_name,
                delivery_expected_time:
                  filterCountry[0]?.delivery_expected_time,
                delivery_expected_type:
                  filterCountry[0]?.delivery_expected_type,
              });
              if (code !== "KW") {
                handleAreaDetailsChange((areaDetails) => ({
                  ...areaDetails,
                  area: "",
                  branch: "",
                  branch_id: "",
                  area_id: "",
                  branchForArea: {},
                  deliveryTiming: "",
                  pickupTiming: "",
                  ar_area: "",
                  ar_branch: "",
                  ar_deliveryTiming: "",
                  ar_pickupTiming: "",
                }));
              }
              handleCountryChange(code);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomepageDesign;
