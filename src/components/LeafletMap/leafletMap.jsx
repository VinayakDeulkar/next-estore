import React, { useContext } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSnackbar } from "notistack";
import { AppContext } from "@/context/AppContext";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const isWithinBounds = (lat, lng, checkBounds) => {
  const { north, south, east, west } = checkBounds;
  return lat <= north && lat >= south && lng >= west && lng <= east;
};

function HandleMapClick({
  setMarkerPosition,
  selectedBounds,
  enqueueSnackbar,
  areaDetails,
  language,
  handleAddressDetailsChange,
}) {
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      if (isWithinBounds(lat, lng, selectedBounds)) {
        setMarkerPosition({ lat, lng });
        handleAddressDetailsChange((a) => ({
          ...a,
          lat: lat,
          lng: lng,
        }));
      } else {
        enqueueSnackbar({
          variant: "error",
          message:
            language === "ltr"
              ? `Please select inside area ${areaDetails?.area}`
              : `الرجاء تحديد المنطقة الداخلية ${areaDetails?.ar_area}`,
        });
      }
    },
  });
  return null;
}

const LeafletMap = ({ markerPosition, setMarkerPosition, selectedBounds }) => {
  const { enqueueSnackbar } = useSnackbar();
  const bounds = [
    [selectedBounds.south, selectedBounds.west],
    [selectedBounds.north, selectedBounds.east],
  ];
  const { areaDetails, language, handleAddressDetailsChange } =
    useContext(AppContext);

  return (
    <MapContainer
      center={[29.3759, 47.9774]}
      bounds={bounds}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HandleMapClick
        setMarkerPosition={setMarkerPosition}
        selectedBounds={selectedBounds}
        enqueueSnackbar={enqueueSnackbar}
        areaDetails={areaDetails}
        language={language}
        handleAddressDetailsChange={handleAddressDetailsChange}
      />
      {markerPosition && (
        <Marker
          position={markerPosition}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const lat = e.target.getLatLng().lat;
              const lng = e.target.getLatLng().lng;

              if (isWithinBounds(lat, lng, selectedBounds)) {
                setMarkerPosition({ lat, lng });
                handleAddressDetailsChange((a) => ({
                  ...a,
                  lat,
                  lng,
                }));
              } else {
                enqueueSnackbar({
                  variant: "error",
                  message:
                    language === "ltr"
                      ? `Please drag inside area ${areaDetails?.area}`
                      : `الرجاء السحب داخل المنطقة ${areaDetails?.ar_area}`,
                });
              }
            },
          }}
        />
      )}
    </MapContainer>
  );
};

export default LeafletMap;
