"use client";
import { authorName, brandName, website } from "@/lib/brand";
import { Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CompanyTestimonial() {
  return (
    <main className="flex items-center justify-center m-auto p-6 md:p-10 w-full h-full">
      <div className="bg-linear-to-tr from-cyan-500 via-sky-500 to-blue-500 border-4 border-white rounded-2xl p-5 md:p-10 text-white max-w-2xl m-auto">
        <div className="flex items-start gap-4">
          <Quote className="shrink-0 opacity-70 size-12 rotate-180" />
          <p className="text-lg leading-snug">
            This UI kit saved us weeks of development time. The components are
            clean, modern, and incredibly easy to customize. The attention to
            detail across every section is genuinely impressive. It feels
            thoughtfully crafted for real-world production use.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between p-2 bg-white/15 rounded-full">
          <div className="relative flex items-center">
            <Image
              src="/vinu.jpg"
              alt={authorName}
              width={500}
              height={500}
              className="size-14 z-10 border-2 border-white rounded-full object-cover"
            />
            <div className="absolute inset-0 top-2 left-2 bg-white z-0 animate-ping rounded-full size-10" />
            <div className="ml-3">
              <h3 className="text-lg font-semibold">{authorName}</h3>
              <p className="text-sm opacity-70 font-medium">
                Author of {brandName}
              </p>
            </div>
          </div>

          <Link
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-full"
          >
            <Image
              src="/logo.png"
              alt={authorName}
              width={500}
              height={500}
              className="size-14 z-10 border-2 border-white rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
