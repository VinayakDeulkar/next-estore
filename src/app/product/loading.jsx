import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const loader = () => {
  return (
    <Box sx={{ height: "100dvh", overflow: "hidden", width: "100%" }}>
      <Grid container sx={{ width: "100vw" }}>
        <Grid item sm={12} md={12} lg={4.5} sx={{ padding: "40px" }}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={50}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={500}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={300}
          />
        </Grid>

        <Grid
          item
          sm={12}
          md={12}
          lg={7.5}
          sx={{ padding: "10px", direction: "ltr" }}
        >
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default loader;
