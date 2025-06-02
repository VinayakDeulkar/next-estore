import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import "./socialMedia.css";
import PhoneIcons from "@/SVGs/socialMediaIcons/PhoneIcons";
import InstagramIcon from "@/SVGs/socialMediaIcons/InstagramIcon";
import FacebookIcon from "@/SVGs/socialMediaIcons/FacebookIcon";
import GoogleIcon from "@/SVGs/socialMediaIcons/GoogleIcon";
import TwitterIcons from "@/SVGs/socialMediaIcons/TwitterIcons";
import YouTubeIcons from "@/SVGs/socialMediaIcons/YouTubeIcons";
import NormalText from "@/components/assetBoxDesign/NormalText/normalText";
import { Box } from "@mui/material";
import ContactIcon from "@/SVGs/MenuDrawerIcons/ContactIcon";
import MailIcon from "@/SVGs/MenuDrawerIcons/MailIcon";

const SocialMedia = ({ handleTermsClick }) => {
  const { language, homePageDetails, vendorSlug } = useContext(AppContext);

  return (
    <div>
      <div style={{ padding: "0 20px" }}>
        <div
          style={{ borderTop: "1px solid #e3e3e3", margin: "30px 0 13px 0" }}
        ></div>
        <Box sx={{ marginBottom: "20px" }}>
          <NormalText
            enText={"Reach Us"}
            arText={"تواصل معنا"}
            fontWeight={400}
            fontSize={"15px"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            marginBottom: "30px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <ContactIcon height={18} width={18} />
            <NormalText
              enText={`${"+965"} ${vendorSlug?.data?.vendor_data?.phone}`}
              arText={`${"+965"} ${vendorSlug?.data?.vendor_data?.phone}`}
              isNumber={true}
              fontSize="13px"
              fontWeight={400}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <MailIcon height={16} width={16} />
            <NormalText
              enText={vendorSlug?.data?.vendor_data?.support_mail}
              arText={vendorSlug?.data?.vendor_data?.support_mail}
              fontSize="13px"
              fontWeight={400}
            />
          </Box>
        </Box>
      </div>
      <div className="sideMenu-bottom-mainDiv">
        <div className="sidemenu-social-icon">
          <div className="sideMenu-BottomIcons">
            {homePageDetails?.vendor_data?.social_media?.whatsapp != "" &&
            homePageDetails?.vendor_data?.social_media?.whatsapp ? (
              <a
                rel="noreferrer"
                href={`https://api.whatsapp.com/send?phone=${homePageDetails?.vendor_data?.social_media?.whatsapp}`}
                target="_blank"
                className="social-link"
              >
                <PhoneIcons height={19} width={19} />
              </a>
            ) : null}
            {homePageDetails?.vendor_data?.social_media?.instagram != "" &&
            homePageDetails?.vendor_data?.social_media?.instagram ? (
              <a
                rel="noreferrer"
                href={homePageDetails?.vendor_data?.social_media?.instagram}
                target="_blank"
                className="social-link"
              >
                <InstagramIcon height={19} width={19} />
              </a>
            ) : null}
            {/* {homePageDetails?.vendor_data?.social_media?.facebook != "" &&
            homePageDetails?.vendor_data?.social_media?.facebook ? (
              <a
                rel="noreferrer"
                href={homePageDetails?.vendor_data?.social_media?.facebook}
                target="_blank"
                className="social-link"
              >
                <FacebookIcon height={16} width={16} />
              </a>
            ) : null} */}
            {homePageDetails?.vendor_data?.social_media?.google != "" &&
            homePageDetails?.vendor_data?.social_media?.google ? (
              <a
                rel="noreferrer"
                href={homePageDetails?.vendor_data?.social_media?.google}
                target="_blank"
                className="social-link"
              >
                <GoogleIcon height={20} width={20} />
              </a>
            ) : null}
            {homePageDetails?.vendor_data?.social_media?.twitter != "" &&
            homePageDetails?.vendor_data?.social_media?.twitter ? (
              <a
                rel="noreferrer"
                href={homePageDetails?.vendor_data?.social_media?.twitter}
                target="_blank"
                className="social-link"
              >
                <TwitterIcons height={22} width={22} />
              </a>
            ) : null}
            {homePageDetails?.vendor_data?.social_media?.youtube != "" &&
            homePageDetails?.vendor_data?.social_media?.youtube ? (
              <a
                rel="noreferrer"
                href={homePageDetails?.vendor_data?.social_media?.youtube}
                target="_blank"
                className="social-link"
              >
                <YouTubeIcons height={22} width={22} />
              </a>
            ) : null}
          </div>
        </div>
        <div className="privacy-policy-text">
          <div style={{ textDecoration: "underline" }}>
            {language === "ltr" ? "Privacy Policy" : "سياسة الخصوصية"}
          </div>
          <div
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={handleTermsClick}
          >
            {language === "ltr" ? "Terms & Conditions" : "الشروط و الأحكام"}
          </div>
        </div>
        <div className="poweredBy-text">
          {language === "ltr" ? "Powered By" : "مشغل بواسطة"}
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <img
            style={{ height: "50px", width: "auto", cursor: "pointer" }}
            src={
              language === "ltr"
                ? "images/PayzahImage.png"
                : "images/ArPayzahImage.png"
            }
            onClick={() => window.open("https://payzah.com/", "_blank")}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
