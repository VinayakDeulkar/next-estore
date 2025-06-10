"use client";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import { Box } from "@mui/material";
import React from "react";

const Order = () => {
  return (
    <Box>
      <HeaderBox />
      <GridLayout
        backgroundColor={"#fff"}
        padding={"20px"}
        sx={{ height: "calc(100dvh - 50px)" }}
      >
        <Box></Box>
      </GridLayout>
    </Box>
  );
};

export default Order;
