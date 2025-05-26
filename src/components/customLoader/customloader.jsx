import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";

const Customloader = ({ vendorData }) => {
  return (
    <></>
    // <Box
    //   sx={{
    //     height: "100vh",
    //     width: "100vw",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       display: "flex",
    //       justifyContent: "center",
    //       flexDirection: "column",
    //       gap: "20px",
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "center",
    //         height: "300px",
    //         width: "300px",
    //         gap: "20px",
    //         background: vendorData?.vendor_data?.vendor_color ?? "#000",
    //         borderRadius: "13px",
    //       }}
    //     >
    //       <Image
    //         src={vendorData?.vendor_data?.english_new_background}
    //         height={250}
    //         width={250}
    //       />
    //     </Box>
    //     {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
    //       <CircularProgress />
    //     </Box> */}
    //   </Box>
    // </Box>
  );
};

export default Customloader;
