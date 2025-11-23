import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, ".."),
  },
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
