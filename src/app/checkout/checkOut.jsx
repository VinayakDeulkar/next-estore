"use client";
import { getDeliveryCompanies } from "@/apis";
import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import Spinner from "@/components/common/Spinner/spinner";
import NewDeliveryCompany from "@/components/NewDeliveryCompany/newDeliveryCompany";
import BuyerDetails from "@/components/NewOrderDetailsPage/Components/BuyerDetails";
import NewAmountDetails from "@/components/NewOrderDetailsPage/Components/NewAmountDetails";
import NewDeliveryDetails from "@/components/NewOrderDetailsPage/Components/NewDeliveryDetails";
import NewPaymentSelector from "@/components/NewOrderDetailsPage/Components/NewPaymentSelector";
import NewPromocode from "@/components/NewOrderDetailsPage/Components/NewPromocode";
import NewOrderProductList from "@/components/NewOrderProductList/NewOrderProductList";
import { mapArea } from "@/constants/areaConstant";
import { AppContext } from "@/context/AppContext";
import { useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const CheckOut = () => {
  const {
    vendorSlug,
    homePageDetails,
    userDetails,
    language,
    cart,
    setCart,
    addressDetails,
    setAddressDetails,
    contactDetails,
    areaDetails,
    payment,
    setPayment,
    internationalDelivery,
  } = useContext(AppContext);
  const router = useRouter();

  const [apply, setApply] = useState("");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState(false);
  const [popup, setPopup] = useState({ show_popup: 0 });
  const [notServing, setNotServing] = useState(0);
  const [deliveryKm, setDeliveryKm] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [showAddress, setShowAddress] = useState(false);
  const [successPromocode, setSuccessPromocode] = useState("");
  const [companyData, setCompanyData] = useState();
  const [width, setWidth] = useState(0);
  const [promocode, setPromocode] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      "https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=AIzaSyDK_1lc7uLQSGYHVpr0mGl-c1Zys2OPOdg", // Replace with your Google Maps API key
  });

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
      setOpenArea((prev) => ({ open: true, goHome: false }));
      // history.push(`/area`);
    } else if (
      internationalDelivery.delivery_country_code.toLowerCase() !== "kw" &&
      internationalDelivery.delivery_address1 == "" &&
      internationalDelivery.delivery_address2 == ""
    ) {
      history.push("/delivery-address");
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
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedPlaceName}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
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

  return checkAllCondition() ? (
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
      >
        {/* <BackComponent /> */}
      </div>
      <CommonHeader
        englishHeader="Checkout"
        arabicHeader="تفاصيل الطلب"
        fontWeight={600}
      />
      <div
        className="checkout-page-text"
        style={{ marginTop: "5px", marginBottom: "10px" }}
      >
        {language === "ltr" ? "Items Details" : "تفاصيل عربة التسوق"}
      </div>
      <NewOrderProductList
        setSuccessPromocode={setSuccessPromocode}
        successPromocode={successPromocode}
        deliveryCharge={deliveryCharge}
      />
      <div
        className="checkout-page-text"
        style={{ marginTop: "25px", marginBottom: "5px" }}
      >
        {areaDetails?.type === "delivery"
          ? language === "ltr"
            ? "Delivery For"
            : "التسليم ل"
          : language === "ltr"
          ? "Pickup For"
          : "بيك اب ل"}
      </div>
      <BuyerDetails />
      {internationalDelivery.delivery_country_code.toLowerCase() === "kw" ||
      homePageDetails?.vendor_data?.international_delivery === "3" ||
      homePageDetails?.vendor_data?.international_delivery === "" ? (
        <NewDeliveryDetails
          addressDetails={addressDetails}
          companyData={companyData}
          setShowAddress={setShowAddress}
          showAddress={showAddress}
        />
      ) : (
        <DeliveryAddressSection internationalDelivery={internationalDelivery} />
      )}
      {companyData && <NewDeliveryCompany companyData={companyData} />}
      <NewPaymentSelector
        setPayment={setPayment}
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
            homePageDetails?.vendor_data?.international_delivery === "3" ||
            homePageDetails?.vendor_data?.international_delivery === ""
          ) {
            onConfirmOrder(payment);
          } else {
            submitInternational(payment);
          }
          // }
        }}
      />
      {/* {popup?.show_popup == 1 && (
        <CheckoutModal popup={popup} setPopup={setPopup}></CheckoutModal>
      )} */}
      {/* {notServing == 1 ? <DeliveryNotServing /> : null}
      {note && <ModalClosed note={note} setNote={setNote}></ModalClosed>} */}
      {/* {showAddress &&
      userDetails?.address?.length > 0 &&
      areaDetails?.type !== "pickup" ? (
        <BottomDrawer
          type="checkout"
          onClick={() => setShowAddress(false)}
          hideAddress={() => {
            setShowAddress(false);
          }}
        />
      ) : null} */}
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
            color={details?.vendor?.vendor_color}
            size="6px"
          />
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default CheckOut;
