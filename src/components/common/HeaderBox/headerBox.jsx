import { Box, Drawer } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../Navbar/navbar";

const HeaderBox = () => {
  const [open, setOpen] = useState(false);
  const handleDrawar = () => {
    setOpen(true);
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
        <Box
          sx={{
            width: "30vw",
          }}
        >
          Hello
        </Box>
      </Drawer>
      <Navbar handleDrawar={handleDrawar} />
    </Box>
  );
};

export default HeaderBox;
