import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";
import HorizontalCard from "../HorizontalCard/horizontalCard";

const Layout11 = ({ categories }) => {
  console.log(categories, "categories in 11");
  const [expendedList, setExpendedList] = useState(
    categories.map((cate) => cate.category_id)
  );

  const handleAccordionClick = (category_id) => {
    if (expendedList.includes(category_id)) {
      setExpendedList(expendedList.filter((id) => id !== category_id));
    } else {
      setExpendedList([...expendedList, category_id]);
    }
  };

  return (
    <Box>
      <Box>Hello</Box>
      {categories?.map((category) => (
        <Accordion
          sx={{
            marginBottom: "25px",
            borderRadius: "8px",
            padding: "0 20px",
            boxShadow: "none",
          }}
          key={category?.category_id}
          expanded={expendedList.includes(category?.category_id)}
          onChange={() => handleAccordionClick(category?.category_id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <TypographyConverter
              sx={{ fontSize: "20px", fontWeight: "500" }}
              arText={category?.category_name_ar}
              enText={category?.category_name}
            />
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Grid container spacing={1}>
              {category?.products?.map((product) => (
                <Grid item xs={12} key={product?.id}>
                  <HorizontalCard product={product} />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Layout11;
