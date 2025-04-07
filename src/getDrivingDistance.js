// src/apis/getDrivingDistance.ts

export const getDrivingDistance = async (origin, destination) => {
  const res = await fetch("/api/distance/route", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      origin: origin, // New York
      destination: destination, // LA
    }),
  });

  const data = await res.json();
  return(data.distance);
};
