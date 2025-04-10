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
  const { language, homePageDetails } = useContext(AppContext);
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

  const sizes = () => {
    switch (homePageDetails?.estoreLayout) {
      case "1":
        return { xs: 6 };

      case "2":
        return { xs: 6, md: 4, lg: 3, xl: 3 };

      default:
        break;
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
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <TypographyConverter
              sx={{ fontSize: "22px", fontWeight: "500" }}
              arText={category?.category_name_ar}
              enText={category?.category_name}
            />
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "0 20px 25px" }}>
            <Grid container spacing={"20px"}>
              {category?.products?.map((product) => (
                <Grid item {...sizes()} key={product?.id}>
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
