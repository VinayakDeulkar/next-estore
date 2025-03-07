import { Box, Grid, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Box>
      <Skeleton variant="rectangular" width={210} height={60} />
      <Grid container sx={{ marginTop: "50px" }}>
        <Grid item xs={false} sm={3} md={3}></Grid>
        <Grid item xs={12} sm={6} md={6} sx={{ position: "relative" }}></Grid>
        <Grid item xs={false} sm={3} md={3}></Grid>
      </Grid>
    </Box>
  );
}
