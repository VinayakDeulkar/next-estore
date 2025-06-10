import { Grid } from "@mui/material";
import React from "react";

const HorizontalProductGrid = ({ children }) => {
  const [child1, child2] = React.Children.toArray(children);

  return (
    <Grid
      container
      style={{ height: "calc(100dvh - 80px)", overflow: "hidden" }}
    >
      <Grid item xs={6}>
        {child1}
      </Grid>
      <Grid
        item
        xs={6}
        sx={{ height: "calc(100dvh - 120px)", overflow: "scroll" }}
      >
        {child2}
      </Grid>
    </Grid>
  );
};

export default HorizontalProductGrid;
