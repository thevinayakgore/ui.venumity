"use client";
import { authorName, brandName, username } from "@/lib/brand";
import { Linkedin, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GlowingTestimonial() {
  return (
    <div className="relative max-w-xl">
      <div className="absolute inset-0 rounded-2xl bg-sky-400 opacity-80 blur-2xl" />
      <div className="relative bg-linear-to-tr from-cyan-500 via-sky-500 to-blue-500 border-4 border-white rounded-2xl p-5 md:p-8 text-white">
        <div className="flex items-start gap-4">
          <Quote className="shrink-0 opacity-70 size-10 rotate-180" />
          <p className="text-lg leading-snug">
            This UI kit saved us weeks of development time. The components are
            clean, modern, and incredibly easy to customize.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between p-2 bg-white/15 rounded-full">
          <div className="flex items-center">
            <Image
              src="/vinu.jpg"
              alt={authorName}
              width={500}
              height={500}
              className="size-12 border-2 border-white rounded-full object-cover"
            />
            <div className="ml-3">
              <h3 className="text-lg font-semibold">{authorName}</h3>
              <p className="text-sm opacity-70 font-medium">
                Author of {brandName}
              </p>
            </div>
          </div>

          <Link
            href={`https://linkedin.com/in/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white text-blue-600 p-3 rounded-full"
          >
            <Linkedin className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
