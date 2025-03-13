import { useSearchParams } from "next/navigation";
import React from "react";

const Products = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <div>Product: {id}</div>;
};

export default Products;
