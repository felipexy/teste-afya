import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
  },

  // Image optimization configuration
  images: {
    domains: ["assets.coingecko.com", "coin-images.coingecko.com"],
    unoptimized: false,
  },
};

export default nextConfig;
