"use client";
import SubHeadline from "@/components/assetBoxDesign/SubHeadline/subHeadline";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import AccordianContactStore from "@/components/OrderPage/AccordianContactStore";
import AccordianPaymentDetails from "@/components/OrderPage/AccordianPaymentDetails";
import { AccrodianOrderDetails } from "@/components/OrderPage/AccrodianOrderDetails";
import CommonDeliveryStatus from "@/components/OrderPage/CommonDeliveryStatus";
import DeliveryMapStatus from "@/components/OrderPage/DeliveryMapStatus";
import { AppContext } from "@/context/AppContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import "./newOrderStatus.css";
import { changeArea, getScheduleTime } from "@/apis";
import moment from "moment";

const OrderPage = (props) => {
  const {
    language,
    homePageDetails,
    userDetails,
    handleAddressDetailsChange,
    areaDetails,
    vendorSlug,
    handleAreaDetailsChange,
  } = useContext(AppContext);
  const orderDetails = props.data;
  const router = useRouter();
  const accordianArray = [
    {
      english: "Order Details",
      arabic: "تفاصيل الطلب",
      component: <AccrodianOrderDetails orderDetails={orderDetails} />,
    },
    {
      english: "Payment Details",
      arabic: "تفاصيل عملية الدفع",
      component: <AccordianPaymentDetails orderDetails={orderDetails} />,
    },
    {
      english: "Contact Store",
      arabic: "تواصل مع المتجر",
      component: <AccordianContactStore />,
    },
  ];

  const renderMainPage = async () => {
    const addressData = userDetails?.address?.find(
      (addr) => addr?.title === orderDetails?.customer_details?.title
    );
    if (addressData) {
      handleAddressDetailsChange((prev) => ({
        ...prev,
        addressName: addressData?.addressName ?? addressData?.title,
        id: addressData.id,
        area_id: addressData.area_id,
        block: addressData.block,
        street: addressData.street,
        avenue: addressData.avenue,
        house: addressData?.house_number ?? addressData?.house,
        floor: addressData.floor_number ?? addressData.floor,
        flat: addressData.flat_number ?? addressData.flat,
        lat: addressData.latitude ?? addressData.lat,
        lng: addressData.longitude ?? addressData.lng,
        fixedLat: addressData.latitude ?? addressData.lat,
        fixedLng: addressData.longitude ?? addressData.lng,
        addressType: addressData?.address_type,
        special_directions: addressData?.special_directions,
        is_primary: addressData?.is_primary,
      }));
      const addedAddress = [];
      areaDetails.data.governarate.forEach((address) => {
        const foundAddress = address.area.find(
          (area) => area.area_id == addressData.area_id
        );
        if (foundAddress) {
          addedAddress.push(foundAddress);
        }
      });
      const changeAreaResponse = await changeArea({
        vendors_id: homePageDetails?.vendor_data?.vendors_id,
        area_id: addressData.area_id,
        vendorSlug: vendorSlug?.data?.ecom_url_slug,
        user_string: localStorage.getItem("userID"),
      });
      if (changeAreaResponse.status === true) {
        if (changeAreaResponse.data.show_popup === 0) {
          const timeResponse = await getScheduleTime({
            vendors_id: homePageDetails?.vendor_data?.vendors_id,
            area_id: addressData.area_id,
            vendorSlug: vendorSlug?.data?.ecom_url_slug,
          });
          if (timeResponse.status) {
            let selectedBranch = timeResponse.data.branch;
            let activeBranch = areaDetails?.data?.branch?.filter(
              (branch) => branch?.id == selectedBranch?.id
            )[0];
            let estimationTime =
              timeResponse.data?.delivery_details?.delivery_expected_type != 6
                ? timeResponse.data?.delivery_details?.delivery_expected_time
                : 0;
            if (
              timeResponse.data.time == 1 &&
              addedAddress[0].availability_status == 1
            ) {
              handleAreaDetailsChange((k) => ({
                ...k,
                area: addedAddress[0].area_name,
                minimum: addedAddress[0].minimum_charge,
                shopOpen: timeResponse.data.time,
                now: timeResponse.data.time,
                branch: "",
                ar_branch: "",
                ar_area: addedAddress[0].area_name_ar,
                area_id: addedAddress[0].area_id,
                deliveryTiming: timeResponse.data.schedule_time,
                ar_deliveryTiming: timeResponse.data.schedule_time_ar,
                customDelivery:
                  timeResponse.data?.delivery_details?.delivery_expected_type ==
                  6,

                getDeliveryTiming: moment()
                  .add(estimationTime, "minutes")
                  .toDate(),
                laterDeliveryTiming: moment()
                  .add(estimationTime, "minutes")
                  .toDate(),
                branchForArea: {
                  ...timeResponse.data.branch,
                  end:
                    activeBranch?.office_end_time >
                    activeBranch?.office_start_time
                      ? moment(activeBranch?.office_end_time, "HH:mm:ss")
                      : moment(activeBranch?.office_end_time, "HH:mm:ss").add(
                          1,
                          "days"
                        ),
                  start: moment(activeBranch?.office_start_time, "HH:mm:ss"),
                },
              }));
            } else {
              handleAreaDetailsChange((l) => ({
                ...l,
                area: addedAddress[0].area_name,
                minimum: addedAddress[0].minimum_charge,
                shopOpen:
                  addedAddress[0].availability_status == 1
                    ? timeResponse.data.time
                    : 2,
                now:
                  addedAddress[0].availability_status == 1
                    ? timeResponse.data.time
                    : 2,
                ar_area: addedAddress[0].area_name_ar,
                area_id: addedAddress[0].area_id,
                branch: "",
                ar_branch: "",
                deliveryTiming: timeResponse?.data?.schedule_time,
                ar_deliveryTiming: timeResponse?.data?.schedule_time_ar,
                customDelivery:
                  timeResponse.data?.delivery_details?.delivery_expected_type ==
                  6,
                getDeliveryTiming:
                  addedAddress[0].availability_status == 1 ||
                  timeResponse.data.time == 2
                    ? moment(
                        timeResponse.data.preorder_on,
                        "YYYY-MM-DD HH:mm:ss"
                      ).toDate()
                    : moment().add(estimationTime, "minutes").toDate(),
                laterDeliveryTiming:
                  addedAddress[0].availability_status == 1 ||
                  timeResponse.data.time == 2
                    ? moment(
                        timeResponse.data.preorder_on,
                        "YYYY-MM-DD HH:mm:ss"
                      ).toDate()
                    : moment().add(estimationTime, "minutes").toDate(),
                branchForArea: {
                  ...timeResponse.data.branch,
                  end:
                    activeBranch?.office_end_time >
                    activeBranch?.office_start_time
                      ? moment(activeBranch?.office_end_time, "HH:mm:ss")
                      : moment(activeBranch?.office_end_time, "HH:mm:ss").add(
                          1,
                          "days"
                        ),
                  start: moment(activeBranch?.office_start_time, "HH:mm:ss"),
                },
              }));
            }
          }
        }
      }
      router.push("/");
    } else {
      router.push("/");
    }
  };

  return (
    <Box sx={{ height: "100dvh" }}>
      <EstoreLayout1>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            {orderDetails && (
              <CommonDeliveryStatus orderDetails={orderDetails} />
            )}
          </div>
          <div>
            {orderDetails ? (
              <DeliveryMapStatus
                location_coordinates={orderDetails?.location_coordinates}
                customer_details={orderDetails?.customer_details}
                payment_status={orderDetails?.payment_status}
              />
            ) : null}
          </div>
          <div>
            {orderDetails &&
              accordianArray?.map((element) => (
                <Accordion
                  key={element?.english}
                  sx={{
                    "&:before": {
                      display: "none !important",
                    },
                    boxShadow: "none",
                    border: "none",
                    "&.Mui-expanded": {
                      margin: "auto",
                      boxShadow: "none",
                      borderBottom: "none",
                    },
                    borderBottom: "0.25px solid #ccc",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      padding: 0,
                    }}
                  >
                    <SubHeadline
                      enText={element?.english}
                      arText={element?.arabic}
                    />
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    {element?.component}
                  </AccordionDetails>
                </Accordion>
              ))}
          </div>
          <div
            className="order-status-reorder-button-div"
            style={{ marginTop: "20px" }}
          >
            <div
              className={`pay-now-button ${
                homePageDetails?.vendor_data?.home_page_type === "18" &&
                "fashion-theme-pay-button"
              }`}
              onClick={async () => {
                if (orderDetails?.payment_status === "1") {
                  renderMainPage();
                } else if (orderDetails?.has_register_item && cart) {
                  router.push("/checkout");
                } else {
                  renderMainPage();
                }
              }}
            >
              {orderDetails?.payment_status === "1"
                ? language === "ltr"
                  ? "Browse More"
                  : "تسوّق"
                : orderDetails?.has_register_item && cart
                ? language == "ltr"
                  ? "Checkout"
                  : "متابعة الطلب"
                : language === "ltr"
                ? "Try again"
                : "حاول مرة أُخرى"}
            </div>
          </div>
        </Box>
      </EstoreLayout1>
    </Box>
  );
};

export default OrderPage;
