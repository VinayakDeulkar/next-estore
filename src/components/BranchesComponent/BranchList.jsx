import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

function BranchList() {
  const [branchs, setBranchs] = useState([]);
  const { language, vendorSlug, areaDetails } = useContext(AppContext);
  const router = useRouter();
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
                onClick={() => router.push(`/branches?branch=${i}`)}
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
                onClick={() => router.push(`/branches?branch=${i}`)}
                className={
                  vendorSlug?.data?.ecom_url_slug === "cube-aroma"
                    ? ""
                    : "branch-info"
                }
              >
                {vendorSlug?.data?.ecom_url_slug === "cube-aroma" ? (
                  <span style={{ color: "black" }}>
                    <i className="fa fa-angle-right right-arrow"></i>
                  </span>
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
