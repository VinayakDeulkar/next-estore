import React, { useContext, useRef, useState } from "react";
import styles from "./searchBox.module.css";
import { AppContext } from "@/context/AppContext";

const SearchBox = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { handleSearchProduct } = useContext(AppContext);
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);

  const handleSearchClick = () => {
    setIsActive(true);
    inputRef.current?.focus();
  };

  const handleCloseClick = () => {
    setIsActive(false);
    setSearchQuery("");
  };

  return (
    <div
      ref={searchBoxRef}
      className={`${styles.searchBox} ${isActive ? styles.active : ""}`}
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearchProduct(e.target.value)
        }}
        ref={inputRef}
        className={styles.searchInput}
      />
      <div className={styles.searchIcon} onClick={handleSearchClick}>
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </div>
      <div className={styles.closeIcon} onClick={handleCloseClick}>
        <div className={styles.closeLine}></div>
        <div className={styles.closeLine}></div>
      </div>
    </div>
  );
};

export default SearchBox;
