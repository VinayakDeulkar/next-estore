import { AppContext } from "@/context/AppContext";
import { Grid } from "@mui/material";
import React, { useContext } from "react";

const GridLayout1 = ({ children }) => {
  const [child1, child2] = React.Children.toArray(children);

  const gridOneStyle = () => {
    return window.innerWidth > 990
      ? { height: "100%", overflowY: "auto", order: 1 }
      : { height: "100%", overflowY: "auto", order: 2 };
  };

  const gridTwoStyle = () => {
    return window.innerWidth > 990
      ? { height: "100dvh", position: "sticky", top: 0, order: 2 }
      : { height: "40vh", position: "relative", order: 1 };
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={4} style={gridOneStyle()}>
        {child1}
      </Grid>
      <Grid item xs={12} sm={8} style={gridTwoStyle()}>
        {child2}
      </Grid>
    </Grid>
  );
};

export default GridLayout1;
