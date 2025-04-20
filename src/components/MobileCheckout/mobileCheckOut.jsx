"use client";
import React, { useContext, useEffect, useState } from "react";
import EstoreLayout1 from "../EstoreLayouts/estoreLayout1";
import { AppContext } from "@/context/AppContext";
import { getDeliveryCompanies, updateDeliveryCharges } from "@/apis";
import MainTitle from "../common/MainTitle/mainTitle";
import NewOrderProductList from "../NewOrderProductList/NewOrderProductList";
import BuyerDetails from "../NewOrderDetailsPage/Components/BuyerDetails";
import NewDeliveryDetails from "../NewOrderDetailsPage/Components/NewDeliveryDetails";
import NewDeliveryCompany from "../NewDeliveryCompany/newDeliveryCompany";
import NewPaymentSelector from "../NewOrderDetailsPage/Components/NewPaymentSelector";
import NewPromocode from "../NewOrderDetailsPage/Components/NewPromocode";
import NewAmountDetails from "../NewOrderDetailsPage/Components/NewAmountDetails";
import Spinner from "../common/Spinner/spinner";
import { useRouter } from "next/navigation";
import { mapArea } from "@/constants/areaConstant";
import axios from "axios";
import moment from "moment";
import { tele } from "@/constants/constants";
import SnapPixel from "react-snapchat-pixel";
import TiktokPixel from "tiktok-pixel";
import ReactPixel from "react-facebook-pixel";
import AreaModal from "../AreaModal/areaModal";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";

const MobileCheckOut = () => {
  const {
    vendorSlug,
    homePageDetails,
    userDetails,
    language,
    cart,
    handleCartChange,
    addressDetails,
    setAddressDetails,
    contactDetails,
    areaDetails,
    payment,
    internationalDelivery,
    handleSetPaymentChange,
    handleAreaDetailsChange,
    handleOpenAreaChange,
  } = useContext(AppContext);
  const router = useRouter();
  const [showAreaModal, setShowAreaModal] = useState(false);

  const [apply, setApply] = useState("");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState(false);
  const [popup, setPopup] = useState({ show_popup: 0 });
  const [notServing, setNotServing] = useState(0);
  const [deliveryKm, setDeliveryKm] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [showAddress, setShowAddress] = useState(false);
  const [successPromocode, setSuccessPromocode] = useState("");
  const [promocode, setPromocode] = useState("");
  const [companyData, setCompanyData] = useState();
  const [width, setWidth] = useState(0);

  const checkAllCondition = () => {
    if (!cart?.cartCount) {
      router.push(`/`);
    } else if (!contactDetails.name && !contactDetails.phone) {
      router.push("/contact-details");
    } else if (
      areaDetails?.type == "delivery" &&
      !addressDetails?.block &&
      !addressDetails?.street &&
      addressDetails?.house &&
      (internationalDelivery.delivery_country_code.toLowerCase() === "kw" ||
        homePageDetails?.vendor_data?.international_delivery === "3" ||
        homePageDetails?.vendor_data?.international_delivery === "")
    ) {
      router.push("/delivery-address", {
        from: "checkout",
      });
    } else if (
      areaDetails?.type == "pickup" &&
      !areaDetails?.area &&
      !areaDetails?.branch
    ) {
      router.push("/");
      handleOpenAreaChange({ open: true, route: "/checkout" });
    } else if (
      internationalDelivery.delivery_country_code.toLowerCase() !== "kw" &&
      internationalDelivery.delivery_address1 == "" &&
      internationalDelivery.delivery_address2 == ""
    ) {
      router.push("/delivery-address");
    } else {
      return true;
    }
  };
  useEffect(() => {
    if (cart && cart.deliveryCharge) {
      setDeliveryCharge(cart.deliveryCharge);
    }
  }, [cart]);

  useEffect(() => {
    (async () => {
      const check = checkAllCondition();
      if (
        check &&
        areaDetails?.type == "delivery" &&
        areaDetails?.data?.branch &&
        (internationalDelivery.delivery_country_code.toLowerCase() === "kw" ||
          homePageDetails?.vendor_data?.international_delivery === "3" ||
          homePageDetails?.vendor_data?.international_delivery === "")
      ) {
        // let selectedArea = areaDetails?.area;
        if (areaDetails?.area == "Mutlaa") {
          const branch_latlng = areaDetails?.data?.branch?.filter(
            (branch) => branch.id == areaDetails?.branchForArea.id
          );
          if (window.google && window.google.maps) {
            const origin = new window.google.maps.LatLng(
              String(branch_latlng[0].lat),
              String(branch_latlng[0].lng)
            );
            const destination = new window.google.maps.LatLng(
              String(addressDetails.lat),
              String(addressDetails.lng)
            );
            const service = new window.google.maps.DistanceMatrixService();
            const request = {
              origins: [origin],
              destinations: [destination],
              travelMode: "DRIVING",
              unitSystem: window.google.maps.UnitSystem.METRIC, // Specify metric units for kilometers
            };

            service.getDistanceMatrix(request, (response, status) => {
              if (
                status === "OK" &&
                response.rows[0].elements[0].status === "OK"
              ) {
                const distanceInMeters =
                  response.rows[0].elements[0].distance.value;
                const distanceInKilometers = distanceInMeters / 1000;
                setDeliveryKm(distanceInKilometers);
              } else {
                console.error("Error:", status);
              }
            });
          }
        } else {
          let selectedAra = mapArea.find(
            (ele) =>
              ele.area_name == areaDetails.area ||
              ele.area_name_ar == areaDetails.area_ar
          );
          const selectedArea = selectedAra.area_map;
          // if (areaDetails?.area.includes("Al")) {
          //   let newArea = areaDetails.area
          //     .split(" ")
          //     .filter((ele, i) => i !== 0)
          //     .join(" ");
          //   selectedArea = newArea;
          // }
          const encodedPlaceName = encodeURIComponent(
            `street ${addressDetails.street} ,block ${addressDetails.block} ,${selectedArea}, Kuwait`
          );
          const respones = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedPlaceName}&key=AIzaSyDK_1lc7uLQSGYHVpr0mGl-c1Zys2OPOdg`
          );
          if (respones.status === 200) {
            let getSelectedAreaDetails = [];
            if (respones?.data?.results.length == 1) {
              getSelectedAreaDetails.push(respones?.data?.results[0]);
            } else {
              respones?.data?.results.map((ele) =>
                ele.address_components.map((element) => {
                  if (
                    element.short_name.toLowerCase() ==
                      selectedArea.toLowerCase() ||
                    element.long_name.toLowerCase() ==
                      selectedArea.toLowerCase()
                  ) {
                    getSelectedAreaDetails.push(ele);
                  }
                })
              );
            }

            let lat = getSelectedAreaDetails[0]?.geometry?.location?.lat;
            let lng = getSelectedAreaDetails[0]?.geometry?.location?.lng;
            const branch_latlng = areaDetails?.data?.branch?.filter(
              (branch) => branch.id == areaDetails?.branchForArea.id
            );
            if (window.google && window.google.maps) {
              const origin = new window.google.maps.LatLng(
                String(branch_latlng?.[0]?.lat),
                String(branch_latlng?.[0]?.lng)
              );
              const destination = new window.google.maps.LatLng(
                String(addressDetails.lat),
                String(addressDetails.lng)
              );
              const service = new window.google.maps.DistanceMatrixService();
              const request = {
                origins: [origin],
                destinations: [destination],
                travelMode: "DRIVING",
                unitSystem: window.google.maps.UnitSystem.METRIC, // Specify metric units for kilometers
              };

              service.getDistanceMatrix(request, (response, status) => {
                if (
                  status === "OK" &&
                  response.rows[0].elements[0].status === "OK"
                ) {
                  const distanceInMeters =
                    response.rows[0].elements[0].distance.value;
                  const distanceInKilometers = distanceInMeters / 1000;
                  setDeliveryKm(distanceInKilometers);
                } else {
                  console.error("Error:", status);
                }
              });
            }
          }
        }
      }
    })();
  }, [window, window.google, window.google?.maps, areaDetails?.area]);

  const getDeliveryCharge = async (delivery_charge) => {
    if (delivery_charge) {
      const response = await updateDeliveryCharges(
        vendorSlug?.data?.ecom_url_slug,
        homePageDetails?.vendor_data?.vendors_id,
        areaDetails?.area_id,
        delivery_charge
      );
      if (response && response.status) {
        setLoading(false);
        setCart(response.data);
      } else {
        setLoading(false);
        router.push("/");
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (
        deliveryKm &&
        areaDetails?.type == "delivery" &&
        areaDetails?.area != "Mutlaa"
      ) {
        setLoading(true);
        const response = await getDeliveryCompanies({
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          product: cart.cartItems,
          distance: deliveryKm,
          area_id: areaDetails?.area_id,
          block_id: addressDetails.block,
          ecommerce_vendor_id:
            homePageDetails?.vendor_data?.ecommerce_vendor_id,
          branch_id: areaDetails?.branchForArea.id,
          destination: {
            latitude: Number(addressDetails.lat),
            longitude: Number(addressDetails.lng),
          },
          block: addressDetails.block,
          street: addressDetails.street,
          avenue: addressDetails.avenue,
          house_no: addressDetails.house,
          floor_no: addressDetails.floor,
          flat_no: addressDetails.flat,
          time: areaDetails?.now,
          schedule_time: areaDetails?.deliveryTiming,
          preorder_on: moment(areaDetails?.laterDeliveryTiming)
            .locale("en")
            .format("YYYY-MM-DD HH:mm:ss"),
        });
        if (response?.status) {
          if (response.is_activated === "1") {
            if (response.data.is_serving === 0) {
              setNotServing(1);
              setLoading(false);
            } else {
              setCompanyData(response.data);
              setDeliveryCharge(response.data.delivery_charge);
              if (response.data.delivery_charge) {
                getDeliveryCharge(response.data.delivery_charge);
              }
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    })();
  }, [deliveryKm]);

  const onConfirmOrder = (method) => {
    setLoading((loading) => true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/branches`,
        JSON.stringify({
          token: process.env.NEXT_PUBLIC_APP_TOKEN,
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
        })
      )
      .then((res) => {
        handleAreaDetailsChange((areaDetails) => ({
          ...areaDetails,
          data: { ...areaDetails.data, branch: res.data.data },
        }));
        if (
          !(
            areaDetails?.branchForArea?.start > moment() ||
            moment() > areaDetails?.branchForArea?.end
          )
        ) {
          checkAvailbility(method);
        } else {
          if (
            !res.data.data?.filter(
              (k) => k?.id == areaDetails?.branchForArea?.id
            )[0]?.on_shop_close_purchase == 1
          ) {
            checkAvailbility(method);
          } else {
            setNote((m) => true);
            setLoading((loading) => false);
          }
        }
      })
      .catch((e) => console.log(e));
  };

  const checkAvailbility = async (method) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/change-area`,
        JSON.stringify({
          token: process.env.NEXT_PUBLIC_APP_TOKEN,
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          area_id: areaDetails?.area_id,
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
          user_string: localStorage.getItem("userID"),
        })
      )
      .then((res) => {
        let temp = res.data.data;
        if (temp?.show_popup == 0) {
          submitFunc(method);
        } else {
          setLoading((loading) => false);
          setPopup((pop) => temp);
        }
      })
      .catch((e) => console.log(e));
  };
  const getBranchCordinates = () => {
    const branchlatlng = areaDetails.data.branch.filter(
      (branch) => branch.id === areaDetails.branchForArea.id
    );
    if (branchlatlng[0]?.lat && branchlatlng[0]?.lng) {
      return { lat: branchlatlng[0].lat, lng: branchlatlng[0].lng };
    }
  };
  const submitFunc = async (method) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/save-order-details`,
        JSON.stringify({
          token: process.env.NEXT_PUBLIC_APP_TOKEN,
          user_string: localStorage.getItem("userID"),
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
          ecommerce_vendor_id:
            homePageDetails?.vendor_data?.ecommerce_vendor_id,
          first_name: contactDetails.name,
          country_code: tele[contactDetails?.phoneCode],
          phone: contactDetails.phone,
          email: contactDetails.email,
          type: areaDetails?.type,
          area_id: areaDetails?.type == "delivery" ? areaDetails?.area_id : "",
          area_name: areaDetails?.type == "delivery" ? areaDetails?.area : "",
          area_name_ar:
            areaDetails?.type == "delivery" ? areaDetails?.ar_area : "",
          branch_id: areaDetails?.branchForArea?.id,
          branch_name: areaDetails?.branchForArea?.english,
          branch_name_ar: areaDetails?.branchForArea?.arabic,
          address_type: addressDetails.addressType,
          block: addressDetails.block,
          street: addressDetails.street,
          avenue: addressDetails.avenue,
          house_no: addressDetails.house,
          floor_no: addressDetails.floor,
          flat_no: addressDetails.flat,
          special_directions: addressDetails.special_directions,
          payment_method:
            cart.knetTotal == 0.0 ||
            cart.codTotal == 0.0 ||
            cart.creditCardTotal == 0.0
              ? "3"
              : method,
          promocode: successPromocode,
          time: areaDetails?.now,
          schedule_time: areaDetails?.deliveryTiming,
          preorder_on: moment(areaDetails?.laterDeliveryTiming)
            .locale("en")
            .format("YYYY-MM-DD HH:mm:ss"),
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          success_url: window.location.origin + "/",
          error_url: window.location.origin + "/",

          // success_url: window.location.origin + "/dev/",
          // error_url: window.location.origin + "/dev/",
          is_pickup: areaDetails?.type == "pickup" ? 1 : 0,
          car_model: contactDetails?.model,
          car_color: contactDetails?.color,
          license_number: contactDetails?.license,
          selected_delivery_company: companyData?.delivery_partner_code || 0,
          user_lat: Number(addressDetails?.lat) || 0,
          user_lng: Number(addressDetails?.lng) || 0,
          distance_km: deliveryKm || 0,
          address_string: addressDetails.addressString,
          estimated_date: companyData?.estimated_date || 0,
          estimated_time: companyData?.estimated_time || 0,
          // third_part_delivery_charge: companyData?.delivery_charge || 0,
          delivery_charge: deliveryCharge || "",
          ecom_delivery_co_id: companyData?.ecom_delivery_co_id || 0,
          branch_lat: getBranchCordinates().lat,
          branch_lng: getBranchCordinates().lng,
          country_id: "1",
          is_interNational: 0,
          user_address_id: addressDetails.id,
          ecom_user_id: userDetails.id,
        })
      )
      .then((res) => {
        localStorage?.setItem("check", "1");
        if (homePageDetails?.vendor_data?.fb_pixel_code != "")
          ReactPixel.track("InitiateCheckout", {
            content_ids: cart?.cartItems?.map((k) => k?.product_id),
            value: cart?.subTotal,
            num_items: cart?.cartCount,
            contents: cart?.cartItems?.map((k) => ({
              id: k?.product_id,
              item_id: k?.item_id,
              name: k?.english_name,
              quantity: k?.quantity,
              value: k?.original_price,
            })),
            currency: "KWD",
          });

        if (homePageDetails?.vendor_data?.snap_pixel_code != "")
          SnapPixel.track("START_CHECKOUT", {
            item_ids: cart?.cartItems?.map((k) => k?.product_id),
            content_type: "product",
            price: cart?.subTotal,
            currency: "KWD",
          });

        if (homePageDetails?.vendor_data?.vendors_id === "132") {
          TiktokPixel.track("InitiateCheckout");
        }

        if (
          homePageDetails?.vendor_data?.google_tag_code != "" &&
          !/^GTM/.test(homePageDetails?.vendor_data?.google_tag_code)
        )
          checkoutTag(
            cart?.cartItems?.map((item) => ({
              item_id: item?.product_id,
              item_name: item?.english_name,
              currency: "KWD",
              discount: item?.discount_price,
              price: item?.original_price,
              quantity: item?.quantity,
            }))
          );
        window.location.assign(res.data.data.payment_url);
      })
      .catch((e) => console.log(e));
  };
  return (
    <EstoreLayout1>
      <>
        {checkAllCondition() ? (
          <div
            className="holder-container"
            style={
              showAddress
                ? {
                    paddingBottom: "36px",
                    height: "100vh",
                    overflow: "hidden",
                    position: "relative",
                  }
                : { paddingBottom: "36px" }
            }
          >
            <div
              onClick={() => {
                if (areaDetails?.type === "pickup") {
                  history.push("/contact-details");
                } else {
                  history.push("/");
                }
              }}
            ></div>
            <MainTitle enText={"Checkout"} arText={"تفاصيل الطلب"} />

            <SubHeadline enText="Items Details" arText="تفاصيل عربة التسوق" />
            <NewOrderProductList
              setSuccessPromocode={setSuccessPromocode}
              successPromocode={successPromocode}
              deliveryCharge={deliveryCharge}
            />
            <div
              className="checkout-page-text"
              style={{ marginTop: "25px", marginBottom: "5px" }}
            >
              <SubHeadline
                enText={
                  areaDetails?.type === "delivery"
                    ? "Delivery For"
                    : "Pickup For"
                }
                arText={
                  areaDetails?.type === "delivery" ? "التسليم ل" : "بيك اب ل"
                }
              />
            </div>
            <BuyerDetails />
            {internationalDelivery.delivery_country_code.toLowerCase() ===
              "kw" ||
            homePageDetails?.vendor_data?.international_delivery === "3" ||
            homePageDetails?.vendor_data?.international_delivery === "" ? (
              <NewDeliveryDetails
                addressDetails={addressDetails}
                companyData={companyData}
                setShowAddress={setShowAddress}
                showAddress={showAddress}
              />
            ) : (
              <DeliveryAddressSection
                internationalDelivery={internationalDelivery}
              />
            )}
            {companyData && <NewDeliveryCompany companyData={companyData} />}
            <NewPaymentSelector
              handleSetPaymentChange={handleSetPaymentChange}
              payment={payment}
              setWidth={setWidth}
              width={width}
            />
            {cart?.show_promocode == 1 ? (
              <NewPromocode
                promocode={promocode}
                setPromocode={setPromocode}
                setApply={setApply}
                apply={apply}
                setSuccessPromocode={setSuccessPromocode}
                deliveryCharge={deliveryCharge}
              />
            ) : null}
            <NewAmountDetails
              cart={cart}
              areaDetails={areaDetails}
              language={language}
              details={homePageDetails}
              payment={payment}
              onConfirmOrder={() => {
                if (
                  internationalDelivery.delivery_country_code.toLowerCase() ===
                    "kw" ||
                  homePageDetails?.vendor_data?.international_delivery ===
                    "3" ||
                  homePageDetails?.vendor_data?.international_delivery === ""
                ) {
                  onConfirmOrder(payment);
                } else {
                  submitInternational(payment);
                }
              }}
            />
            {loading && (
              <div
                style={{
                  width: "100%",
                  height: "100vh",
                  position: "fixed",
                  top: "0",
                  left: "0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: "8",
                }}
                className="order-spinner-background"
              >
                <Spinner
                  height="50px"
                  color={homePageDetails?.vendor_data?.vendor_color}
                  size="6px"
                />
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </>
    </EstoreLayout1>
  );
};

export default MobileCheckOut;
