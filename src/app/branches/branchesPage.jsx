"use client";
import BranchDetails from "@/components/BranchesComponent/BranchDetails";
import BranchList from "@/components/BranchesComponent/BranchList";
import BackButton from "@/components/common/BackButton/BackButton";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import { Box } from "@mui/material";
import "./branchPage.css";
import { useState } from "react";

const BranchesPage = () => {
  const [branchId, setBranchId] = useState("");
  return (
    <EstoreLayout1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          position: "relative",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <BackButton />
        </Box>
        <Box>
          <BranchList setBranchId={setBranchId} />
        </Box>
        <BranchDetails branchId={branchId} setBranchId={setBranchId} />
      </Box>
    </EstoreLayout1>
  );
};

export default BranchesPage;
