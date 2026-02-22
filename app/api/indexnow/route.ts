import { NextResponse } from "next/server";
import { website } from "@/lib/brand";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "";
const SEARCH_ENGINES = [
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

export async function POST(request: Request) {
  try {
    const { urlList } = await request.json();
    if (!Array.isArray(urlList) || urlList.length === 0) {
      return NextResponse.json({ error: "urlList must be a non-empty array" }, { status: 400 });
    }

    const baseUrl = website || "https://ui.venumity.com";
    const fullUrlList = urlList.map((path) =>
      path.startsWith("http") ? path : `${baseUrl}${path}`
    );

    // Ping each search engine
    const pingPromises = SEARCH_ENGINES.map(async (engine) => {
      const payload = {
        host: baseUrl.replace(/^https?:\/\//, ""),
        key: INDEXNOW_KEY,
        urlList: fullUrlList,
      };
      const response = await fetch(engine, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return response.ok;
    });

    await Promise.all(pingPromises);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("IndexNow error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}