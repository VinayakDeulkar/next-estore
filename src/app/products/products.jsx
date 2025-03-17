"use client"
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Products = (props) => {
  const [page, setPage] = useState(0);
  const [isCategoryChanged, setIsCategoryChanged] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("id");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [hasMore, setHasMore] = useState(0);

console.log(props,"props")

  useEffect(() => {
    if (category) {
      setIsCategoryChanged(true);
    }
  }, [category]);

  const getCategoryName = () => {
    const filterCategory = details?.categories.filter(
      (ele) => ele.category_slug == category
    );
    if (filterCategory.length) {
      return {
        eng: filterCategory[0].category_name,
        ar: filterCategory[0].category_name_ar,
      };
    } else {
      return { eng: "", ar: "" };
    }
  };

  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (isPageLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isPageLoading, hasMore]
  );

  const handleBackClick = () => {
    setProductsDatat([]);
    setHasMore(0);
    setPage(0);
    history.goBack();
  };

  return <div>Product: {category}</div>;
};

export default Products;
