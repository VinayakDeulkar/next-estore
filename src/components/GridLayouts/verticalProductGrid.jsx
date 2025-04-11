import { Grid } from "@mui/material";
import React from "react";

const VerticalProductGrid = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        {children}
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default VerticalProductGrid;
