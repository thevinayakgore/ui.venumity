// components/navigations/navbar.tsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { gitRepo, handle } from "@/lib/brand";
import { Separator } from "@/components/ui/separator";
import { COMPANY_SECTION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SearchTrigger } from "./search";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    // We use a short timeout to guarantee the theme has resolved on the client
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = useCallback(() => {
    if (!resolvedTheme) return; // safety: only toggle when theme is known
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  // Close sheet when route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSheetOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // If we're still mounting, we can show nothing (as originally) to avoid flashing,
  // or show a skeleton – we'll keep the original behaviour.
  if (!mounted || pathname?.startsWith("/preview")) return null;

  return (
    <>
      <div className="z-1000! transform-gpu mb-1 w-full">
        <nav className="relative flex items-center justify-between p-1 px-1.5 bg-background border rounded-md overflow-hidden max-w-400 m-auto w-full">
          {/* Logo & navigation links – unchanged */}
          <div className="flex items-center max-w-fit">
            <Link href="/" className="flex items-center gap-2 z-10 max-w-fit">
              <div className="relative p-0.75 w-auto h-8 overflow-hidden rounded-sm">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={200}
                  height={200}
                  className="rounded z-10 transform-gpu w-full h-full"
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
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    background: {
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  className="absolute inset-0 -z-10 scale-[1.3] w-full h-full"
                />
              </div>
              <h2 className="hidden md:block font-bold text-xl pb-0.5">
                Venu<span className="text-primary">mity</span> UI
              </h2>
            </Link>

            <Separator
              orientation="vertical"
              className="hidden md:block h-6 my-auto bg-foreground/15 ml-6 mr-3"
            />

            <motion.div
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "hidden md:flex md:space-x-1 flex-1 flex-row items-center justify-center space-x-1 text-[0.8rem] font-semibold transition-all duration-500 w-auto",
              )}
            >
              {COMPANY_SECTION.links.map((item, idx) => (
                <Link
                  key={`link-${idx}`}
                  onMouseEnter={() => setHovered(idx)}
                  onClick={() => setHovered(idx)}
                  className="relative group/link px-3.5 py-[0.35rem]"
                  href={item.href}
                >
                  {hovered === idx && (
                    <motion.div
                      layoutId="hovered"
                      className="absolute inset-0 h-full w-full rounded-[5px] bg-foreground/8"
                    />
                  )}
                  <span className="relative z-20">{item.name}</span>
                  {(item.href.startsWith("http://") ||
                    item.href.startsWith("https://")) && (
                    <ArrowUpRight className="absolute top-0 right-0 z-20 group-hover/link:top-0.5 group-hover/link:right-0.5 size-3 opacity-0 group-hover/link:opacity-100 text-green-500 transition-all duration-500" />
                  )}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right side actions – unchanged except for the theme button below */}
          <div className="flex items-center justify-end ml-auto gap-1.5 z-10">
            <SearchTrigger />
            <Button size="icon" variant="ghost">
              <Link href={gitRepo} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 438.549 438.549" className="w-full h-full">
                  <path
                    fill="currentColor"
                    d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                  ></path>
                </svg>
              </Link>
            </Button>
            <Separator
              orientation="vertical"
              className="h-6 my-auto bg-foreground/15"
            />
            <Button size="icon" variant="ghost">
              <Link href={handle} target="_blank" rel="noopener noreferrer">
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
                  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x fill-background! w-full h-full"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </Link>
            </Button>
            <Separator
              orientation="vertical"
              className="h-6 my-auto bg-foreground/15"
            />
            {/* Theme toggle – stronger implementation */}
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              disabled={!mounted} // only cosmetic: button is already hidden when !mounted
              title={
                resolvedTheme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4.5"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 3l0 18" />
                <path d="M12 9l4.65 -4.65" />
                <path d="M12 14.3l7.37 -7.37" />
                <path d="M12 19.6l8.85 -8.85" />
              </svg>
            </Button>
            <Separator
              orientation="vertical"
              className="block md:hidden h-6 my-auto bg-foreground/15"
            />
            {/* Menu Button with Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild className="block md:hidden">
                <Button
                  size="icon"
                  variant="ghost"
                  className="flex items-center justify-center"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0! gap-0! min-w-full">
                <SheetHeader className="border-0!">
                  <SheetClose asChild className="p-0!">
                    <Link href="/" className="w-fit">
                      <SheetTitle className="flex items-center gap-3 px-1 text-2xl font-extrabold tracking-tight">
                        <Image
                          src="/logo.png"
                          alt="logo"
                          width={500}
                          height={500}
                          priority
                          unoptimized
                          loading="eager"
                          className="size-8 object-cover"
                        />
                        <span>
                          Venu<span className="text-primary">mity</span> UI
                        </span>
                      </SheetTitle>
                    </Link>
                  </SheetClose>
                </SheetHeader>
                <div className="flex flex-col font-semibold border-y w-full">
                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-4 p-5">
                    {COMPANY_SECTION.links.map((item, idx) => (
                      <SheetClose
                        asChild
                        key={`mobile-link-${idx}`}
                        className="p-0!"
                      >
                        <Link
                          href={item.href}
                          className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-foreground/5 transition-colors"
                        >
                          <span>{item.name}</span>
                          {(item.href.startsWith("http://") ||
                            item.href.startsWith("https://")) && (
                            <ArrowUpRight className="size-4 text-green-500" />
                          )}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <Separator className="bg-foreground/10" />

                  {/* Social Links */}
                  <div className="flex flex-col gap-4 p-5">
                    <SheetClose asChild className="p-0!">
                      <Link
                        href={gitRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-foreground/5 transition-colors"
                      >
                        <svg viewBox="0 0 438.549 438.549" className="size-5">
                          <path
                            fill="currentColor"
                            d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                          ></path>
                        </svg>
                        <span>GitHub</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild className="p-0!">
                      <Link
                        href={handle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-foreground/5 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={50}
                          height={50}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-5"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" />
                          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                        </svg>
                        <span>Twitter</span>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </>
  );
}
