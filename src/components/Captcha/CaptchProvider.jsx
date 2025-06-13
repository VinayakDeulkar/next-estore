"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Captcha from "./Captcha";
import packageJson from "../../../package.json";

const allowedCountries = ["BH", "KW", "OM", "QA", "SA", "AE", "UK", "US", "IN"];

const CaptchProvider = ({ children }) => {
  const [isCountryBlocked, setIsCountryBlocked] = useState(1);
  const [isLatestBuildDate, setIsLatestBuildDate] = useState(true);

  const getUserLocation = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getGeoInfo = async () => {
    try {
      const response = await getUserLocation();
      return response && allowedCountries.includes(response.country_code);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    const checkUserLocation = async () => {
      const isAllowed = await getGeoInfo();
      setIsCountryBlocked(isAllowed ? 2 : 3);
    };

    checkUserLocation();
  }, []);

  const refreshCacheAndReload = () => {
    if (caches) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    window.location.reload();
  };

  const buildDateGreaterThan = (latest, current) => {
    return new Date(latest) > new Date(current);
  };

  useEffect(() => {
    const checkBuildVersion = async () => {
      try {
        const response = await fetch("/meta.json");
        const meta = await response.json();

        const latestVersionDate = meta.buildDate;
        const currentVersionDate = packageJson.buildDate;

        if (buildDateGreaterThan(latestVersionDate, currentVersionDate)) {
          setIsLatestBuildDate(false);
          refreshCacheAndReload();
        } else {
          setIsLatestBuildDate(true);
        }
      } catch (error) {
        console.log("Error checking build version:", error);
      }
    };

    checkBuildVersion();
  }, []);

  if (isCountryBlocked === 1) return null;

  return isCountryBlocked === 2 ? (
    children
  ) : (
    <Captcha setIsCountryBlocked={setIsCountryBlocked} />
  );
};

export default CaptchProvider;
