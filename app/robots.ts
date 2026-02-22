import { MetadataRoute } from "next";
import { website } from "@/lib/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${website || "https://ui.venumity.com"}/sitemap.xml`,
  };
}