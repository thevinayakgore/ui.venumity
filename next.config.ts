import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "**" },
      { protocol: "https", hostname: "logoipsum.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
  serverExternalPackages: ["fs", "path"],
};

export default nextConfig;
