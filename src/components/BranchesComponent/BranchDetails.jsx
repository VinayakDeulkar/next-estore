import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import MapContainer from "./MapContainer";
import { Box, Dialog, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";

function BranchDetails({ branchId }) {
  const { areaDetails, language } = useContext(AppContext);
  const [branch, setBranch] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (areaDetails.data.branch) {
      setBranch(areaDetails.data.branch[branchId]);
    }
  }, [areaDetails.data.branch]);
  return (
    <Dialog open={branchId} onClose={() => router.push("/branches")}>
      <Box
        sx={{ height: "calc(100vh - 50px)", padding: "20px", width: "560px" }}
      >
        <DialogTitle>
          {language === "ltr" ? branch?.address : branch?.arabic_address}
        </DialogTitle>
        <React.Fragment>
          {branch?.office_end_time ? (
            <>
              <MapContainer branch={branch}></MapContainer>
              <div className="branch-call-div">
                <div className="branch-call-flex">
                  <a
                    href={`tel:${branch?.phone_number}`}
                    className="branch-call text-center"
                  >
                    {language === "ltr" ? "Call Branch" : "الإتصال بالفرع"}
                  </a>
                  {branch?.google_map_url && (
                    <a
                      href={branch?.google_map_url}
                      className="text-center branch-call"
                      target="_blank"
                    >
                      {language === "ltr" ? "Get Direction" : "العنوان"}
                    </a>
                  )}
                </div>
              </div>
              <div className="details-container pt-2">
                <div className="branch-inner-div">
                  <p className="branch-big-text">
                    <span>
                      <i className="fa fa-circle"></i>{" "}
                      {language === "ltr" ? "Open Till" : "مفتوح حتى"}{" "}
                    </span>
                    {moment(branch?.office_end_time, "HH:mm:ss")
                      .locale("en")
                      .format("hh:mm") +
                      moment(branch?.office_end_time, "HH:mm:ss")
                        .locale(language == "ltr" ? "en" : "ar-sa")
                        .format(" A")}
                  </p>
                </div>
              </div>
              <div className="details-container pt-2">
                <div className="branch-inner-div branch-text-flex">
                  <p className="branch-small-text">
                    {language === "ltr" ? "Sunday - Saturday" : "الأحد - السبت"}
                  </p>
                  <p
                    className="branch-small-text"
                    style={{
                      direction: "ltr",
                    }}
                  >
                    {`${
                      moment(branch?.office_start_time, "HH:mm:ss")
                        .locale("en")
                        .format("hh:mm") +
                      moment(branch?.office_start_time, "HH:mm:ss")
                        .locale(language == "ltr" ? "en" : "ar-sa")
                        .format(" A")
                    } - ${
                      moment(branch?.office_end_time, "HH:mm:ss")
                        .locale("en")
                        .format("hh:mm") +
                      moment(branch?.office_end_time, "HH:mm:ss")
                        .locale(language == "ltr" ? "en" : "ar-sa")
                        .format(" A")
                    }`}
                  </p>
                </div>
              </div>
              <div className="details-container cart-blank-space"></div>
            </>
          ) : null}
        </React.Fragment>
      </Box>
    </Dialog>
  );
}

export default BranchDetails;
