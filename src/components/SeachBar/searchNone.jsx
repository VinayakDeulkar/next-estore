import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";

const SearchNone = () => {
  const { search } = useContext(AppContext);
  return (
    <SubHeadline
      arText={`لا توجد نتائج لـ "${search}"`}
      enText={`No results for "${search}"`}
    />
  );
};

export default SearchNone;
