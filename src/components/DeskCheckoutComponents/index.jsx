import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import UserDetails from "./UserDetails/userDetails";
import AddressDetails from "./AddressDetails/AddressDetails";
import PaymentDetails from "./PaymentDetails/PaymentDetails";

const DeskCheckoutComponents = () => {
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [showAddressComponents, setShowAddressComponents] = useState(false);
  const [selectAddress, setSelectAddress] = useState(false);
  const [deliveryKm, setDeliveryKm] = useState();

  const triggerDeliveryAddress = () => {
    setShowAddressComponents(true);
  };
  const triggerPaymentMethod = () => {
    setShowPaymentMethod(true);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <UserDetails
        triggerDeliveryAddress={triggerDeliveryAddress}
        showAddressComponents={showAddressComponents}
        setSelectAddress={setSelectAddress}
        triggerPaymentMethod={triggerPaymentMethod}
      />
      {showAddressComponents ? (
        <AddressDetails
          showPaymentMethod={showPaymentMethod}
          triggerPaymentMethod={triggerPaymentMethod}
          selectAddress={selectAddress}
          setDeliveryKm={setDeliveryKm}
          
        />
      ) : null}
      {showPaymentMethod ? <PaymentDetails deliveryKm={deliveryKm} /> : null}
    </Box>
  );
};

export default DeskCheckoutComponents;
