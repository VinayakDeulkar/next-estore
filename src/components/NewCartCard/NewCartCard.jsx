import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ReactPixel from "react-facebook-pixel";
import SnapPixel from "react-snapchat-pixel";
import TiktokPixel from "tiktok-pixel";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { addCartTag } from "@/constants/function";
import { updateDeliveryCharges } from "@/apis";
import { useSnackbar } from "notistack";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";
import Spinner from "../common/Spinner/spinner";
import Title from "../common/Title/Title";

const NewCartCard = ({ product, successPromocode, deliveryCharge }) => {
  const {
    language,
    handleCartChange,
    areaDetails,
    vendorSlug,
    homePageDetails,
  } = useContext(AppContext);
  const [showQuantityError, setShowQuantityError] = useState(false);
  const router = useRouter();
  const [spinLoader, setSpinLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const notify = (message, message_ar, language) =>
    enqueueSnackbar({
      variant: "success",
      message: language == "ltr" ? message : message_ar,
    });

  const onMinusQuantityClick = (e) => {
    e.stopPropagation();
    if (!spinLoader) {
      let prod = parseInt(product?.quantity);
      if (prod == 1) onRemoveClick();
      else {
        setSpinLoader(true);
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/update-cart-quantity`,
            JSON.stringify({
              token: process.env.NEXT_PUBLIC_APP_TOKEN,
              vendor_id: homePageDetails?.vendor_data?.vendors_id,
              vendor_slug: vendorSlug?.data?.ecom_url_slug,
              area_id: areaDetails?.area_id,
              item_id: product?.item_id,
              user_string: localStorage.getItem("userID"),
              quantity: prod - 1,
              branch_id: 87,
              promocode: successPromocode,
            })
          )
          .then((res) => {
            console.log(res, "res");
            localStorage.setItem("cartTime", new Date());
            if (res.data.status == false) {
              notify(res.data.message, res.data.message_ar, language);
            }
            handleCartChange(res.data.data);
            if (deliveryCharge) {
              getDeliveryCharge();
            }
            setSpinLoader(false);
          })
          .catch((e) => console.log(e));
      }
    }
  };

  const onAddQuantityClick = (e) => {
    e.stopPropagation();
    if (Number(product.quantity + 1) <= Number(product.available_quantity)) {
      if (!spinLoader) {
        setSpinLoader(true);
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/update-cart-quantity`,
            JSON.stringify({
              token: process.env.NEXT_PUBLIC_APP_TOKEN,
              vendor_id: homePageDetails?.vendor_data?.vendors_id,
              vendor_slug: vendorSlug?.data?.ecom_url_slug,
              area_id: areaDetails?.area_id,
              item_id: product?.item_id,
              user_string: localStorage.getItem("userID"),
              quantity: product?.quantity + 1,
              branch_id: 87,
              promocode: successPromocode,
            })
          )
          .then((res) => {
            localStorage.setItem("cartTime", new Date());

            if (res.data.status == false) {
              notify(res.data.message, res.data.message_ar, language);
            }

            if (homePageDetails?.vendor_data?.fb_pixel_code != "")
              ReactPixel.track("AddToCart", {
                content_name: product?.english_name,
                content_ids: [product?.product_id],
                content_type: "product",
                value: product?.original_price,
                currency: "KWD",
              });

            if (homePageDetails?.vendor_data?.snap_pixel_code != "")
              SnapPixel.track("ADD_CART", {
                content_name: product?.english_name,
                item_ids: [product?.product_id],
                content_type: "product",
                price: product?.original_price,
                currency: "KWD",
              });

            if (homePageDetails?.vendor_data?.vendors_id === "132") {
              TiktokPixel.track("AddToCart", {
                content_type: "product",
                quantity: 1,
                content_name: product?.english_name,
                content_id: product?.product_id,
                currency: "KWD",
                value: product?.original_price,
              });
            }

            if (
              homePageDetails?.vendor_data?.google_tag_code != "" &&
              !/^GTM/.test(homePageDetails?.vendor_data?.google_tag_code)
            )
              addCartTag({
                item_id: product?.product_id,
                item_name: product?.english_name,
                currency: "KWD",
                discount: product?.discount_price,
                price: product?.original_price,
                quantity: 1,
              });

            handleCartChange(res.data.data);
            if (deliveryCharge) {
              getDeliveryCharge();
            }
            setSpinLoader(false);
          })
          .catch((e) => console.log(e));
      }
    } else {
      setShowQuantityError(true);
    }
  };

  useEffect(() => {
    if (showQuantityError) {
      setTimeout(() => {
        setShowQuantityError(false);
      }, 5000);
    }
  }, [showQuantityError]);

  const onRemoveClick = () => {
    setSpinLoader(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/remove-cart-items`,
        JSON.stringify({
          token: process.env.NEXT_PUBLIC_APP_TOKEN,
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          item_id: product?.item_id,
          area_id: areaDetails?.area_id,
          user_string: localStorage.getItem("userID"),
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
          promocode: successPromocode,
        })
      )
      .then((res) => {
        if (res.data.data.cartCount == 0) {
          handleCartChange({});
          router.push(`/`);
          setSpinLoader(false);
        } else {
          handleCartChange(res.data.data);
          if (deliveryCharge) {
            getDeliveryCharge();
          }
          setSpinLoader(false);
        }
      })
      .catch((e) => console.log(e));
  };

  const getDeliveryCharge = async () => {
    console.log(deliveryCharge, "deliveryCharge");
    if (deliveryCharge) {
      setSpinLoader(true);
      const response = await updateDeliveryCharges(
        vendorSlug?.data?.ecom_url_slug,
        homePageDetails?.vendor_data?.vendors_id,
        areaDetails?.area_id,
        deliveryCharge,
        successPromocode
      );
      if (response?.status) {
        setSpinLoader(false);
        handleCartChange(response.data);
      } else {
        setSpinLoader(false);
        router.push("/");
      }
    }
  };

  return (
    <div
      className="cart-card-product-div"
      onClick={() => {
        router.push(`/product?=${product.product_slug}`);
      }}
    >
      <div className="cart-card-product-mainDiv">
        <div>
          <img
            src={product?.product_img}
            className={`product-detail-image  ${
              homePageDetails?.vendor_data?.home_page_type === "18" &&
              "fashion-theme-border"
            }`} /*  alt={product.english_name} */
          />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "space-between",
          }}
        >
          <div style={{ width: "100%" }}>
            <Title enText={product.english_name} arText={product.arabic_name} />
            <div>
              {product?.addOns?.map((i) => (
                <div className="cart-cart-product-notes" key={i?.item}>
                  {language == "ltr" ? i?.item : i?.item_ar}
                </div>
              ))}
              {product?.variation_id.length > 0 ? (
                <div className="cart-cart-product-notes">
                  {language == "ltr"
                    ? product.variation_name
                    : product.variation_name_ar}
                </div>
              ) : null}
              {product?.offer_applied == 1 && (
                <div className="cart-cart-product-offer">
                  {language == "ltr"
                    ? product?.offer_message
                    : product?.offer_message_ar}
                </div>
              )}
            </div>
          </div>
          <div
            className="cart-cart-product-quantity-div"
            style={{ width: "100%" }}
          >
            <div className="cart-card-product-quantity">
              <IconButton onClick={(e) => onMinusQuantityClick(e)}>
                {product.quantity == 1 ? (
                  <DeleteOutlineOutlinedIcon
                    sx={{ fontSize: "18px", color: "black" }}
                  />
                ) : (
                  <RemoveCircleOutlineIcon
                    sx={{ fontSize: "18px", color: "black" }}
                  />
                )}
              </IconButton>

              <div className="cart-card-price-div">
                {spinLoader ? (
                  <Spinner
                    height="16px"
                    size="2.5px"
                    color={homePageDetails?.vendor_data.vendor_color}
                  />
                ) : (
                  product.quantity
                )}
              </div>
              <IconButton onClick={(e) => onAddQuantityClick(e)}>
                <AddCircleOutlineIcon
                  sx={{ fontSize: "18px", color: "black" }}
                />
              </IconButton>
            </div>

            <div className="cart-card-price-maindiv">
              <div>
                {(product?.discount_applied == 1 ||
                  (product?.offer_applied == 1 &&
                    product?.stripe_amount != 0)) && (
                  <>
                    <span className="order-details-cart-disocunt">
                      {product?.stripe_amount
                        ? parseFloat(product?.stripe_amount)?.toFixed(3)
                        : 0}{" "}
                      {language === "rtl" ? "د.ك" : "KD"}
                    </span>
                  </>
                )}
                <div>
                  <span>
                    {product?.original_price
                      ? parseFloat(product?.original_price).toFixed(3)
                      : 0}
                  </span>{" "}
                  {language === "rtl" ? "د.ك" : "KD"}
                </div>
              </div>
            </div>
          </div>
          {showQuantityError ? (
            <div style={{ paddingTop: "10px" }} className="warning-text">
              {language === "ltr"
                ? "You’re Adding the last peice of this item."
                : "هذه آخر قطعة بإمكانك إضافتها في سلة التسوق."}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewCartCard;
