"use client";
import BranchList from "@/components/BranchesComponent/BranchList";
import BackButton from "@/components/common/BackButton/BackButton";
import GridLayout from "@/components/common/GridLayout/gridLayout";
import HeaderBox from "@/components/common/HeaderBox/headerBox";
import "./branchPage.css";
import { Box, Dialog, DialogTitle } from "@mui/material";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BranchDetails from "@/components/BranchesComponent/BranchDetails";

const BranchesPage = () => {
  const searchParams = useSearchParams();
  const branchId = searchParams.get("branch");
  const router = useRouter();
  return (
    <Box>
      <HeaderBox />
      <GridLayout>
        <BackButton />
        <Box sx={{ marginTop: "50px" }}>
          <BranchList />
        </Box>

        {branchId ? (
          <Box>
            <BranchDetails branchId={branchId} />
          </Box>
        ) : null}
      </GridLayout>
    </Box>
  );
};

export default BranchesPage;
