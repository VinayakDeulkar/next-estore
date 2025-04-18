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

const Layout14 = ({ categories }) => {
  const [toggleView, setToggleView] = useState(false);

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
              <HeadLine
                arText={category?.category_name_ar}
                enText={category?.category_name}
              />
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
          onClick={() => setToggleView(!toggleView)}
        >
          <NormalText enText={"Change View"} arText={"تغيير العرض"} />
          {toggleView ? <WindowIcon /> : <ListIcon sx={{ fontSize: 30 }} />}
        </div>
      </div>
      {toggleView ? listView() : boxView()}
    </>
  );
};

export default Layout14;
