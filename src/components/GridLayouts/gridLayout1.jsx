import { Grid } from "@mui/material";
import React from "react";

const GridLayout1 = ({ children }) => {
  const [child1, child2] = React.Children.toArray(children);

  return (
    <Grid container>
      <Grid item xs={12} sm={4} sx={{ height: "100%", overflowY: "auto" }}>
        {child1}
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{ height: "100vh", position: "sticky", top: 0 }}
      >
        {child2}
      </Grid>
    </Grid>
  );
};

export default GridLayout1;
