"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { removeKebabCase } from "@/utils/slug-kebab";
import ThemeToggle from "@/components/site/navigations/theme-toggle";

interface ThumbnailItem {
  name: string;
  thumbnail: string;
}

export default function ThumbnailsPage() {
  const [items, setItems] = useState<ThumbnailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-foreground/60">
        Loading thumbnails…
      </div>
    );
  }

  return (
    <div className="p-5 space-y-5 max-w-400 m-auto w-full">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Thumbnails
          </h1>
          <p className="text-sm md:text-base text-foreground/60">
            {items.length} images available • Updated automatically
          </p>
        </div>

        <div className="flex items-center gap-2 w-auto">
          <div className="relative border rounded-md overflow-hidden w-auto h-9.5">
            <Input
              type="search"
              value={search}
              placeholder="Search thumbnails…"
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 placeholder:text-foreground/50! outline-0! ring-0! shadow-none! border-0! bg-transparent! text-sm w-sm! h-full"
            />
            <Badge className="mr-1 p-2! bg-foreground/15! text-foreground/60! text-sm rounded-sm w-15! h-7!">
              {filtered.length} / {items.length}
            </Badge>
          </div>
          <div className="bg-foreground/10 rounded-md">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Masonry Gallery */}
      <section
        className="
          columns-1
          sm:columns-2
          gap-4
          [column-fill:balance]
          w-full
        "
      >
        {filtered.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: (index % 8) * 0.03 }}
            className="mb-4 break-inside-avoid"
          >
            <Link
              href={`/thumbnails/${item.name}`}
              target="_blank"
              className="group relative block rounded-3xl overflow-hidden bg-foreground/5 border hover:shadow-lg/10 transition-all duration-500"
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
              <span className="pointer-events-none absolute bottom-0 left-0 right-0 px-5 py-4 bg-white/20 backdrop-blur-lg text-white text-shadow-lg/15 text-base md:text-lg lg:text-xl font-semibold truncate opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {removeKebabCase(item.name)}
              </span>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-foreground/50">
          {search ? "No thumbnails match your search." : "No thumbnails found."}
        </div>
      )}
    </div>
  );
}
