import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/install@:version",
        destination: "/install",
      },
      {
        source: "/setup@:version",
        destination: "/setup",
      },
    ];
  },
};

export default nextConfig;
