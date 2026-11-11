import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   allowedDevOrigins: ["172.20.10.3"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "cdn.finora.app",
      },
    ],
  },
};

export default nextConfig;
