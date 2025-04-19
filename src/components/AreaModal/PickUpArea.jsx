import { AppContext } from "@/context/AppContext";
import { SearchOutlined } from "@mui/icons-material";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const PickUpArea = () => {
  const {
    homePageDetails,
    language,
    vendorSlug,
    areaDetails,
    handleAreaDetailsChange,
    handleAddressDetailsChange,
  } = useContext(AppContext);
  const [branchSearch, setBranchSearch] = useState("");
  const [branchs, setBranchs] = useState([]);
  const router = useRouter();
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupDetails, setPopupDetails] = useState({
    remove_items: [],
    show_popup: 0,
  });
  const branchSearchChange = (e) => {
    setBranchSearch(e.target.value);
  };
  useEffect(() => {
    if (areaDetails.data.branch) {
      if (branchSearch == "") setBranchs(areaDetails.data.branch);
      else {
        let temp = areaDetails.data.branch.filter(
          (k, i) =>
            k?.name?.toUpperCase().indexOf(branchSearch?.toUpperCase()) > -1 ||
            k?.arabic_name?.toUpperCase().indexOf(branchSearch?.toUpperCase()) >
              -1
        );
        setBranchs(temp);
      }
    }
  }, [areaDetails.data.branch, branchSearch]);

  const onBranchSelect = (eng, arab, key, area) => {
    setActive((a) => eng);
    axios
      .post(
        `${API_URL}/change-area`,
        JSON.stringify({
          token: process.env.NEXT_PUBLIC_APP_TOKEN,
          vendor_id: homePageDetails?.vendor_data?.vendors_id,
          area_id: area,
          vendor_slug: vendorSlug?.data?.ecom_url_slug,
          user_string: localStorage.getItem("userID"),
        })
      )
      .then((res) => {
        let temp = res.data.data;
        if (temp?.show_popup == 0) {
          let temp = areaDetails?.data?.branch?.filter((k, i) => k?.id == key);
          temp = temp[0];
          let start, end;
          if (temp?.office_end_time == "00:00:00") {
            start = new Date(
              new Date().setHours(...temp?.office_start_time?.split(":"))
            );
            end = new Date(new Date().setHours(23, 59, 59));
          } else {
            start = new Date(
              new Date().setHours(...temp?.office_start_time?.split(":"))
            );
            const dummyEnd = new Date(
              new Date().setHours(...temp?.office_end_time?.split(":"))
            );
            end =
              vendorSlug !== "alawael-bilingual-school"
                ? dummyEnd
                : new Date(dummyEnd.setMinutes(dummyEnd.getMinutes() - 30));
          }

          let current = new Date();
          if (vendorSlug !== "alawael-bilingual-school") {
            current.setHours(current.getHours() + 2);
          }
          const dummyStart = new Date(start);
          if (!(start > current || current > end)) {
            handleAreaDetailsChange((areaDetails) => ({
              ...areaDetails,
              branch: eng,
              minimum: "",
              area_id: area,
              shopOpen: 1,
              now: 1,
              area: "",
              ar_area: "",
              ar_branch: arab,
              branch_id: key,
              deliveryTiming: getWithinValue(end),
              ar_deliveryTiming: getWithinValue(end, true),
              getDeliveryTiming: moment().add(120, "minutes").toDate(),
              laterDeliveryTiming: moment().add(120, "minutes").toDate(),
              branchForArea: {
                id: key,
                english: eng,
                arabic: arab,
                end:
                  temp?.office_end_time == "00:00:00"
                    ? moment("23:59:59", "HH:mm:ss")
                    : moment(temp?.office_end_time, "HH:mm:ss"),
                start: moment(temp?.office_start_time, "HH:mm:ss"),
              },
            }));
          } else {
            handleAreaDetailsChange((areaDetails) => ({
              ...areaDetails,
              branch: eng,
              minimum: "",
              area_id: area,
              shopOpen: 2,
              now: 2,
              ar_branch: arab,
              branch_id: key,
              area: "",
              ar_area: "",
              deliveryTiming: "24 Hours",
              ar_deliveryTiming: "24 ساعات",
              getDeliveryTiming: getOutValue(dummyStart, current),
              laterDeliveryTiming: getOutValue(start, current),
              branchForArea: {
                id: key,
                english: eng,
                arabic: arab,
                end:
                  temp?.office_end_time == "00:00:00"
                    ? moment("23:59:59", "HH:mm:ss")
                    : moment(temp?.office_end_time, "HH:mm:ss"),
                start: moment(temp?.office_start_time, "HH:mm:ss"),
              },
            }));
          }
          setOpenArea((prev) => ({ open: false, goHome: false }));
          if (openArea.goHome) {
            router.push("/");
          }
          // if (router?.location?.state?.from == "prdetails") {
          //   router.goBack();
          // } else {
          //   router.push(`/`);
          // }
        } else {
          setLoading(false);
          setPopupDetails((pop) => ({
            key: key,
            eng: eng,
            arab: arab,
            area: area,
            show_popup: temp?.show_popup,
          }));
        }
      })
      .catch((e) => console.log(e));
  };
  const getWithinValue = (end, lng) => {
    if (vendorSlug !== "alawael-bilingual-school") {
      return lng ? `2 ساعات` : "2 Hours";
    } else {
      return moment(new Date(end)).locale("en").format("hh:mm A");
    }
  };
  const getOutValue = (start, current) => {
    if (vendorSlug !== "alawael-bilingual-school") {
      if (start > current) {
        const value = new Date(start.setHours(start.getHours() + 2));
        return value;
      } else {
        const value = new Date(start.setDate(start.getDate() + 1));
        return value;
      }
    } else {
      if (start > current) {
        const value = new Date(start.setMinutes(start.getMinutes() + 30));
        return value;
      } else {
        const value = new Date(start.setDate(start.getDate() + 1));
        return value;
      }
    }
  };
  const moveup = () => {
    $("html, body").animate(
      {
        scrollTop:
          $(`#pickupSearch`).offset().top - $(`#pickupSearch`).offset().top,
      },
      "slow"
    );
  };
  return (
    <div>
      <div
        className={`delivery-area-search  ${
          homePageDetails?.vendor_data?.home_page_type === "18" &&
          "fashion-theme-border"
        }`}
      >
        <SearchOutlined color={homePageDetails?.vendor_data?.vendor_color} />
        <input
          onChange={(e) => branchSearchChange(e)}
          onFocus={moveup}
          type="search"
          id="deliverySearch"
          placeholder={
            language === "ltr" ? "Search branch" : "بحث بأسماء الأفرع"
          }
          className="delivery-area-search-input"
          value={branchSearch}
        ></input>
      </div>
    </div>
  );
};

export default PickUpArea;
