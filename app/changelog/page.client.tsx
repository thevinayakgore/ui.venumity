// app/changelog/page.client.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { EntryWithContent } from "./page";
import { toKebabCase } from "@/utils/slug-kebab";
import { formatCount } from "@/utils/format-count";
import { useEffect, useState, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, CheckCheck, Forward } from "lucide-react";
import { MarkdownRenderer } from "@/components/site/common/markdown";

interface ChangelogClientProps {
  entries: EntryWithContent[];
}

export default function ChangelogClient({ entries }: ChangelogClientProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
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

  // Sort entries from newest to oldest
  const sorted = useMemo(() => {
    return [...entries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [entries]);

  // Dynamically grab the most recent date for the header
  const lastUpdatedDate = useMemo(() => {
    if (sorted.length === 0) return "Recently";
    return format(new Date(sorted[0].date), "MMM dd, yyyy");
  }, [sorted]);

  return (
    <section className="relative flex flex-col gap-5 md:gap-10 p-3 sm:p-5 md:pb-10 overflow-auto m-auto max-w-3xl w-full h-full">
      {/* Header */}
      <header className="flex flex-col gap-5 w-full">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          What&apos;s New Update ?
        </h1>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Discover the latest updates, new components, and improvements to
          Venumity UI. We are constantly refining the library to give you the
          best developer experience.
        </p>
        <span className="flex items-center gap-1 mt-2 text-sm text-muted-foreground/70 font-medium">
          Last updated{" "}
          <span className="text-foreground font-semibold">
            {lastUpdatedDate}
          </span>
        </span>
      </header>

      <Separator className="bg-foreground/15" />

      {/* Articles */}
      <article className="space-y-5 md:space-y-10 w-full">
        {sorted.map((entry) => {
          const slug = toKebabCase(entry.title);
          return (
            <section
              key={slug}
              id={slug}
              className="relative flex flex-col gap-5 md:gap-10 w-full"
            >
              <div className="flex items-center gap-3 text-sm text-muted-foreground/70 font-medium w-full">
                <span>{format(new Date(entry.date), "MMM dd, yyyy")}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(slug)}
                  className={`flex items-center gap-1.5 transition-all duration-500 cursor-pointer ${
                    copiedId === slug
                      ? "text-green-500"
                      : "hover:text-foreground"
                  }`}
                >
                  {copiedId === slug ? (
                    <CheckCheck className="size-4" />
                  ) : (
                    <Forward className="size-4" />
                  )}
                  <span>{copiedId === slug ? "Copied" : "Share"}</span>
                </button>
              </div>
              <div className="flex flex-col gap-1.5 p-1.5 bg-accent border rounded-2xl overflow-hidden w-full">
                <h2 className="px-3 py-2 text-xl font-medium">{entry.title}</h2>
                {entry.covers && entry.covers.length > 0 && (
                  <div className="flex flex-col divide-y-4 divide-background border-6 border-background ring-1 ring-foreground/10 shadow-lg/5 rounded-2xl overflow-hidden w-full">
                    {entry.covers.map((image, index) => (
                      <button
                        type="button"
                        key={`${slug}-${index}`}
                        onClick={() => setPreviewImage(image)}
                        className="cursor-zoom-in w-full"
                      >
                        <Image
                          src={`/changelog/${image}.webp`}
                          alt={`${entry.title} ${index + 1}`}
                          width={2000}
                          height={2000}
                          priority
                          unoptimized
                          loading="eager"
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex flex-col gap-3 p-3 md:p-6 bg-background border border-foreground/15 rounded-2xl w-full">
                  {entry.gallery && entry.gallery.length > 0 && (
                    <div className="bg-accent border rounded-xl overflow-hidden w-full">
                      <div className="flex items-center justify-between px-3 py-1.5 text-sm font-medium w-full">
                        <span>🍁 Gallery</span>
                        <span>{formatCount(entry.gallery?.length)} Images</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-px border-t rounded-xl overflow-hidden w-full">
                        {entry.gallery.map((image, index) => (
                          <button
                            type="button"
                            key={`${slug}-${index}`}
                            onClick={() => setPreviewImage(image)}
                            className="group cursor-zoom-in overflow-hidden w-full"
                          >
                            <Image
                              src={`/changelog/${image}.webp`}
                              alt={`${entry.title} ${index + 1}`}
                              width={2000}
                              height={2000}
                              priority
                              unoptimized
                              loading="eager"
                              className="object-cover group-hover:scale-105 transition-all duration-500 w-full h-full"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <MarkdownRenderer
                    showHeader={false}
                    content={entry.markdownContent}
                  />
                </div>
                {entry.links && entry.links.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 p-1 w-full">
                    {entry.links.map((link, index) => {
                      const isExternal = /^https?:\/\//.test(link.href);

                      return (
                        <Link
                          href={link.href}
                          key={`${link.href}-${index}`}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                        >
                          <Badge className="group py-3.5 pl-3 pr-1 text-xs font-semibold [&>svg]:size-5! hover:shadow-md shadow-primary/40 inset-shadow-sm inset-shadow-white/50">
                            {link.name}
                            <ArrowUpRight className="p-0.5 bg-white text-primary rounded-full" />
                          </Badge>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          );
        })}
        {previewImage && (
          <div
            className="fixed inset-0 z-10001! transform-gpu p-3 flex items-center justify-center bg-background/10 backdrop-blur-sm w-full"
            onClick={() => setPreviewImage(null)}
          >
            <div
              className="relative border-10 border-foreground/10 shadow-xl rounded-[2rem] overflow-auto w-full lg:min-w-2xl max-w-6xl max-h-[95%]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/changelog/${previewImage}.webp`}
                alt="Preview"
                width={2000}
                height={2000}
                priority
                unoptimized
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
      </article>
    </section>
  );
}
