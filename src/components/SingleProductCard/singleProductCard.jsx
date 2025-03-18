import { Card } from "@mui/material";
import React from "react";

const SingleProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        cursor: "pointer",
        boxShadow: "none",
        width: "100%",
      }}
    ></Card>
  );
};

export default SingleProductCard;
