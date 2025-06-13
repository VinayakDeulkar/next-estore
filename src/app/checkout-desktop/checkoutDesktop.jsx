"use client";
import BackComponent from "@/components/BackComponent";
import DeskCheckoutComponents from "@/components/DeskCheckoutComponents";
import PaymentDetails from "@/components/DeskCheckoutComponents/PaymentDetails/PaymentDetails";
import NewOrderProductList from "@/components/NewOrderProductList/NewOrderProductList";
import HeadLine from "@/components/assetBoxDesign/Headline/headLine";
import SubHeadline from "@/components/assetBoxDesign/SubHeadline/subHeadline";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import MenuDrawer from "@/components/common/menuDrawer/MenuDrawer";
import { AppContext } from "@/context/AppContext";
import { Box, Grid } from "@mui/material";
import { LoadScript, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const CheckoutDesktop = () => {
  const { userDetails, handleUserDetailsChange, language } =
    useContext(AppContext);
  const router = useRouter();
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
    <>
      <Grid
        container
        sx={{
          height: "100dvh",
          padding: "20px",
          width: "100%",
        }}
      >
        <Grid item xs={0} sm={2.1}>
          {/* For Aligment */}
        </Grid>
        <Grid item xs={0} sm={3.5} className="checkoutScroll">
          <HeaderBox hidePadding />
          <BackComponent
            backClick={() => {
              if (userDetails?.is_guest) {
                handleUserDetailsChange((prev) => ({
                  ...prev,
                  is_guest: false,
                }));
              } else {
                router.push("/");
              }
            }}
          />
          <div style={{ marginBottom: "30px" }}>
            <HeadLine enText={"Checkout"} arText={"تفاصيل الطلب"} />
          </div>
          <DeskCheckoutComponents
            showPaymentMethod={showPaymentMethod}
            showAddressComponents={showAddressComponents}
            selectAddress={selectAddress}
            setSelectAddress={setSelectAddress}
            triggerDeliveryAddress={triggerDeliveryAddress}
            triggerPaymentMethod={triggerPaymentMethod}
          />
        </Grid>
        <Grid item xs={0} sm={0.5}>
          {/* For Aligment */}
        </Grid>
        <Grid
          item
          xs={0}
          sm={3.7}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            padding: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          }}
        >
          <div>
            <SubHeadline enText="Items Details" arText="تفاصيل عربة التسوق" />
            <NewOrderProductList />
          </div>
          {showPaymentMethod ? <PaymentDetails /> : null}
        </Grid>
        <Grid item xs={0} sm={2}>
          {/* For Aligment */}
        </Grid>
      </Grid>
    </>
  );
};

export default CheckoutDesktop;
