import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./searchBox.module.css";
import { AppContext } from "@/context/AppContext";
let cancelToken;
import axios from "axios";
import ReactPixel from "react-facebook-pixel";

const SearchBox = () => {
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const {
    vendorSlug,
    areaDetails,
    homePageDetails,
    handleSearchProduct,
    search,
    language,
    handleSearchItemsChange,
    handleSearchLoadingChange,
    page,
    handlePageChange,
    handleIsPageLoadingChange,
    handleHasMoreChange,
    hasMore,
  } = useContext(AppContext);

  useEffect(() => {
    if (hasMore && page != 0) handleIsPageLoadingChange((l) => true);
    else {
      handleSearchLoadingChange((loading) => true);
      handleSearchItemsChange(() => []);
    }
    if (cancelToken != undefined) {
      cancelToken.cancel("Operation canceled due to new request.");
    }
    cancelToken = axios.CancelToken.source();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/search`,
        JSON.stringify({
          token: process.env.NEXT_PUBLIC_APP_TOKEN,
          search_string: search,
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          area_id: areaDetails?.area_id,
          page: page,
        }),
        {
          cancelToken: cancelToken.token,
        }
      )
      .then((res) => {
        handleSearchLoadingChange(() => false);
        handleIsPageLoadingChange((l) => false);
        handleSearchItemsChange((s) => [...s, ...res.data.data]);
        handleHasMoreChange((i) => res.data.is_more_records);
        if (homePageDetails?.vendor_data?.fb_pixel_code != "") {
          ReactPixel.trackCustom("SearchProduct", { search_item: search });

          const time = Date.now();
          const sec = Math.round(time / 1000);
          if (vendorSlug?.data?.ecom_url_slug == "mijana-restaurant-and-café") {
            axios
              .post(
                `https://graph.facebook.com/v15.0/${homePageDetails?.vendor_data?.fb_pixel_code}/events?access_token=EAAGZA8GMZAs1IBAC9mDImnZCTAdafRzN769x6ZCIRMExueSZBZBfnDkIzGrsP4gZBMZCCwXaSvKNggZBEKdEk3582JWiwecrnZAEHFzfCaYKSNRbltxMm2cSvUrgZBUDpVNZCQAOVWUuzO4m7nbvQn1Wqb94IBbVSexSbwWzAf6TYV80HQF1ZAZAzGcXKB`,
                {
                  data: [
                    {
                      action_source: "website",
                      event_name: "SearchProduct",
                      event_time: sec,
                      user_data: {
                        client_user_agent:
                          "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",
                        em: [
                          sha256(homePageDetails?.vendor_data?.support_mail),
                        ],
                      },
                      custom_data: {
                        search_item: search,
                      },
                    },
                  ],
                }
              )
              .then((res) => {})
              .catch((e) => console.log(e));
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [search, page]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        handleCloseClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    setIsActive(true);
    inputRef.current?.focus();
  };

  const handleCloseClick = () => {
    setIsActive(false);
    handleSearchProduct("");
  };

  return (
    <div
      className={`${styles.searchBox} ${isActive ? styles.active : ""}`}
      ref={searchContainerRef}
    >
      <input
        type="search"
        placeholder={language === "ltr" ? "Search..." : "يبحث..."}
        id={"Search"}
        name={"Search"}
        value={search}
        autoComplete
        onChange={(e) => {
          handlePageChange(() => 0);
          handleSearchProduct(e.target.value);
        }}
        ref={inputRef}
        className={styles.searchInput}
        style={{fontSize: "16px"}}
      />
      <div className={styles.searchIcon} onClick={handleSearchClick}>
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </div>
      {/* <div className={styles.closeIcon} onClick={handleCloseClick}>
        <div className={styles.closeLine}></div>
        <div className={styles.closeLine}></div>
      </div> */}
    </div>
  );
};

export default SearchBox;
