/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows any domain (not officially recommended)
      },
    ],
  },
};

export default nextConfig;
