import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import UserDetails from "./UserDetails/userDetails";
import AddressDetails from "./AddressDetails/AddressDetails";
import PaymentDetails from "./PaymentDetails/PaymentDetails";

const DeskCheckoutComponents = () => {
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [showAddressComponents, setShowAddressComponents] = useState(false);
  const triggerDeliveryAddress = () => {
    setShowAddressComponents(true);
  };
  const triggerPaymentMethod = () => {
    setShowPaymentMethod(true);
  };
  return (
    <Box
      sx={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <UserDetails
        triggerDeliveryAddress={triggerDeliveryAddress}
        showAddressComponents={showAddressComponents}
      />
      {showAddressComponents ? (
        <AddressDetails
          showPaymentMethod={showPaymentMethod}
          triggerPaymentMethod={triggerPaymentMethod}
        />
      ) : null}
      {showPaymentMethod ? <PaymentDetails /> : null}
    </Box>
  );
};

export default DeskCheckoutComponents;
