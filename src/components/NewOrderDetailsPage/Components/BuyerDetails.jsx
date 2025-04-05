import UserIcon from "@/SVGs/UserIcon";
import AddressCard from "@/components/common/AddressCard/AddressCard";
import { telecount } from "@/constants/constants";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
const BuyerDetails = () => {
  const router = useRouter();
  const { contactDetails, handleContactDetailsChange, userDetails } =
    useContext(AppContext);

  const [countryCode, setCountryCode] = useState("");
  useEffect(() => {
    setCountryCode(
      Object.keys(telecount).map((ele) => {
        if (ele == contactDetails.phoneCode) {
          return telecount[ele].split(" ")[
            telecount[ele].split(" ").length - 1
          ];
        }
      })
    );
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("contactInfo"))) {
      const contactInfo = JSON.parse(localStorage.getItem("contactInfo"));

      handleContactDetailsChange({
        ...contactDetails,
        phoneCode: contactInfo.code,
        phone: contactInfo.phone,
      });
    }
  }, []);

  return (
    <>
      <AddressCard
        cardClick={() =>
          userDetails?.is_guest
            ? router.push("/contact-details")
            : router.push("/info")
        }
        icon={<UserIcon />}
        info={{
          name: contactDetails?.name,
          flag: (
            <ReactFlagsSelect
              className="showFlag-only"
              selected={contactDetails?.phoneCode}
              showSelectedLabel={false}
              disabled
              customLabels={telecount}
            />
          ),
          phoneCode: contactDetails?.phoneCode,
          phone: contactDetails?.phone,
          email: contactDetails?.email,
        }}
      />
    </>
  );
};

export default BuyerDetails;
