"use client";
import { motion } from "framer-motion";
import { Box } from "lucide-react";

// Responsive Flex Layout
function ResponsiveFlexBox({
  breakpoint = "mobile",
}: {
  breakpoint?: "mobile" | "tablet" | "desktop";
}) {
  const breakpoints = {
    mobile: "flex-col",
    tablet: "flex-wrap",
    desktop: "flex-row",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-linear-to-br from-card to-muted rounded-xl border shadow-xl p-8 ${breakpoints[breakpoint]} flex gap-6 transition-all duration-500 backdrop-blur-lg w-full`}
    >
      {[...Array(breakpoint === "mobile" ? 3 : 4)].map((_, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.12, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="size-20 p-4 bg-green-600 shadow-lg text-white rounded-xl flex items-center justify-center hover:shadow-2xl"
        >
          <Box className="w-full h-full" />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function ResponsiveFlexBoxLayout() {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 items-start justify-center m-auto gap-12 p-6 sm:p-10 md:py-16 max-w-7xl w-full h-full"
      >
        <ResponsiveFlexBox breakpoint="mobile" />
        <ResponsiveFlexBox breakpoint="tablet" />
        <ResponsiveFlexBox breakpoint="desktop" />
      </motion.main>
    </>
  );
}
