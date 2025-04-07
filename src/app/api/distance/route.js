// src/app/api/distance/route.ts

export default async function handler(req, res) {
  const { origin, destination } = await req.json();
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const originStr = `${origin.lat},${origin.lng}`;
  const destinationStr = `${destination.lat},${destination.lng}`;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originStr}&destinations=${destinationStr}&mode=driving&key=${apiKey}`;

  const ressponse = await fetch(url);
  const data = await ressponse.json();

  if (
    data.rows &&
    data.rows[0]?.elements &&
    data.rows[0].elements[0]?.status === "OK"
  ) {
    const distance = data.rows[0].elements[0].distance.value / 1000; // km
    return res.json({ distance });
  } else {
    return res.json({ error: "Failed to fetch distance" }, { status: 500 });
  }
}