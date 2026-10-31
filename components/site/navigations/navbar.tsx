// components/navigations/navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ThemeToggle from "./theme";
import Icons from "../common/icons";
import { motion } from "motion/react";
import { SearchTrigger } from "./search";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { COMPANY_SECTION } from "@/lib/constants";
import { ArrowUpRight, Menu } from "lucide-react";
import Shimmer from "@/components/utility/shimmer";
import { Separator } from "@/components/ui/separator";
import { insetButtonVariants } from "@/components/ui/inset-button";
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

  // Close sheet when route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSheetOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // If we're still mounting, we can show nothing (as originally) to avoid flashing,
  // or show a skeleton – we'll keep the original behaviour.
  if (!mounted) return null;

  return (
    <nav className="relative z-1001! transform-gpu flex items-center justify-between md:px-1.5 py-1.5 sm:pt-2.5 sm:pb-2 m-auto w-full">
      {/* Logo & navigation links – unchanged */}
      <div className="flex items-center max-w-fit">
        <Link href="/" className="flex items-center gap-2 z-10 max-w-fit">
          <div className="relative p-0.75 w-auto h-9 overflow-hidden rounded-[7px]">
            <Image
              src="/logo.png"
              alt="Venumity Logo"
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
          </div>
          <h2 className="hidden sm:block font-semibold text-xl md:text-2xl pb-0.5">
            Venu<span className="text-primary">mity</span> UI
          </h2>
        </Link>

        <Separator
          orientation="vertical"
          className="hidden xl:block h-8 my-auto bg-foreground/30! ml-6 mr-3"
        />

        <motion.div
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "hidden xl:flex md:space-x-1 flex-1 flex-row items-center justify-center space-x-1 text-[0.8rem] font-medium tracking-wide transition-all duration-500 w-auto",
          )}
        >
          {COMPANY_SECTION.links.map((item, idx) => (
            <Link
              href={item.href}
              key={`link-${idx}`}
              onClick={() => setHovered(idx)}
              onMouseEnter={() => setHovered(idx)}
              className={`relative flex items-center group/link ${item.newLink ? "pl-4 pr-2.5" : "px-4"} py-2`}
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 -z-10 bg-background border border-foreground/15 rounded-md w-full h-full"
                />
              )}
              <span>{item.name}</span>
              {item.newLink && (
                <div
                  className={insetButtonVariants(
                    "relative ml-2 h-4 px-1 text-[0.6rem] uppercase font-semibold overflow-hidden",
                    "sm",
                  )}
                >
                  New
                  <Shimmer className="via-white/40 w-5!" />
                </div>
              )}
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

        <Separator
          orientation="vertical"
          className="mx-1.5 h-8 my-auto bg-foreground/30!"
        />

        <div className="flex items-center gap-0.5 pl-px bg-foreground/5 dark:bg-foreground/10 border border-foreground/15 rounded-md overflow-hidden w-fit">
          <Icons
            names={["github"]}
            iconClassName="p-1.75 size-8 hover:bg-foreground! hover:text-secondary! transition-all duration-300 rounded-sm"
          />

          <Separator
            orientation="vertical"
            className="mx-0.75 h-6 my-auto bg-foreground/30!"
          />

          <Icons
            names={["twitter"]}
            iconClassName="p-1.75 size-8 hover:bg-foreground! hover:text-secondary! transition-all duration-300 rounded-sm"
          />

          <ThemeToggle />
        </div>

        {/* Menu Button with Sheet */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="block xl:hidden">
            <Button
              size="icon"
              title="Open menu for navigation"
              className="relative flex items-center bg-primary! text-white! inset-shadow-sm inset-shadow-white/50 overflow-hidden"
            >
              <Menu />
              <Shimmer className="via-white/40 w-5!" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="p-0! gap-0! min-w-full">
            <SheetHeader className="border-0!">
              <SheetClose asChild className="p-0!">
                <Link href="/" className="w-fit">
                  <SheetTitle className="flex items-center gap-2.5 px-1 text-3xl font-semibold tracking-tight">
                    <Image
                      src="/logo.png"
                      alt="logo"
                      width={500}
                      height={500}
                      priority
                      unoptimized
                      loading="eager"
                      className="size-9 object-cover rounded-sm overflow-hidden"
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
              <nav className="flex flex-col gap-5 p-5">
                {COMPANY_SECTION.links.map((item, idx) => (
                  <SheetClose
                    asChild
                    key={`mobile-link-${idx}`}
                    className="p-0!"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2 font-medium hover:bg-foreground/5 transition-all rounded-md"
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
              <div className="flex flex-col items-start justify-start gap-4 p-5">
                <SheetClose asChild className="p-0!">
                  <Icons
                    includeSocial
                    iconClassName="opacity-40 hover:opacity-100 transition-all duration-300"
                  />
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
