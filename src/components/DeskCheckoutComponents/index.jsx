import { Box } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import UserDetails from "./UserDetails/userDetails";
import AddressDetails from "./AddressDetails/AddressDetails";
import PaymentDetails from "./PaymentDetails/PaymentDetails";
import { AppContext } from "@/context/AppContext";

const DeskCheckoutComponents = ({
  showPaymentMethod,
  showAddressComponents,
  selectAddress,
  setSelectAddress,
  triggerDeliveryAddress,
  triggerPaymentMethod,
}) => {
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
    </Box>
  );
};

export default DeskCheckoutComponents;
