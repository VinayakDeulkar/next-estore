import React, { useContext } from "react";
import { useState } from "react";
import NormalText from "../assetBoxDesign/NormalText/normalText";
import WindowIcon from "@mui/icons-material/Window";
import ListIcon from "@mui/icons-material/List";
import CategoryCard from "../CategoryCard/categoryCard";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
} from "@mui/material";
import HeadLine from "../assetBoxDesign/Headline/headLine";
import HorizontalCard from "../HorizontalCard/horizontalCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AppContext } from "@/context/AppContext";

const Layout14 = ({ categories }) => {
  const { language, layout14ToggleView, handleSetLayout14ToggleViewChange } = useContext(AppContext);

  const boxView = () => {
    return (
      <Box
        sx={{
          backgroundColor: "#fff",
          width: "100%",
          borderRadius: "8px",
        }}
      >
        {console.log(categories, "first")}
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

  const listView = () => {
    return (
      <>
        {categories?.map((category) => (
          <Accordion
            sx={{
              mb: 2,
              borderRadius: "10px !important",
              boxShadow: "none",
              padding: 0,
            }}
            key={category?.category_id}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ fontSize: "36px", fill: "#000" }} />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ padding: 0 }}
            >
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center",width: "100%"}}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <img
                    src={category?.category_image}
                    alt={category?.category_name}
                    style={{
                      height: "75px",
                      width: "75px",
                      borderRadius: "8px",
                    }}
                  />
                  <div style={{ fontSize: "22px", fontWeight: "500" }}>
                    {language === "ltr"
                      ? category?.category_name
                      : category?.category_name_ar}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    border: "1px solid #000",
                    padding: "0 18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "15px",
                  }}
                >
                  {category?.products?.length}
                </div>
              </div>
            </AccordionSummary>
            {category?.is_subcategory ? (
              <Grid container spacing={4}>
                {category?.products?.map((product) => (
                  <Grid item xs={12} key={product?.category_id}>
                    <CategoryCard category={product} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <AccordionDetails sx={{ padding: 0 }}>
                <Grid container spacing={1}>
                  {category?.products?.map((product) => (
                    <Grid item xs={12} key={product?.id}>
                      <HorizontalCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            )}
          </Accordion>
        ))}
      </>
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          width: "auto",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleSetLayout14ToggleViewChange(!layout14ToggleView)}
        >
          <NormalText enText={"Change View"} arText={"تغيير العرض"} />
          {layout14ToggleView ? <WindowIcon /> : <ListIcon sx={{ fontSize: 30 }} />}
        </div>
      </div>
      {layout14ToggleView ? listView() : boxView()}
    </>
  );
};

export default Layout14;
