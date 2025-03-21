import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import { useContext, useState } from "react";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";
import { AppContext } from "@/context/AppContext";
import "./layout.css";
import ProductSquareCard from "../ProductSquareCard/productSquareCard";

const Layout15 = ({ categories }) => {
  const { language } = useContext(AppContext);
  const [expendedList, setExpendedList] = useState(
    categories?.map((cate) => cate.category_id)
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
          sx={{
            mb: 2,
            borderRadius: "10px !important",
            boxShadow: "none",
            border: "1px solid #e8e6e6",
          }}
          key={category?.category_id}
          expanded={expendedList.includes(category?.category_id)}
          onChange={() => handleAccordionClick(category?.category_id)}
        >
          <AccordionSummary
            sx={{
              padding: "0 40px",
              "&.Mui-expanded .MuiTypography-root": {
                margin: "20px 0",
              },
            }}
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
          <AccordionDetails sx={{ padding: "0 40px 20px" }}>
            <Grid container spacing={"20px"}>
              {category?.products?.map((product) => (
                <Grid item xs={6} md={4} lg={3} xl={3} key={product?.id}>
                  <ProductSquareCard product={product} />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Layout15;
