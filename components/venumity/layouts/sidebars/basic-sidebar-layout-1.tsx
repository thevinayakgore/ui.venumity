"use client";
import { motion } from "framer-motion";

// Basic Sidebar Layout
function BasicSidebar({ position = "left" }: { position?: "left" | "right" }) {
  const positions = {
    left: "flex-row",
    right: "flex-row-reverse",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-card border p-8 rounded-lg ${positions[position]} flex gap-6 w-full`}
    >
      <div className="size-60 bg-muted rounded-sm"></div>
      <div className="flex-1 space-y-6">
        <div className="h-14 bg-muted rounded-sm"></div>
        <div className="flex items-center gap-6 w-full">
          <div className="h-14 bg-muted rounded-sm w-1/2"></div>
          <div className="h-14 bg-muted rounded-sm w-1/2"></div>
        </div>
        <div className="h-14 bg-muted rounded-sm w-3/4"></div>
      </div>
    </motion.div>
  );
}

export default function SidebarLayout1() {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
      >
        <BasicSidebar position="left" />
        <BasicSidebar position="right" />
      </motion.main>
    </>
  );
}
