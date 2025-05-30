"use client";
import BackComponent from "@/components/BackComponent";
import BackButton from "@/components/common/BackButton/BackButton";
import EstoreLayout1 from "@/components/EstoreLayouts/estoreLayout1";
import VerticalProductGrid from "@/components/GridLayouts/verticalProductGrid";
import ProductCarousel from "@/components/ProductPageDetails/ProductCarousel/productCarousel";
import ProductDetails from "@/components/ProductPageDetails/ProductDetails/ProductDetails";
import { AppContext } from "@/context/AppContext";
import { Box, Fab, Grid } from "@mui/material";
import { useContext, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import UploadIcon from "@mui/icons-material/Upload";
import { useRouter } from "next/navigation";
import CarouselImage from "@/components/HomePage/CarosouleImage/carosouleImage";
import ShareIcon from "@/SVGs/ShareIcon";

const Product = (props) => {
  const { homePageDetails, language } = useContext(AppContext);
  const [product, setProduct] = useState({});
  const [addedVariaton, setAddedVariation] = useState([]);
  const router = useRouter();

  const checkSize = () => {
    return window != undefined && window?.innerWidth > 990;
  };

  const onShareClick = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator
        .share({
          url: window.location.href,
        })
        .then(() => {
          console.log("Sharing successfull");
        })
        .catch(() => {
          console.log("Sharing failed");
        });
    }
  };

  const renderProductLayout = () => {
    switch (homePageDetails?.productLayout) {
      case "1":
        return (
          <Box sx={{ height: "100vh", overflow: "hidden", width: "100%" }}>
            <Grid container sx={{ width: "100vw" }}>
              <Grid item sm={12} md={12} lg={4.5}>
                <Box
                  sx={{
                    height: "100vh",
                    overflow: "scroll",
                    width: checkSize() ? "100%" : "100vw",
                  }}
                >
                  <Box sx={{ position: "relative", height: "100%" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: language === "ltr" && "16px",
                        right: language !== "ltr" && "16px",
                        zIndex: 50,
                      }}
                    >
                      <Fab
                        size="small"
                        sx={{
                          boxShadow: "none",
                          backgroundColor: "white",
                          color: "black",
                        }}
                        onClick={() => router.push("/")}
                      >
                        {language === "ltr" ? (
                          <KeyboardArrowLeftIcon
                            style={{ fontSize: "28px", color: "black" }}
                          />
                        ) : (
                          <KeyboardArrowRightIcon
                            style={{ fontSize: "28px", color: "black" }}
                          />
                        )}
                      </Fab>
                    </div>
                    {navigator.share && (
                      <div
                        style={{
                          position: "absolute",
                          top: "16px",
                          right: language === "ltr" && "16px",
                          left: language !== "ltr" && "16px",
                          zIndex: 50,
                        }}
                        onClick={() => onShareClick()}
                      >
                        <Fab
                          size="small"
                          sx={{
                            boxShadow: "none",
                            backgroundColor: "white",
                            color: "black",
                          }}
                        >
                          <Box sx={{ margin: "0 0 0 2px" }}>
                            <ShareIcon height={"21px"} width={"21px"} />
                          </Box>
                        </Fab>
                      </div>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        height: "100%",
                      }}
                    >
                      <Box sx={{ direction: "ltr" }}>
                        <ProductCarousel
                          product={props?.data}
                          addedVariaton={addedVariaton}
                        />
                      </Box>
                      <Box
                        sx={{
                          padding: checkSize() ? "0 40px" : "0 20px",
                          height: "100%",
                        }}
                      >
                        <ProductDetails
                          product={props?.data}
                          addon={props?.addons}
                          productvariation={props?.productvariation}
                          productvariationPrice={props?.productvariationPrice}
                          addedVariaton={addedVariaton}
                          setAddedVariation={setAddedVariation}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              {window?.innerWidth > 990 ? (
                <Grid
                  item
                  sm={12}
                  md={12}
                  lg={7.5}
                  sx={{ padding: "10px", direction: "ltr" }}
                >
                  <CarouselImage />
                </Grid>
              ) : null}
            </Grid>
          </Box>
        );

      case "2":
        return (
          <>
            <VerticalProductGrid>
              <BackButton variant="dark" />
              <ProductCarousel
                product={props?.data}
                addedVariaton={addedVariaton}
              />
              <ProductDetails
                product={props?.data}
                addon={props?.addons}
                productvariation={props?.productvariation}
                productvariationPrice={props?.productvariationPrice}
                addedVariaton={addedVariaton}
                setAddedVariation={setAddedVariation}
              />
            </VerticalProductGrid>
          </>
        );

      default:
        break;
    }
  };

  return <Box>{renderProductLayout()}</Box>;
};

export default Product;
