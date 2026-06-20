// app/api/feedback/route.ts
//
// Storage : Local JSON file (saved in the filesystem)
// GET  /api/feedback        → returns ALL feedbacks publicly as JSON
// POST /api/feedback        → saves a new feedback entry
//
// Note: In production, this stores data in the filesystem.
// For serverless deployments, consider using a database.

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FeedbackEntry {
  id: string;
  username: string;
  email: string;
  message: string;
  rating: number;
  dateTime: string;
  userDetails: string;
  sitePageUrl: string;
  userAgent: string;
  ip?: string;
  referer?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateId(): string {
  return `fb_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function getFormattedDateTime(): string {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} | ${hours}:${minutes} ${ampm}`;
}

function getUserDetails(ua: string, ip?: string): string {
  const u = ua.toLowerCase();
  const device = /mobile|android|iphone|ipod/i.test(u)
    ? "Mobile"
    : /tablet|ipad/i.test(u)
      ? "Tablet"
      : "Desktop";
  const os = /windows/i.test(u)
    ? "Windows"
    : /android/i.test(u)
      ? "Android"
      : /iphone|ipad|ios/i.test(u)
        ? "iOS"
        : /mac/i.test(u)
          ? "macOS"
          : /linux/i.test(u)
            ? "Linux"
            : "Unknown OS";
  const browser =
    /chrome/i.test(u) && !/edg/i.test(u)
      ? "Chrome"
      : /safari/i.test(u) && !/chrome/i.test(u)
        ? "Safari"
        : /firefox/i.test(u)
          ? "Firefox"
          : /edg/i.test(u)
            ? "Edge"
            : "Unknown";
  const location =
    ip && !ip.startsWith("::1") && !ip.startsWith("127.")
      ? `IP: ${ip}`
      : "Location unknown";
  return `${location} | ${device} (${os}, ${browser})`;
}

// ─── File system helpers ─────────────────────────────────────────────────────
// Store data in a JSON file in the filesystem

const FEEDBACKS_FILE = path.join(process.cwd(), "feedbacks.json");

function ensureFileExists(): void {
  if (!fs.existsSync(FEEDBACKS_FILE)) {
    fs.writeFileSync(FEEDBACKS_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

async function readFeedbacks(): Promise<FeedbackEntry[]> {
  try {
    ensureFileExists();
    const data = fs.readFileSync(FEEDBACKS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading feedbacks:", error);
    return [];
  }
}

async function writeFeedbacks(feedbacks: FeedbackEntry[]): Promise<void> {
  try {
    ensureFileExists();
    fs.writeFileSync(FEEDBACKS_FILE, JSON.stringify(feedbacks, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing feedbacks:", error);
    throw new Error("Failed to save feedback data");
  }
}

// ─── GET — public, no auth needed ─────────────────────────────────────────────
// Visit: https://pro.venumity.com/api/feedback

export async function GET() {
  try {
    const feedbacks = await readFeedbacks();
    return NextResponse.json(
      { success: true, total: feedbacks.length, data: feedbacks },
      {
        headers: {
          // Allow browsers / your dashboard to read this freely
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("GET /api/feedback error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve feedbacks." },
      { status: 500 },
    );
  }
}

// ─── POST — save a new feedback ───────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, message, rating, sitePageUrl } = body;

    if (!username?.trim() || !message?.trim() || !rating) {
      return NextResponse.json(
        {
          success: false,
          message: "Username, message, and rating are required.",
        },
        { status: 400 },
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const ua = request.headers.get("user-agent") || "unknown";
    const referer = request.headers.get("referer") || "";

    const newEntry: FeedbackEntry = {
      id: generateId(),
      username: username.trim(),
      email: email?.trim() || "",
      message: message.trim(),
      rating: Number(rating),
      dateTime: getFormattedDateTime(),
      userDetails: getUserDetails(ua, ip),
      sitePageUrl: sitePageUrl || referer || "unknown",
      userAgent: ua,
      ip: ip !== "unknown" ? ip : undefined,
      referer: referer || undefined,
    };

    const existing = await readFeedbacks();
    // newest first
    await writeFeedbacks([newEntry, ...existing]);

    return NextResponse.json({ success: true, message: "Feedback saved!" });
  } catch (error) {
    console.error("POST /api/feedback error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}