"use client";

import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import React, { useEffect, useRef } from "react";

const StaggeredAnimation = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    document.fonts.ready.then(() => {
      const { words } = splitText(element);

      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
          duration: 2,
          bounce: 0,
          delay: stagger(0.05),
        }
      );
    });
  }, []);

  return ref;
};

export default StaggeredAnimation;
