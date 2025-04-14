import { AppContext } from "@/context/AppContext";
import { Box, DialogTitle, SwipeableDrawer } from "@mui/material";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import MapContainer from "./MapContainer";

const drawerBleeding = 56;
function BranchDetails({ branchId, setBranchId }) {
  const { areaDetails, language } = useContext(AppContext);
  const [branch, setBranch] = useState({});

  const container =
    window !== undefined ? () => window?.document?.body : undefined;
  useEffect(() => {
    if (areaDetails.data.branch) {
      setBranch(areaDetails.data.branch[branchId]);
    }
  }, [areaDetails.data.branch, branchId]);
  return (
    <SwipeableDrawer
      container={container}
      anchor="bottom"
      open={branchId !== ""}
      onClose={() => setBranchId("")}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={true}
    >
      <Box
        sx={{
          padding: "20px",
        }}
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
    </SwipeableDrawer>
  );
}

export default BranchDetails;
