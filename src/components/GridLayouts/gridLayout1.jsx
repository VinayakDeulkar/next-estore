import { Grid } from "@mui/material";
import React from "react";

const GridLayout1 = ({ children }) => {
  const [child1, child2] = React.Children.toArray(children);

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        {child1}
      </Grid>
      <Grid item xs={12} sm={8}>
        {child2}
      </Grid>
    </Grid>
  );
};

export default GridLayout1;
