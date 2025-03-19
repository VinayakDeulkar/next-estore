import { AppContext } from "@/context/AppContext";
import { SearchOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  CircularProgress,
  Dialog,
  ListItem,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import $ from "jquery";
import "./areaModal.css";
import { changeArea, getScheduleTime } from "@/apis";
import { useSnackbar } from "notistack";
import moment from "moment";

const AreaModal = ({ showAreaModal, handleClose }) => {
  const {
    homePageDetails,
    language,
    vendorSlug,
    areaDetails,
    handleAreaDetailsChange,
    handleAddressDetailsChange,
  } = useContext(AppContext);
  const [areaSearch, setAreaSearch] = useState("");
  const [governarateActive, setGovernarateActive] = useState(null);
  const [area, setArea] = useState([]);
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (areaSearch == "") {
      if (areaDetails.data.governarate) {
        let temp = Object.values(areaDetails?.data?.governarate)?.map(
          (k, i) => {
            return false;
          }
        );
        setGovernarateActive(temp);
        setArea(areaDetails?.data?.governarate);
      }
    } else {
      if (areaDetails.data.governarate) {
        let gov_filter = areaDetails?.data?.governarate.map((k, i) => {
          let filtered = k.area.filter(
            (l, j) =>
              l?.area_name?.toUpperCase().indexOf(areaSearch?.toUpperCase()) >
                -1 ||
              l?.area_name_ar
                ?.toUpperCase()
                .indexOf(areaSearch?.toUpperCase()) > -1
          );
          if (filtered.length != 0) return { ...k, area: [...filtered] };
        });
        gov_filter = gov_filter.filter((k, i) => k);
        if (gov_filter.length != 0) {
          let temp = gov_filter?.map((k, i) => {
            return true;
          });
          setGovernarateActive(temp);
          setArea(gov_filter);
        } else setArea([]);
      }
    }
  }, [areaSearch, areaDetails?.data?.governarate]);

  const areaSearchChange = (e) => {
    setAreaSearch(e.target.value);
  };
  const moveup = () => {
    $("html, body").animate(
      {
        scrollTop:
          $(`#deliverySearch`).offset().top - $(`#deliverySearch`).offset().top,
      },
      "slow"
    );
  };
  const changeAreaApi = async (key) => {
    const response = await changeArea({
      vendors_id: homePageDetails?.vendor_data?.vendors_id,
      area_id: key,
      vendorSlug: vendorSlug?.data?.ecom_url_slug,
      user_string: localStorage.getItem("userID"),
    });
    return response;
  };

  const getScheduleTimeApi = async (key) => {
    const response = await getScheduleTime({
      vendors_id: homePageDetails?.vendor_data?.vendors_id,
      area_id: key,
      vendorSlug: vendorSlug?.data?.ecom_url_slug,
    });
    return response;
  };

  const onAreaClick = async (eng, key, min, avail, arab) => {
    try {
      setLoading(true);
      setActive((a) => eng);

      const [areaResponse, timeResponse] = await Promise.all([
        changeAreaApi(key),
        getScheduleTimeApi(key),
      ]);
      if (areaResponse.status === true && areaResponse.data.show_popup === 0) {
        if (timeResponse.status) {
          let selectedBranch = timeResponse.data.branch;
          let activeBranch = areaDetails?.data?.branch?.filter(
            (branch) => branch?.id == selectedBranch?.id
          )[0];
          let estimationTime =
            timeResponse.data?.delivery_details?.delivery_expected_type != 6
              ? timeResponse.data?.delivery_details?.delivery_expected_time
              : 0;
          if (timeResponse.data.time == 1 && avail == 1) {
            handleAddressDetailsChange((prev) => ({
              ...prev,
              block: "",
              street: "",
            }));
            handleAreaDetailsChange((k) => ({
              ...areaDetails,
              area: eng,
              minimum: min,
              shopOpen: timeResponse.data.time,
              now: timeResponse.data.time,
              branch: "",
              ar_branch: "",
              ar_area: arab,
              area_id: key,
              deliveryTiming: timeResponse.data.schedule_time,
              ar_deliveryTiming: timeResponse.data.schedule_time_ar,
              customDelivery:
                timeResponse.data?.delivery_details?.delivery_expected_type ==
                6,

              getDeliveryTiming: moment()
                .add(estimationTime, "minutes")
                .toDate(),
              laterDeliveryTiming: moment()
                .add(estimationTime, "minutes")
                .toDate(),
              branchForArea: {
                ...timeResponse.data.branch,
                end:
                  activeBranch?.office_end_time >
                  activeBranch?.office_start_time
                    ? moment(activeBranch?.office_end_time, "HH:mm:ss")
                    : moment(activeBranch?.office_end_time, "HH:mm:ss").add(
                        1,
                        "days"
                      ),
                start: moment(activeBranch?.office_start_time, "HH:mm:ss"),
              },
            }));
          } else {
            setAreaDetails((l) => ({
              ...areaDetails,
              area: eng,
              minimum: min,
              shopOpen: avail == 1 ? timeResponse.data.time : 2,
              now: avail == 1 ? timeResponse.data.time : 2,
              ar_area: arab,
              area_id: key,
              branch: "",
              ar_branch: "",
              deliveryTiming: timeResponse?.data?.schedule_time,
              ar_deliveryTiming: timeResponse?.data?.schedule_time_ar,
              customDelivery:
                timeResponse.data?.delivery_details?.delivery_expected_type ==
                6,
              getDeliveryTiming:
                avail == 1 || timeResponse.data.time == 2
                  ? moment(
                      timeResponse.data.preorder_on,
                      "YYYY-MM-DD HH:mm:ss"
                    ).toDate()
                  : moment().add(estimationTime, "minutes").toDate(),
              laterDeliveryTiming:
                avail == 1 || timeResponse.data.time == 2
                  ? moment(
                      timeResponse.data.preorder_on,
                      "YYYY-MM-DD HH:mm:ss"
                    ).toDate()
                  : moment().add(estimationTime, "minutes").toDate(),
              branchForArea: {
                ...timeResponse.data.branch,
                end:
                  activeBranch?.office_end_time >
                  activeBranch?.office_start_time
                    ? moment(activeBranch?.office_end_time, "HH:mm:ss")
                    : moment(activeBranch?.office_end_time, "HH:mm:ss").add(
                        1,
                        "days"
                      ),
                start: moment(activeBranch?.office_start_time, "HH:mm:ss"),
              },
            }));
          }
          handleClose(false, "");
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);

        enqueueSnackbar({
          variant: "error",
          message: "something wents wrong!!",
        });
        setMarkerPosition({ lat: "", lng: "" });
      }
    } catch (error) {
      setLoading(false);
      enqueueSnackbar({
        variant: "error",
        message: "something wents wrong!!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCityClick = (city) => {
    if (city?.availability_status == 1) {
      onAreaClick(
        city?.area_name,
        city?.area_id,
        city?.minimum_charge,
        city?.availability_status,
        city?.area_name_ar
      );
    } else {
      setActive((a) => city?.area_name);
    }
  };
  return (
    <Dialog open={showAreaModal} onClose={handleClose} maxWidth="sm">
      <Box
        sx={{ height: "calc(100vh - 50px)", padding: "20px", width: "560px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`delivery-area-search  ${
            homePageDetails?.vendor_data?.home_page_type === "18" &&
            "fashion-theme-border"
          }`}
        >
          <SearchOutlined color={homePageDetails?.vendor_data?.vendor_color} />
          <input
            onChange={(e) => areaSearchChange(e)}
            onFocus={moveup}
            type="search"
            id="deliverySearch"
            placeholder={
              language === "ltr" ? "Search in cities" : "بحث بأسماء المناطق"
            }
            className="delivery-area-search-input"
            value={areaSearch}
          ></input>
        </div>
        <Box mt="20px">
          {area?.length != 0
            ? area?.map((gov, k) => (
                <Accordion>
                  <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                    onClick={() => {
                      setGovernarateActive({
                        ...governarateActive,
                        [k]: !governarateActive[k],
                      });
                    }}
                  >
                    {language === "ltr"
                      ? gov?.governarate_name
                      : gov?.governarate_name_ar}
                  </AccordionSummary>
                  <AccordionDetails>
                    {gov?.area
                      ?.sort((prevCity, nextCity) =>
                        prevCity?.area_name.localeCompare(nextCity?.area_name)
                      )
                      .map((city, j) => (
                        <ListItem
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          onClick={() => {
                            handleCityClick(city);
                          }}
                        >
                          <Box>
                            {language === "ltr"
                              ? city?.area_name
                              : city?.area_name_ar}
                          </Box>
                          {city?.availability_status != 1 && (
                            <Box>
                              {language === "ltr"
                                ? "STORE IS BUSY"
                                : "المتجر مشغول "}
                            </Box>
                          )}
                        </ListItem>
                      ))}
                  </AccordionDetails>
                </Accordion>
              ))
            : null}
        </Box>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
          onClick={() => setLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* <div className=" accordion-container delivery-area-governarate">
          {area?.length != 0
            ? area?.map((gov, k) => (
                <Box key={k}>
                  <div
                    className="delivery-area-governarate-holder"
                    onClick={() =>
                      setGovernarateActive({
                        ...governarateActive,
                        [k]: !governarateActive[k],
                      })
                    }
                  >
                    <button
                      className={`delivery-area-governarate-header ${
                        governarateActive[k] ? "active" : ""
                      }`}
                    >
                      {language === "ltr"
                        ? gov?.governarate_name
                        : gov?.governarate_name_ar}
                    </button>
                    <div
                      className={`delivery-arrow ${
                        governarateActive[k] ? "rotate" : "unrotate"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M7.5 15L12.5 10L7.5 5"
                          stroke="black"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className={`delivery-area-collapse ${
                      governarateActive[k] ? "active" : ""
                    }`}
                  >
                    <ul>
                      {gov?.area
                        ?.sort((prevCity, nextCity) =>
                          prevCity?.area_name.localeCompare(nextCity?.area_name)
                        )
                        .map((city, j) => (
                          <div
                            className={`area-div-hover ${
                              city?.area_name === active ? "area_border" : ""
                            }`}
                            key={j}
                          >
                            <li
                              key={j}
                              onClick={() => {
                                handleCityClick(city);
                              }}
                            >
                              <p>
                                {language === "ltr"
                                  ? city?.area_name
                                  : city?.area_name_ar}
                              </p>
                              {city?.availability_status != 1 && (
                                <span className="branch-avai-status">
                                  {language === "ltr"
                                    ? "STORE IS BUSY"
                                    : "المتجر مشغول "}
                                </span>
                              )}
                            </li>
                          </div>
                        ))}
                    </ul>
                  </div>
                </Box>
              ))
            : areaSearch != "" && (
                <SearchNone searchText={areaSearch}></SearchNone>
              )}
        </div> */}
      </Box>
    </Dialog>
  );
};

export default AreaModal;
