import type { NextConfig } from "next";
import path from "node:path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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

export default withNextIntl(nextConfig);
