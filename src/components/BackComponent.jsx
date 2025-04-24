import { AppContext } from "@/context/AppContext";
import LeftArrow from "@/SVGs/LeftArrow";
import RightArrow from "@/SVGs/RightArrow";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const BackComponent = ({ backClick }) => {
  const { language } = useContext(AppContext);
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "4px",
      }}
      onClick={backClick ? backClick : () => router.back()}
    >
      {language === "ltr" ? (
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "-5px" }}
        >
          <LeftArrow />
        </div>
      ) : (
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "-5px" }}
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
