"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { handle, username } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { toKebabCase } from "@/utils/slug-kebab";
import SocialIcons from "../common/social-icons";
import { COMPANY_SECTION } from "@/lib/constants";
import { COMPONENTS } from "@/registry/components";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { RESOURCE_CATEGORIES } from "@/registry/resources";
import { ArrowRight, HatGlasses, HeartHandshake, Scale } from "lucide-react";
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
        const sameFingerprint =
          cached && cached.fingerprint === data.fingerprint;
        const sameLength = cached?.thumbnails.length === data.thumbnails.length;

        if (sameFingerprint && sameLength && cached) {
          // Server unchanged — keep cached array reference
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
    <div className="relative z-50 flex items-start justify-start py-1.5 md:py-4 lg:py-0 px-2.5 text-xs font-semibold overflow-hidden w-full lg:h-10">
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
          <div className="absolute inset-0 left-1/2 -translate-x-1/2 z-0 rotate-10 bg-background border-x-[0.8px] border-foreground/12 scale-250 w-33 h-full" />
          <div className="relative z-10 mr-4 flex items-center justify-center m-auto w-fit h-full">
            <SocialIcons />
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
    pathname?.startsWith("/components") ||
    pathname?.startsWith("/docs") ||
    pathname?.startsWith("/resources") ||
    pathname?.startsWith("/preview") ||
    pathname?.startsWith("/changelog") ||
    pathname?.startsWith("/thumbnails") ||
    pathname?.startsWith("/not-found")
  )
    return null;

  const componentChunkSize = Math.ceil(COMPONENTS.length / 2);
  const firstHalfComponents = COMPONENTS.slice(0, componentChunkSize);
  const secondHalfComponents = COMPONENTS.slice(componentChunkSize);

  const resourcePages = RESOURCE_CATEGORIES.flatMap((category) =>
    category.pages
      .filter((page) => page.published)
      .map((page) => ({
        categorySlug: category.slug,
        title: page.title,
      })),
  );

  const resourceChunkSize = Math.ceil(resourcePages.length / 2);
  const firstHalfResources = resourcePages.slice(0, resourceChunkSize);
  const secondHalfResources = resourcePages.slice(resourceChunkSize);

  return (
    <footer className="p-3 lg:p-5 xl:p-10 m-auto max-w-400 w-full">
      <div className="lg:bg-foreground/5 lg:p-2 pb-0! lg:border-b-30 sm:rounded-[1.3rem] sm:rounded-b-xl overflow-hidden">
        {/* 3D Morquee Banner */}
        <section className="relative lg:p-3 lg:shadow-2xl/10 lg:bg-foreground/5 backdrop-blur-md rounded-xl lg:rounded-2xl overflow-hidden w-full min-h-65 max-h-max lg:min-h-150">
          {/* Marquee renders as soon as we have any images (cache or fresh) */}
          {images.length > 0 && (
            <ThreeDMarquee
              className="hidden lg:block pointer-events-none absolute inset-0 bg-background! h-full w-full"
              images={images}
            />
          )}
          <div className="absolute inset-0 z-20 flex items-center m-auto lg:p-5 xl:p-10 w-full h-fit">
            <div className="flex flex-col items-center m-auto sm:gap-3 lg:gap-5 p-1 md:p-5 xl:p-10 md:bg-foreground/5 lg:bg-white/5 backdrop-blur-3xl lg:text-white lg:shadow-2xl rounded-2xl xl:rounded-4xl max-w-270 w-full h-full">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 lg:gap-5 xl:gap-10 m-auto w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-5 lg:gap-7 w-full">
                  <div className="relative shrink-0 p-1 sm:p-1.5 lg:p-2 shadow-xl rounded-[0.8rem] sm:rounded-[1.2rem] lg:rounded-[1.6rem] overflow-hidden min-w-15 md:min-w-20 lg:min-w-27 h-15 md:h-24 lg:h-33">
                    <Image
                      src="/logo.png"
                      alt="logo"
                      width={2000}
                      height={2000}
                      unoptimized
                      className="z-20 transform-gpu border-2 lg:border-5 border-white rounded-[0.6rem] md:rounded-[0.8rem] lg:rounded-[1.3rem] w-full h-full"
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
                      className="absolute inset-0 -z-10 scale-[1.5] w-full h-full"
                    />
                  </div>
                  <h2 className="text-white text-shadow-lg/10 text-xl md:text-2xl lg:text-[2.4rem] font-semibold tracking-tight leading-tight sm:leading-none">
                    <span>
                      Let&apos;s build, share & improve{" "}
                      <br className="hidden sm:block" /> this open-source{" "}
                      <br className="hidden md:block" /> together
                    </span>{" "}
                    🙌🏻 🎉
                  </h2>
                </div>

                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="https://github.com/thevinayakgore/ui.venumity"
                        target="_blank"
                      >
                        <Button
                          size="icon"
                          variant="outline"
                          className="p-5! bg-white! text-black! border-[0.5px]! border-black/60! ring-2 ring-white! hover:shadow-lg shadow-white/30 rounded-full transition-all duration-500"
                        >
                          <svg viewBox="0 0 438.549 438.549" className="size-5">
                            <path
                              fill="currentColor"
                              d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                            ></path>
                          </svg>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="font-semibold!">
                      <p>Contribute & Star</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="https://ui.venumity.com/components"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 group/btn text-sm font-semibold bg-white text-black rounded-full border-[0.5px]! border-black/60! ring-2 ring-white! px-4 py-2.5 hover:shadow-lg shadow-white/30 transition-all duration-500 w-auto"
                      >
                        Browse <span className="text-primary">ui.venumity</span>
                        <ArrowRight className="size-4 opacity-30 group-hover/btn:opacity-80 group-hover/btn:translate-x-2 transition-all duration-500" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="font-semibold!">
                      <p>Use UI blocks & share them</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <p className="text-xs md:text-base lg:text-lg text-white/80 dark:text-white/60 tracking-wide text-shadow-lg/10 md:leading-snug w-full">
                Discover beautifully crafted components built for developers who
                care about clean design, smooth interactions and modern user
                experiences. Copy, customize and launch stunning interfaces
                faster with reusable UI blocks, animations & layouts.
              </p>
            </div>
          </div>
        </section>

        {/* Brand & Links Columns */}
        <div className="mt-2 sm:mt-3 p-1 sm:p-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 items-start justify-between gap-5 lg:gap-10 w-full">
          <div className="col-span-2 space-y-3">
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                alt="Brand Logo"
                width={500}
                height={500}
                className="border-2 border-white shadow-lg shadow-primary/40 rounded-md w-max h-8 sm:h-10"
              />
              <span className="text-xl sm:text-2xl lg:text-3xl tracking-tight font-semibold">
                Venu<span className="text-primary">mity</span> UI
              </span>
            </div>
            <p className="text-xs md:text-sm text-foreground/50 tracking-wide">
              The best way to learn is to build and the best way to build is
              with tools that{" "}
              <span className="px-1.5 pb-0.5 text-primary bg-primary/15 rounded">
                empower
              </span>{" "}
              rather than overwhelm.
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-3 sm:mt-5 list-none">
              <FooterLink
                href="https://pro.venumity.com/legal/license"
                className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-2.5 pr-2 sm:pr-3! h-6 sm:h-7 text-[10px] sm:text-xs! leading-none bg-foreground/5! text-foreground/60! border border-foreground/15 hover:bg-primary/15! hover:text-primary! hover:border-primary/40 rounded-full"
              >
                <Scale className="size-3 sm:size-3.5" />
                License
              </FooterLink>
              <FooterLink
                href="https://pro.venumity.com/legal/privacy"
                className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-2.5 pr-2 sm:pr-3! h-6 sm:h-7 text-[10px] sm:text-xs! leading-none bg-foreground/5! text-foreground/60! border border-foreground/15 hover:bg-primary/15! hover:text-primary! hover:border-primary/40 rounded-full"
              >
                <HatGlasses className="size-3 sm:size-3.5" />
                Privacy
              </FooterLink>
              <FooterLink
                href="https://pro.venumity.com/legal/terms"
                className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-2.5 pr-2 sm:pr-3! h-6 sm:h-7 text-[10px] sm:text-xs! leading-none bg-foreground/5! text-foreground/60! border border-foreground/15 hover:bg-primary/15! hover:text-primary! hover:border-primary/40 rounded-full"
              >
                <HeartHandshake className="size-3 sm:size-3.5" />
                Terms
              </FooterLink>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2 flex flex-col gap-3 md:justify-center md:mx-auto w-full md:w-fit">
            <p className="text-sm sm:text-base font-semibold">Components</p>
            <div className="flex flex-col sm:flex-row items-start gap-5 lg:gap-10">
              <ul className="space-y-1 sm:space-y-1.5">
                {firstHalfComponents.map((category) => (
                  <FooterLink
                    key={category.name}
                    href={`/components/${toKebabCase(category.name)}/${toKebabCase(
                      category.subcategories[0]?.name ?? "",
                    )}`}
                  >
                    {category.name}
                  </FooterLink>
                ))}
              </ul>
              <ul className="space-y-1 sm:space-y-1.5">
                {secondHalfComponents.map((category) => (
                  <FooterLink
                    key={category.name}
                    href={`/components/${toKebabCase(category.name)}/${toKebabCase(
                      category.subcategories[0]?.name ?? "",
                    )}`}
                  >
                    {category.name}
                  </FooterLink>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2 flex flex-col gap-3 md:justify-center md:mx-auto w-full md:w-fit">
            <p className="text-sm sm:text-base font-semibold">Resources</p>

            <div className="flex flex-col sm:flex-row items-start gap-5 lg:gap-10">
              <ul className="space-y-1 sm:space-y-1.5">
                {firstHalfResources.map((page) => (
                  <FooterLink
                    key={`${page.categorySlug}-${page.title}`}
                    href={`/resources/${page.categorySlug}/${toKebabCase(page.title)}`}
                  >
                    {page.title}
                  </FooterLink>
                ))}
              </ul>

              <ul className="space-y-1 sm:space-y-1.5">
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

          <div className="flex flex-col gap-3 md:justify-center md:mx-auto w-full md:w-fit">
            <p className="text-sm sm:text-base font-semibold">Pages</p>
            <ul className="space-y-1 sm:space-y-1.5">
              {COMPANY_SECTION.links.map((link) => (
                <FooterLink key={link.name} href="/pricing">
                  {link.name}
                </FooterLink>
              ))}
            </ul>
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
            "flex items-center gap-1 sm:gap-1.5 text-xs md:text-sm text-foreground/50 hover:text-foreground tracking-wide w-fit",
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
          "flex items-center gap-1 sm:gap-1.5 text-xs md:text-sm text-foreground/50 hover:text-foreground tracking-wide w-fit",
          className,
        )}
      >
        {children}
      </Link>
    </li>
  );
}
