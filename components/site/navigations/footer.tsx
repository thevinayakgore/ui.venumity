"use client";
import { motion } from "motion/react";
import { handle, username } from "@/lib/brand";
import { ArrowRight, HatGlasses, HeartHandshake, Scale } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_SECTION } from "@/lib/constants";
import { useEffect, useState } from "react";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { COMPONENTS } from "@/registry/components";
import { Button } from "@/components/ui/button";
import { BASE_IMAGES, SOCIAL_LINKS } from "@/registry/site/footer";
import { toKebabCase } from "@/utils/slug-kebab";
import { cn } from "@/lib/utils";
import { RESOURCE_CATEGORIES } from "@/registry/resources";

function shuffleImages(images: string[]) {
  const shuffled = [...images];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export const BottomFooter = () => {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "relative p-3 sm:p-5 text-[10px] sm:text-xs font-semibold tracking-wide! border-t overflow-hidden w-full",
        pathname?.startsWith("/components") ||
          pathname?.startsWith("/docs") ||
          pathname?.startsWith("/resources") ||
          pathname?.startsWith("/changelog")
          ? "bg-foreground/3"
          : "border-dashed mt-3 sm:mt-5 md:py-8",
      )}
    >
      {/* Bottom line */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 leading-none text-foreground/40 w-full">
        <span className="flex items-center whitespace-nowrap">
          © {new Date().getFullYear()} Venumity
          <Separator
            orientation="vertical"
            className="mx-2 sm:mx-3 bg-foreground/30 min-h-4! sm:min-h-5!"
          />
          All rights reserved
        </span>
        <span className="text-center sm:text-right">
          Building in public at{" "}
          <Link
            href={handle}
            target="_blank"
            className="text-primary hover:underline"
          >
            @{username}
          </Link>
        </span>
      </div>

      <div className="hidden lg:flex absolute inset-x-0 -bottom-3 sm:-bottom-5 left-1/2 -translate-x-1/2 items-center -space-x-2 sm:-space-x-4 z-30 w-fit">
        {SOCIAL_LINKS.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger
              asChild
              className={cn(
                "w-auto hover:-translate-y-3 sm:hover:-translate-y-6 hover:rotate-0 z-0 hover:z-20 transition-all duration-400 overflow-hidden",
                item.rotate,
                pathname?.startsWith("/components") ||
                  pathname?.startsWith("/resources") ||
                  pathname?.startsWith("/changelog")
                  ? "h-7 sm:h-10 mb-1 rounded-sm"
                  : "h-8 sm:h-12 rounded-md",
              )}
            >
              <Link href={item.href} target="_blank" className="cursor-pointer">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1000}
                  height={1000}
                  priority
                  className="w-full h-full"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{item.alt}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default function Footer() {
  const pathname = usePathname();
  const [images, setImages] = useState(BASE_IMAGES);

  useEffect(() => {
    const interval = setInterval(() => {
      setImages(shuffleImages(BASE_IMAGES));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (
    pathname?.startsWith("/components") ||
    pathname?.startsWith("/docs") ||
    pathname?.startsWith("/resources") ||
    pathname?.startsWith("/preview") ||
    pathname?.startsWith("/changelog") ||
    pathname?.startsWith("/not-found")
  )
    return null;

  // Split COMPONENTS into two nearly equal parts for columns
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
    <footer className="sm:p-5 md:p-10 m-auto max-w-400 w-full">
      <div className="md:bg-foreground/5 p-2 pb-0! md:border-b-30 sm:rounded-[1.3rem] sm:rounded-b-xl overflow-hidden">
        {/* 3D Morquee Banner */}
        <section className="relative p-3 md:shadow-2xl/10 md:bg-foreground/5 backdrop-blur-md rounded-xl lg:rounded-2xl overflow-hidden w-full min-h-60 lg:min-h-150">
          <ThreeDMarquee
            className="hidden md:block pointer-events-none absolute inset-0 bg-background! h-full w-full"
            images={images}
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center m-auto gap-3 sm:gap-5 p-3 md:p-5 lg:p-10 bg-foreground/5 md:bg-white/5 backdrop-blur-3xl md:text-white md:shadow-2xl rounded-2xl md:rounded-none lg:rounded-4xl max-w-270 w-full h-fit">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-5 md:gap-10 m-auto w-full">
              <div className="flex items-center gap-3 sm:gap-5 md:gap-7 w-full">
                <div className="relative shrink-0 p-1.5 sm:p-2 shadow-xl rounded-[0.8rem] sm:rounded-[1.2rem] md:rounded-[1.6rem] overflow-hidden min-w-16 sm:min-w-20 md:min-w-27 h-20 sm:h-24 md:h-33">
                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={2000}
                    height={2000}
                    unoptimized
                    className="z-20 transform-gpu border-2 sm:border-5 border-white rounded-[0.6rem] sm:rounded-[0.8rem] md:rounded-[1.3rem] w-full h-full"
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
                <h2 className="text-xl md:text-2xl lg:text-[2.4rem] font-semibold tracking-tight leading-tight sm:leading-none">
                  <span className="md:bg-clip-text md:text-transparent md:bg-linear-to-br from-white via-white to-white/30">
                    Let&apos;s build, share & improve{" "}
                    <br className="hidden sm:block" /> this open-source{" "}
                    <br className="hidden md:block" /> together
                  </span>{" "}
                  🙌🏻 🎉
                </h2>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://github.com/thevinayakgore/ui.venumity"
                      target="_blank"
                    >
                      <Button
                        size="icon"
                        variant="outline"
                        className="p-3! sm:p-5! bg-white! text-black! border-[0.5px]! border-black/60! ring-2 ring-white! hover:shadow-lg shadow-white/30 rounded-full transition-all duration-500"
                      >
                        <svg
                          viewBox="0 0 438.549 438.549"
                          className="size-4 sm:size-5"
                        >
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
                      className="inline-flex items-center gap-1 sm:gap-1.5 group/btn text-xs sm:text-sm font-semibold bg-white text-black rounded-full border-[0.5px]! border-black/60! ring-2 ring-white! px-3 sm:px-4 py-2 sm:py-2.5 hover:shadow-lg shadow-white/30 transition-all duration-500 w-auto"
                    >
                      <span className="hidden sm:inline">Browse </span>
                      <span className="text-primary">ui.venumity</span>
                      <ArrowRight className="size-3 sm:size-4 opacity-30 group-hover/btn:opacity-80 group-hover/btn:translate-x-2 transition-all duration-500" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="font-semibold!">
                    <p>Use UI blocks & share them</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <p className="text-xs sm:text-sm md:text-base tracking-wide opacity-70 w-full">
              Discover beautifully crafted components built for developers who
              care about clean design, smooth interactions and modern user
              experiences. Copy, customize and launch stunning interfaces faster
              with reusable UI blocks, animations & layouts.
            </p>
          </div>
        </section>

        <section className="relative mt-2 sm:mt-3 w-full">
          {/* Brand & Links Columns */}
          <div className="p-3 sm:p-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 items-start justify-between gap-5 lg:gap-10 w-full">
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
              <div className="flex flex-col sm:flex-row items-start gap-2 md:gap-5 lg:gap-10">
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

              <div className="flex flex-col sm:flex-row items-start gap-2 md:gap-5 lg:gap-10">
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

          <BottomFooter />
        </section>
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
