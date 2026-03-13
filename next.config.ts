import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
