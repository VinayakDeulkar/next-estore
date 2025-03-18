import React from "react";
import ProductSquareCard from "../ProductSquareCard/productSquareCard";
import { Box, Grid } from "@mui/material";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";

const Layout12 = ({ categories }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      {categories?.map((category) => (
        <div key={category?.id} style={{paddingBottom: "35px"}}> 
          <TypographyConverter
            sx={{ fontSize: "20px", fontWeight: "500", marginBottom: "20px" }}
            arText={category?.category_name_ar}
            enText={category?.category_name}
          />
          <Grid
            container
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto", 
              gap: "75px", 
              paddingBottom: "20px",
            }}
          >
            {category?.products?.map((product) => (
              <Grid
                item
                key={product?.id}
                sx={{
                  flex: "0 0 auto", 
                  width: "250px", 
                }}
              >
                <ProductSquareCard product={product} />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </Box>
  );
};

export default Layout12;
