import { addToCartApi, removeCartItem } from "@/apis";
import { AppContext } from "@/context/AppContext";
import { Box, Card, CardContent, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Spinner from "../common/Spinner/spinner";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";
import "./productSquareCard.css";
import ReactPixel from "react-facebook-pixel";
import AddToCartIcon from "@/SVGs/AddToCartIcon";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SmallButtonSquare from "../assetBoxDesign/SmallButtonSquare/smallButtonSquare";
import SubTitle from "../common/SubTitle/subTitle";
import NormalText from "../assetBoxDesign/NormalText/normalText";
import SmallButtonRounded from "../assetBoxDesign/SmallButtonRounded/smallButtonRounded";
import MultipleItems from "../assetBoxDesign/MultipleItems/multipleItems";

const ProductSquareCard = ({ product, imgHeight }) => {
  const { language, cart, handleCartChange, homePageDetails, areaDetails } =
    useContext(AppContext);
  const [inCart, setInCart] = useState(0);
  const [spinLoader, setSpinLoader] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product?id=${product?.product_slug}`);
  };

  const onAddToCartClick = async (event, n) => {
    if (!spinLoader) {
      event.preventDefault();
      setSpinLoader(true);
      const temp = cart?.cartItems?.filter(
        (k, i) => product?.id == k?.product_id
      );
      if (
        product?.add_ons_count?.cnt != 0 ||
        product?.variation_count?.cnt != 0
      ) {
        router.push(`/product?id=${product?.product_slug}`);
      } else if (n == -1 && inCart == 1) {
        const response = await removeCartItem({
          vendorSlug: homePageDetails?.ecom_url_slug,
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
            const response = await addToCartApi({
              vendorSlug: homePageDetails?.ecom_url_slug,
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
                const time = Date.now();
                const sec = Math.round(time / 1000);
                // static for mijana vendor

                if (homePageDetails?.ecom_url_slug == "butters") {
                  triggerAddToCart({
                    fb_pixel_code: "546180060531909",
                    fb_access_token:
                      "EAAVDp1efPkMBOZBE2DPWrA7he9iJFn9EZBUpd4k3cRjpApcbNMLJgbdmelpI1uApMyxEYoorwBD5ZBDGPL5NWMxXGrKpoAHHxG9NtBMrppMm8YHLRmFgiYVL37nu7PUaO3WPfz4U4K75jIH7eErUZCSRAeJJyQpc88THHEBQGMozZBM9894dBoOe06gklfRtqZCgZDZD",
                    support_mail: homePageDetails?.vendor_data?.support_mail,
                  });
                }

                if (
                  homePageDetails?.ecom_url_slug == "mijana-restaurant-and-café"
                ) {
                  triggerAddToCart({
                    fb_pixel_code: homePageDetails?.vendor_data?.fb_pixel_code,
                    fb_access_token:
                      "EAAGZA8GMZAs1IBAC9mDImnZCTAdafRzN769x6ZCIRMExueSZBZBfnDkIzGrsP4gZBMZCCwXaSvKNggZBEKdEk3582JWiwecrnZAEHFzfCaYKSNRbltxMm2cSvUrgZBUDpVNZCQAOVWUuzO4m7nbvQn1Wqb94IBbVSexSbwWzAf6TYV80HQF1ZAZAzGcXKB",
                    support_mail: homePageDetails?.vendor_data?.support_mail,
                    item: product,
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
                    item: product,
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
              // if (
              //   (areaDetails?.type != "delivery" || areaDetails?.area == "") &&
              //   (areaDetails?.type != "pickup" || areaDetails?.branch == "") &&
              //   n == 1 &&
              //   (homePageDetails?.vendor_data?.international_delivery === "3" ||
              //     homePageDetails?.vendor_data?.international_delivery === "" ||
              //     internationalDelivery.country_name.toLowerCase() === "kuwait")
              // ) {
              //   history.push(`/area`);
              // }
            }
          } else {
            const response = await updateCartQauntity({
              vendorSlug: homePageDetails?.ecom_url_slug,
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

                if (homePageDetails?.ecom_url_slug == "butters") {
                  triggerAddToCart({
                    fb_pixel_code: "546180060531909",
                    fb_access_token:
                      "EAAVDp1efPkMBOZBE2DPWrA7he9iJFn9EZBUpd4k3cRjpApcbNMLJgbdmelpI1uApMyxEYoorwBD5ZBDGPL5NWMxXGrKpoAHHxG9NtBMrppMm8YHLRmFgiYVL37nu7PUaO3WPfz4U4K75jIH7eErUZCSRAeJJyQpc88THHEBQGMozZBM9894dBoOe06gklfRtqZCgZDZD",
                    support_mail: homePageDetails?.vendor_data?.support_mail,
                  });
                }
                if (
                  homePageDetails?.ecom_url_slug == "mijana-restaurant-and-café"
                ) {
                  triggerAddToCart({
                    fb_pixel_code: homePageDetails?.vendor_data?.fb_pixel_code,
                    fb_access_token:
                      "EAAGZA8GMZAs1IBAC9mDImnZCTAdafRzN769x6ZCIRMExueSZBZBfnDkIzGrsP4gZBMZCCwXaSvKNggZBEKdEk3582JWiwecrnZAEHFzfCaYKSNRbltxMm2cSvUrgZBUDpVNZCQAOVWUuzO4m7nbvQn1Wqb94IBbVSexSbwWzAf6TYV80HQF1ZAZAzGcXKB",
                    support_mail: homePageDetails?.vendor_data?.support_mail,
                    item: product,
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
                    item: product,
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

              if (
                homePageDetails?.vendor_data?.vendors_id === "132" &&
                n == 1
              ) {
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
              // if (
              //   (areaDetails?.type != "delivery" || areaDetails?.area == "") &&
              //   (areaDetails?.type != "pickup" || areaDetails?.branch == "") &&
              //   n == 1 &&
              //   (homePageDetails?.vendor_data?.international_delivery === "3" ||
              //     homePageDetails?.vendor_data?.international_delivery === "" ||
              //     internationalDelivery.country_name.toLowerCase() === "kuwait")
              // ) {
              //   history.push(`/area`);
              // }
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
        cursor: "pointer",
        boxShadow: "none",
        width: "100%",
      }}
      onClick={handleCardClick}
    >
      <div style={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={product?.image}
          alt={product?.product_name}
          style={{
            maxWidth: "100%",
            height: imgHeight ? imgHeight : "200px",
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
              backgroundColor: product?.label_color || "rgb(242, 28, 28)",
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
          gap: "7px",
        }}
      >
        <SubTitle
          enText={product?.product_name}
          arText={product?.product_name_ar}
        />
        <div
          onClick={(e) => inCart == 0 && onAddToCartClick(e, 1)}
          className="product-price"
          style={{ alignItems: "center", fontWeight: "400" }}
        >
          {product?.quantity != 0 && product?.discount_applied == 1 && (
            <del
              style={{
                fontSize: language == "ltr" ? 11 : 14,
                display: "flex",
              }}
              className="product-price-del"
            >
              <span style={{ fontSize: language == "ltr" ? 11 : 14 }}>
                {product?.base_price
                  ? parseFloat(product?.base_price).toFixed(3)
                  : 0}
                &nbsp;
              </span>
              {language === "rtl" ? "د.ك" : "KD"}
            </del>
          )}
        </div>
        {product?.short_description != "" ? (
          <div style={{ color: "#888888" }}>
            <NormalText
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
                  fontSize: language == "ltr" ? 13 : 15,
                  padding: "0 15px",
                  color: "#818181",
                  border: "2px solid #818181",
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
              <div
                className="buy-get-img"
                style={{
                  borderRadius: "30px",
                  fontSize: language == "ltr" ? 13 : 15,
                  padding: "0 15px",
                  color: "#818181",
                  border: "2px solid #818181",
                }}
              >
                {language === "ltr"
                  ? "Price On Selection"
                  : "السعر حسب الاختيار"}
              </div>
            ) : product?.prodyct_type == 2 ? (
              <div
                className="buy-get-img "
                style={{
                  borderRadius: "30px",
                  fontSize: language == "ltr" ? 13 : 15,
                  padding: "0 15px",
                  color: "#818181",
                  border: "2px solid #818181",
                }}
              >
                {language === "ltr"
                  ? "Product Registration only"
                  : "حجز المنتج فقط"}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: inCart != 0 ? "center" : "flex-start",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  cursor: "pointer",
                  gap: "5px",
                }}
              >
                {product?.product_status ==
                0 ? null : product?.price_on_selection == 1 ? null : inCart !=
                  0 ? (
                  <Box onClick={(e) => e.preventDefault()}>
                    <MultipleItems
                      loading={spinLoader}
                      count={inCart}
                      removeClick={(e) => onAddToCartClick(e, -1)}
                      addClick={(e) => onAddToCartClick(e, 1)}
                    />
                  </Box>
                ) : (
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
                  fontWeight: "400",
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

export default ProductSquareCard;
