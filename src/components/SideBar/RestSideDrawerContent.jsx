import { AppContext } from "@/context/AppContext";
import BranchesIcon from "@/SVGs/MenuDrawerIcons/BranchesIcon";
import HomeIcon from "@/SVGs/MenuDrawerIcons/HomeIcon";
import LoginIcon from "@/SVGs/MenuDrawerIcons/LoginIcon";
import LogoutIcon from "@/SVGs/MenuDrawerIcons/LogoutIcon";
import MyInfoIcon from "@/SVGs/MenuDrawerIcons/MyInfoIcon";
import MyOrdersIcon from "@/SVGs/MenuDrawerIcons/MyOrdersIcon";
import TrackOrderIcon from "@/SVGs/MenuDrawerIcons/TrackOrderIcon";
import { List, ListItem } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const RestSideDrawerContent = () => {
  const {
    language,
    handleUserDetailsChange,
    handleContactDetailsChange,
    handleAddressDetailsChange,
    handleAreaDetailsChange,
    handleCartChange,
    homePageDetails,
    handleSetPaymentChange,
    areaDetails,
    handleSideMenuDrawer,
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
      icon: <HomeIcon height={18} width={18} />,
    },
    {
      englishType: "Branch",
      arabicType: "افرعنا",
      link: "/branches",
      icon: <BranchesIcon height={18} width={18} />,
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
      icon: <TrackOrderIcon height={16} width={16} />,
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
            icon: <MyInfoIcon height={18} width={18} />,
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
            icon: <MyOrdersIcon height={17} width={17} />,
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
            icon: <LogoutIcon height={18} width={18} />,
          }
        : homePageDetails?.vendor_data?.checkout_method != null
        ? {
            englishType: "Login",
            arabicType: "تسجيل الدخول",
            link: "",
            icon: <LoginIcon height={18} width={18} />,
          }
        : null),
    },
  ];
  const navigateFunction = (section) => {
    switch (section.englishType) {
      case "FAQs":
        break;
      case "Track Order":
        handleSideMenuDrawer(false);
        router.push("/track-order");
        break;

      case "My Orders":
        handleSideMenuDrawer(false);
        router.push("/order-history");
        break;
      case "Logout":
        handleSideMenuDrawer(false);
        handleAreaDetailsChange({
          type:
            window.location.host.replace(/^www\./, "") !== "shop.playon.today"
              ? "delivery"
              : "pickup",
          data: { ...areaDetails.data },
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
        handleSideMenuDrawer(false);
        router.push("/info");
        break;

      case "Login":
        handleUserDetailsChange((prev) => ({ ...prev, is_guest: false }));
        handleSideMenuDrawer(false);
        router.push("/login");
        break;
      case "Home":
      case "Reserve":
      case "Menu":
        handleSideMenuDrawer(false);
        router.push("/");
        break;
      case "Branch":
        handleSideMenuDrawer(false);
        router.push("/branches");
        break;
      default:
        break;
    }
  };
  return (
    <List>
      {sectionsArray &&
        sectionsArray
          .filter((ele) => Object.keys(ele).length != 0)
          .map((section, i) => (
            <ListItem
              key={i}
              className="restSide-div"
              onClick={() => navigateFunction(section)}
              sx={{
                fontSize: "16px",
                cursor: "pointer",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              {section?.icon}
              {language === "ltr" ? section.englishType : section.arabicType}
            </ListItem>
          ))}
    </List>
  );
};

export default RestSideDrawerContent;
