"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Icons from "../common/icons";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { handle, username } from "@/lib/brand";
import { toKebabCase } from "@/utils/slug-kebab";
import { RESOURCES } from "@/registry/resources";
import { PRIMITIVES } from "@/registry/primitives";
import { COMPONENTS } from "@/registry/components";
import Shimmer from "@/components/utility/shimmer";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { GridLineVertical } from "@/components/utility/grid-lines";
import { insetButtonVariants } from "@/components/ui/inset-button";
import {
  Globe,
  Scale,
  HatGlasses,
  ChevronsRight,
  HeartHandshake,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ── Thumbnail cache constants ──────────────────────────────
const THUMBNAILS_API = "/api/thumbnails";
const CACHE_KEY = "venumity:thumbnails";

interface ThumbnailCache {
  thumbnails: string[];
  fingerprint: number;
  updatedAt: number;
}

interface ThumbnailsApiResponse {
  total: number;
  fingerprint: number;
  updatedAt: string;
  thumbnails: string[];
}

// ── Sync cache helpers ─────────────────────────────────────
function readCache(): ThumbnailCache | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ThumbnailCache;
    if (!Array.isArray(parsed.thumbnails)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(cache: ThumbnailCache) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* ignore quota / disabled storage */
  }
}

// ── Hook: cache-first + background refresh ─────────────────
function useThumbnails() {
  // Lazy initializer — reads localStorage synchronously on first render,
  // no effect needed, no cascading renders.
  const [thumbnails, setThumbnails] = useState<string[]>(() => {
    const cached = readCache();
    return cached?.thumbnails ?? [];
  });

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Background fetch — setState only happens inside the async callback,
  // never synchronously in the effect body.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(THUMBNAILS_API, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ThumbnailsApiResponse = await res.json();

        if (cancelled || !mountedRef.current) return;

        const cached = readCache();

        // Reconcile: only trust the server's list as the source of truth.
        // If fingerprint AND length AND every URL match, keep the cached
        // array (stable reference → no re-render). Otherwise replace it.
        const sameFingerprint =
          cached && cached.fingerprint === data.fingerprint;
        const sameLength = cached?.thumbnails.length === data.thumbnails.length;
        const sameUrls =
          cached &&
          cached.thumbnails.every((url, i) => url === data.thumbnails[i]);

        if (sameFingerprint && sameLength && sameUrls && cached) {
          setThumbnails(cached.thumbnails);
        } else {
          setThumbnails(data.thumbnails);
          writeCache({
            thumbnails: data.thumbnails,
            fingerprint: data.fingerprint,
            updatedAt: Date.now(),
          });
        }
      } catch (err) {
        // Non-critical: marquee just won't render on the first paint.
        console.error("Failed to fetch thumbnails:", err);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { thumbnails };
}

// ── Shuffle ────────────────────────────────────────────────
function shuffleImages(images: string[]) {
  const shuffled = [...images];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ── BottomFooter (unchanged) ───────────────────────────────
export const BottomFooter = () => {
  return (
    <div className="relative z-50 flex items-start justify-start py-1.5 md:py-4 lg:py-0 px-2.5 text-[0.7rem] sm:text-xs font-medium md:font-semibold overflow-hidden w-full lg:h-10">
      <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-1.25 lg:gap-4 leading-none text-foreground/50 w-full h-full">
        <div className="flex items-center whitespace-nowrap">
          © {new Date().getFullYear()} Venumity
          <Separator
            orientation="vertical"
            className="mx-2 lg:mx-3 bg-foreground/30 min-h-4! lg:min-h-5!"
          />
          All rights reserved
        </div>
        <div className="hidden lg:block p-5 w-fit h-full">
          <div className="absolute inset-0 left-1/2 -translate-x-1/2 z-0 rotate-10 bg-background border-x-[0.8px] border-foreground/12 scale-250 w-30 h-full" />
          <div className="relative z-10 mr-4 flex items-center justify-center m-auto w-fit h-full">
            <Icons
              includeSocial
              iconClassName="opacity-40 hover:opacity-100 transition-all duration-300"
            />
          </div>
        </div>
        <div>
          Building in public at{" "}
          <Link
            href={handle}
            target="_blank"
            className="text-primary hover:underline"
          >
            @{username}
          </Link>
        </div>
      </div>
    </div>
  );
};

// ── Footer ─────────────────────────────────────────────────
export default function Footer() {
  const pathname = usePathname();
  const { thumbnails } = useThumbnails();
  const [images, setImages] = useState<string[]>([]);

  // Rotate shuffle every 10s. All setState calls happen inside the timer
  // callback, not in the effect body, so ESLint is happy.
  useEffect(() => {
    if (thumbnails.length === 0) return;

    const interval = setInterval(() => {
      setImages(shuffleImages(thumbnails));
    }, 10000);

    return () => clearInterval(interval);
  }, [thumbnails]);

  // Separate effect for the initial shuffle — also inside a timer to avoid
  // the "setState synchronously in effect" warning.
  useEffect(() => {
    if (thumbnails.length === 0) return;

    const id = setTimeout(() => {
      setImages(shuffleImages(thumbnails));
    }, 0);

    return () => clearTimeout(id);
  }, [thumbnails]);

  if (
    pathname?.startsWith("/404") ||
    pathname?.startsWith("/docs") ||
    pathname?.startsWith("/preview") ||
    pathname?.startsWith("/not-found") ||
    pathname?.startsWith("/resources") ||
    pathname?.startsWith("/changelog") ||
    pathname?.startsWith("/primitives") ||
    pathname?.startsWith("/components") ||
    pathname?.startsWith("/thumbnails") ||
    pathname?.startsWith("/contributors")
  )
    return null;

  // ── COMPONENTS: flatten subcategories ───────────────────
  const allComponentSubs = COMPONENTS.flatMap((category) =>
    category.subcategories.map((sub) => ({
      categoryName: category.name,
      ...sub,
    })),
  );

  const compChunkSize = Math.ceil(allComponentSubs.length / 2);
  const firstHalfComponents = allComponentSubs.slice(0, compChunkSize);
  const secondHalfComponents = allComponentSubs.slice(compChunkSize);

  // ── PRIMITIVES: flatten subcategories ───────────────────
  const allPrimitiveSubs = PRIMITIVES.flatMap((category) =>
    category.subcategories.map((sub) => ({
      categoryName: category.name,
      ...sub,
    })),
  );

  const primChunkSize = Math.ceil(allPrimitiveSubs.length / 2);
  const firstHalfPrimitives = allPrimitiveSubs.slice(0, primChunkSize);
  const secondHalfPrimitives = allPrimitiveSubs.slice(primChunkSize);

  // ── RESOURCES: flatten categories ───────────────────
  const resourcePages = RESOURCES.flatMap((category) =>
    category.pages.map((page) => ({
      categorySlug: category.slug,
      title: page.title,
    })),
  );

  const resourceChunkSize = Math.ceil(resourcePages.length / 2);
  const firstHalfResources = resourcePages.slice(0, resourceChunkSize);
  const secondHalfResources = resourcePages.slice(resourceChunkSize);

  return (
    <footer className="px-3 py-5 sm:px-5 md:p-10 lg:pt-20 w-full">
      <div className="bg-foreground/5 border rounded-2xl md:rounded-3xl lg:rounded-[2rem] m-auto max-w-400 overflow-hidden">
        <div className="lg:p-3 w-full">
          {/* 3D Morquee Banner */}
          <section className="relative lg:border rounded-2xl lg:rounded-3xl overflow-hidden w-full lg:min-h-150">
            {/* Marquee renders as soon as we have any images (cache or fresh) */}
            {images.length > 0 && (
              <ThreeDMarquee
                className="hidden lg:block pointer-events-none absolute inset-0 bg-background! h-full w-full"
                images={images}
              />
            )}
            <div className="lg:absolute lg:inset-0 z-20 flex items-center lg:m-auto p-3 lg:bg-white/15 lg:backdrop-blur-md rounded-[2rem] w-fit h-fit">
              <div className="flex flex-col items-center lg:m-auto sm:gap-3 lg:gap-5 p-1 lg:p-5 xl:p-10 lg:bg-background lg:text-foreground rounded-2xl xl:rounded-4xl lg:shadow-xl/30 max-w-270 w-full h-full">
                <div className="relative flex flex-col lg:flex-row items-start justify-between gap-4 lg:gap-5 xl:gap-10 m-auto w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-5 lg:gap-7 w-full">
                    <div className="relative shrink-0 p-1.5 lg:p-2 shadow-lg/10 rounded-[0.8rem] md:rounded-[1.2rem] lg:rounded-[1.6rem] overflow-hidden min-w-15 md:min-w-20 lg:min-w-27 h-15 md:h-24 lg:h-33">
                      <Image
                        src="/logo.png"
                        alt="logo"
                        width={2000}
                        height={2000}
                        unoptimized
                        className="relative z-20 transform-gpu border-2 lg:border-4 border-white rounded-[0.6rem] md:rounded-[0.8rem] lg:rounded-[1.3rem] w-full h-full"
                      />
                      <motion.span
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
                          rotate: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          background: {
                            duration: 12,
                            repeat: Infinity,
                            ease: "linear",
                          },
                        }}
                        className="absolute inset-0 z-0 scale-[1.5] w-full h-full"
                      />
                    </div>
                    <h2 className="stackSans text-2xl md:text-3xl lg:text-4xl leading-none">
                      <span>
                        Let&apos;s build, share & improve{" "}
                        <br className="hidden sm:block" /> this open-source{" "}
                        <br className="hidden md:block" /> together
                      </span>{" "}
                      🙌🏻 🎉
                    </h2>
                  </div>

                  <div className="xl:absolute -top-5 -right-5 flex items-center gap-2.5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Icons
                          names={["github"]}
                          href="https://github.com/thevinayakgore/ui.venumity"
                          iconClassName="p-2 size-10 md:size-10.5 bg-foreground text-secondary hover:shadow-lg shadow-foreground/30 transition-all duration-500 rounded-md"
                        />
                      </TooltipTrigger>
                      <TooltipContent className="font-semibold!">
                        <p>Contribute & Star</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          target="_blank"
                          href="https://ui.venumity.com/components"
                          className={insetButtonVariants(
                            "relative group/btn text-sm md:text-base px-3 hover:shadow-lg shadow-primary/50 duration-500 overflow-hidden",
                            "lg",
                          )}
                        >
                          <Globe className="size-5 md:size-6 stroke-[1.5px] animate-spin" />
                          Components
                          <ChevronsRight className="size-5 md:size-6 group-hover/btn:translate-x-1.5 transition-all duration-500" />
                          <Shimmer className="via-white/60 w-25" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className="font-semibold!">
                        <p>Use & Share to Community</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <p className="hidden md:block text-sm lg:text-base text-muted-foreground md:text-foreground/60 tracking-wide md:leading-snug w-full">
                  Discover beautifully crafted components built for developers
                  who care about clean design, smooth interactions and modern
                  user experiences. Copy, customize and launch stunning
                  interfaces faster with reusable UI blocks, animations &
                  layouts.
                </p>
              </div>
            </div>
          </section>

          {/* Link Columns */}
          <section className="relative grid grid-cols-2 lg:grid-cols-3 items-start justify-center m-auto gap-5 p-5 md:p-0 lg:my-3 bg-background border-y lg:border border-foreground/15 rounded-2xl lg:rounded-3xl overflow-hidden w-full">
            {/* ── PRIMITIVES ────────────────────────────────────── */}
            <div className="flex flex-col items-start md:justify-center md:mx-auto gap-3 p-1 sm:p-5 md:p-8 w-full">
              <p className="text-sm sm:text-base font-semibold pb-2 border-b-2 border-primary w-fit">
                Primitives
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-5 md:gap-10 lg:gap-15 font-medium w-full">
                <ul className="space-y-1 sm:space-y-1.5 w-full">
                  {firstHalfPrimitives.map((sub) => (
                    <FooterLink
                      key={`${sub.categoryName}-${sub.name}`}
                      href={`/primitives/${toKebabCase(sub.categoryName)}/${toKebabCase(sub.name)}`}
                    >
                      {sub.name}
                    </FooterLink>
                  ))}
                </ul>
                <ul className="space-y-1 sm:space-y-1.5 w-full">
                  {secondHalfPrimitives.map((sub) => (
                    <FooterLink
                      key={`${sub.categoryName}-${sub.name}`}
                      href={`/primitives/${toKebabCase(sub.categoryName)}/${toKebabCase(sub.name)}`}
                    >
                      {sub.name}
                    </FooterLink>
                  ))}
                </ul>
              </div>
            </div>

            <GridLineVertical className="hidden lg:block top-1/2 -translate-y-1/2 left-[33%] h-full" />

            {/* ── COMPONENTS ───────────────────────────────────── */}
            <div className="flex flex-col items-start md:justify-center md:mx-auto gap-3 p-1 sm:p-5 md:p-8 w-full">
              <p className="text-sm sm:text-base font-semibold pb-2 border-b-2 border-primary w-fit">
                Components
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-5 md:gap-10 lg:gap-15 font-medium w-full">
                <ul className="space-y-1 sm:space-y-1.5 w-full">
                  {firstHalfComponents.map((sub) => (
                    <FooterLink
                      key={`${sub.categoryName}-${sub.name}`}
                      href={`/components/${toKebabCase(sub.categoryName)}/${toKebabCase(sub.name)}`}
                    >
                      {sub.name}
                    </FooterLink>
                  ))}
                </ul>
                <ul className="space-y-1 sm:space-y-1.5 w-full">
                  {secondHalfComponents.map((sub) => (
                    <FooterLink
                      key={`${sub.categoryName}-${sub.name}`}
                      href={`/components/${toKebabCase(sub.categoryName)}/${toKebabCase(sub.name)}`}
                    >
                      {sub.name}
                    </FooterLink>
                  ))}
                </ul>
              </div>
            </div>

            <GridLineVertical className="hidden lg:block top-1/2 -translate-y-1/2 right-[33%] h-full" />

            {/* ── RESOURCES ───────────────────────────────────── */}
            <div className="flex flex-col items-start md:justify-center md:mx-auto gap-3 p-1 sm:p-5 md:p-8 w-full">
              <p className="text-sm sm:text-base font-semibold pb-2 border-b-2 border-primary w-fit">
                Resources
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-5 md:gap-10 lg:gap-15 font-medium w-full">
                <ul className="space-y-1 sm:space-y-1.5 w-full">
                  {firstHalfResources.map((page) => (
                    <FooterLink
                      key={`${page.categorySlug}-${page.title}`}
                      href={`/resources/${page.categorySlug}/${toKebabCase(page.title)}`}
                    >
                      {page.title}
                    </FooterLink>
                  ))}
                </ul>

                <ul className="space-y-1 sm:space-y-1.5 w-full">
                  {secondHalfResources.map((page) => (
                    <FooterLink
                      key={`${page.categorySlug}-${page.title}`}
                      href={`/resources/${page.categorySlug}/${toKebabCase(page.title)}`}
                    >
                      {page.title}
                    </FooterLink>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 p-3 lg:p-0 w-full">
            <p className="lg:pl-1.5 text-sm lg:text-base font-medium text-muted-foreground font-serif italic md:leading-none">
              &quot;The best way to learn is to build and the best way to build
              is with tools that empower rather than overwhelm.&quot;
            </p>
            <div className="flex flex-wrap items-center gap-1 p-1 bg-background border border-foreground/20 font-medium list-none rounded-full">
              <FooterLink
                href="https://pro.venumity.com/legal/license"
                className={insetButtonVariants(
                  "bg-transparent! text-foreground! hover:bg-primary! hover:text-white! inset-shadow-none! hover:inset-shadow-sm! rounded-full",
                )}
              >
                <Scale className="size-3 sm:size-4" />
                License
              </FooterLink>
              <FooterLink
                href="https://pro.venumity.com/legal/privacy"
                className={insetButtonVariants("text-white! rounded-full")}
              >
                <HatGlasses className="size-3 sm:size-4" />
                Privacy
              </FooterLink>
              <FooterLink
                href="https://pro.venumity.com/legal/terms"
                className={insetButtonVariants(
                  "bg-transparent! text-foreground! hover:bg-primary! hover:text-white! inset-shadow-none! hover:inset-shadow-sm! rounded-full",
                )}
              >
                <HeartHandshake className="size-3 sm:size-4" />
                Terms
              </FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

function FooterLink({ href, children, external, className }: FooterLinkProps) {
  if (external) {
    return (
      <li>
        <Link
          href={href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "flex items-center gap-1 sm:gap-1.5 text-xs md:text-sm text-foreground/50 hover:text-foreground tracking-wide line-clamp-1 w-fit",
            className,
          )}
        >
          {children}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-1 sm:gap-1.5 text-xs md:text-sm text-foreground/50 hover:text-foreground tracking-wide line-clamp-1 w-fit",
          className,
        )}
      >
        {children}
      </Link>
    </li>
  );
}
