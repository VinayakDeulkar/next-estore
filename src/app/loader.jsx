import GridLayout from "@/components/common/GridLayout/gridLayout";
import { Box, Grid, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <Box>
      <Skeleton variant="rectangular" width={210} height={60} />
      <GridLayout></GridLayout>
    </Box>
  );
}
