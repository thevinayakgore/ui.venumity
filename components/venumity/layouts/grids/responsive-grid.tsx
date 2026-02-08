"use client";
import { motion } from "framer-motion";

// Responsive Grid Layout
function ResponsiveGrid({
  breakpoint = "md",
}: {
  breakpoint?: "sm" | "md" | "lg";
}) {
  const responsiveClasses = {
    sm: "grid-cols-1 sm:grid-cols-2",
    md: "grid-cols-1 md:grid-cols-3",
    lg: "grid-cols-1 lg:grid-cols-4",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-lg border-2 border-blue-500/50 p-8 grid ${responsiveClasses[breakpoint]} gap-5 hover:scale-105 transition-all duration-500 w-full`}
    >
      {[...Array(breakpoint === "sm" ? 4 : breakpoint === "md" ? 6 : 8)].map(
        (_, i) => (
          <div
            key={i}
            className="h-20 bg-blue-500/30 rounded-sm hover:scale-105 transition-all duration-500"
          />
        )
      )}
    </motion.div>
  );
}

export default function ResponsiveGridLayout() {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
      >
        <ResponsiveGrid breakpoint="sm" />
        <ResponsiveGrid breakpoint="md" />
        <ResponsiveGrid breakpoint="lg" />
      </motion.main>
    </>
  );
}
