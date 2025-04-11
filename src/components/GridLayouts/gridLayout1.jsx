import { Grid } from "@mui/material";
import React from "react";

const GridLayout1 = ({ children }) => {
  const [child1, child2] = React.Children.toArray(children);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          height: "100%",
          overflowY: "auto",
          order: window.innerWidth < 991 ? 2 : 1,
        }}
      >
        {child1}
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          height: window.innerWidth > 991 ? "100vh" : "40vh",
          position: window.innerWidth > 991 ? "sticky" : "relative",
          top: 0,
          order: window.innerWidth < 991 ? 1 : 2,
        }}
      >
        {child2}
      </Grid>
    </Grid>
  );
};

export default GridLayout1;
