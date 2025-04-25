import React, { useContext } from "react";
import styles from "./footer.module.css";
import { AppContext } from "@/context/AppContext";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import NormalText from "@/components/assetBoxDesign/NormalText/normalText";

const Footer = () => {
  const { language, vendorSlug } = useContext(AppContext);
  const checkSize = () => {
    return window != undefined && window?.innerWidth > 990;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        margin: checkSize()
          ? language === "ltr"
            ? "0 -40px 0 -28px"
            : "0 -28px 0 -40px"
          : "0 -10px 0 -10px",
      }}
    >
      <a
        href="http://payzah.com/"
        style={{
          width: 220,
          height: 132,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <div
            style={{
              color: "#000",
              display: "flex",
              alignItems: "center",
              margin: `${language === "ltr" ? "0 0 0 10px" : "0 35px 0 0"}`,
              fontSize: `${language === "ltr" ? "16px" : "18px"}`,
              marginBottom: "5px",
            }}
          >
            {language === "ltr" ? "Powered By" : "مدعوم من قبل"}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-evenly",
              marginBottom: 10,
            }}
          >
            <img
              style={{ height: "70px", width: "auto" }}
              src={
                language === "ltr"
                  ? "images/payzahFooterImg.png"
                  : "images/arPayzahFooterImg.png"
              }
            ></img>
          </div>
        </div>
      </a>
      <Grid
        container
        sx={{
          width: "100%",
          backgroundColor: vendorSlug?.data?.vendor_data?.vendor_color,
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          color: "#fff",
          padding: checkSize() ? "50px 30px" : "30px 20px",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            loading="lazy"
            width={80}
            height={80}
            style={{
              borderRadius: "13px",
              border: "1.5px solid #9191913D",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            src={
              language == "ltr"
                ? vendorSlug?.data?.vendor_data?.english_new_background
                : vendorSlug?.data?.vendor_data?.arabic_new_background
            }
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <div>
            <NormalText
              enText={`${"+965"} ${vendorSlug?.data?.vendor_data?.phone}`}
              color={"#fff"}
            />
            {/* <NormalText enText={vendorSlug?.data?.vendor_data?.support_mail} color={"#fff"} /> */}
            <NormalText enText={"@Petrafood"} color={"#fff"} />
          </div>
          <div>
            <NormalText enText={"Main Page"} color={"#fff"} />
            <NormalText enText={"Track Order"} color={"#fff"} />
            <NormalText enText={"Branches"} color={"#fff"} />
          </div>
          <div>
            <NormalText enText={"Petra Foods W.L.LC"} color={"#fff"} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
