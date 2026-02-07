"use client";
import { authorName, brandName, handle } from "@/lib/brand";
import Image from "next/image";

export default function SocialTestimonial() {
  return (
    <main className="border rounded-lg p-6 max-w-md">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center">
          <Image
            src="/vinu.jpg"
            alt={brandName}
            width={100}
            height={100}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="font-bold">{authorName}</h3>
            <p className="text-sm opacity-60">@{handle}</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x fill-background! size-6"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      </div>
      <div className="relative mb-4">
        <p className="text-sm">
          Venumity UI helped us ship faster with clean, accessible, and
          beautifully crafted components.
        </p>
      </div>
      <div className="text-xs opacity-50">26-01-2026 | 12.30 PM</div>
    </main>
  );
}
