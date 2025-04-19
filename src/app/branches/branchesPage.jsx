"use client";
import BranchDetails from "@/components/BranchesComponent/BranchDetails";
import BranchList from "@/components/BranchesComponent/BranchList";
import BackButton from "@/components/common/BackButton/BackButton";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import { Box } from "@mui/material";
import { useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import "./branchPage.css";

const BranchesPage = () => {
  const [branchId, setBranchId] = useState("");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      "https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=AIzaSyDK_1lc7uLQSGYHVpr0mGl-c1Zys2OPOdg",
  });
  return (
    <EstoreLayout1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Box sx={{ position: "relative", height: "74px" }}>
          <BackButton />
        </Box>
        <Box>
          <BranchList setBranchId={setBranchId} />
        </Box>
        <div
          id="drawer-container"
          style={{ position: "relative", height: "100%" }}
        ></div>
        <BranchDetails
          branchId={branchId}
          setBranchId={setBranchId}
          isLoaded={isLoaded}
        />
      </Box>
    </EstoreLayout1>
  );
};

export default BranchesPage;
