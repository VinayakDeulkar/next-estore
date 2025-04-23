import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";

const Customloader = ({ vendorData }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "300px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          background: vendorData?.vendor_data?.vendor_color ?? "#000",
          borderRadius: "13px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={vendorData?.vendor_data?.english_new_background}
            height={200}
            width={200}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Box>
    </Box>
  );
};

export default Customloader;
