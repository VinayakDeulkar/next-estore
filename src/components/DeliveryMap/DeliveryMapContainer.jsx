import React, { Suspense, useContext, useEffect, useState } from "react";
import "./deliverymap.css";
import { AppContext } from "@/context/AppContext";

const NewMapAddress = React.lazy(() => import("./NewMapAddress"));

const DeliveryMapContainer = ({
  selectedArea,
  handleMapChanges,
  markerPosition,
  setMarkerPosition,
  selectedBounds,
  setSelectedBounds,
  triggerClick,
}) => {
  const { addressDetails, areaDetails, language } = useContext(AppContext);

  const [mapBounds, setMapBounds] = useState(true);
  useEffect(() => {
    triggerClick();
  }, []);
  const houseLabel = () => {
    switch (addressDetails.addressType) {
      case "1":
        return language == "ltr" ? "House No." : "عمارة";

      case "2":
      case "3":
        return language == "ltr" ? "Building no." : "عمارة";

      case "4":
        return language == "ltr" ? "School Name" : "اسم المدرسة";

      case "5":
        return language == "ltr" ? "Mosque Name" : "اسم المسجد";

      case "6":
        return language == "ltr" ? "Government Entity" : "مبنى حكومة";
      default:
        return "";
    }
  };
  return (
    <div
      style={{
        position: "relative",
        margin: "0 -36px",
        padding: "20px 30px",
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <NewMapAddress
          center={{ lat: addressDetails?.lat, lng: addressDetails?.lng }}
          currentCenter={{
            lat: addressDetails?.fixedLat,
            lng: addressDetails?.fixedLng,
          }}
          setMapBounds={setMapBounds}
          selectedArea={selectedArea}
          handleMapChanges={handleMapChanges}
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
          selectedBounds={selectedBounds}
          setSelectedBounds={setSelectedBounds}
          triggerClick={triggerClick}
        />
        <div style={{ padding: "20px 0" }}>
          <div
            style={{
              fontSize: language === "ltr" ? "16px" : "17px",
            }}
          >
            {language === "ltr" ? areaDetails?.area : areaDetails?.ar_area}
          </div>
          <div
            style={{
              color: "#636363",
              fontSize: language === "ltr" ? "14px" : "15px",
            }}
          >
            {language == "ltr" ? "Street" : "شارع "} {addressDetails?.street}
            {", "}
            {language == "ltr" ? "Block" : "قطعة "} {addressDetails?.block}
            {addressDetails?.avenue ? (
              <>
                {", "}
                {language == "ltr" ? "Avenue" : "جادة"} {addressDetails?.avenue}
              </>
            ) : null}
            {", "}
            {houseLabel()} {addressDetails?.house}
          </div>
        </div>
        <button id="forClickOnly" style={{ visibility: "hidden" }}></button>
      </Suspense>
    </div>
  );
};

export default DeliveryMapContainer;
