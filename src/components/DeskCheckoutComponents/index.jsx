import { Box } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import UserDetails from "./UserDetails/userDetails";
import AddressDetails from "./AddressDetails/AddressDetails";
import PaymentDetails from "./PaymentDetails/PaymentDetails";
import { AppContext } from "@/context/AppContext";

const DeskCheckoutComponents = () => {
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [showAddressComponents, setShowAddressComponents] = useState(false);
  const [selectAddress, setSelectAddress] = useState(false);

  const triggerDeliveryAddress = () => {
    setShowAddressComponents(true);
  };
  const triggerPaymentMethod = (value) => {
    setShowPaymentMethod(value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
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
        />
      ) : null}
      {showPaymentMethod ? <PaymentDetails /> : null}
    </Box>
  );
};

export default DeskCheckoutComponents;
