"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCount } from "@/utils/format-count";
import { removeKebabCase } from "@/utils/slug-kebab";
import ThemeToggle from "@/components/site/navigations/theme";
import { useEffect, useState, useRef, useCallback } from "react";

interface ThumbnailItem {
  name: string;
  thumbnail: string;
}

const PAGE_SIZE = 30;

export default function ThumbnailsPage() {
  const [items, setItems] = useState<ThumbnailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Infinite scroll state
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/thumbnails")
      .then((r) => r.json())
      .then((data) => setItems(data.items ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter((i) =>
    removeKebabCase(i.name).toLowerCase().includes(search.toLowerCase()),
  );

  // Reset visible count when search changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCount(PAGE_SIZE);
    }, 0);
    return () => clearTimeout(timer);
  }, [search]);

  const loadMore = useCallback(() => {
    if (isLoadingMore) return;
    if (visibleCount >= filtered.length) return;

    setIsLoadingMore(true);
    // Simulate network delay for smooth loading spinner UX
    setTimeout(() => {
      setVisibleCount((prev) => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, 600);
  }, [isLoadingMore, visibleCount, filtered.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0]?.isIntersecting &&
          visibleCount < filtered.length &&
          !isLoadingMore
        ) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [visibleCount, filtered.length, isLoadingMore, loadMore]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-foreground/60">
        Loading thumbnails…
      </div>
    );
  }

  const displayedItems = filtered.slice(0, visibleCount);

  return (
    <section className="2xl:border-x max-w-400 m-auto w-full">
      {/* Header */}
      <header className="sticky top-0 z-100 flex flex-col sm:flex-row items-start md:items-center justify-between gap-2 p-5 bg-background border-b w-full">
        <div className="flex items-center gap-2 w-auto">
          <Link
            href="/"
            className="relative p-0.75 w-auto h-9 overflow-hidden rounded-[7px]"
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={200}
              priority
              unoptimized
              loading="eager"
              className="rounded-[5px] z-10 transform-gpu w-full h-full"
            />
            <motion.span
              className="absolute inset-0 -z-10 scale-[1.3] w-full h-full"
              animate={{
                rotate: [0, 360],
                background: [
                  "linear-gradient(to top left, #f97316, transparent)",
                  "linear-gradient(to top left, #ef4444, transparent)",
                  "linear-gradient(to top left, #ec4899, transparent)",
                  "linear-gradient(to top left, #a855f7, transparent)",
                  "linear-gradient(to top left, #6366f1, transparent)",
                  "linear-gradient(to top left, #3b82f6, transparent)",
                  "linear-gradient(to top left, #06b6d4, transparent)",
                  "linear-gradient(to top left, #14b8a6, transparent)",
                  "linear-gradient(to top left, #22c55e, transparent)",
                  "linear-gradient(to top left, #84cc16, transparent)",
                  "linear-gradient(to top left, #eab308, transparent)",
                  "linear-gradient(to top left, #f59e0b, transparent)",
                ],
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                background: {
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />
          </Link>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Thumbnails
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-auto">
          <div className="relative bg-background border border-foreground/20 rounded-md overflow-hidden w-auto h-9.5">
            <Input
              type="search"
              value={search}
              placeholder="Search thumbnails…"
              onChange={(e) => setSearch(e.target.value)}
              className="border-0! bg-transparent px-3 text-sm font-medium shadow-none! outline-0! ring-0! placeholder:text-foreground/50! h-full w-full min-w-60 sm:w-sm [&::-webkit-search-cancel-button]:hidden"
            />
            <Badge className="absolute top-1 right-1 z-40 p-1.5! bg-foreground/15! text-foreground dark:text-foreground/60! text-sm rounded-sm min-w-15! h-7!">
              {formatCount(filtered.length)} / {formatCount(items.length)}
            </Badge>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Masonry Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-x w-full">
        {displayedItems.map((item) => (
          <Link
            target="_blank"
            key={item.name}
            href={`/thumbnails/${item.name}`}
            className="group relative block border-b overflow-hidden"
          >
            {/* Image container with natural aspect ratio */}
            <div className="relative w-full">
              <Image
                src={item.thumbnail}
                alt={item.name}
                width={1200}
                height={900}
                unoptimized
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Overlay label */}
            <span className="pointer-events-none absolute bottom-3 right-3 px-4 py-2 bg-white text-black text-xs md:text-sm font-semibold truncate rounded-md w-fit">
              {removeKebabCase(item.name)}
            </span>
          </Link>
        ))}
      </div>

      {/* Loader / End state */}
      {isLoadingMore && (
        <div className="flex items-center justify-center m-auto gap-3 py-5 md:py-10 text-muted-foreground">
          <Loader2 className="size-7 animate-spin" />
          <span className="text-sm font-semibold">
            Loading more thumbnails...
          </span>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-foreground/50">
          {search ? "No thumbnails match your search." : "No thumbnails found."}
        </div>
      )}
    </section>
  );
}
