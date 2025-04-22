import { Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";
import { AppContext } from "@/context/AppContext";
import moment from "moment";
import ReactPixel from "react-facebook-pixel";
import { addToCartApi, removeCartItem, updateCartQauntity } from "@/apis";
import { useRouter } from "next/navigation";
import SmallButtonSquare from "../assetBoxDesign/SmallButtonSquare/smallButtonSquare";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";
import NormalText from "../assetBoxDesign/NormalText/normalText";
import MultipleItems from "../assetBoxDesign/MultipleItems/multipleItems";
import SnapPixel from "react-snapchat-pixel";
import TiktokPixel from "tiktok-pixel";

const HorizontalCard = ({ product }) => {
  const {
    language,
    cart,
    handleCartChange,
    homePageDetails,
    areaDetails,
    vendorSlug,
    handleOpenAreaChange,
    internationalDelivery,
  } = useContext(AppContext);
  const [inCart, setInCart] = useState(0);
  const [spinLoader, setSpinLoader] = useState(false);
  const router = useRouter();

  const onAddToCartClick = async (event, n) => {
    event.preventDefault();
    const temp = cart?.cartItems?.filter(
      (k, i) => product?.id == k?.product_id
    );
    if (
      product?.add_ons_count?.cnt != 0 ||
      product?.variation_count?.cnt != 0
    ) {
      router.push(`/product?id=${product?.product_slug}`);
    } else if (n == -1 && inCart == 1) {
      setSpinLoader(true);
      const response = await removeCartItem({
        vendorSlug: vendorSlug?.data?.ecom_url_slug,
        vendors_id: homePageDetails?.vendor_data?.vendors_id,
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
      if (inCart + n <= Number(product?.quantity)) {
        if (temp?.length === 0 || !temp?.length) {
          setSpinLoader(true);
          const response = await addToCartApi({
            vendorSlug: vendorSlug?.data?.ecom_url_slug,
            vendors_id: homePageDetails?.vendor_data?.vendors_id,
            area_id: areaDetails?.area_id,
            itemId: product?.id,
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
            if (homePageDetails?.vendor_data?.fb_pixel_code != "") {
              ReactPixel.track("AddToCart", {
                content_name: product?.product_name,
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
                  product: product,
                });
              }
              if (vendorSlug == "butters") {
                triggerAddToCart({
                  fb_pixel_code: "546180060531909",
                  fb_access_token:
                    "EAAVDp1efPkMBOZBE2DPWrA7he9iJFn9EZBUpd4k3cRjpApcbNMLJgbdmelpI1uApMyxEYoorwBD5ZBDGPL5NWMxXGrKpoAHHxG9NtBMrppMm8YHLRmFgiYVL37nu7PUaO3WPfz4U4K75jIH7eErUZCSRAeJJyQpc88THHEBQGMozZBM9894dBoOe06gklfRtqZCgZDZD",
                  support_mail: details?.vendor_data?.support_mail,
                });
              }

              // dynamic for all vendors
              if (
                homePageDetails?.vendor_data?.fb_access_token &&
                homePageDetails?.vendor_data?.fb_access_token != ""
              ) {
                triggerAddToCart({
                  fb_pixel_code: homePageDetails?.vendor_data?.fb_pixel_code,
                  fb_access_token:
                    homePageDetails?.vendor_data?.fb_access_token,
                  support_mail: homePageDetails?.vendor_data?.support_mail,
                  product: product,
                });
              }
            }

            if (homePageDetails?.vendor_data?.snap_pixel_code != "")
              SnapPixel.track("ADD_CART", {
                content_name: product?.product_name,
                item_category: product?.category_name,
                item_ids: [product?.id],
                content_type: "product",
                price: product?.product_price,
                currency: "KWD",
              });

            if (homePageDetails?.vendor_data?.vendors_id === "132") {
              TiktokPixel.track("AddToCart", {
                content_type: "product",
                quantity: 1,
                content_name: product?.product_name,
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
                item_name: product?.product_name,
                currency: "KWD",
                discount: product?.discount_value,
                item_category: product?.category_name,
                price: product?.product_price,
                quantity: n,
              });

            setSpinLoader(false);
            handleCartChange(response.data);
            if (
              (areaDetails?.type != "delivery" || areaDetails?.area == "") &&
              (areaDetails?.type != "pickup" || areaDetails?.branch == "") &&
              n == 1 &&
              homePageDetails?.vendor_data?.home_page_type != "18" &&
              (homePageDetails?.vendor_data?.international_delivery === "" ||
                homePageDetails?.vendor_data?.international_delivery === "" ||
                internationalDelivery.country_name.toLowerCase() === "kuwait")
            ) {
              // handleOpenAreaChange((prev) => ({ open: true, route: "/" }));
              // router.push(`/area`);
            }
          }
        } else {
          setSpinLoader(true);
          const response = await updateCartQauntity({
            vendorSlug: vendorSlug?.data?.ecom_url_slug,
            vendors_id: homePageDetails?.vendor_data?.vendors_id,
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
            if (homePageDetails?.vendor_data?.fb_pixel_code != "" && n == 1) {
              ReactPixel.track("AddToCart", {
                content_name: product?.product_name,
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
                  product: product,
                });
              }
              if (vendorSlug == "butters") {
                triggerAddToCart({
                  fb_pixel_code: "546180060531909",
                  fb_access_token:
                    "EAAVDp1efPkMBOZBE2DPWrA7he9iJFn9EZBUpd4k3cRjpApcbNMLJgbdmelpI1uApMyxEYoorwBD5ZBDGPL5NWMxXGrKpoAHHxG9NtBMrppMm8YHLRmFgiYVL37nu7PUaO3WPfz4U4K75jIH7eErUZCSRAeJJyQpc88THHEBQGMozZBM9894dBoOe06gklfRtqZCgZDZD",
                  support_mail: details?.vendor_data?.support_mail,
                });
              }

              //dynamic for all vendors
              if (
                homePageDetails?.vendor_data?.fb_access_token &&
                homePageDetails?.vendor_data?.fb_access_token != ""
              ) {
                triggerAddToCart({
                  fb_pixel_code: homePageDetails?.vendor_data?.fb_pixel_code,
                  fb_access_token:
                    homePageDetails?.vendor_data?.fb_access_token,
                  support_mail: homePageDetails?.vendor_data?.support_mail,
                  product: product,
                });
              }
            }
            if (homePageDetails?.vendor_data?.snap_pixel_code != "" && n == 1)
              SnapPixel.track("ADD_CART", {
                content_name: product?.product_name,
                item_category: product?.category_name,
                item_ids: [product?.id],
                content_type: "product",
                price: product?.product_price,
                currency: "KWD",
              });

            if (homePageDetails?.vendor_data?.vendors_id === "132" && n == 1) {
              TiktokPixel.track("AddToCart", {
                content_type: "product",
                quantity: 1,
                content_name: product?.product_name,
                content_id: product?.id,
                currency: "KWD",
                value: product?.product_price,
              });
            }

            if (
              homePageDetails?.vendor_data?.google_tag_code != "" &&
              !/^GTM/.test(homePageDetails?.vendor_data?.google_tag_code) &&
              n == 1
            )
              addCartTag({
                item_id: product?.id,
                item_name: product?.product_name,
                currency: "KWD",
                discount: product?.discount_value,
                item_category: product?.category_name,
                price: product?.product_price,
                quantity: n,
              });
            setSpinLoader(false);
            handleCartChange(response.data);
            if (
              (areaDetails?.type != "delivery" || areaDetails?.area == "") &&
              (areaDetails?.type != "pickup" || areaDetails?.branch == "") &&
              n == 1 &&
              (homePageDetails?.vendor_data?.international_delivery === "3" ||
                homePageDetails?.vendor_data?.international_delivery === "" ||
                internationalDelivery.country_name.toLowerCase() === "kuwait")
            ) {
              handleOpenAreaChange((prev) => ({ open: true, route: "/" }));

              // router.push(`/area`);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (cart?.cartItems) {
      const temp = cart?.cartItems?.filter(
        (k, i) => product?.id == k?.product_id
      );
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
        display: "flex",
        width: "100%",
        padding: "15px 0px",
        gap: "20px",
        boxShadow: "none",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3.5}>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "5px"
            }}
          >
            <div className="product-price-div">
              {product?.offer_applied == 1 && (
                <p
                  className="buy-get-img"
                  onClick={(e) =>
                    inCart == 0 ? onAddToCartClick(e, 1) : e.preventDefault()
                  }
                  style={{
                    backgroundColor: product?.color,
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "11px",
                    padding: "0 10px",
                    fontWeight: "400",
                    minHeight: "25px"
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

            <CardMedia
              component="img"
              image={product?.image}
              alt={product?.product_name}
              style={{
                width: "125px",
                height: "125px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            {product?.label ? (
              <TypographyConverter
                sx={{
                  fontSize: "11px",
                  padding: "2px 0",
                  fontWeight: 300,
                  backgroundColor: product?.label_color || "rgb(242, 28, 28)",
                  color: "#fff",
                  position: "absolute",
                  // top: 0,
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  textAlign: "center",
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
                enText={product?.label}
                arText={product?.label_ar}
              />
            ) : null}
          </div>
        </Grid>
        <Grid item xs={8.5}>
          <CardContent
            sx={{
              padding: "0",
              "&:last-child": {
                paddingBottom: "0",
              },
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <SubHeadline
              enText={product?.product_name}
              arText={product?.product_name_ar}
            />
            {product?.short_description != "" ? (
              <div className="product-description">
                <NormalText
                  color={"#888888"}
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
            {(areaDetails?.branchForArea?.start > moment() ||
              moment() > areaDetails?.branchForArea?.end ||
              !areaDetails?.data?.branch?.filter(
                (k) => k?.id == areaDetails?.branchForArea?.id
              )[0]?.on_shop_close_purchase !== "1") &&
            product?.product_type != 0 ? (
              <div
                className="product-cost-div"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                {product?.product_status == 0 ? (
                  <Box
                    href={``}
                    sx={{
                      border: "none",
                      paddingRight: "0",
                      paddingLeft: "0",
                      color: "red",
                      fontSize: language == "ltr" ? 14 : 18,
                      fontWeight: "400",
                    }}
                    className={`cost-bubble price-bubble big-add-cart ${
                      product?.offer_applied == 1 ? "small-padding" : ""
                    }`}
                  >
                    {language === "ltr"
                      ? product?.status_label
                      : product?.status_label_ar}
                  </Box>
                ) : product?.price_on_selection == 1 ? (
                  <Box
                    href={``}
                    sx={{
                      border: "none",
                      paddingRight: "0",
                      paddingLeft: "0",
                      fontSize: language == "ltr" ? 16 : 18,
                      fontWeight: "400",
                    }}
                    className="cost-bubble price-bubble big-add-cart"
                  >
                    {language === "ltr"
                      ? "Price On Selection"
                      : "السعر حسب الاختيار"}
                  </Box>
                ) : product?.prodyct_type == 2 ? (
                  <Box
                    href={``}
                    className="buy-get-img "
                    sx={{
                      borderRadius: "30px",
                      fontSize: language == "ltr" ? 14 : 15,
                      padding: "0 15px",
                      color: "#818181",
                      border: "2px solid #818181",
                      minWidth: "155px",
                      fontWeight: "300",
                    }}
                  >
                    {language === "ltr"
                      ? "Product Registration only"
                      : "حجز المنتج فقط"}
                  </Box>
                ) : inCart != 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                    }}
                    className="price-bubble add-bubble"
                  >
                    <span
                      className="cost-bubble"
                      style={{
                        border: "none",
                        margin: 0,
                        paddingRight: 0,
                        paddingLeft: 0,
                        fontWeight: "400",
                      }}
                    >
                      <span>
                        {product?.product_price
                          ? parseFloat(product?.product_price).toFixed(3)
                          : 0}
                        &nbsp;
                      </span>
                      {language === "rtl" ? "د.ك" : "KD"}
                    </span>
                    <Box sx={{ display: "flex", justifyContent: "start" }}>
                      <MultipleItems
                        loading={spinLoader}
                        removeClick={(e) => onAddToCartClick(e, -1)}
                        addClick={(e) => onAddToCartClick(e, 1)}
                        count={inCart}
                      />
                    </Box>
                  </div>
                ) : (
                  <Box
                    // onClick={(e) => onAddToCartClick(e, 1)}
                    href={``}
                    sx={{
                      border: "none",
                      paddingLeft: 0,
                      paddingRight: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                    className="cost-bubble price-bubble big-add-cart"
                  >
                    <div>
                      {product?.product_status == 1 &&
                      product?.discount_applied == 1 ? (
                        <del style={{ color: "red" }}>
                          <span
                            className="cost-bubble"
                            style={{
                              border: "none",
                              color: "red",
                              paddingRight: 0,
                              paddingLeft: 0,
                              padding: 0,
                              fontSize: language == "ltr" ? 12 : 15,
                              maxHeight: 17,
                              minHeight: 17,
                              margin: 0,
                              fontWeight: "400",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span>
                              {product?.base_price
                                ? parseFloat(product?.base_price).toFixed(3)
                                : 0}
                              &nbsp;
                            </span>
                            {language === "rtl" ? "د.ك" : "KD"}
                          </span>
                        </del>
                      ) : null}
                    </div>
                    <SmallButtonSquare
                      handleClick={(e) => {
                        e.stopPropagation();
                        if (inCart == 0) {
                          onAddToCartClick(e, 1);
                        }
                      }}
                      varient={"dark"}
                      arText={`${
                        product?.product_price
                          ? parseFloat(product?.product_price).toFixed(3)
                          : 0
                      } د.ك`}
                      enText={`${
                        product?.product_price
                          ? parseFloat(product?.product_price).toFixed(3)
                          : 0
                      } KD`}
                    />
                  </Box>
                )}
              </div>
            ) : null}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HorizontalCard;
