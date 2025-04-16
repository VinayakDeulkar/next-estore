import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
} from "@mui/material";
import { useState } from "react";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";
import HorizontalCard from "../HorizontalCard/horizontalCard";
import { useRouter } from "next/navigation";
import HeadLine from "../assetBoxDesign/Headline/headLine";
import CategoryCard from "../CategoryCard/categoryCard";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";

const Layout11 = ({ categories }) => {
  const router = useRouter();
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
      <Box
        sx={{
          gap: "8px",
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "scroll",
          position: "sticky",
          background: "#fff",
        }}
      >
        {categories?.map((category) => (
          <Box
            key={category?.category_id}
            sx={{
              padding: "8px",
              borderRadius: "8px",
              whiteSpace: "nowrap",
              fontWeight: 600,
            }}
          >
            <SubHeadline
              enText={category?.category_name}
              arText={category?.category_name_ar}
            />
          </Box>
        ))}
      </Box>
      {categories?.map((category) => (
        <Accordion
          sx={{
            mb: 2,
            borderRadius: "10px !important",
            boxShadow: "none",
            padding: 0,
          }}
          key={category?.category_id}
          expanded={expendedList.includes(category?.category_id)}
          onChange={() => handleAccordionClick(category?.category_id)}
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
    </Box>
  );
};

export default Layout11;
