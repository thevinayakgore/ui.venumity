// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],

  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "logoipsum.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },

  outputFileTracingIncludes: {
    "/api/components/og": [
      "./public/thumbnails/**/*.webp",
      "./public/fonts/Inter-Regular.ttf",
    ],
  },
};

export default nextConfig;