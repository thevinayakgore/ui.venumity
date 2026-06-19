import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  reactCompiler: true, // ⚠️ Only enable if you've installed babel-plugin-react-compiler and Next.js supports it
  turbopack: {},          // Silences the error, no need to set anything else
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "**" },
      { protocol: "https", hostname: "logoipsum.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;