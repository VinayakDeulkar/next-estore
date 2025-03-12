import { Box, Grid } from "@mui/material";
import React from "react";
import CategoryCard from "../CategoryCard/categoryCard";

const Layout13 = ({ categories }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Grid container className="gridContainer">
        {categories?.map((category) => (
          <Grid item xs={6} key={category?.id}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Layout13;
