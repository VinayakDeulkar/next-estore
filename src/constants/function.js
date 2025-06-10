import ApparentIcon from "@/SVGs/ApparentIcon";
import BoxSvg from "@/SVGs/BoxSvg";
import GovernmentIcon from "@/SVGs/GovernmentIcon";
import HomeIcon from "@/SVGs/HomeIcon";
import MosqueIcon from "@/SVGs/MosqueIcon";
import OfficeIcons from "@/SVGs/OfficeIcons";
import SchoolIcon from "@/SVGs/SchoolIcon";

export const nameValidation = (value, setErrorContactDetails) => {
  let pattern =
    /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z ]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_ ]*$/;
  if (value == "") {
    setErrorContactDetails((errorContactDetails) => ({
      ...errorContactDetails,
      nameErrorMessage: "This field is compulsory",
      nameErrorMessagear: "مطلوب ملء هذا الحقل",
      nameError: true,
    }));
    return true;
  } else if (value.match(pattern)) {
    setErrorContactDetails((errorContactDetails) => ({
      ...errorContactDetails,
      nameErrorMessage: "",
      nameError: false,
      nameErrorMessagear: "",
    }));
    return false;
  } else {
    setErrorContactDetails((errorContactDetails) => ({
      ...errorContactDetails,
      nameErrorMessage: "Only alphabets are allowed",
      nameError: true,
      nameErrorMessagear: "يسمح فقط الحروف الهجائية",
    }));
    return true;
  }
};

export const phoneValidation = (
  value,
  isCompulsory,
  setErrorContactDetails,
  contactDetails
) => {
  let pattern = /^[0-9]+$/;
  let kwpattern = /^[124965]\d+$/;
  if (value === "" && isCompulsory) {
    setErrorContactDetails((errorContactDetails) => ({
      ...errorContactDetails,
      phoneErrorMessage: "This field is compulsory",
      phoneError: true,
      phoneErrorMessagear: "مطلوب ملء هذا الحقل",
    }));
    return true;
  } else if (value && value.length < 8) {
    setErrorContactDetails((errorContactDetails) => ({
      ...errorContactDetails,
      phoneErrorMessage: "Please enter at least 8 characters",
      phoneError: true,
      phoneErrorMessagear: "الرجاء إدخال 8 أرقام",
    }));
    return true;
  } else if (value && !value.match(pattern)) {
    setErrorContactDetails((errorContactDetails) => ({
      ...errorContactDetails,
      phoneErrorMessage: "Only numbers allowed",
      phoneError: true,
      phoneErrorMessagear: "مسموح بالأرقام فقط",
    }));
    return true;
  } else if (
    value &&
    contactDetails?.phoneCode == "KW" &&
    !value.match(kwpattern)
  ) {
    setErrorContactDetails((errorContactDetails) => ({
      ...errorContactDetails,
      phoneErrorMessage: "Enter a valid phone number",
      phoneError: true,
      phoneErrorMessagear: "أدخل رقم هاتف صالح",
    }));
    return true;
  } else {
    setErrorContactDetails((errorContactDetails) => ({
      ...errorContactDetails,
      phoneErrorMessage: "",
      phoneError: false,
      phoneErrorMessagear: "",
    }));
    return false;
  }
};

export const emailValidation = (
  value,
  isCompulsory,
  setErrorContactDetails
) => {
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (value === "" && isCompulsory) {
    setErrorContactDetails((errorContactDetails) => ({
      ...errorContactDetails,
      emailErrorMessage: "This field is compulsory",
      emailError: true,
      emailErrorMessagear: "مطلوب ملء هذا الحقل",
    }));
    return true;
  } else if (value && !pattern.test(value)) {
    setErrorContactDetails((errorContactDetails) => ({
      ...errorContactDetails,
      emailErrorMessage: "Enter a valid email",
      emailError: true,
      emailErrorMessagear: "البريد الالكتروني غير صحيح",
    }));
    return true;
  } else {
    setErrorContactDetails((errorContactDetails) => ({
      ...errorContactDetails,
      emailErrorMessage: "",
      emailError: false,
      emailErrorMessagear: "",
    }));
    return false;
  }
};

export function addCartTag(obj) {
  window.gtag("event", "add_to_cart", obj);
}

export const getAddressType = (addressType, color, height, isPickup) => {
  if (isPickup) {
    return <BoxSvg />;
  }
  switch (addressType) {
    case "1":
      return <HomeIcon color={color} height={height} />;

    case "2":
      return <ApparentIcon color={color} height={height} />;

    case "3":
      return <OfficeIcons color={color} height={height} />;
    case "4":
      return <SchoolIcon color={color} height={height} />;
    case "5":
      return <MosqueIcon color={color} height={height} />;
    case "6":
      return <GovernmentIcon color={color} height={height} />;

    default:
      break;
  }
};

export const varientColor = (varient, vendor_color) => {
  switch (varient) {
    case "dark":
      return "#fff";

    case "outline":
      return "#000";

    default:
      break;
  }
};

export const varientBackgroundColor = (varient, vendor_color) => {
  switch (varient) {
    case "dark":
      return vendor_color;

    default:
      break;
  }
};

export const displayInternationalTime = (deliveryTime, deliveryType) => {
  switch (deliveryType) {
    case "3":
      return deliveryTime === "1"
        ? { eng: "day", arb: "يوم" }
        : { eng: "days", arb: "أيام" };
    case "4":
      return deliveryTime === "1"
        ? { eng: "week", arb: "أسبوع" }
        : { eng: "weeks", arb: "أسابيع" };
    case "5":
      return deliveryTime === "1"
        ? { eng: "month", arb: "شهر" }
        : { eng: "month", arb: "شهور" };
    default:
      break;
  }
};

export const betweenTwoDevice = (small, large) => {
  return window.innerWidth > small && window.innerWidth < large;
};
