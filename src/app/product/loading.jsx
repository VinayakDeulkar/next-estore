import GridLayout from "@/components/common/GridLayout/gridLayout";
import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const loader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={50}
      />
      <GridLayout>
        <Box>
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
        </Box>
      </GridLayout>
    </Box>
  );
};

export default loader;
