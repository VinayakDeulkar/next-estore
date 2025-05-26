"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "@/context/AppContext";
import { mobileScreen } from "@/constants/function";

const LoadingWrapper = ({ children }) => {
  const { homePageDetails } = useContext(AppContext);
  const [showCurtain, setShowCurtain] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCurtain(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("initialLoad")) {
      sessionStorage.setItem("initialLoad", true);
    }
  }, []);

  const getWrapper = () => {
    if (!sessionStorage.getItem("initialLoad")) {
      return (
        <div className="relative w-full h-screen bg-white overflow-hidden">
          <AnimatePresence>
            {showCurtain && (
              <>
                <motion.div
                  initial={
                    mobileScreen()
                      ? { width: 0, left: "50%" }
                      : { height: 0, top: "50%" }
                  }
                  animate={
                    mobileScreen()
                      ? { width: "100vw", left: "0%" }
                      : { height: "100vh", top: "0%" }
                  }
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className={
                    mobileScreen()
                      ? "absolute top-1/2 h-0.5 bg-white z-20"
                      : "absolute left-1/2 w-0.5 bg-white z-20"
                  }
                  style={{
                    transform: mobileScreen()
                      ? "translateY(-50%)"
                      : "translateX(-50%)",
                  }}
                />

                <motion.div
                  initial={mobileScreen() ? { y: 0 } : { x: 0 }}
                  animate={mobileScreen() ? { y: "-100%" } : { x: "-100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className={
                    mobileScreen()
                      ? "absolute top-0 left-0 w-full h-1/2 z-10"
                      : "absolute top-0 left-0 w-1/2 h-full z-10"
                  }
                  style={{
                    backgroundColor: homePageDetails?.vendor_data?.vendor_color,
                    display: "flex",
                    justifyContent: mobileScreen() ? "center" : "end",
                    alignItems: mobileScreen() ? "end" : "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={homePageDetails?.vendor_data?.english_new_background}
                    className="object-cover"
                    style={{
                      transform: mobileScreen()
                        ? "translateY(125px)"
                        : "translateX(125px)",
                      width: "250px",
                      height: "250px",
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={mobileScreen() ? { y: 0 } : { x: 0 }}
                  animate={mobileScreen() ? { y: "100%" } : { x: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className={
                    mobileScreen()
                      ? "absolute bottom-0 left-0 w-full h-1/2 z-10"
                      : "absolute top-0 right-0 w-1/2 h-full z-10"
                  }
                  style={{
                    backgroundColor: homePageDetails?.vendor_data?.vendor_color,
                    display: "flex",
                    justifyContent: mobileScreen() ? "center" : "start",
                    alignItems: mobileScreen() ? "start" : "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={homePageDetails?.vendor_data?.english_new_background}
                    className="object-cover"
                    style={{
                      transform: mobileScreen()
                        ? "translateY(-125px)"
                        : "translateX(-125px)",
                      width: "250px",
                      height: "250px",
                    }}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Website Content */}
          {!showCurtain && children}
        </div>
      );
    } else {
      return children;
    }
  };
  return getWrapper();
};

export default LoadingWrapper;
