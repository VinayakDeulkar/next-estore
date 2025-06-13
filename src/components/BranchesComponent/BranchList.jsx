import { AppContext } from "@/context/AppContext";
import { Box, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

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
      <div
        className="branch-list-container"
        style={{
          border: "1px solid #e8e6e6",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <ul className="branch-list">
          {branchs?.map((branch, i) => (
            <div style={{ margin: "0 15px" }}>
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
                <Box component="a" onClick={() => setBranchId(i)}>
                  {vendorSlug?.data?.ecom_url_slug === "cube-aroma" ? (
                    <IconButton>
                      <InfoOutlinedIcon sx={{ color: "#000" }} />
                    </IconButton>
                  ) : (
                    <ArrowForwardIosOutlinedIcon
                      sx={{ height: "17px", width: "17px" }}
                    />
                  )}
                </Box>
              </li>
              {i !== branchs?.length - 1 && (
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#E8E6E6",
                  }}
                ></div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BranchList;
