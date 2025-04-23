import { AppContext } from "@/context/AppContext";
import { Box, IconButton } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
import "@/components/assetBoxDesign/TextField/textInputField.css";
import SearchIcon from "@mui/icons-material/Search";
let cancelToken;

const SearchBar = ({
  setSearchItems,
  setSearchLoading,
  page,
  setIsPageLoading,
  setHasMore,
  hasMore,
  setPage,
}) => {
  const {
    vendorSlug,
    areaDetails,
    homePageDetails,
    handleSearchProduct,
    search,
    language,
  } = useContext(AppContext);
  
  useEffect(() => {
    if (hasMore && page != 0) setIsPageLoading((l) => true);
    else {
      setSearchLoading((loading) => true);
      setSearchItems(() => []);
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
        setSearchLoading(() => false);
        setIsPageLoading((l) => false);
        setSearchItems((s) => [...s, ...res.data.data]);
        setHasMore((i) => res.data.is_more_records);
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

  const changeSearchText = (e) => {
    handleSearchProduct(e.target.value);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "65px",
        display: "flex",
        alignItems: "end",
        padding: "20px 0",
      }}
    >
      <input
        type="search"
        placeholder={language === "ltr" ? "Search" : "بحث"}
        className="text-field-input"
        style={{ borderRadius: "46px", padding: "4px 15px" }}
        id={"Search"}
        name={"Search"}
        autoComplete
        value={search}
        onChange={(e) => {
          setPage(() => 0);
          changeSearchText(e);
        }}
      />
      <IconButton
        sx={{ position: "absolute", right: "10px", top: "3px" }}
        color="rgba(154, 154, 154, 1)"
      >
        <SearchIcon
          sx={{
            fill: "rgba(154, 154, 154, 1)",
            color: "rgba(154, 154, 154, 1)",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
