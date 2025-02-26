"use client";
import SquareCard from "@/components/SquareCard/squareCard";
import TypographyConverter from "@/components/common/TypographyConveter/TypographyConverter";
import { AppContext } from "@/context/AppContext";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useEffect } from "react";

const Homepage = () => {
  const { vendorSlug, homePageDetails } = useContext(AppContext);

  return (
    <Grid container>
      <Grid item xs={false} sm={3} md={3}></Grid>

      <Grid item xs={12} sm={6} md={6}>
        <Grid container spacing={3}>
          {homePageDetails?.categories?.map((category, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ padding: "25px 50px", borderRadius: "8px" }}>
                <CardContent
                  sx={{
                    padding: "0",
                    "&:last-child": {
                      paddingBottom: "0",
                    },
                  }}
                >
                  <TypographyConverter
                    sx={{ marginBottom: "25px" }}
                    en_text={category?.category_name}
                    ar_text={category?.category_name}
                    variant="h5"
                  />
                  <Grid container spacing={5}>
                    {category?.products?.map((product, index) => (
                      <Grid item xs={6} key={index}>
                        <Card
                          sx={{
                            cursor: "pointer",
                            boxShadow: "none",
                            width: "100%",
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={product.image}
                            alt={product.name}
                            style={{
                              maxWidth: "100%",
                              height: "200px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              marginBottom: "10px",
                            }}
                          />
                          <CardContent
                            sx={{
                              padding: "0",
                              "&:last-child": {
                                paddingBottom: "0",
                              },
                            }}
                          >
                            <Typography>{product?.product_name}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={false} sm={3} md={3}></Grid>
    </Grid>
  );
};

export default Homepage;
