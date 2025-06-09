"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { AppContext } from "@/context/AppContext";
import { Box } from "@mui/material";

const LoadingWrapper = ({ children }) => {
  const { homePageDetails } = useContext(AppContext);
  const [showCurtain, setShowCurtain] = useState(true);
  const lineControls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCurtain(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("load", "initial");
  }, []);

  useEffect(() => {
    const runAnimation = async () => {
      lineControls.start({
        height: "100vh",
        top: "0%",
        opacity: 1,
        transition: { duration: 1.2 },
      });

      setTimeout(() => {
        lineControls.start({
          opacity: 0,
          transition: { duration: 0 },
        });
      }, 1000);
    };

    runAnimation();
  }, []);

  return (
    <>
      {showCurtain && !sessionStorage.getItem("load") ? (
        <div className="relative w-full h-screen bg-white overflow-hidden">
          <Box
            sx={{
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              zIndex: 999,
              pointerEvents: "none",
            }}
          >
            <img
              src={homePageDetails?.vendor_data?.english_new_background}
              className="object-cover"
              style={{
                width: window.innerWidth > 600 ? "175px" : "150px",
                height: window.innerWidth > 600 ? "175px" : "150px",
                borderRadius: "10px",
              }}
            />
          </Box>
          <AnimatePresence>
            <>
              <motion.div
                initial={{ height: 0, top: "50%" }}
                animate={lineControls}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className={"absolute left-1/2 w-0.5 bg-white z-20"}
                style={{
                  transform: "translateX(-50%)",
                }}
              />

              <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{ delay: 1, duration: 0.8 }}
                className={"absolute top-0 left-0 w-1/2 h-full z-10"}
                style={{
                  backgroundColor: homePageDetails?.vendor_data?.vendor_color,
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              ></motion.div>

              <motion.div
                initial={{ x: 0 }}
                animate={{ x: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
                className={"absolute top-0 right-0 w-1/2 h-full z-10"}
                style={{
                  backgroundColor: homePageDetails?.vendor_data?.vendor_color,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              ></motion.div>
            </>
          </AnimatePresence>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingWrapper;
