import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.dummyjson.com'
      },
      {
        hostname: 'dummyjson.com'
      }
    ]
  }
};

export default nextConfig;
