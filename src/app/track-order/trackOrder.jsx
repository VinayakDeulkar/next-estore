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
import BackComponent from "@/components/BackComponent";
import { motion } from "framer-motion";
import SmallButtonSquare from "@/components/assetBoxDesign/SmallButtonSquare/smallButtonSquare";
import CrossIcon from "@/SVGs/CrossIcon";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState();
  const { language } = useContext(AppContext);
  const router = useRouter();
  const handleSubmit = () => {
    if (trackingNumber) {
      router.push(`/order=${trackingNumber}`);
    }
  };

  console.log(trackingNumber, "trackingNumbertrackingNumber");
  return (
    <Box>
      <EstoreLayout1>
        <BackComponent backClick={() => router.push("/")} />
        <div className="trackOrder-whitebox">
          <div>
            <HeadLine enText={"Orders Tracker"} arText={"تتبع الطلبات"} />

            <div style={{ margin: "8px 0 20px" }}>
              <NormalText
                enText={
                  "Track shipments and orders by entering the tracking number."
                }
                arText={"تتبع الشحنات والطلبات عن طريق إدخال رقم التتبع."}
              />
            </div>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "25px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: "20px" }}
                animate={{ opacity: 1, y: "0px" }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <div
                  className="tracker-order-center"
                  style={{ position: "relative" }}
                >
                  <input
                    type="text"
                    onChange={(e) => {
                      setTrackingNumber(e.target.value);
                    }}
                    className="order-tracker-input-field"
                    placeholder={
                      language === "ltr"
                        ? "Tracking Number Goes Here"
                        : "ضع رقم الطلب هنا لتتبعه"
                    }
                    style={{ fontSize: "16px", borderRadius: "5px" }}
                  />
                </div>
              </motion.div>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <motion.div
                  initial={{ opacity: 0, y: "20px" }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{ duration: 0.2, delay: 0.4 }}
                >
                  <SmallButtonSquare
                    handleClick={handleSubmit}
                    enText={"Track"}
                    arText={"تتبع الطلب"}
                    varient={"dark"}
                    fontWeight="300"
                    width="85px"
                  />
                </motion.div>
              </Box>
            </Box>
          </div>
        </div>
      </EstoreLayout1>
    </Box>
  );
};

export default TrackOrder;
