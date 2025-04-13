"use client";
import BranchDetails from "@/components/BranchesComponent/BranchDetails";
import BranchList from "@/components/BranchesComponent/BranchList";
import BackButton from "@/components/common/BackButton/BackButton";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import { Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import "./branchPage.css";

const BranchesPage = () => {
  const searchParams = useSearchParams();
  const branchId = searchParams.get("branch");
  const router = useRouter();
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
          <BranchList />
        </Box>
        {branchId ? (
          <Box>
            <BranchDetails branchId={branchId} />
          </Box>
        ) : null}
      </Box>
    </EstoreLayout1>
  );
};

export default BranchesPage;
