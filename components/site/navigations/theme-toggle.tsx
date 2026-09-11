// components/navigations/theme-toggle.tsx
"use client";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";

const CORNER_MARGIN = 15; // px from edge

export default function ThemeToggle() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hooks must be called unconditionally and in the same order every render
  const controls = useAnimation();
  const x = useMotionValue(CORNER_MARGIN);
  const y = useMotionValue(CORNER_MARGIN);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mount effect
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Set initial position to top-right only on preview page
  useEffect(() => {
    if (!mounted) return;

    const FULL_PREVIEW = pathname?.startsWith("/preview");
    if (!FULL_PREVIEW) return;

    const viewportW = window.innerWidth;
    // Approximate button width; adjust if your button size changes
    const buttonWidth = 40;

    const initialX = viewportW - buttonWidth - CORNER_MARGIN;
    const initialY = CORNER_MARGIN;

    x.set(initialX);
    y.set(initialY);
  }, [mounted, pathname, x, y]);

  const toggleTheme = useCallback(() => {
    if (!resolvedTheme) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  // Early return after all hooks
  if (!mounted) return null;

  const FULL_PREVIEW = pathname?.startsWith("/preview");

  const snapToNearestCorner = async () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const leftDist = centerX;
    const rightDist = viewportW - centerX;
    const topDist = centerY;
    const bottomDist = viewportH - centerY;

    const targetX =
      leftDist < rightDist
        ? CORNER_MARGIN
        : viewportW - rect.width - CORNER_MARGIN;
    const targetY =
      topDist < bottomDist
        ? CORNER_MARGIN
        : viewportH - rect.height - CORNER_MARGIN;

    await controls.start({
      x: targetX,
      y: targetY,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    });
  };

  const icon = (
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
  );

  if (!FULL_PREVIEW) {
    // Normal fixed position (top-right)
    return (
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleTheme}
        disabled={!mounted}
        title={
          resolvedTheme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
      >
        {icon}
      </Button>
    );
  }

  // Draggable preview mode: can be dragged to any corner
  return (
    <motion.div
      ref={containerRef}
      className="fixed z-1005!"
      style={{ x, y, top: 0, left: 0 }}
      drag
      dragMomentum={false}
      dragElastic={0.04}
      onDragEnd={snapToNearestCorner}
      animate={controls}
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleTheme}
        disabled={!mounted}
        title={
          resolvedTheme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
        className="p-5! cursor-grab active:cursor-grabbing"
      >
        {icon}
      </Button>
    </motion.div>
  );
}
