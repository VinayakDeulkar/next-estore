"use client";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import Navbar from "@/components/common/Navbar/navbar";
import AccordianContactStore from "@/components/OrderPage/AccordianContactStore";
import AccordianPaymentDetails from "@/components/OrderPage/AccordianPaymentDetails";
import { AccrodianOrderDetails } from "@/components/OrderPage/AccrodianOrderDetails";
import { AppContext } from "@/context/AppContext";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import React, { useContext } from "react";
import "./newOrderStatus.css";
import CommonDeliveryStatus from "@/components/OrderPage/CommonDeliveryStatus";

const OrderPage = (props) => {
  const { vendorSlug, language } = useContext(AppContext);
  const orderDetails = props.data;
  const accordianArray = [
    {
      english: "Order Details",
      arabic: "تفاصيل الطلب",
      component: <AccrodianOrderDetails orderDetails={orderDetails} />,
    },
    {
      english: "Payments Details",
      arabic: "تفاصيل المدفوعات",
      component: <AccordianPaymentDetails orderDetails={orderDetails} />,
    },
    {
      english: "Contact Store",
      arabic: "تواصل مع المتجر",
      component: <AccordianContactStore />,
    },
  ];
  return (
    <Box>
      <Navbar />
      <GridLayout>
        {orderDetails && <CommonDeliveryStatus orderDetails={orderDetails} />}
        {/* {orderDetails ? (
          <DeliveryMapStatus
            location_coordinates={orderDetails?.location_coordinates}
            customer_details={orderDetails?.customer_details}
            payment_status={orderDetails?.payment_status}
          />
        ) : null} */}
        {orderDetails &&
          accordianArray?.map((element) => (
            <Accordion>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {language === "ltr" ? element.english : element.arabic}
              </AccordionSummary>
              <AccordionDetails>{element?.component}</AccordionDetails>
            </Accordion>
          ))}
      </GridLayout>
    </Box>
  );
};

export default OrderPage;
