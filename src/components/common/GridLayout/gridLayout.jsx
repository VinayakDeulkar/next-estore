import { Grid } from "@mui/material";
import React from "react";

const GridLayout = ({
  children,
  margin = "50px",
  backgroundColor,
  padding,
  sx,
}) => {
  return (
    <Grid container sx={{ marginTop: margin ,...sx }}>
      <Grid item xs={false} sm={3} md={3}></Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{
          position: "relative",
          backgroundColor: backgroundColor,
          padding: padding,
        }}
      >
        {children}
      </Grid>
      <Grid item xs={false} sm={3} md={3}></Grid>
    </Grid>
  );
};

export default GridLayout;
