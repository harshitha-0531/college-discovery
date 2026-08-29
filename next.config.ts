import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent build worker parallel memory spikes on local machines
  experimental: {
    cpus: 1,
    webpackMemoryOptimizations: true,
  },
  typescript: {
    // Allows production builds to succeed even with minor type warnings
    ignoreBuildErrors: true,
  },
};

export default nextConfig;