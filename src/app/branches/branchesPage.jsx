"use client";
import BranchDetails from "@/components/BranchesComponent/BranchDetails";
import BranchList from "@/components/BranchesComponent/BranchList";
import BackButton from "@/components/common/BackButton/BackButton";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import { Box } from "@mui/material";
import { useState } from "react";
import "./branchPage.css";
import BackComponent from "@/components/BackComponent";
import HeadLine from "@/components/assetBoxDesign/Headline/headLine";

const BranchesPage = () => {
  const [branchId, setBranchId] = useState("");

  return (
    <EstoreLayout1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          height: "calc(100vh - 56px)",
        }}
      >
        <BackComponent backClick={() => router.push("/")} />
        <HeadLine enText="Branches" arText="الفروع" />
        <Box>
          <BranchList setBranchId={setBranchId} />
        </Box>

        <BranchDetails branchId={branchId} setBranchId={setBranchId} />
      </Box>
    </EstoreLayout1>
  );
};

export default BranchesPage;
