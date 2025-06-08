import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsHmrCache: false, // defaults to true
  },
  output: "standalone",
};

export default nextConfig;
