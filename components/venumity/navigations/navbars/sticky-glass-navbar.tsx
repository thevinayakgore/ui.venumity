"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

interface GlassNavbarProps {
  className?: string;
}

const navItems = [
  { name: "Products", link: "/" },
  { name: "Features", link: "/" },
  { name: "Pricing", link: "/" },
];

export const GlassNavbar: React.FC<GlassNavbarProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  if (!mounted) return null;

  return (
    <div className={cn("sticky top-0 z-50 md:p-5 w-full", className)}>
      <nav
        className={`flex items-center justify-between p-3 bg-background/70 backdrop-blur-sm ${
          isScrolled ? "max-w-4xl" : "w-full"
        } m-auto border border-foreground/15 rounded-lg transition-all duration-700`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 min-w-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="size-8 md:size-9 shrink-0"
          />
          <span className="text-xl sm:text-2xl md:text-3xl font-semibold leading-none truncate">
            Venu<span className="text-primary">mity</span> UI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <motion.div
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "hidden lg:flex items-center justify-center space-x-2 text-sm font-medium",
            className,
          )}
        >
          {navItems.map((item, idx) => (
            <Link
              onMouseEnter={() => setHovered(idx)}
              className="relative px-4 py-2"
              key={`link-${idx}`}
              href={item.link}
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 h-full w-full rounded-full bg-accent"
                />
              )}
              <span className="relative z-20">{item.name}</span>
            </Link>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() =>
              setTheme(mounted && theme === "dark" ? "light" : "dark")
            }
            className="cursor-pointer rounded-sm size-9"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          <Button
            variant="outline"
            className="hidden lg:flex rounded-sm cursor-pointer text-sm"
          >
            Login
          </Button>

          <Button className="hidden lg:flex rounded-sm cursor-pointer bg-foreground! text-secondary! text-sm">
            Get Started
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex lg:hidden rounded-sm size-9"
          >
            {isMobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-13 sm:top-15 left-0 z-40 p-3 border-b bg-background/90 backdrop-blur-md shadow-2xl lg:hidden w-full"
          >
            <div className="flex flex-col items-start gap-1 w-full">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium rounded-sm hover:bg-foreground hover:text-secondary transition-all duration-300 w-full"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2 mt-3 w-full">
              <Button
                variant="outline"
                className="rounded-sm cursor-pointer w-full text-sm"
              >
                Login
              </Button>

              <Button className="rounded-sm cursor-pointer bg-foreground! text-secondary! w-full text-sm">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Demo page with dummy content
export default function GlassNavbarDemo() {
  return (
    <div className="relative w-full">
      <GlassNavbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center m-auto px-4 py-16 sm:py-24 md:py-32 lg:py-40 w-full">
        <h1 className="pb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/40 bg-clip-text text-transparent">
          Sticky Glass Navbar
        </h1>
        <p className="mb-8 max-w-3xl sm:max-w-4xl m-auto text-sm sm:text-base md:text-lg text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <button className="rounded-full cursor-pointer bg-linear-to-tl from-blue-500 to-purple-600 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg hover:shadow-blue-500/40 transition-all duration-500">
          Get Started
        </button>
      </section>

      {/* Dummy Content Sections */}
      {[...Array(3)].map((_, i) => (
        <section key={i} className="border-t py-8 sm:py-10 md:py-12 w-full">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-br from-foreground to-foreground/40 bg-clip-text text-transparent">
                  Section {i + 1}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              </div>
              <div className="aspect-video rounded-2xl bg-linear-to-br from-blue-500 to-purple-500" />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
