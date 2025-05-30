"use client";
import { addToCartApi, updateCartQauntity } from "@/apis";
import ProductRegistrationModal from "@/components/ProductRegistrationModal/ProductRegistrationModal";
import QuantityError from "@/components/QuantityError/quantityError";
import HeadLine from "@/components/assetBoxDesign/Headline/headLine";
import MultipleItems from "@/components/assetBoxDesign/MultipleItems/multipleItems";
import NormalText from "@/components/assetBoxDesign/NormalText/normalText";
import OptionBox from "@/components/assetBoxDesign/OptionBox/optionBox";
import SmallButtonRounded from "@/components/assetBoxDesign/SmallButtonRounded/smallButtonRounded";
import TextInputField from "@/components/assetBoxDesign/TextField/textInputField";
import Spinner from "@/components/common/Spinner/spinner";
import { addCartTag } from "@/constants/function";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import ReactPixel from "react-facebook-pixel";
import SnapPixel from "react-snapchat-pixel";
import TiktokPixel from "tiktok-pixel";
import "./productDetails.css";
import AddToCartIcon from "@/SVGs/AddToCartIcon";
import AddToBagIcon from "@/SVGs/AddToBagIcon";
import SquareOptionBox from "@/components/assetBoxDesign/SquareOptionBox/squareOptionBox";
import NumberCounter from "@/components/Animations/numberCounter";

const ProductDetails = ({
  product,
  addon,
  productvariation,
  productvariationPrice,
  addedVariaton,
  setAddedVariation,
}) => {
  const {
    language,
    homePageDetails,
    cart,
    handleCartChange,
    vendorSlug,
    areaDetails,
    handleOpenAreaChange,
    internationalDelivery,
  } = useContext(AppContext);
  const [showRegister, setShowRegister] = useState(false);
  const [note, setNote] = useState("");
  const [price, setPrice] = useState("");
  const [addedAddons, setAddedAddons] = useState([]);
  const [prodNumber, setProdNumber] = useState(1);
  const [addonsPrice, setAddonsPrice] = useState(0);
  const [variationPrice, setVariationPrice] = useState(0);
  const [variation, setVariation] = useState(
    Object.keys(productvariation)?.map((key) => productvariation[key])
  );
  const [addons, setAddons] = useState(addon);
  const [variationChecked, setVariationChecked] = useState({});
  const [checked, setChecked] = useState({});
  const onNoteChange = (e) => setNote(e.target.value);
  const [isRequired, setIsRequired] = useState([]);
  const [variationRequired, setVariationRequired] = useState([]);
  const router = useRouter();
  const [spinLoader, setSpinLoader] = useState(false);
  const [showQuantity, setShowQuantity] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    en: "",
    ar: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const checkSize = () => {
    return window != undefined && window?.innerWidth > 990;
  };

  useEffect(() => {
    if (showQuantity) {
      setTimeout(() => {
        setShowQuantity(false);
      }, 5000);
    }
  }, [showQuantity]);

  useEffect(() => {
    setPrice(
      product?.base_price != "" ? parseFloat(product?.price_after_discount) : 0
    );
  }, [product]);

  useEffect(() => {
    if (addons?.length == 0) {
      let temp;
      let test;
      temp = variation?.map((l) => {
        return l.map((k) => {
          return {
            value: k.variation_detail_id,
            isChecked: false,
            quantity: 0,
            disabled: k.status,
            english_name: k.value,
            arabic_name: k.value_ar,
          };
        });
      });
      test = variation?.map((l) => false);
      setVariationRequired((t) => test);
      setVariationChecked((k) => temp);
    }
  }, []);

  useEffect(() => {
    let temp;
    let test;
    temp = addons.map((l) => {
      return l.child.map((k) => {
        return {
          value: k.child_id,
          isChecked: false,
          quantity: 0,
          disabled: k.disabled,
          label: k.label,
          label_ar: k.label_ar,
          english_name: k.english_name,
          arabic_name: k.arabic_name,
          price: parseFloat(k.item_price == "" ? 0 : k.item_price),
        };
      });
    });
    test = addons.map((l) => !l.is_required == 1);
    setIsRequired((t) => test);
    setChecked((g) => temp);
  }, []);

  const notify = (message, message_ar, language) =>
    enqueueSnackbar({
      variant: "success",
      message: language == "ltr" ? message : message_ar,
    });

  const onMinus = () => {
    if (prodNumber === 1) {
    } else {
      setProdNumber(prodNumber - 1);
    }
  };

  const onPlus = () => {
    let inCart = 0;
    let temp = [];
    if (cart?.cartItems) {
      temp = cart?.cartItems?.filter(
        (k, i) =>
          product?.id == k?.product_id &&
          areEqual(k?.add_on_ids, addedAddons) &&
          areEqual(k?.variation_id, addedVariaton)
      );
      if (temp.length == 0) {
        inCart = 0;
      } else {
        let n = 0;
        temp?.forEach((k, i) => {
          n = n + parseInt(k?.quantity);
        });
        inCart = n;
      }
    } else {
      inCart = 0;
    }

    // no variartion
    if (
      (inCart + prodNumber + 1 <= Number(product?.quantity) ||
        product?.quantity == null) &&
      !Object.keys(productvariation).length
    ) {
      setProdNumber(prodNumber + 1);
    } else if (
      Object.keys(productvariation).length > 0 &&
      variationRequired?.every((l) => l == true) &&
      isRequired?.every((l) => l == true) &&
      (inCart + prodNumber + 1 <=
        productvariationPrice?.[getKey(addedVariaton)]?.quantity ||
        productvariationPrice?.[getKey(addedVariaton)]?.quantity == null)
    ) {
      setProdNumber(prodNumber + 1);
    } else {
      if (
        Object.keys(productvariation).length > 0 &&
        variationRequired?.every((l) => l == false)
      ) {
        setErrorMsg({
          en: "Select Required Addons",
          ar: "حدد الإضافات المطلوبة",
        });
      } else {
        setErrorMsg({
          en: "You’re Adding the last piece of this item.",
          ar: "هذه آخر قطعة بإمكانك إضافتها في سلة التسوق.",
        });
      }
      setShowQuantity(true);
    }
  };

  const onShareClick = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator
        .share({
          url: window.location.href,
        })
        .then(() => {
          console.log("Sharing successfull");
        })
        .catch(() => {
          console.log("Sharing failed");
        });
    }
  };

  const onSelectChecked = (value, price, max, key) => {
    if (value) {
      let temps = checked;
      let test = isRequired;
      let add = addedAddons;
      let addonsp = addonsPrice;
      temps[key].forEach((fruite) => {
        if (fruite.value == value) {
          if (fruite.isChecked == true) {
            if (addons?.[key]?.is_required == 1) {
              test[key] = false;
            }
            fruite.isChecked = !fruite.isChecked;
            add = add?.filter((k) => k != fruite?.value);
            addonsp = parseFloat(addonsp) - fruite.price * fruite.quantity;
          } else {
            test[key] = true;
            fruite.isChecked = !fruite.isChecked;
            fruite.quantity = 1;
            add = [...add, fruite?.value];
            addonsp = parseFloat(addonsp) + fruite.price * fruite.quantity;
          }
        } else {
          if (fruite.isChecked == true) {
            fruite.isChecked = false;
            add = add?.filter((k) => k != fruite?.value);
            addonsp = parseFloat(addonsp) - fruite.price * fruite.quantity;
          }
        }
      });
      setIsRequired((b) => test);
      setAddedAddons((m) => add);
      setAddonsPrice((n) => addonsp);
      setChecked((ch) => ({ ...temps }));
    }
  };

  const onVariationChecked = (value, key) => {
    if (value) {
      let temps = variationChecked;
      let test = variationRequired;
      let add = addedVariaton;
      let addonsp = variationPrice;
      if (productvariationPrice?.[getKey(add)]?.quantity > 0) {
        addonsp =
          parseFloat(addonsp) -
          parseFloat(productvariationPrice?.[getKey(add)]?.price);
      }
      temps[key].forEach((fruite) => {
        if (fruite.value == value) {
          if (fruite.isChecked == true) {
            test[key] = false;
            fruite.isChecked = !fruite.isChecked;
            add = add
              ?.filter((k) => k != parseInt(fruite?.value))
              ?.sort((a, b) => a - b);
          } else {
            test[key] = true;
            fruite.isChecked = !fruite.isChecked;
            fruite.quantity = 1;
            add = [...add, parseInt(fruite?.value)]?.sort((a, b) => a - b);
          }
        } else {
          if (fruite.isChecked == true) {
            fruite.isChecked = false;
            add = add?.filter((k) => k != fruite?.value)?.sort((a, b) => a - b);
            // addonsp = parseFloat(addonsp) - fruite.price * fruite.quantity;
          }
        }
      });
      if (productvariationPrice?.[getKey(add)]?.quantity > 0) {
        addonsp =
          parseFloat(addonsp) +
          parseFloat(productvariationPrice?.[getKey(add)]?.price);
      }
      setVariationRequired((b) => test);
      setAddedVariation((m) => add);
      setVariationPrice((n) => addonsp);
      setVariationChecked((ch) => ({ ...temps }));
      setProdNumber(1);
    }
  };

  const getKey = (addedVariaton) => {
    if (Object.keys(productvariation).length === addedVariaton.length) {
      const arraySet = new Set(addedVariaton);
      let finalKey = "";
      for (const key in productvariationPrice) {
        const keyArray = key.split(",").map(Number);
        const keySet = new Set(keyArray);
        if ([...arraySet].every((element) => keySet.has(element))) {
          finalKey = key;
          break;
        }
      }
      return finalKey;
    }
  };

  const onChecked = (event, price, max, key) => {
    let temps = checked;
    let test = isRequired;
    let count = temps[key]
      .filter((n, b) => n.isChecked)
      .reduce((l, i) => l + i.quantity, 1);
    temps[key].forEach((fruite) => {
      if (fruite.value === event.target.value) {
        if (!fruite.isChecked) {
          if (max >= count) {
            test[key] = true;
            fruite.isChecked = !fruite.isChecked;
            fruite.quantity = 1;
            setIsRequired((t) => test);
            setAddedAddons((add) => [...addedAddons, fruite?.value]);
            setAddonsPrice(
              (adda) => parseFloat(addonsPrice) + price * fruite.quantity
            );
          }
        } else {
          if (count == 2 && addons?.[key]?.is_required == 1) {
            test[key] = false;
            setIsRequired((t) => test);
          }
          fruite.isChecked = !fruite.isChecked;
          setAddedAddons((add) =>
            addedAddons?.filter((k) => k != fruite?.value)
          );
          setAddonsPrice(parseFloat(addonsPrice) - price * fruite.quantity);
        }
      }
    });
    setChecked((ch) => ({ ...temps }));
  };

  const onClearAll = (key) => {
    let temps = checked;
    let test = isRequired;
    temps[key].forEach((fruite, i) => {
      if (fruite.isChecked) {
        setAddonsPrice(
          (addonsPrice) =>
            parseFloat(addonsPrice) - fruite?.price * fruite.quantity
        );
      }
      fruite.isChecked = false;
    });
    test[key] = false;
    setIsRequired((t) => test);
    setChecked({ ...temps });
  };

  const areEqual = (first, second) => {
    if (first.length !== second.length) {
      return false;
    }
    for (let i = 0; i < first.length; i++) {
      if (second.every((v) => v != first[i])) {
        return false;
      }
    }
    return true;
  };

  const onAddCartClick = async () => {
    let inCart = 0;
    let temp = [];
    if (cart?.cartItems) {
      temp = cart?.cartItems?.filter(
        (k, i) =>
          product?.id == k?.product_id &&
          areEqual(k?.add_on_ids, addedAddons) &&
          areEqual(k?.variation_id, addedVariaton)
      );
      if (temp.length == 0) {
        inCart = 0;
      } else {
        let n = 0;
        temp?.forEach((k, i) => {
          n = n + parseInt(k?.quantity);
        });
        inCart = n;
      }
    } else {
      inCart = 0;
    }
    if (temp.length == 0) {
      setSpinLoader(true);
      const response = await addToCartApi({
        vendorSlug: vendorSlug?.data?.ecom_url_slug,
        vendors_id: homePageDetails?.vendor_data?.vendors_id,
        area_id: areaDetails?.area_id,
        itemId: product?.id,
        user_string: localStorage.getItem("userID"),
        quantity: inCart + prodNumber,
        add_on_ids: addedAddons,
        variation_ids: addedVariaton,
        product_notes: note,
      });
      if (response?.status) {
        if (response?.status == false) {
          notify(response?.message, response?.message_ar, language);
        }
        localStorage.setItem("cartTime", new Date());
        if (homePageDetails?.vendor_data?.fb_pixel_code != "") {
          ReactPixel.track("AddToCart", {
            content_name: product?.name,
            content_category: product?.category_name,
            content_ids: [product?.id],
            content_type: "product",
            value: product?.product_price,
            currency: "KWD",
          });
          const time = Date.now();
          const sec = Math.round(time / 1000);
          //static for mijana

          if (vendorSlug == "mijana-restaurant-and-café") {
            triggerAddToCart({
              fb_pixel_code: homePageDetails?.vendor_data?.fb_pixel_code,
              fb_access_token:
                "EAAGZA8GMZAs1IBAC9mDImnZCTAdafRzN769x6ZCIRMExueSZBZBfnDkIzGrsP4gZBMZCCwXaSvKNggZBEKdEk3582JWiwecrnZAEHFzfCaYKSNRbltxMm2cSvUrgZBUDpVNZCQAOVWUuzO4m7nbvQn1Wqb94IBbVSexSbwWzAf6TYV80HQF1ZAZAzGcXKB",
              support_mail: homePageDetails?.vendor_data?.support_mail,
              item: product,
            });
          }
          if (vendorSlug == "butters") {
            triggerAddToCart({
              fb_pixel_code: "546180060531909",
              fb_access_token:
                "EAAVDp1efPkMBOZBE2DPWrA7he9iJFn9EZBUpd4k3cRjpApcbNMLJgbdmelpI1uApMyxEYoorwBD5ZBDGPL5NWMxXGrKpoAHHxG9NtBMrppMm8YHLRmFgiYVL37nu7PUaO3WPfz4U4K75jIH7eErUZCSRAeJJyQpc88THHEBQGMozZBM9894dBoOe06gklfRtqZCgZDZD",
              support_mail: homePageDetails?.vendor_data?.support_mail,
            });
          }

          // dynamic for all vendors
          if (
            homePageDetails?.vendor_data?.fb_access_token &&
            homePageDetails?.vendor_data?.fb_access_token != ""
          ) {
            triggerAddToCart({
              fb_pixel_code: homePageDetails?.vendor_data?.fb_pixel_code,
              fb_access_token: homePageDetails?.vendor_data?.fb_access_token,
              support_mail: homePageDetails?.vendor_data?.support_mail,
              item: product,
            });
          }
        }

        if (homePageDetails?.vendor_data?.snap_pixel_code != "")
          SnapPixel.track("ADD_CART", {
            content_name: product?.name,
            item_category: product?.category_name,
            item_ids: [product?.id],
            content_type: "product",
            price: product?.product_price,
            currency: "KWD",
          });

        if (homePageDetails?.vendor_data?.vendors_id === "132") {
          TiktokPixel.track("AddToCart", {
            content_type: "product",
            quantity: prodNumber,
            content_name: product?.name,
            content_id: product?.id,
            currency: "KWD",
            value: product?.product_price,
          });
        }

        if (
          homePageDetails?.vendor_data?.google_tag_code != "" &&
          !/^GTM/.test(homePageDetails?.vendor_data?.google_tag_code)
        )
          addCartTag({
            item_id: product?.id,
            item_name: product?.name,
            currency: "KWD",
            discount: product?.discount_value,
            item_category: product?.category_name,
            price: product?.product_price,
            quantity: prodNumber,
          });
        setSpinLoader(false);
        handleCartChange(response?.data);
        router.push(`/`);
        if (
          (areaDetails?.type != "delivery" || areaDetails?.area == "") &&
          (areaDetails?.type != "pickup" || areaDetails?.branch == "") &&
          homePageDetails?.vendor_data?.home_page_type != "18" &&
          (internationalDelivery.delivery_country_code.toLowerCase() === "kw" ||
            homePageDetails?.vendor_data?.international_delivery === "3" ||
            homePageDetails?.vendor_data?.international_delivery === "")
        ) {
          // handleOpenAreaChange((prev) => ({ open: true, route: "/" }));
        } else {
          router.back();
        }
      }
    } else {
      if (Number(inCart + prodNumber) <= Number(product.quantity)) {
        setSpinLoader(true);
        const response = await updateCartQauntity({
          vendorSlug: vendorSlug?.data?.ecom_url_slug,
          vendors_id: homePageDetails?.vendor_data?.vendors_id,
          area_id: areaDetails?.area_id,
          user_string: localStorage.getItem("userID"),
          quantity: inCart + prodNumber,
          branch_id: 87,
          item_id: temp[0]?.item_id,
        });
        if (response?.status) {
          localStorage.setItem("cartTime", new Date());
          if (response.status == false) {
            notify(response.message, response.message_ar, language);
          }

          if (homePageDetails?.vendor_data?.fb_pixel_code != "") {
            ReactPixel.track("AddToCart", {
              content_name: product?.name,
              content_category: product?.category_name,
              content_ids: [product?.id],
              content_type: "product",
              value: product?.product_price,
              currency: "KWD",
            });
            if (vendorSlug == "mijana-restaurant-and-café") {
              triggerAddToCart({
                fb_pixel_code: homePageDetails?.vendor_data?.fb_pixel_code,
                fb_access_token:
                  "EAAGZA8GMZAs1IBAC9mDImnZCTAdafRzN769x6ZCIRMExueSZBZBfnDkIzGrsP4gZBMZCCwXaSvKNggZBEKdEk3582JWiwecrnZAEHFzfCaYKSNRbltxMm2cSvUrgZBUDpVNZCQAOVWUuzO4m7nbvQn1Wqb94IBbVSexSbwWzAf6TYV80HQF1ZAZAzGcXKB",
                support_mail: homePageDetails?.vendor_data?.support_mail,
                item: product,
              });
            }
            if (vendorSlug == "butters") {
              triggerAddToCart({
                fb_pixel_code: "546180060531909",
                fb_access_token:
                  "EAAVDp1efPkMBOZBE2DPWrA7he9iJFn9EZBUpd4k3cRjpApcbNMLJgbdmelpI1uApMyxEYoorwBD5ZBDGPL5NWMxXGrKpoAHHxG9NtBMrppMm8YHLRmFgiYVL37nu7PUaO3WPfz4U4K75jIH7eErUZCSRAeJJyQpc88THHEBQGMozZBM9894dBoOe06gklfRtqZCgZDZD",
                support_mail: homePageDetails?.vendor_data?.support_mail,
              });
            }

            // dynamic for all vendors
            if (
              homePageDetails?.vendor_data?.fb_access_token &&
              homePageDetails?.vendor_data?.fb_access_token != ""
            ) {
              triggerAddToCart({
                fb_pixel_code: homePageDetails?.vendor_data?.fb_pixel_code,
                fb_access_token: homePageDetails?.vendor_data?.fb_access_token,
                support_mail: homePageDetails?.vendor_data?.support_mail,
                item: product,
              });
            }
          }

          if (homePageDetails?.vendor_data?.snap_pixel_code != "")
            SnapPixel.track("ADD_CART", {
              content_name: product?.name,
              item_category: product?.category_name,
              item_ids: [product?.id],
              content_type: "product",
              price: product?.product_price,
              currency: "KWD",
            });

          if (homePageDetails?.vendor_data?.vendors_id === "132") {
            TiktokPixel.track("AddToCart", {
              content_type: "product",
              quantity: prodNumber,
              content_name: product?.name,
              content_id: product?.id,
              currency: "KWD",
              value: product?.product_price,
            });
          }

          if (
            homePageDetails?.vendor_data?.google_tag_code != "" &&
            !/^GTM/.test(homePageDetails?.vendor_data?.google_tag_code)
          )
            addCartTag({
              item_id: product?.id,
              item_name: product?.name,
              currency: "KWD",
              discount: product?.discount_value,
              item_category: product?.category_name,
              price: product?.product_price,
              quantity: prodNumber,
            });
          setSpinLoader(false);
          handleCartChange(response?.data);
          router.push(`/`);
          if (
            (areaDetails?.type != "delivery" || areaDetails?.area == "") &&
            (areaDetails?.type != "pickup" || areaDetails?.branch == "") &&
            homePageDetails?.vendor_data?.home_page_type != "18" &&
            (homePageDetails?.vendor_data?.international_delivery === "3" ||
              homePageDetails?.vendor_data?.international_delivery === "" ||
              internationalDelivery.country_name.toLowerCase() === "kuwait")
          ) {
            // handleOpenAreaChange((prev) => ({ open: true, route: "/" }));
            // history.push(`/area`, {
            //   from: "prdetails",
            // });
          } else {
            router.back();
          }
        }
      } else {
        setShowQuantity(true);
      }
    }
  };

  const checkApplication = (e) => {
    if (
      product?.quantity &&
      product?.product_status != 0 &&
      isRequired?.every((l) => l == true) &&
      variationRequired?.every((l) => l == true) &&
      (product?.variation_id == "" ||
        productvariationPrice?.[addedVariaton.toString()]?.quantity > 0)
    ) {
      e.preventDefault();
      onAddCartClick();
    } else {
      e.preventDefault();
    }
  };

  const checkIsDisabled = (activeID, key) => {
    let response = true;

    if (
      (addedVariaton == 0 && addedVariaton.length !== variation.length) ||
      typeof variationChecked != "object"
    ) {
      response = false;
    }
    const selectedPosition = [];
    Object.keys(variationChecked).map((ele) => {
      const value = variationChecked[ele].filter((arr) => arr.isChecked);
      if (value.length > 0) {
        selectedPosition.push(ele);
      }
    });
    if (
      selectedPosition.includes(String(key)) &&
      addedVariaton.length !== variation.length
    ) {
      response = false;
    }
    Object.keys(productvariationPrice).map((ele) => {
      const splitKey = ele.split(",");
      const isValue = addedVariaton.filter((ven) =>
        splitKey.includes(String(ven))
      );
      if (isValue.length && splitKey.includes(String(activeID))) {
        response = false;
      }
    });
    if (variation.length === 1) {
      response = false;
    }
    return response;
  };

  const renderLabelEmoji = (type) => {
    switch (type) {
      case "1":
        return <>❤️</>;

      case "2":
        return <>⭐</>;
    }
  };

  return (
    <Box style={{ height: "100%" }}>
      <div
        style={
          showRegister
            ? { height: "10vh", overflow: "hidden" }
            : {
                display: "flex",
                flexWrap: "wrap",
                alignContent: "space-between",
                gap: "50px",
                height: "100%",
              }
        }
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <HeadLine
            enText={product?.name}
            arText={product?.name_ar}
            fontSize="24px"
          />
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div>{renderLabelEmoji("1")}</div>
            <NormalText
              enText={/* product?.label */ "Most Ordered"}
              arText={product?.label_ar}
              color={"#333333"}
              fontSize={"13px"}
            />
          </div>
          {product?.base_price != "" && product?.prodyct_type != 3 ? (
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "end",
                justifyContent: "end",
                fontSize: "18px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              {product &&
                parseFloat(product?.price_after_discount.split(",").join("")) !=
                  parseFloat(product?.base_price) &&
                product?.base_price != "" && (
                  <>
                    <del>
                      <span>{parseFloat(product.base_price).toFixed(3)} </span>{" "}
                      {language === "rtl" ? "د.ك" : "KD"}
                    </del>
                    <br></br>
                  </>
                )}
              <span>
                {product ? (
                  <>
                    {language === "rtl" ? "د.ك" : "KD"}{" "}
                    <span>{product.price_after_discount}</span>
                  </>
                ) : null}{" "}
              </span>
            </Box>
          ) : null}
          {product?.offer_applied == 1 ? (
            <NormalText
              enText={product?.offer_msg}
              arText={product?.offer_msg_ar}
              color={product?.offer_color}
            />
          ) : null}
          {/* <SubHeadline
            enText={product.category_name}
            arText={product?.category_name_ar}
          /> */}

          {(product?.variation_id != "" &&
            productvariationPrice?.[addedVariaton.toString()]?.sku) ||
          (product?.sku != "" && product?.sku) ? (
            <NormalText
              enText={`SKU
              ${
                product?.variation_id != ""
                  ? productvariationPrice?.[addedVariaton.toString()]?.sku
                    ? productvariationPrice?.[addedVariaton.toString()]?.sku
                    : product?.sku
                  : product?.sku
              }`}
              arText={`SKU
                ${
                  product?.variation_id != ""
                    ? productvariationPrice?.[addedVariaton.toString()]?.sku
                      ? productvariationPrice?.[addedVariaton.toString()]?.sku
                      : product?.sku
                    : product?.sku
                }`}
            />
          ) : null}

          {product?.short_description ? (
            <p
              dangerouslySetInnerHTML={{
                __html:
                  language == "ltr"
                    ? product?.short_description
                    : product?.short_description_ar,
              }}
              style={{
                fontWeight: "300",
                fontSize: "15px",
                // color: "rgba(141, 141, 141, 1)",
                // color: "rgb(141, 141, 141)",
                color: "#333333",
              }}
            ></p>
          ) : null}
          {product?.is_addons != 1 &&
            product?.prodyct_type != 3 &&
            product?.variation_id != "" &&
            variation.map((variant, variantIndex) => (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                key={variantIndex}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "end",
                    gap: "20px",
                  }}
                >
                  <Box sx={{ fontSize: "16px", fontWeight: 500 }}>
                    {language == "ltr" ? variant[0]?.name : variant[0]?.name_ar}
                  </Box>
                </Box>
                <Box
                  sx={
                    variationChecked[variantIndex]?.length <= 2
                      ? {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }
                      : {
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }
                  }
                >
                  {variationChecked[variantIndex]?.map(
                    (variantOption, variantOptionIndex) =>
                      variationChecked[variantIndex]?.length <= 2 ? (
                        <SquareOptionBox
                          key={variantOptionIndex}
                          enText={variantOption?.english_name}
                          arText={variantOption?.arabic_name}
                          selected={
                            variationChecked[variantIndex][variantOptionIndex]
                              .isChecked
                          }
                          amount={
                            productvariationPrice?.[
                              variantOption.value.toString()
                            ]?.price
                          }
                          disabled={checkIsDisabled(
                            variationChecked[variantIndex][variantOptionIndex]
                              .value,
                            variantIndex
                          )}
                          handleClick={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopPropagation();
                            onVariationChecked(
                              variantOption?.value,
                              variantIndex
                            );
                          }}
                        />
                      ) : (
                        <OptionBox
                          key={variantOptionIndex}
                          enText={variantOption?.english_name}
                          arText={variantOption?.arabic_name}
                          disabled={checkIsDisabled(
                            variationChecked[variantIndex][variantOptionIndex]
                              .value,
                            variantIndex
                          )}
                          amount={
                            productvariationPrice?.[
                              variantOption.value.toString()
                            ]?.price
                          }
                          selected={
                            variationChecked[variantIndex][variantOptionIndex]
                              .isChecked
                          }
                          handleClick={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopPropagation();
                            onVariationChecked(
                              variantOption?.value,
                              variantIndex
                            );
                          }}
                        />
                      )
                  )}
                </Box>
              </Box>
            ))}
          {product?.is_addons == 1 &&
            product?.prodyct_type != 3 &&
            addons.map((addon, addonIndex) => (
              <div className="details-container pt-2" key={addonIndex}>
                <Box
                  key={addonIndex}
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "end",
                    }}
                  >
                    <Box sx={{ fontSize: "16px", fontWeight: 500 }}>
                      {language == "ltr"
                        ? addon?.english_name
                        : addon?.arabic_name}
                      <span
                        className="max-tab"
                        style={{
                          margin: "0",
                          marginLeft: language == "ltr" ? "10px" : "0",
                          marginRight: language == "ltr" ? "0" : "10px",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {language == "ltr" ? "Max" : "الحد الأقصى"}
                        <span>&nbsp;{addon.max_selection}</span>
                      </span>
                    </Box>
                    <Box>
                      {product?.quantity &&
                        product?.product_status != 0 &&
                        addon?.is_required == 1 && (
                          <NormalText enText={"Required"} arText={"مطلوب"} />
                        )}
                      {checked[addonIndex]?.some(
                        (check, k) => check.isChecked
                      ) && (
                        <div
                          className="max-tab"
                          style={{
                            margin: "0",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          onClick={() => onClearAll(addonIndex)}
                        >
                          {language == "ltr" ? "Clear All" : "مسح الإختيار"}
                        </div>
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={
                      checked[addonIndex]?.length <= 2
                        ? {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            gap: "20px",
                            width: "100%",
                          }
                        : {
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }
                    }
                  >
                    {checked[addonIndex]?.map(
                      (addonsOption, addonsOptionIndex) =>
                        checked[addonIndex]?.length <= 2 ? (
                          <SquareOptionBox
                            key={addonsOptionIndex}
                            enText={addonsOption?.english_name}
                            arText={addonsOption?.arabic_name}
                            selected={
                              checked[addonIndex][addonsOptionIndex].isChecked
                            }
                            amount={addonsOption.price}
                            disabled={
                              addonsOption.disabled == 1 ||
                              addonsOption.label != ""
                            }
                            handleClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopPropagation();
                              if (
                                addonsOption?.disabled == 0 &&
                                addonsOption.label == ""
                              ) {
                                if (addon?.max_selection != 1)
                                  onChecked(
                                    addonsOption?.value,
                                    addonsOption.price,
                                    addon.max_selection,
                                    addonIndex
                                  );
                                else
                                  onSelectChecked(
                                    addonsOption?.value,
                                    addonsOption.price,
                                    addon.max_selection,
                                    addonIndex
                                  );
                              }
                            }}
                          />
                        ) : (
                          <OptionBox
                            key={addonsOptionIndex}
                            enText={addonsOption?.english_name}
                            arText={addonsOption?.arabic_name}
                            selected={
                              checked[addonIndex][addonsOptionIndex].isChecked
                            }
                            amount={addonsOption.price}
                            disabled={
                              addonsOption.disabled == 1 ||
                              addonsOption.label != ""
                            }
                            handleClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopPropagation();
                              if (
                                addonsOption?.disabled == 0 &&
                                addonsOption.label == ""
                              ) {
                                if (addon?.max_selection != 1)
                                  onChecked(
                                    addonsOption?.value,
                                    addonsOption.price,
                                    addon.max_selection,
                                    addonIndex
                                  );
                                else
                                  onSelectChecked(
                                    addonsOption?.value,
                                    addonsOption.price,
                                    addon.max_selection,
                                    addonIndex
                                  );
                              }
                            }}
                          />
                        )
                    )}
                  </Box>
                </Box>
              </div>
            ))}
          {product?.prodyct_type != 3 ? (
            <TextInputField
              label={"Add a note (Optional)"}
              arLabel={"أضف ملاحظة (اختياري)"}
              handleChange={(e) => onNoteChange(e)}
              value={note}
              color="rgb(141, 141, 141)"
              fontWeight="300"
            />
          ) : null}
          {/* {product?.prodyct_type != 3 ? (
            <div className="details-container pt-2">
              <div className="product-outer-div">
                <div
                  className="product-inner-div item-count-div"
                  style={{ paddingBottom: showQuantity ? "16px" : "20%" }}
                >
                  {product?.quantity &&
                  product?.product_status != 0 &&
                  isRequired?.every((l) => l == true) ? (
                    <MultipleItems
                      count={prodNumber}
                      removeClick={onMinus}
                      addClick={onPlus}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ) : null} */}
          {showQuantity ? <QuantityError errorMsg={errorMsg} /> : null}
          {showRegister ? (
            <ProductRegistrationModal
              showRegister={showRegister}
              handleClose={() => setShowRegister(false)}
              product={product}
              addon={addon}
              addedAddons={addedAddons}
              addedVariaton={addedVariaton}
              productvariation={productvariation}
              prodNumber={prodNumber}
              note={note}
            />
          ) : null}
        </Box>
        <Box sx={{ width: "100%" }}>
          {product?.prodyct_type != 3 ? (
            product?.prodyct_type == 2 ? (
              !showRegister ? (
                <div
                  className={`bottom-button ${
                    homePageDetails?.vendor_data?.home_page_type == "18"
                      ? "bottom-button-full"
                      : "bottom-button-half"
                  }`}
                  style={{ width: "100%" }}
                >
                  <Link
                    href={``}
                    className={`text-center checkout-button ${
                      homePageDetails?.vendor_data?.home_page_type == "18"
                        ? "fashion-checkout-page"
                        : ""
                    }`}
                    onClick={(e) => {
                      if (
                        product?.quantity &&
                        product?.product_status != 0 &&
                        isRequired?.every((l) => l == true) &&
                        variationRequired?.every((l) => l == true)
                      ) {
                        e.preventDefault();
                        areaDetails?.branchForArea?.id
                          ? setShowRegister(true)
                          : handleOpenAreaChange((prev) => ({
                              open: true,
                              route: "/",
                            }));
                        // : history.push(`/area`, {
                        //     from: "prdetails",
                        //   });
                      } else {
                        e.preventDefault();
                      }
                    }}
                  >
                    {product?.quantity &&
                    product?.product_status != 0 &&
                    isRequired?.every((l) => l == true) &&
                    variationRequired?.every((l) => l == true)
                      ? language === "ltr"
                        ? "Register"
                        : "يسجل"
                      : product?.product_status != 0
                      ? language === "ltr"
                        ? "Select Required Addons"
                        : "حدد الإضافات المطلوبة"
                      : language === "ltr"
                      ? "Product Not Available"
                      : "المنتج غير متوفر"}
                  </Link>
                </div>
              ) : null
            ) : (
              <div
                style={{
                  // position: "fixed",
                  // bottom: 0,
                  // left: 0,
                  // right: 0,
                  // backgroundColor: "#fff",
                  borderTop: "1px solid #ced4da",
                  padding: "20px 0",
                  margin: checkSize() ? "0 -40px" : "0 -20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                    gap: "10px",
                    margin: checkSize() ? "0 40px" : "0 20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      gap: "3px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      {language === "rtl" ? "د.ك" : "KD"}{" "}
                      <span>
                        {parseFloat(
                          (price + addonsPrice + variationPrice) * prodNumber
                        )?.toFixed(3)}
                      </span>
                    </div>
                    <div>
                      {product?.prodyct_type != 3 ? (
                        // <div className="details-container pt-2">
                        //   <div className="product-outer-div">
                        //     <div className="product-inner-div item-count-div">
                        <div>
                          {product?.quantity &&
                          product?.product_status != 0 &&
                          isRequired?.every((l) => l == true) ? (
                            // <MultipleItems
                            //   count={prodNumber}
                            //   removeClick={onMinus}
                            //   addClick={onPlus}
                            // />
                            <NumberCounter
                              count={prodNumber}
                              removeClick={onMinus}
                              addClick={onPlus}
                            />
                          ) : null}
                        </div>
                      ) : //     </div>
                      //   </div>
                      // </div>
                      null}
                    </div>
                  </div>
                  <div
                    // className={`text-center checkout-button ${
                    //   homePageDetails?.vendor_data?.home_page_type == "18"
                    //     ? "fashion-checkout-page"
                    //     : ""
                    // }`}
                    style={{
                      padding: "15px 25px",
                      backgroundColor:
                        homePageDetails?.vendor_data?.vendor_color,
                      color: "#fff",
                      borderRadius: "50px",
                      fontSize: language === "ltr" ? "17px" : "19px",
                    }}
                    onClick={(e) => checkApplication(e)}
                  >
                    {product?.quantity && product?.product_status != 0 ? (
                      isRequired?.every((l) => l == true) &&
                      variationRequired?.every((l) => l == true) ? (
                        productvariation?.length == 0 ||
                        (productvariationPrice?.[getKey(addedVariaton)] &&
                          (productvariationPrice?.[getKey(addedVariaton)]
                            ?.quantity > 0 ||
                            productvariationPrice?.[getKey(addedVariaton)]
                              ?.quantity == null)) ? (
                          spinLoader ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <Spinner height="16px" size="2.5px" />
                              <div>
                                {`${
                                  language === "ltr" ? "Processing" : "يعالج"
                                }`}
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "7px",
                                cursor: "pointer",
                              }}
                            >
                              <AddToBagIcon />
                              <div>
                                {`${
                                  language === "ltr"
                                    ? "Add to bag"
                                    : "أضف إلى الحقيبة"
                                }`}
                              </div>
                              {/* <span className="span-s">
                              &nbsp;&nbsp;
                              {parseFloat(
                                (price + addonsPrice + variationPrice) *
                                  prodNumber
                              )?.toFixed(3)}
                              &nbsp;
                            </span>
                            {`
              ${language === "rtl" ? "د.ك" : "KD"}`} */}
                            </div>
                          )
                        ) : (
                          `${
                            language === "ltr"
                              ? "Variation Out of Stock"
                              : "إنتهت الكمية المعروضة"
                          }`
                        )
                      ) : (
                        `${
                          language === "ltr"
                            ? "Select Required Addons"
                            : "حدد الإضافات المطلوبة"
                        }`
                      )
                    ) : (
                      `${
                        language === "ltr"
                          ? product?.status_label
                          : product?.status_label_ar
                      }`
                    )}
                  </div>
                </div>
              </div>
            )
          ) : null}
        </Box>
      </div>
    </Box>
  );
};

export default ProductDetails;
