// app/changelog/page.client.tsx
"use client";
import { format } from "date-fns";
import { CheckCheck, Forward } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MarkdownRenderer } from "@/components/site/common/markdown-renderer";
import { toKebabCase } from "@/utils/slug-kebab";
import type { EntryWithContent } from "./page";

interface ChangelogClientProps {
  entries: EntryWithContent[];
}

export default function ChangelogClient({ entries }: ChangelogClientProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Scroll to the log section if URL contains a valid hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Small delay to ensure the DOM is fully rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCopy = async (slug: string) => {
    const url = `${window.location.origin}/changelog#${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(slug);
      setTimeout(() => {
        setCopiedId((current) => (current === slug ? null : current));
      }, 2000);
    } catch (error) {
      console.error("Failed to copy URL", error);
    }
  };

  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="relative space-y-10 md:space-y-20 w-full h-full">
      {sorted.map((entry, index) => {
        const slug = toKebabCase(entry.title);
        return (
          <section
            key={slug}
            id={slug}
            className="relative pt-10 md:pt-20 first:pt-0!"
          >
            {index > 0 && (
              <div className="absolute top-0 left-0 opacity-60 bg-linear-to-l from-transparent via-primary to-transparent rounded-full h-px w-full" />
            )}
            <div className="flex items-center gap-3">
              <time className="text-base text-foreground/40 w-fit">
                {format(new Date(entry.date), "MMM d, yyyy")}
              </time>
              <button
                type="button"
                onClick={() => handleCopy(slug)}
                className={`flex items-center gap-1.5 transition-all duration-500 cursor-pointer ${
                  copiedId === slug
                    ? "text-green-500"
                    : "opacity-40 hover:opacity-100"
                }`}
              >
                {copiedId === slug ? (
                  <CheckCheck className="size-5" />
                ) : (
                  <Forward className="size-5" />
                )}
                <span>{copiedId === slug ? "Copied" : "Share"}</span>
              </button>
            </div>
            <h2 className="text-2xl font-semibold mt-5 md:mt-10 mb-3 opacity-90">
              {entry.title}
            </h2>
            {entry.images && entry.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 w-full">
                {entry.images.map((image, index) => (
                  <button
                    key={`${slug}-${index}`}
                    type="button"
                    onClick={() => setPreviewImage(image)}
                    className="overflow-hidden rounded-lg cursor-zoom-in"
                  >
                    <Image
                      src={image}
                      alt={`${entry.title} ${index + 1}`}
                      width={2000}
                      height={2000}
                      className="object-cover hover:scale-110 transition-all duration-500 w-full"
                    />
                  </button>
                ))}
              </div>
            )}
            <div className="mt-3">
              <MarkdownRenderer
                content={entry.markdownContent}
                showHeader={false}
              />
            </div>
          </section>
        );
      })}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm w-full"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative rounded-2xl overflow-hidden max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={previewImage}
              alt="Preview"
              width={5000}
              height={5000}
              className="object-cover w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
