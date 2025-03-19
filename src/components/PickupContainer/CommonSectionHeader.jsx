import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const CommonSectionHeader = ({ englishHeader, arabicHeader, color }) => {
  const { language } = useContext(AppContext);
  return (
    <div
      className="commonSection-div"
      style={{ color: color ? color : "#A1A1A1" }}
    >
      {language === "ltr" ? englishHeader : arabicHeader}
    </div>
  );
};

export default CommonSectionHeader;
