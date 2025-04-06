import { AppContext } from "@/context/AppContext";
import { Divider, List, ListItem } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import TypographyConverter from "../common/TypographyConveter/TypographyConverter";

const RestSideDrawerContent = ({ setBurger }) => {
  const {
    language,
    handleUserDetailsChange,
    handleContactDetailsChange,
    handleAddressDetailsChange,
    handleAreaDetailsChange,
    handleCartChange,
    homePageDetails,
    handleSetPaymentChange,
  } = useContext(AppContext);
  const router = useRouter();
  const contactInfo = JSON.parse(localStorage.getItem("contactInfo") || "{}");
  const sectionsArray = [
    {
      englishType:
        homePageDetails?.vendor_data?.slug_type == 2
          ? "Reserve"
          : homePageDetails?.vendor_data?.business_type == 6
          ? "Menu"
          : "Home",
      arabicType:
        homePageDetails?.vendor_data?.slug_type == 2
          ? "الحجوزات"
          : homePageDetails?.vendor_data?.business_type == 6
          ? "الصفحة الرئيسية"
          : "الصفحة الرئيسية",
      link: "/",
    },
    {
      englishType: "Branch",
      arabicType: "افرعنا",
      link: "/branches",
    },
    // {
    //     englishType: "FAQs",
    //     arabicType: "الأسئلة الشائعة",
    //     link: ""
    // },
    {
      englishType: "Track Order",
      arabicType: "تعقب الطلب",
      link: "/track-order",
    },
    {
      ...(contactInfo?.phone &&
      contactInfo?.email &&
      contactInfo?.name &&
      homePageDetails?.vendor_data?.checkout_method != null &&
      localStorage.getItem("token")
        ? {
            englishType: "My Information",
            arabicType: "معلوماتي",
            link: "",
          }
        : null),
    },
    {
      ...(contactInfo?.phone &&
      contactInfo?.email &&
      contactInfo?.name &&
      homePageDetails?.vendor_data?.checkout_method != null &&
      localStorage.getItem("token")
        ? {
            englishType: "My Orders",
            arabicType: "مشترياتي",
            link: "",
          }
        : null),
    },
    {
      ...(contactInfo?.phone &&
      contactInfo?.email &&
      contactInfo?.name &&
      homePageDetails?.vendor_data?.checkout_method != null &&
      localStorage.getItem("token")
        ? {
            englishType: "Logout",
            arabicType: "تسجيل الخروج",
            link: "",
          }
        : homePageDetails?.vendor_data?.checkout_method != null
        ? {
            englishType: "Login",
            arabicType: "تسجيل الدخول",
            link: "",
          }
        : null),
    },
  ];
  const navigateFunction = (section) => {
    switch (section.englishType) {
      case "FAQs":
        break;
      case "Track Order":
        setBurger(false);
        router.push("/track-order");
        break;

      case "My Orders":
        setBurger(false);
        router.push("/order-history");
        break;
      case "Logout":
        setBurger(false);
        handleAreaDetailsChange({
          type:
            window.location.host.replace(/^www\./, "") !== "shop.playon.today"
              ? "delivery"
              : "pickup",
          data: {},
          area: "",
          branch: "",
          branch_id: "",
          area_id: "",
          branchForArea: {},
          deliveryTiming: "",
          pickupTiming: "",
          customDelivery: false,
          getDeliveryTiming: moment().add(2, "hours").toDate(),
          laterDeliveryTiming: moment().add(2, "hours").toDate(),
          laterPickupTiming: moment().add(2, "hours").toDate(),
          now: 1,
          ar_area: "",
          ar_branch: "",
          ar_deliveryTiming: "",
          ar_pickupTiming: "",
          shopOpen: 1,
          minimum: "",
          branch_lat: "",
          branch_lng: "",
        });
        handleCartChange({});
        handleAddressDetailsChange({
          block: "",
          street: "",
          avenue: "",
          house: "",
          floor: "",
          flat: "",
          special_directions: "",
          lat: 29.378,
          lng: 47.99,
          fixedLat: 29.378,
          fixedLng: 47.99,
          addressString: "",
          addressType: "1",
        });
        handleContactDetailsChange({
          name: "",
          phoneCode: "KW",
          phone: "",
          email: "",
          model: "",
          color: "",
          license: "",
        });
        handleSetPaymentChange(1);
        handleUserDetailsChange({
          id: "",
          email: "",
          firstname: "",
          lastname: "",
          firstname_ar: "",
          lastname_ar: "",
          mobilenumber: "",
          country_code: "",
          is_guest: false,
          is_social: false,
        });

        localStorage.removeItem("contactInfo");
        localStorage.removeItem("token");
        localStorage.removeItem("cartTime");
        localStorage.removeItem("newPath");
        localStorage.removeItem("userID");
        let result = "";
        let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        let charactersLength = characters.length;
        for (var i = 0; i < 10; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        localStorage.setItem("userID", result);
        router.push("/");
        break;

      case "My Information":
        setBurger(false);
        router.push("/info");
        break;

      case "Login":
        handleUserDetailsChange((prev) => ({ ...prev, is_guest: false }));
        setBurger(false);
        router.push("/contact-details");
        break;
      case "Home":
      case "Reserve":
      case "Menu":
        setBurger(false);
        router.push("/");
        break;
      case "Branch":
        setBurger(false);
        router.push("/branches");
        break;
      default:
        break;
    }
  };
  return (
    <List style={{ marginBottom: "360px" }}>
      {sectionsArray &&
        sectionsArray
          .filter((ele) => Object.keys(ele).length != 0)
          .map((section, i) => (
            <ListItem
              key={i}
              className="restSide-div"
              onClick={() => navigateFunction(section)}
              sx={{ fontSize: "20px" }}
            >
              {language === "ltr" ? section.englishType : section.arabicType}
            </ListItem>
          ))}
    </List>
  );
};

export default RestSideDrawerContent;
