import { AppContext } from "@/context/AppContext";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import Spinner from "../common/Spinner/spinner";

const NewMapAddress = ({
  center,
  selectedArea,
  markerPosition,
  setMarkerPosition,
  selectedBounds,
  triggerClick,
}) => {
  const {
    homePageDetails,
    language,
    addressDetails,
    areaDetails,
    handleAddressDetailsChange,
  } = useContext(AppContext);
  const mapContainerStyle = {
    width: "100%",
    height: "60vh",
    borderRadius: "20px",
  };

  const { enqueueSnackbar } = useSnackbar();
  const [rectangle, setRectangle] = useState(null);

  const mapRef = useRef(null);
  useEffect(() => {}, [addressDetails?.id]);

  useEffect(() => {
    (async () => {
      if (selectedArea) {
        const encodedPlaceName = encodeURIComponent(`${selectedArea}, Kuwait`);
        const respones = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedPlaceName}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
        );
        if (respones.status === 200) {
          let lat = respones?.data?.results[0]?.geometry?.location?.lat;
          let lng = respones?.data?.results[0]?.geometry?.location?.lng;
          if (lat && lng) {
            handleAddressDetailsChange((a) => ({
              ...a,
              lat: lat,
              lng: lng,
            }));
          }
        }
      }
    })();
  }, []);

  useEffect(() => {}, [
    selectedBounds.north,
    markerPosition,
    addressDetails.lat,
    addressDetails.lng,
  ]);

  const isWithinBounds = (lat, lng, bounds) => {
    const { north, south, east, west } = bounds;
    return lat <= north && lat >= south && lng >= west && lng <= east;
  };

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    if (
      isWithinBounds(event.latLng.lat(), event.latLng.lng(), selectedBounds)
    ) {
      setMarkerPosition({ lat, lng });
      const respones = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${event?.latLng?.lat()},${event?.latLng?.lng()}&key=${
          process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
        }`
      );
      if (respones.status === 200) {
        let block, street;
        const filterAddress = respones.data.results.filter(
          (add) =>
            add.types.includes("neighborhood") | add.types.includes("route")
        );

        if (filterAddress.length) {
          filterAddress.map((address) => {
            for (const component of address.address_components) {
              if (component.types.includes("route")) {
                street = component.long_name;
              } else if (component.types.includes("neighborhood")) {
                if (component.long_name.includes("Block")) {
                  block = component.long_name.split(" ")[1];
                }
              }
            }
          });

          handleAddressDetailsChange((a) => ({
            ...a,
            lat: event?.latLng?.lat(),
            lng: event?.latLng?.lng(),
          }));
        }
      }
    } else {
      enqueueSnackbar({
        variant: "error",
        message:
          language === "ltr"
            ? `Please select inside area ${areaDetails.area}`
            : `الرجاء تحديد المنطقة الداخلية ${areaDetails.ar_area}`,
        autoHideDuration: 2000,
      });
    }
  };

  const handleMarker = async (event) => {
    handleAddressDetailsChange((a) => ({
      ...a,
      lat: event?.latLng?.lat(),
      lng: event?.latLng?.lng(),
    }));
    const respones = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${event?.latLng?.lat()},${event?.latLng?.lng()}&key=${
        process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
      }`
    );
    if (respones.status === 200) {
      let block, street;
      respones.data.results.map((address) => {
        if (address.formatted_address.includes("Block")) {
          block = address.formatted_address.split(" ")[1].split("")[0];
        }
        if (address.formatted_address.includes("Street")) {
          street = address.formatted_address.split(" ")[1];
        } else if (address.formatted_address.includes("St")) {
          street = address.formatted_address.split(" ")[0];
        }
      });
      handleAddressDetailsChange((a) => ({
        ...a,
        lat: event?.latLng?.lat(),
        lng: event?.latLng?.lng(),
      }));
    }
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDK_1lc7uLQSGYHVpr0mGl-c1Zys2OPOdg",
  });
  useEffect(() => {}, [markerPosition]);

  if (!isLoaded)
    return (
      <div
        style={{
          width: "100%",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "10",
          boxShadow: "none",
          borderRadius: "20px",
        }}
        className="order-spinner-background"
      >
        <Spinner
          height="50px"
          color={homePageDetails?.vendor_data?.vendor_color}
          size="6px"
        />
      </div>
    );
  return (
    <GoogleMap
      className={`map-border`}
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={4}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        restriction: {
          latLngBounds: selectedBounds,
          // strictBounds: true,
        },
      }}
      onClick={handleMapClick}
      onLoad={(map) => (mapRef.current = map)}
    >
      {markerPosition && (
        <Marker position={markerPosition} draggable onDragEnd={handleMarker} />
      )}
    </GoogleMap>
  );
};

export default NewMapAddress;
