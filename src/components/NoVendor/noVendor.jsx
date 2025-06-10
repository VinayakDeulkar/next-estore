import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const NoVendor = () => {
  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={"images/underConstruction.png"} />
    </Box>
  );
};

export default NoVendor;
