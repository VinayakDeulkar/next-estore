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
import HeadLine from "../assetBoxDesign/Headline/headLine";
import CategoryCard from "../CategoryCard/categoryCard";

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
            padding: 0,
            "&.Mui-expanded": {
              margin: "25px 0",
            },
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <HeadLine
                arText={category?.category_name_ar}
                enText={category?.category_name}
              />
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
                  marginTop: "3px",
                }}
              >
                {category?.products?.length}
              </div>
            </div>
          </AccordionSummary>
          {category?.is_subcategory ? (
            <Grid container spacing={"20px"}>
              {category?.products?.map((product) => (
                <Grid item {...sizes()} key={product?.category_id}>
                  <CategoryCard category={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <AccordionDetails sx={{ padding: 0 }}>
              <Grid container>
                {category?.products?.map((product) => (
                  <Grid
                    item
                    {...sizes()}
                    key={product?.id}
                    sx={{ padding: "10px" }}
                  >
                    <ProductSquareCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </div>
  );
};

export default Layout15;
