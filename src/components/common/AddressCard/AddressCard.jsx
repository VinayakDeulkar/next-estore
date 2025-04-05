import React, { useContext, useState } from "react";
import "./addressCard.css";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import EditPencilIcon from "@/SVGs/EditPencilIcon";
import DeleteCrossIcon from "@/SVGs/DeleteCrossIcon";
import ThreeDots from "@/SVGs/ThreeDots";
import { IconButton } from "@mui/material";
import { tele } from "@/constants/constants";

const AddressCard = ({
  icon,
  info,
  symbol,
  onEdit,
  onDelete,
  cardClick,
  user,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const { language } = useContext(AppContext);

  return (
    <div className="cardMain" onClick={cardClick}>
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
          <div className="headingText">{info?.name}</div>
          {info?.area ? <div className="areaText">{info?.area}</div> : null}
          {info?.flag ? (
            <div
              className="secondText"
              style={{ display: "flex", alignItems: "center" }}
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
              history.push("/user-info");
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
        style={{ gap: "40px" }}
      >
        {onEdit ? (
          <div
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <div>
              <EditPencilIcon />
            </div>
            <div>{language === "ltr" ? "Edit" : "يحرر"}</div>
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
          >
            <div>
              <DeleteCrossIcon />
            </div>
            <div>{language === "ltr" ? "Delete" : "يمسح"}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddressCard;
