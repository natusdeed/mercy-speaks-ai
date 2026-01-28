import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: Webpack cache warnings on Windows are non-fatal
  // If you see "Caching failed for pack" warnings, clear .next/cache/webpack
  webpack: (config, { dev }) => {
    // Reduce cache operations that can fail on Windows file system
    if (dev && config.cache && typeof config.cache === 'object' && config.cache.type === 'filesystem') {
      // Limit memory generations to reduce file rename operations
      config.cache.maxMemoryGenerations = 1;
    }
    return config;
  },
};

export default nextConfig;
