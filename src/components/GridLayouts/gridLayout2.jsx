import { Grid } from "@mui/material";
import React from "react";

const GridLayout2 = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={0} sm={2}></Grid>
      <Grid item xs={0} sm={8}>{children}</Grid>
      <Grid item xs={0} sm={2}></Grid>
    </Grid>
  );
};

export default GridLayout2;
