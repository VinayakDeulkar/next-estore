import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import SmallButtonSquare from "../assetBoxDesign/SmallButtonSquare/smallButtonSquare";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
} from "@mui/material";
import ProductSquareCard from "../ProductSquareCard/productSquareCard";
import WindowIcon from "@mui/icons-material/Window";
import ListIcon from "@mui/icons-material/List";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeadLine from "../assetBoxDesign/Headline/headLine";
import CategoryCard from "../CategoryCard/categoryCard";
import HorizontalCard from "../HorizontalCard/horizontalCard";
import { AppContext } from "@/context/AppContext";
import $ from "jquery";

const Layout17 = ({
  categories,
  setcategoryopen,
  setcategorynow,
  categorynow,
}) => {
  const router = useRouter();
  const { layout17ToggleView, handleSetLayout17ToggleViewChange } =
    useContext(AppContext);
  const [expendedList, setExpendedList] = useState(
    categories.map((cate) => cate.category_id)
  );
  const [expanded, setExpanded] = useState(false);

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
    <div>
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
            onClick={() =>
              handleSetLayout17ToggleViewChange(!layout17ToggleView)
            }
          >
            {layout17ToggleView ? (
              <WindowIcon />
            ) : (
              <ListIcon sx={{ fontSize: 30 }} />
            )}
          </div>
        </div>
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
              <ExpandMoreIcon sx={{ fontSize: "30px", fill: "#000" }} />
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
              id={`category${i}`}
              onClick={() => setcategoryopen(true)}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <HeadLine
                arText={category?.category_name_ar}
                enText={category?.category_name}
              />
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
            <Grid container>
              {category?.products?.map((product) => (
                <Grid
                  item
                  xs={layout17ToggleView ? 12 : 6}
                  key={product?.category_id}
                  sx={{ padding: "10px" }}
                >
                  <CategoryCard category={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <AccordionDetails sx={{ padding: 0 }}>
              <Grid container>
                {category?.products?.map((product) => (
                  <>
                    {layout17ToggleView ? (
                      <Grid item xs={12} key={product?.id}>
                        <HorizontalCard product={product} />
                      </Grid>
                    ) : (
                      <Grid
                        item
                        xs={6}
                        key={product?.id}
                        sx={{ padding: "10px" }}
                      >
                        <ProductSquareCard product={product} />
                      </Grid>
                    )}
                  </>
                ))}
              </Grid>
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </div>
  );
};

export default Layout17;
