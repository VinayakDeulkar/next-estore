import { Box, Skeleton } from "@mui/material";
import React from "react";
import HorizontalCard from "../HorizontalCard/horizontalCard";

const SearchProductList = ({ loading, products, lastBookElementRef }) => {
  return (
    <Box>
      {!loading ? (
        products.map((item, i) => {
          if (i == products?.length - 1 && lastBookElementRef) {
            return (
              <div ref={lastBookElementRef} key={item?.product_slug}>
                <HorizontalCard product={item} />
              </div>
            );
          } else
            return <HorizontalCard product={item} key={item?.product_slug} />;
        })
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[...Array(7)].map((k, i) => (
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height={115}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchProductList;
