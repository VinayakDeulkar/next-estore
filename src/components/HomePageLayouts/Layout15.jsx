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
          sx={{ mb: 2, borderRadius: "8px" }}
          key={category?.category_id}
          expanded={expendedList.includes(category?.category_id)}
          onChange={() => handleAccordionClick(category?.category_id)}
        >
          <AccordionSummary
            sx={{
              padding: "0 20px",
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
          <AccordionDetails sx={{ padding: "0 20px 20px" }}>
            <Grid container className="gridContainer">
              {category?.products?.map((product) => (
                <Grid item xs={6} key={product?.id}>
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
