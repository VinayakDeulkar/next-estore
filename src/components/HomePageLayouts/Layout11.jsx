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
import SmallButtonSquare from "../assetBoxDesign/SmallButtonSquare/smallButtonSquare";
import $ from "jquery";

const Layout11 = ({
  categories,
  setcategoryopen,
  setcategorynow,
  categorynow,
}) => {
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

  const onCategorySelect = (category, k) => {
    setcategorynow(() => category?.category_name);
    $("#categoryflex").animate(
      {
        scrollLeft:
          $(`#cathort${k}`).position().left +
          $(`#cathort${k}`).width() / 2 +
          $("#categoryflex").scrollLeft() -
          $("#categoryflex").width() / 2,
      },
      "slow"
    );
    const element = $(`#category${k}`);
    if (element.length) {
      $("html, body").animate(
        {
          scrollTop:
            element.offset().top - (window.screen.width < 991 ? 107 : 59),
        },
        "slow"
      );
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
          marginBottom: "20px",
        }}
      >
        {categories?.map((category, i) => (
          <Box key={category?.category_id} sx={{ marginBottom: "10px" }}>
            <div
              id={`cathort${i}`}
              onClick={() => onCategorySelect(category, i)}
            >
              <SmallButtonSquare
                enText={category?.category_name}
                arText={category?.category_name_ar}
                varient={`${
                  category?.category_name == categorynow ? "dark" : "outline"
                }`}
                width="auto"
                fontWeight="300"
              />
            </div>
          </Box>
        ))}
      </Box>
      {categories?.map((category, i) => (
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
            sx={{
              "& .MuiAccordionSummary-content.Mui-expanded": {
                margin: "20px 0 10px 0",
              },
              padding: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div id={`category${i}`} onClick={() => setcategoryopen(true)}>
                <HeadLine
                  arText={category?.category_name_ar}
                  enText={category?.category_name}
                />
              </div>
              {!expendedList.includes(category?.category_id) && (
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
              )}
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
              <Grid container>
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
