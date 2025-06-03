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

  return (
    <>
      {showCurtain ? (
        <div className="relative w-full h-screen bg-white overflow-hidden">
          <AnimatePresence>
            <>
              <motion.div
                initial={{ height: 0, top: "50%" }}
                animate={{ height: "100vh", top: "0%" }}
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
              >
                <img
                  src={homePageDetails?.vendor_data?.english_new_background}
                  className="object-cover"
                  style={{
                    transform:
                      window.innerWidth > 600
                        ? "translateX(125px)"
                        : "translateX(100px)",
                    width: window.innerWidth > 600 ? "250px" : "200px",
                    height: window.innerWidth > 600 ? "250px" : "200px",
                  }}
                />
              </motion.div>

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
              >
                <img
                  src={homePageDetails?.vendor_data?.english_new_background}
                  className="object-cover"
                  style={{
                    transform: window.innerWidth > 600 ? "translateX(-125px)" : "translateX(-100px)",
                    width: window.innerWidth > 600 ? "250px" : "200px",
                    height: window.innerWidth > 600 ? "250px" : "200px",
                  }}
                />
              </motion.div>
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
