import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";
import SquareCard from "../SquareCard/squareCard";
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
    <div>
      {categories?.map((category) => (
        <Accordion
          sx={{ mb: 2, borderRadius: "8px", padding: "0 20px" }}
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
          <AccordionDetails>
            <Grid container spacing={6}>
              {category?.products?.map((product) => (
                <Grid item xs={12}>
                  <HorizontalCard />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Layout11;
