import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import "./squareCard.css"

const SquareCard = ({ product }) => {
  const { language, cart, handleCartChange, homePageDetails } = useContext(AppContext);
  const [inCart, setInCart] = useState(0);
  const [spinLoader, setSpinLoader] = useState(false);

  const onAddToCartClick = async (event, n) => {
    if (!spinLoader) {
      event.preventDefault();
      setSpinLoader(true);
      const temp = cart?.cartItems?.filter((k, i) => item?.id == k?.product_id);
      if (item?.add_ons_count?.cnt != 0 || item?.variation_count?.cnt != 0) {
        history.push(`/product=${item?.product_slug}`);
      } else if (n == -1 && inCart == 1) {
        const response = await removeCartItem({
          vendorSlug: vendorSlug,
          vendors_id: homePageDetails?.vendor?.vendors_id,
          area_id: areaDetails?.area_id,
          user_string: localStorage.getItem("userID"),
          item_id: temp[0]?.item_id,
        });
        if (response?.status) {
          if (response.data.cartCount == 0) {
            setSpinLoader(false);
            handleCartChange((cart) => {});
          } else {
            setSpinLoader(false);
            handleCartChange(response.data);
          }
        }
      } else {
        if (inCart + n <= Number(item?.quantity)) {
          if (temp?.length === 0 || !temp?.length) {
            const response = await addToCartApi({
              vendorSlug: vendorSlug,
              vendors_id: homePageDetails?.vendor?.vendors_id,
              area_id: areaDetails?.area_id,
              itemId: item?.id,
              user_string: localStorage.getItem("userID"),
              quantity: inCart + n,
              branch_id: 87,
              add_on_ids: [],
            });
            if (response?.status) {
              localStorage.setItem("cartTime", new Date());
              if (response.status == false) {
                notify(response.message, response.message_ar, language);
              }
              if (homePageDetails?.vendor?.fb_pixel_code != "") {
                ReactPixel.track("AddToCart", {
                  content_name: item?.product_name,
                  content_category: item?.category_name,
                  content_ids: [item?.id],
                  content_type: "product",
                  value: item?.product_price,
                  currency: "KWD",
                });
                const time = Date.now();
                const sec = Math.round(time / 1000);
                // static for mijana vendor

                if (vendorSlug == "butters") {
                  triggerAddToCart({
                    fb_pixel_code: "546180060531909",
                    fb_access_token:
                      "EAAVDp1efPkMBOZBE2DPWrA7he9iJFn9EZBUpd4k3cRjpApcbNMLJgbdmelpI1uApMyxEYoorwBD5ZBDGPL5NWMxXGrKpoAHHxG9NtBMrppMm8YHLRmFgiYVL37nu7PUaO3WPfz4U4K75jIH7eErUZCSRAeJJyQpc88THHEBQGMozZBM9894dBoOe06gklfRtqZCgZDZD",
                    support_mail: homePageDetails?.vendor_data?.support_mail,
                  });
                }

                if (vendorSlug == "mijana-restaurant-and-café") {
                  triggerAddToCart({
                    fb_pixel_code: homePageDetails?.vendor?.fb_pixel_code,
                    fb_access_token:
                      "EAAGZA8GMZAs1IBAC9mDImnZCTAdafRzN769x6ZCIRMExueSZBZBfnDkIzGrsP4gZBMZCCwXaSvKNggZBEKdEk3582JWiwecrnZAEHFzfCaYKSNRbltxMm2cSvUrgZBUDpVNZCQAOVWUuzO4m7nbvQn1Wqb94IBbVSexSbwWzAf6TYV80HQF1ZAZAzGcXKB",
                    support_mail: homePageDetails?.vendor?.support_mail,
                    item: item,
                  });
                }

                // dynamic for all vendors
                if (
                  homePageDetails?.vendor?.fb_access_token &&
                  homePageDetails?.vendor?.fb_access_token != ""
                ) {
                  triggerAddToCart({
                    fb_pixel_code: homePageDetails?.vendor?.fb_pixel_code,
                    fb_access_token: homePageDetails?.vendor?.fb_access_token,
                    support_mail: homePageDetails?.vendor?.support_mail,
                    item: item,
                  });
                }
              }

              if (homePageDetails?.vendor?.snap_pixel_code != "")
                SnapPixel.track("ADD_CART", {
                  content_name: item?.product_name,
                  item_category: item?.category_name,
                  item_ids: [item?.id],
                  content_type: "product",
                  price: item?.product_price,
                  currency: "KWD",
                });

              if (homePageDetails?.vendor?.vendors_id === "132") {
                TiktokPixel.track("AddToCart", {
                  content_type: "product",
                  quantity: 1,
                  content_name: item?.product_name,
                  content_id: item?.id,
                  currency: "KWD",
                  value: item?.product_price,
                });
              }

              if (
                homePageDetails?.vendor?.google_tag_code != "" &&
                !/^GTM/.test(homePageDetails?.vendor?.google_tag_code)
              )
                addCartTag({
                  item_id: item?.id,
                  item_name: item?.product_name,
                  currency: "KWD",
                  discount: item?.discount_value,
                  item_category: item?.category_name,
                  price: item?.product_price,
                  quantity: n,
                });

              setSpinLoader(false);
              handleCartChange(response.data);
              if (
                (areaDetails?.type != "delivery" || areaDetails?.area == "") &&
                (areaDetails?.type != "pickup" || areaDetails?.branch == "") &&
                n == 1 &&
                (homePageDetails?.vendor?.international_delivery === "3" ||
                  homePageDetails?.vendor?.international_delivery === "" ||
                  internationalDelivery.country_name.toLowerCase() === "kuwait")
              ) {
                history.push(`/area`);
              }
            }
          } else {
            const response = await updateCartQauntity({
              vendorSlug: vendorSlug,
              vendors_id: homePageDetails?.vendor?.vendors_id,
              area_id: areaDetails?.area_id,
              user_string: localStorage.getItem("userID"),
              quantity: inCart + n,
              branch_id: 87,
              item_id: temp[0]?.item_id,
            });
            if (response?.status) {
              localStorage.setItem("cartTime", new Date());
              if (response.status == false) {
                notify(response.message, response.message_ar, language);
              }
              if (homePageDetails?.vendor?.fb_pixel_code != "" && n == 1) {
                ReactPixel.track("AddToCart", {
                  content_name: item?.product_name,
                  content_category: item?.category_name,
                  content_ids: [item?.id],
                  content_type: "product",
                  value: item?.product_price,
                  currency: "KWD",
                });

                const time = Date.now();
                const sec = Math.round(time / 1000);
                //static for mijana

                if (vendorSlug == "butters") {
                  triggerAddToCart({
                    fb_pixel_code: "546180060531909",
                    fb_access_token:
                      "EAAVDp1efPkMBOZBE2DPWrA7he9iJFn9EZBUpd4k3cRjpApcbNMLJgbdmelpI1uApMyxEYoorwBD5ZBDGPL5NWMxXGrKpoAHHxG9NtBMrppMm8YHLRmFgiYVL37nu7PUaO3WPfz4U4K75jIH7eErUZCSRAeJJyQpc88THHEBQGMozZBM9894dBoOe06gklfRtqZCgZDZD",
                    support_mail: homePageDetails?.vendor_data?.support_mail,
                  });
                }
                if (vendorSlug == "mijana-restaurant-and-café") {
                  triggerAddToCart({
                    fb_pixel_code: homePageDetails?.vendor?.fb_pixel_code,
                    fb_access_token:
                      "EAAGZA8GMZAs1IBAC9mDImnZCTAdafRzN769x6ZCIRMExueSZBZBfnDkIzGrsP4gZBMZCCwXaSvKNggZBEKdEk3582JWiwecrnZAEHFzfCaYKSNRbltxMm2cSvUrgZBUDpVNZCQAOVWUuzO4m7nbvQn1Wqb94IBbVSexSbwWzAf6TYV80HQF1ZAZAzGcXKB",
                    support_mail: homePageDetails?.vendor?.support_mail,
                    item: item,
                  });
                }

                //dynamic for all vendors
                if (
                  homePageDetails?.vendor?.fb_access_token &&
                  homePageDetails?.vendor?.fb_access_token != ""
                ) {
                  triggerAddToCart({
                    fb_pixel_code: homePageDetails?.vendor?.fb_pixel_code,
                    fb_access_token: homePageDetails?.vendor?.fb_access_token,
                    support_mail: homePageDetails?.vendor?.support_mail,
                    item: item,
                  });
                }
              }
              if (homePageDetails?.vendor?.snap_pixel_code != "" && n == 1)
                SnapPixel.track("ADD_CART", {
                  content_name: item?.product_name,
                  item_category: item?.category_name,
                  item_ids: [item?.id],
                  content_type: "product",
                  price: item?.product_price,
                  currency: "KWD",
                });

              if (homePageDetails?.vendor?.vendors_id === "132" && n == 1) {
                TiktokPixel.track("AddToCart", {
                  content_type: "product",
                  quantity: 1,
                  content_name: item?.product_name,
                  content_id: item?.id,
                  currency: "KWD",
                  value: item?.product_price,
                });
              }

              if (
                homePageDetails?.vendor?.google_tag_code != "" &&
                !/^GTM/.test(homePageDetails?.vendor?.google_tag_code) &&
                n == 1
              )
                addCartTag({
                  item_id: item?.id,
                  item_name: item?.product_name,
                  currency: "KWD",
                  discount: item?.discount_value,
                  item_category: item?.category_name,
                  price: item?.product_price,
                  quantity: n,
                });
              setSpinLoader(false);
              handleCartChange(response.data);
              if (
                (areaDetails?.type != "delivery" || areaDetails?.area == "") &&
                (areaDetails?.type != "pickup" || areaDetails?.branch == "") &&
                n == 1 &&
                (homePageDetails?.vendor?.international_delivery === "3" ||
                  homePageDetails?.vendor?.international_delivery === "" ||
                  internationalDelivery.country_name.toLowerCase() === "kuwait")
              ) {
                history.push(`/area`);
              }
            }
          }
        } else {
          setSpinLoader(false);
        }
      }
    }
  };

  useEffect(() => {
    if (cart?.cartItems) {
      const temp = cart?.cartItems?.filter((k, i) => item?.id == k?.product_id);
      if (temp.length == 0) {
        setInCart(0);
      } else {
        let n = 0;
        temp?.forEach((k, i) => {
          n = n + parseInt(k?.quantity);
        });
        setInCart(n);
      }
    } else {
      setInCart(0);
    }
  }, [cart]);

  return (
    <Card
      sx={{
        cursor: "pointer",
        boxShadow: "none",
        width: "100%",
      }}
    >
      <div style={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={product?.image}
          alt={product?.product_name}
          style={{
            maxWidth: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
        {product?.label ? (
          <TypographyConverter
            sx={{
              fontSize: "13px",
              padding: "3px 0",
              fontWeight: 300,
              backgroundColor: /* product?.label_color */ "rgb(242, 28, 28)",
              color: "#fff",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              textAlign: "center",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
            enText={product?.label}
            arText={product?.label_ar}
          />
        ) : null}
      </div>
      <CardContent
        sx={{
          padding: "0",
          "&:last-child": {
            paddingBottom: "0",
          },
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <TypographyConverter
          sx={{ fontSize: "16px", fontWeight: 400, textAlign: "center" }}
          enText={product?.product_name}
          arText={product?.product_name_ar}
        />
        {product?.short_description != "" ? (
          <div>
            <TypographyConverter
              sx={{
                fontSize: "14px",
                fontWeight: 300,
                color: "#888888",
                textAlign: "center",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                width: "90%",
                margin: "0 auto",
              }}
              enText={product?.short_description
                ?.replace(/(<([^>]+)>)/gi, "")
                .replace(/\&nbsp;/gi, "")
                .replace(/\s\s+/g, " ")
                .replace(/&#39;/gi, "'")}
              arText={product?.short_description_ar
                ?.replace(/(<([^>]+)>)/gi, "")
                .replace(/\&nbsp;/gi, "")
                .replace(/\s\s+/g, " ")
                .replace(/&#39;/gi, "'")}
            />
          </div>
        ) : null}
        {product?.product_type != 0 ? (
          <div className="product-price-div">
            {product?.product_status == 0 ? (
              <p
                className="buy-get-img"
                style={{
                  borderRadius: "30px",
                  fontSize: language == "ltr" ? 12 : 15,
                  padding: "0 15px",
                  color: "#818181",
                  border: "2px solid #818181",
                  minWidth: "155px",
                }}
              >
                <div>
                  <span>
                    {language === "ltr"
                      ? product?.status_label
                      : product?.status_label_ar}
                  </span>
                </div>
              </p>
            ) : product?.price_on_selection == 1 ? (
              <Link
                to={`/product=${product?.product_slug}`}
                className="buy-get-img "
                style={{
                  borderRadius: "30px",
                  fontSize: language == "ltr" ? 12 : 15,
                  padding: "0 15px",
                  color: "#818181",
                  border: "2px solid #818181",
                  minWidth: "155px",
                }}
              >
                {language === "ltr"
                  ? "Price On Selection"
                  : "السعر حسب الاختيار"}
              </Link>
            ) : product?.prodyct_type == 2 ? (
              <Link
                to={`/product=${product?.product_slug}`}
                className="buy-get-img "
                style={{
                  borderRadius: "30px",
                  fontSize: language == "ltr" ? 12 : 15,
                  padding: "0 15px",
                  color: "#818181",
                  border: "2px solid #818181",
                  minWidth: "155px",
                }}
              >
                {language === "ltr"
                  ? "Product Registration only"
                  : "حجز المنتج فقط"}
              </Link>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: inCart != 0 ? "center" : "flex-start",
                  justifyContent: "center",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  cursor: "pointer",
                }}
              >
                <div
                  onClick={(e) => inCart == 0 && onAddToCartClick(e, 1)}
                  className="product-price"
                  style={{ alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: language == "ltr" ? 15 : 18,
                      paddingTop: inCart == 0 ? 4 : 0,
                    }}
                  >
                    <span style={{ fontSize: 15 }}>
                      {product?.product_price
                        ? parseFloat(product?.product_price).toFixed(3)
                        : 0}
                      &nbsp;
                    </span>
                    {language === "rtl" ? "د.ك" : "KD"}
                  </span>
                  {product?.quantity != 0 && product?.discount_applied == 1 && (
                    <del
                      style={{ fontSize: language == "ltr" ? 12 : 15 }}
                      className="product-price-del"
                    >
                      <span style={{ fontSize: 12 }}>
                        {product?.base_price
                          ? parseFloat(product?.base_price).toFixed(3)
                          : 0}
                        &nbsp;
                      </span>
                      {language === "rtl" ? "د.ك" : "KD"}
                    </del>
                  )}
                </div>
                {product?.product_status ==
                0 ? null : product?.price_on_selection == 1 ? null : inCart !=
                  0 ? (
                  <Link
                    onClick={(e) => e.preventDefault()}
                    className="product-price "
                  >
                    <div className="controlbuttondiv">
                      <button
                        className="control-button"
                        onClick={(e) => onAddToCartClick(e, -1)}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                      <Link
                        onClick={(e) => e.preventDefault()}
                        className="quantity-text"
                      >
                        {spinLoader ? (
                          <Spinner
                            height="16px"
                            size="2.5px"
                            color={homePageDetails.vendor.vendor_color}
                          />
                        ) : (
                          inCart
                        )}
                      </Link>
                      <button
                        className="control-button"
                        onClick={(e) => onAddToCartClick(e, 1)}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </Link>
                ) : (
                  <span
                    onClick={(e) => inCart == 0 && onAddToCartClick(e, 1)}
                    style={{
                      backgroundColor: homePageDetails?.vendor?.vendor_color,
                    }}
                    className="cart-image-div"
                  >
                    {spinLoader ? (
                      <div style={{ padding: "0 2px" }}>
                        <Spinner height="14px" size="2px" />
                      </div>
                    ) : (
                      <img
                        src={"pictures/Logo.png"}
                        className="cart-image-add"
                      ></img>
                    )}
                  </span>
                )}
              </div>
            )}
          </div>
        ) : null}
        {product?.product_type != 0 ? (
          <div className="product-price-div">
            {product?.offer_applied == 1 && (
              <p
                className="buy-get-img "
                onClick={(e) =>
                  inCart == 0 ? onAddToCartClick(e, 1) : e.preventDefault()
                }
                style={{
                  backgroundColor: product?.color,
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: language == "ltr" ? 12 : 15,
                  padding: "0 15px",
                  minWidth: "155px",
                }}
              >
                <span>
                  {language === "ltr"
                    ? product?.offer_msg
                    : product?.offer_msg_ar}
                </span>
              </p>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default SquareCard;
