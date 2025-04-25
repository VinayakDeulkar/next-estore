import { AppContext } from "@/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import DetailsCommon from "./DetailsCommon";

const AccordianPaymentDetails = ({ orderDetails }) => {
  const { language } = useContext(AppContext);
  const [finalTransaction, setFinalTransaction] = useState();

  useEffect(() => {
    if (orderDetails) {
      let transaction_Data = [
        {
          english_value: "Total Amount",
          arabic_value: "المبلغ الإجمالي",
          value: orderDetails?.total_amount,
          is_amount: true,
        },
        {
          english_value:
            orderDetails?.payment_status === "1"
              ? "Paid By"
              : "Payment Trial By",
          arabic_value:
            orderDetails?.payment_status === "1"
              ? "المدفوعة بواسطة"
              : "تجربة الدفع بواسطة",
          value: orderDetails?.payment_method,
          is_payment_type: true,
        },
        {
          english_value: "Transaction Date",
          arabic_value: "تاريخ الصفقة",
          value: orderDetails?.payment_date,
          is_Date: true,
        },
        {
          english_value: "Transaction No.",
          arabic_value: "رقم التحويلة",
          value: orderDetails?.transaction_number,
        },
        {
          english_value: "Auth No.",
          arabic_value: "رقم المصادقة",
          value: orderDetails?.knet_auth,
        },
        {
          english_value: "Tracking ID",
          arabic_value: "معرف التتبع",
          value: orderDetails?.tracking_number,
        },
        {
          english_value: "Reference ID",
          arabic_value: "الرقم المرجعي",
          value: orderDetails?.reference_number,
        },
      ];

      if (orderDetails && orderDetails?.knet_payment_id) {
        const index = transaction_Data.findIndex(
          (item) => item.english_value === "Transaction Date"
        );
        transaction_Data.splice(index + 1, 0, {
          english_value: "Payment ID",
          arabic_value: "معرف الدفع",
          value: orderDetails?.knet_payment_id,
        });
      }

      if (
        orderDetails &&
        orderDetails?.payment_method !== "3" &&
        !orderDetails?.has_register_item
      ) {
        transaction_Data.push({
          english_value: "Payment Status",
          arabic_value: "حالة الدفع",
          value:
            orderDetails?.payment_status === "1"
              ? language === "ltr"
                ? "Received"
                : "تلقى"
              : language === "ltr"
              ? "Unsuccessful"
              : "غير ناجحة",
        });
      }
      setFinalTransaction(transaction_Data);
    }
  }, [orderDetails]);

  return (
    <div
      style={{
        border: "1px solid #e1e1e1",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      {finalTransaction &&
        finalTransaction.map((row, i) => <DetailsCommon key={i} data={row} />)}
    </div>
  );
};

export default AccordianPaymentDetails;
