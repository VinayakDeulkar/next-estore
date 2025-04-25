import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import "./socialMedia.css"
import PhoneIcons from "@/SVGs/socialMediaIcons/PhoneIcons";
import InstagramIcon from "@/SVGs/socialMediaIcons/InstagramIcon";
import FacebookIcon from "@/SVGs/socialMediaIcons/FacebookIcon";
import GoogleIcon from "@/SVGs/socialMediaIcons/GoogleIcon";
import TwitterIcons from "@/SVGs/socialMediaIcons/TwitterIcons";
import YouTubeIcons from "@/SVGs/socialMediaIcons/YouTubeIcons";

const SocialMedia = () => {
  const {language, homePageDetails } = useContext(AppContext);

  return (
    <div className="sideMenu-bottom-mainDiv">
      <div className="sidemenu-social-icon">
        <div className="reach-Us-Via-text">
          {language === "ltr" ? "Contact Us Via" : "تواصل معنا من خلال"}
        </div>
        <div className="sideMenu-BottomIcons">
          {homePageDetails?.vendor_data?.social_media?.whatsapp != "" &&
          homePageDetails?.vendor_data?.social_media?.whatsapp ? (
            <a
              rel="noreferrer"
              href={`https://api.whatsapp.com/send?phone=${homePageDetails?.vendor_data?.social_media?.whatsapp}`}
              target="_blank"
              className="social-link"
            >
              <PhoneIcons />
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
              <InstagramIcon />
            </a>
          ) : null}
          {homePageDetails?.vendor_data?.social_media?.facebook != "" &&
          homePageDetails?.vendor_data?.social_media?.facebook ? (
            <a
              rel="noreferrer"
              href={homePageDetails?.vendor_data?.social_media?.facebook}
              target="_blank"
              className="social-link"
            >
              <FacebookIcon />
            </a>
          ) : null}
          {homePageDetails?.vendor_data?.social_media?.google != "" &&
          homePageDetails?.vendor_data?.social_media?.google ? (
            <a
              rel="noreferrer"
              href={homePageDetails?.vendor_data?.social_media?.google}
              target="_blank"
              className="social-link"
            >
              <GoogleIcon />
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
              <TwitterIcons />
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
              <YouTubeIcons />
            </a>
          ) : null}
        </div>
      </div>
      <div className="privacy-policy-text">
        <div>{language === "ltr" ? "Privacy Policy" : "سياسة الخصوصية"}</div>
        <div style={{ cursor: "pointer" }} /* onClick={handleTermsClick} */>
          {language === "ltr" ? "Terms & Conditions" : "الشروط و الأحكام"}
        </div>
      </div>
      <div className="poweredBy-text">
        {language === "ltr" ? "Powered By" : "مشغل بواسطة"}
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <img
          style={{ height: "65px", width: "auto" }}
          src={
            language === "ltr"
              ? "images/payzahFooterImg.png"
              : "images/arPayzahFooterImg.png"
          }
        ></img>
      </div>
    </div>
  );
};

export default SocialMedia;
