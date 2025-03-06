import { AppContext } from "@/context/AppContext";
import { Box, Card, Tab, Tabs } from "@mui/material";
import React, { useContext } from "react";

const OrderType = () => {
  const { language } = useContext(AppContext);

  return (
    <Box sx={{ padding: "10px" }}>
      <Card sx={{ boxShadow: "none", padding: "10px 20px" }}>
        <Box>
          <Tabs>
            <Tab label={language === "ltr" ? "Delivery" : ""} />
            <Tab label={language === "ltr" ? "Pickup" : ""} />
          </Tabs>
        </Box>
      </Card>
    </Box>
  );
};

export default OrderType;
