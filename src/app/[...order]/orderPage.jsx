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

const OrderPage = (props) => {
  const { language, homePageDetails } = useContext(AppContext);
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
  return (
    <Box sx={{ height: "100vh" }}>
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
                    sx={{ padding: 0 }}
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
                  router.push("/");
                } else if (orderDetails?.has_register_item && cart) {
                  router.push("/checkout");
                } else {
                  router.push("/");
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
