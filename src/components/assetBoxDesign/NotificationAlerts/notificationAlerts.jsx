import { Box } from "@mui/material";
import React from "react";
import SubHeadline from "../SubHeadline/subHeadline";
import NormalText from "../NormalText/normalText";

const NotificationAlerts = ({
  enHeadTitle,
  arHeadTitle,
  enAlert,
  arAlert,
  blueLink,
  arBlueLink,
}) => {
  return (
    <Box
      sx={{
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <SubHeadline enText={enHeadTitle} arText={arHeadTitle} />
        <NormalText enText={enAlert} arText={arAlert} />
        {blueLink ? (
          <NormalText enText={blueLink} arText={arBlueLink} color="#0096E1" />
        ) : null}
      </Box>
    </Box>
  );
};

export default NotificationAlerts;
