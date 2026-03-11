import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Fashion_Vault",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
