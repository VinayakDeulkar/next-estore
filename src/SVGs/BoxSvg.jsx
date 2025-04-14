import React from "react";

const BoxSvg = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8L12.5 2L23 8V19L12.5 25L2 19V8Z"
        fill="#fff"
        stroke="black"
        strokeWidth="1"
      />
      <path d="M12.5 2V25" stroke="black" strokeWidth="1" />
      <path d="M2 8L12.5 14L23 8" stroke="black" strokeWidth="1" />
    </svg>
  );
};

export default BoxSvg;
