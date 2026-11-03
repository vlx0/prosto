import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  agentRules: false,
};

export default nextConfig;
