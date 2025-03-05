import { Box, Drawer } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../Navbar/navbar";

const HeaderBox = () => {
  const [open, setOpen] = useState(true);
  return (
    <Box sx={{ position: "relative" }}>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="left"
        sx={{
          width: "40vw",
        }}
      >
        <Box
          sx={{
            width: "30vw",
          }}
        >
          Hello
        </Box>
      </Drawer>
      <Navbar />
    </Box>
  );
};

export default HeaderBox;
