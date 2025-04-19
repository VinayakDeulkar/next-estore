import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/ar-SA";
import "moment/locale/ar-sa";
import moment from "moment";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OptionBox from "../assetBoxDesign/OptionBox/optionBox";
import { Box } from "@mui/material";
registerLocale("ar", es);

function DeliveryTimeSelect() {
  const {
    language,
    areaDetails,
    handleAreaDetailsChange,
    handleOpenAreaChange,
    homePageDetails,
  } = useContext(AppContext);
  const router = useRouter();
  const [onlyOne, setOnlyOne] = useState(areaDetails?.getDeliveryTiming);
  const [timeInput, setTimeInput] = useState(areaDetails?.laterDeliveryTiming);
  const [now, setNow] = useState(areaDetails?.now);
  const [timing, setTiming] = useState({
    start: new Date(),
    end: new Date(),
    mid: false,
  });

  useEffect(() => {
    if (!areaDetails?.area && !areaDetails?.branch) {
      handleOpenAreaChange((prev) => ({ open: true, goHome: false }));
      // history.push(`/area`);
    } else {
      let temp = areaDetails?.data?.branch?.filter(
        (k, i) => k?.id == areaDetails?.branchForArea?.id
      );
      temp = temp[0];
      const startTime = new Date(`01/01/2017 ${temp?.office_start_time}`);
      const onlyOneTime = moment(areaDetails?.getDeliveryTiming)
        .add(2, "hours")
        .toDate();
      if (temp?.office_end_time == "00:00:00") {
        setTiming({
          // start: startTime.setHours(startTime.getHours() + areaDetails?.deliveryTiming?.split(" ")?.[0]),
          start: startTime,
          end: new Date(`01/01/2017 23:59:59`),
          mid: true,
        });
        // setOnlyOne(onlyOneTime);
      } else {
        setTiming({
          // start: startTime.setHours(startTime.getHours() + areaDetails?.deliveryTiming?.split(" ")?.[0]),
          start: startTime,
          end: new Date(`01/01/2017 ${temp?.office_end_time}`),
          mid: false,
        });
        // setOnlyOne(onlyOneTime);
      }
    }
  }, []);

  return (
    <>
      <div className="delivery-schedular-box">
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {areaDetails?.shopOpen == 1 && (
            <OptionBox
              handleClick={() => setNow(1)}
              enText={
                areaDetails?.type == "delivery"
                  ? `${!areaDetails?.customDelivery ? "Delivery Within" : ""} ${
                      areaDetails?.deliveryTiming
                    }`
                  : areaDetails?.deliveryTiming
              }
              arText={
                areaDetails?.type == "delivery"
                  ? `${
                      !areaDetails?.customDelivery ? "التوصيل سيكون خلال" : ""
                    } ${areaDetails?.ar_deliveryTiming}`
                  : areaDetails?.ar_deliveryTiming
              }
              selected={now == 1}
            />
          )}
          {homePageDetails?.vendor_data?.allow_schedule_order == 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <OptionBox
                handleClick={() => setNow(2)}
                enText={"Schedule Order"}
                arText={"حدد موعد التوصيل"}
                selected={now == 2}
              />

              {now == 2 && (
                <DatePicker
                  className="form-control"
                  selected={timeInput}
                  showTimeSelect
                  minDate={onlyOne}
                  disabled={
                    homePageDetails?.vendor_data?.allow_schedule_order == 1
                      ? false
                      : true
                  }
                  minTime={
                    timeInput.getDate() == onlyOne.getDate()
                      ? onlyOne
                      : timing?.start
                  }
                  maxTime={timing?.end}
                  locale={language == "ltr" ? "en" : "ar"}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  onChange={(date) => {
                    if (onlyOne > date) {
                      setTimeInput(onlyOne);
                    } else {
                      setTimeInput(date);
                    }
                  }}
                  customInput={
                    <button
                      style={{
                        textAlign: "start",
                        fontFamily: "SFT Schrifted Sans TRIAL Var",
                        fontSize: "16px",
                      }}
                    >
                      {new Date(timeInput).toLocaleString()}
                    </button>
                  }
                />
              )}
            </Box>
          )}
        </Box>
      </div>
      <div
        className={`bottom-button ${
          homePageDetails?.vendor_data?.home_page_type == "18"
            ? "bottom-button-full"
            : "bottom-button-half"
        }`}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "0px",
          padding: "0 20px",
        }}
      >
        <Link
          href={``}
          onClick={(e) => {
            e.preventDefault();
            if (now == 1) {
              handleAreaDetailsChange((area) => ({ ...areaDetails, now: 1 }));
            } else {
              handleAreaDetailsChange((area) => ({
                ...areaDetails,
                now: 2,
                laterDeliveryTiming: timeInput,
              }));
            }
            history.push("/");
          }}
          style={{ fontWeight: 700 }}
          className="text-center checkout-button"
        >
          {language == "ltr" ? "Set Time -" : "تم -"}{" "}
          {now == 1
            ? areaDetails?.type == "delivery"
              ? language === "ltr"
                ? `${!areaDetails?.customDelivery ? "Delivery Within" : ""} ${
                    areaDetails?.deliveryTiming
                  }`
                : `${
                    !areaDetails?.customDelivery ? "التوصيل سيكون خلال" : ""
                  } ${areaDetails?.ar_deliveryTiming}`
              : language === "ltr"
              ? `${areaDetails?.deliveryTiming}`
              : `${areaDetails?.ar_deliveryTiming}`
            : moment(timeInput).locale("en").format("YYYY-MM-DD HH:mm")}
        </Link>
      </div>
    </>
  );
}

export default DeliveryTimeSelect;
