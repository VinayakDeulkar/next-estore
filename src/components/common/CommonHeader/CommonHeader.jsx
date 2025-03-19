import React, { useContext } from "react";
import styles from "./commonHeader.module.css";
import { AppContext } from "@/context/AppContext";

const CommonHeader = ({ englishHeader, arabicHeader, fontWeight }) => {
  const { language } = useContext(AppContext);
  return (
    <div className={styles.commonHeaderDiv} style={{ fontWeight: fontWeight }}>
      {language === "ltr" ? englishHeader : arabicHeader}
    </div>
  );
};

export default CommonHeader;
