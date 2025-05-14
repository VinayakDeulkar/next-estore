import { AppContext } from "@/context/AppContext";
import { Box, DialogTitle, SwipeableDrawer } from "@mui/material";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import MapContainer from "./MapContainer";
import GoogleMapComponent from "../MapComponent/GoogleMapComponent";
import LeafletMapComponent from "../LeafletMapComponent/leafletMapComponent";

const drawerBleeding = 56;
function BranchDetails({ branchId, setBranchId }) {
  const { areaDetails, language } = useContext(AppContext);
  const [branch, setBranch] = useState({});

  useEffect(() => {
    if (areaDetails.data.branch) {
      setBranch(areaDetails.data.branch[branchId]);
    }
  }, [areaDetails.data.branch, branchId]);
  console.log(areaDetails.data.branch, "areaDetails.data.branch");
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={branchId !== "" && branch}
      onClose={() => setBranchId("")}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={true}
      PaperProps={{
        sx: {
          width: window.innerWidth > 990 ? "37.555%" : "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          backgroundColor: "#f5f5f5",
        },
      }}
      container={
        typeof window !== "undefined"
          ? () => document.getElementById("drawer-container")
          : undefined
      }
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
              {branch?.lat && branch?.lng ? (
                // <GoogleMapComponent lat={branch?.lat} lng={branch?.lng} />
                <LeafletMapComponent branch={branch} />
              ) : null}
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
