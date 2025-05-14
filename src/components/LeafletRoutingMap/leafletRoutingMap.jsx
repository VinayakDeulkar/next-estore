import React, { useContext, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import Spinner from "../common/Spinner/spinner";
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

const Routing = ({ startLat, startLng, endLat, endLng }) => {
  const map = useMap();
  const controlRef = useRef(null);

  useEffect(() => {
    if (!map || !startLat || !startLng || !endLat || !endLng) return;

    const control = L.Routing.control({
      waypoints: [L.latLng(startLat, startLng), L.latLng(endLat, endLng)],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      createMarker: (i, wp) => {
        const label = i === 0 ? "Start" : "End";
        return L.marker(wp.latLng).bindPopup(label).openPopup();
      },
    }).addTo(map);

    controlRef.current = control;

    return () => {
      if (
        map &&
        controlRef.current &&
        map.hasLayer(controlRef.current._container)
      ) {
        try {
          map.removeControl(controlRef.current);
        } catch (err) {
          console.warn("Failed to initialize routing.");
        }
      }
    };
  }, [startLat, startLng, endLat, endLng, map]);

  return null;
};

const LeafletRoutingMap = ({ startLat, startLng, endLat, endLng }) => {
  const { homePageDetails } = useContext(AppContext);

  return startLat && startLng && endLat && endLng ? (
    <MapContainer
      center={[parseFloat(endLat), parseFloat(endLng)]}
      zoom={13}
      style={{ height: "300px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing
        startLat={parseFloat(startLat)}
        startLng={parseFloat(startLng)}
        endLat={parseFloat(endLat)}
        endLng={parseFloat(endLng)}
      />
    </MapContainer>
  ) : (
    <div
      style={{
        width: "100%",
        height: "299px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "8",
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
};

export default LeafletRoutingMap;
