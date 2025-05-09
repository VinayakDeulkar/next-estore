import React from "react";

const DynamicLeafletMap = () => {
  const DynamicMap = dynamic(() => import("../LeafletMap"), { ssr: false });

  return <DynamicMap />;
};

export default DynamicLeafletMap;
