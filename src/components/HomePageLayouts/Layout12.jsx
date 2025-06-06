import React, { useContext } from "react";
import ProductSquareCard from "../ProductSquareCard/productSquareCard";
import { Box, Grid } from "@mui/material";
import TypographyConverter from "../common/TypographyConveter/typographyConverter";
import HeadLine from "../assetBoxDesign/Headline/headLine";
import { AppContext } from "@/context/AppContext";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";
import SmallButtonRounded from "../assetBoxDesign/SmallButtonRounded/smallButtonRounded";
import { useRouter } from "next/navigation";

const Layout12 = ({ categories }) => {
  const { language } = useContext(AppContext);
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        // width: "100%",
        borderRadius: "8px",
      }}
    >
      {categories?.map((category) => (
        <div key={category?.id} style={{ paddingBottom: "35px" }}>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
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
            <SmallButtonRounded
              enText={"Show More"}
              arText={"عرض المزيد"}
              varient={"outline"}
              handleClick={() =>
                router.push(`/products?id=${category?.category_slug}`)
              }
            />
          </div>
          <Grid
            container
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "auto",
              gap: "75px",
              paddingBottom: "20px",
            }}
          >
            {category?.products?.map((product) => (
              <Grid
                item
                key={product?.id}
                sx={{
                  flex: "0 0 auto",
                  width: "250px",
                  padding: "10px",
                }}
              >
                <ProductSquareCard product={product} />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </Box>
  );
};

export default Layout12;
