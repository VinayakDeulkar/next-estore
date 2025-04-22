"use client";
import HeadLine from "@/components/assetBoxDesign/Headline/headLine";
import TextInputField from "@/components/assetBoxDesign/TextField/textInputField";
import Title from "@/components/common/Title/Title";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import "./trackorder.css";
import SubTitle from "@/components/common/SubTitle/subTitle";
import SubHeadline from "@/components/assetBoxDesign/SubHeadline/subHeadline";
import NormalText from "@/components/assetBoxDesign/NormalText/normalText";
import SmallButtonRounded from "@/components/assetBoxDesign/SmallButtonRounded/smallButtonRounded";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState();
  const { language } = useContext(AppContext);
  const router = useRouter();
  const handleSubmit = () => {
    if (trackingNumber) {
      router.push(`/order=${trackingNumber}`);
    }
  };
  return (
    <Box>
      <EstoreLayout1>
        <BackComponent />
        <div className="trackOrder-whitebox">
          <div>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <HeadLine enText={"Orders Tracker"} arText={"تعقب الطلبات"} />
            </Box>
            <div className="tracker-order-center order-tracker-image">
              <img
                src="images/delivery-packed-image.jpg"
                className="trackorder-image"
              />
            </div>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <NormalText
                enText={
                  "Track shipments and orders by entering the tracking number."
                }
                arText={"تتبع الشحنات والطلبات عن طريق إدخال رقم التتبع."}
                color="#a3a2a2"
              />
            </div>
            <div className="tracker-order-center">
              <div className="track-divider-line"></div>
            </div>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <TextInputField
                handleChange={(e) => {
                  setTrackingNumber(e.target.value);
                }}
                label={"Tracking Number Goes Here"}
                arLabel={"ضع رقم الطلب هنا لتتبعه"}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <SmallButtonRounded
                  handleClick={handleSubmit}
                  enText={"Track"}
                  arText={"تتبع الطلب"}
                  varient={"dark"}
                />
              </Box>
            </Box>
          </div>
        </div>
      </EstoreLayout1>
    </Box>
  );
};

export default TrackOrder;
