import React, { useContext, useState } from "react";
import "./addressCard.css";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import EditPencilIcon from "@/SVGs/EditPencilIcon";
import DeleteCrossIcon from "@/SVGs/DeleteCrossIcon";
import ThreeDots from "@/SVGs/ThreeDots";
import { IconButton } from "@mui/material";
import { tele } from "@/constants/constants";
import HeadLine from "@/components/assetBoxDesign/Headline/headLine";
import SubTitle from "../SubTitle/subTitle";
import SubHeadline from "@/components/assetBoxDesign/SubHeadline/subHeadline";

const AddressCard = ({
  icon,
  info,
  symbol,
  onEdit,
  onDelete,
  cardClick,
  user,
  selected = false,
  disableSymbolClick = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const { language, activeBackgroundColor } = useContext(AppContext);

  return (
    <div
      className={`cardMain`}
      style={
        selected
          ? { backgroundColor: activeBackgroundColor, border: "2px solid #000" }
          : {}
      }
      onClick={cardClick}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "22px",
        }}
      >
        <div className={`firstCardDiv ${isExpanded ? "hidden" : ""}`}>
          {icon}
        </div>
        <div className={`secondCardDiv ${isExpanded ? "hidden" : ""}`}>
          <SubHeadline enText={info?.name} arText={info?.name} />
          {info?.area ? (
            <SubHeadline enText={info?.area} arText={info?.area} />
          ) : null}
          {info?.flag ? (
            <div
              className="secondText"
              style={{ display: "flex", alignItems: "center", color: "#000" }}
            >
              {info.flag} +{tele[info?.phoneCode]} {info?.phone}
            </div>
          ) : null}
          <div className="secondText">{info?.email}</div>
          {info?.desc ? <div className="descText">{info?.desc}</div> : null}
          <div className="secondText">{info?.addressFirst}</div>
          <div className="secondText">{info?.addressSecond}</div>
          <div className="secondText" style={{ fontStyle: "italic" }}>
            {info?.special_directions}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {symbol ? (
          <div className="thirdCardDiv">
            <IconButton
              sx={{ height: "100%", width: "100%" }}
              onClick={(e) => {
                if (disableSymbolClick) {
                  return;
                }
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {symbol}
            </IconButton>
          </div>
        ) : null}

        {user ? (
          <div
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              router.push("/user-information");
            }}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              padding: 0,
            }}
          >
            <div>
              <EditPencilIcon />
            </div>
          </div>
        ) : null}
      </div>

      <div
        className={`actions ${isExpanded ? "show" : ""}`}
        style={{ gap: "75px" }}
      >
        {onEdit ? (
          <div
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <div>
              <EditPencilIcon />
            </div>
            <div>{language === "ltr" ? "Edit" : "تعديل"}</div>
          </div>
        ) : null}
        {onDelete ? (
          <div
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              setIsExpanded(!isExpanded);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <div>
              <DeleteCrossIcon />
            </div>
            <div>{language === "ltr" ? "Delete" : "مسح"}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddressCard;
