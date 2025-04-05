import { AppContext } from "@/context/AppContext";
import LeftArrow from "@/SVGs/LeftArrow";
import RightArrow from "@/SVGs/RightArrow";
import { useContext } from "react";

const BackComponent = () => {
  const { language } = useContext(AppContext);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "4px",
      }}
    >
      {language === "ltr" ? (
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "-8px" }}
        >
          <LeftArrow />
        </div>
      ) : (
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "-8px" }}
        >
          <RightArrow size={20} strokeWidth={2} />
        </div>
      )}
      <div
        style={
          language === "ltr"
            ? { fontSize: "16px" }
            : { fontSize: "17px", marginTop: "-7px" }
        }
      >
        {language === "ltr" ? "Back" : "رجوع"}
      </div>
    </div>
  );
};

export default BackComponent;
