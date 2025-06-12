import { AppContext } from "@/context/AppContext";
import { Box, Card, CardContent, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";
import { betweenTwoDevice } from "@/constants/function";
import { breakPoints } from "@/constants/constants";

const CategoryCard = ({ category }) => {
  const { homePageDetails, layout14ToggleView, layout17ToggleView } =
    useContext(AppContext);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products?id=${category?.category_slug}`);
  };

  const rendorCategoryCard = () => {
    switch (homePageDetails?.vendor_data?.home_page_type) {
      case "11":
      case layout14ToggleView ? "14" : null:
      case layout17ToggleView ? "17" : null:
        return (
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "none",
              width: "100%",
              display: "flex",
              gap: "18px",
              alignItems: "center",
            }}
            onClick={handleCardClick}
          >
            <Box
              sx={{
                overflow: "hidden",
                borderRadius: "8px",
                height: "125px",
                marginBottom: "10px",
              }}
            >
              <CardMedia
                component="img"
                height={
                  !betweenTwoDevice(breakPoints.sm, breakPoints.lg)
                    ? "200"
                    : "300"
                }
                image={category?.category_image}
                alt={category?.category_name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
            <CardContent sx={{ padding: "0" }}>
              <Box sx={{ textAlign: "center" }}>
                <SubHeadline
                  enText={category?.category_name}
                  arText={category?.category_name_ar}
                  fontSize="20px"
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <SubHeadline
                  enText={"Category"}
                  arText={"فئة"}
                  fontSize="20px"
                />
              </Box>
            </CardContent>
          </Card>
        );

      case "10":
      case "12":
      case "13":
      case "15":
      case "16":
      case !layout14ToggleView ? "14" : null:
      case !layout17ToggleView ? "17" : null:
        return (
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "none",
              width: "100%",
            }}
            onClick={handleCardClick}
          >
            <Box
              sx={{
                overflow: "hidden",
                borderRadius: "8px",
                height: !betweenTwoDevice(breakPoints.sm, breakPoints.lg)
                  ? "200"
                  : "300",
                marginBottom: "10px",
              }}
            >
              <CardMedia
                component="img"
                height={
                  !betweenTwoDevice(breakPoints.sm, breakPoints.lg)
                    ? "200"
                    : "300"
                }
                image={category?.category_image}
                alt={category?.category_name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                className="zoomImg"
              />
            </Box>
            <CardContent
              sx={{
                padding: "0",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <SubHeadline
                  enText={category?.category_name}
                  arText={category?.category_name_ar}
                  fontSize="20px"
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <SubHeadline
                  enText={"Category"}
                  arText={"فئة"}
                  fontSize="20px"
                />
              </Box>
            </CardContent>
          </Card>
        );

      default:
        break;
    }
  };

  return <>{rendorCategoryCard()}</>;
};

export default CategoryCard;
