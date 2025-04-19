import { AppContext } from "@/context/AppContext";
import { Box, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function BranchList({ setBranchId }) {
  const [branchs, setBranchs] = useState([]);
  const { language, vendorSlug, areaDetails } = useContext(AppContext);
  useEffect(() => {
    if (areaDetails.data.branch) {
      setBranchs(areaDetails.data.branch);
    }
  }, [areaDetails.data.branch]);

  return (
    <div>
      <div className="branch-list-container">
        <ul className="branch-list">
          {branchs?.map((branch, i) => (
            <li className="branch-list-item" key={i}>
              <Box
                component="a"
                onClick={() => setBranchId(i)}
                className="branch-details"
              >
                <h2 className="branch-name">
                  {language === "ltr" ? branch?.name : branch?.arabic_name}
                </h2>
                <p className="branch-address">
                  {language === "ltr"
                    ? branch?.address
                    : branch?.arabic_address}
                </p>
              </Box>
              <Box
                component="a"
                onClick={() => setBranchId(i)}
                className={
                  vendorSlug?.data?.ecom_url_slug === "cube-aroma"
                    ? ""
                    : "branch-info"
                }
              >
                {vendorSlug?.data?.ecom_url_slug === "cube-aroma" ? (
                  <IconButton>
                    <InfoOutlinedIcon sx={{ color: "#000" }} />
                  </IconButton>
                ) : (
                  <span>i</span>
                )}
              </Box>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BranchList;
