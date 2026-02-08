"use client";
import { motion } from "framer-motion";

// Complex Grid Layout
function ComplexGrid({
  pattern = "asymmetric",
}: {
  pattern?: "asymmetric" | "overlap" | "masonry";
}) {
  const patterns = {
    asymmetric: (
      <motion.div className="rounded-lg border border-blue-500 p-8 grid grid-cols-6 grid-rows-5 gap-5 w-full h-full">
        <div className="col-span-4 row-span-5 h-full bg-blue-500 rounded-sm transition-all duration-300 hover:scale-[1.02]" />
        <div className="col-span-2 row-span-4 bg-blue-500 rounded-sm transition-all duration-300 hover:scale-[1.02]" />
        <div className="col-span-2 row-span-5 bg-blue-500 rounded-sm transition-all duration-300 hover:scale-[1.02]" />
        <div className="col-span-4 row-span-4 bg-blue-500 rounded-sm transition-all duration-300 hover:scale-[1.02]" />
      </motion.div>
    ),
    masonry: (
      <motion.div className="rounded-lg border border-green-500 p-8 grid grid-cols-3 gap-5 w-full h-full">
        <div className="h-14 bg-green-500 rounded-sm transition-all duration-300 hover:scale-[1.03]" />
        <div className="h-14 bg-green-500 rounded-sm transition-all duration-300 hover:scale-[1.03] col-span-2" />
        <div className="h-12 bg-green-500 rounded-sm transition-all duration-300 hover:scale-[1.03] col-span-2" />
        <div className="h-12 bg-green-500 rounded-sm transition-all duration-300 hover:scale-[1.03]" />
        <div className="h-12 bg-green-500 rounded-sm transition-all duration-300 hover:scale-[1.03]" />
        <div className="h-12 bg-green-500 rounded-sm transition-all duration-300 hover:scale-[1.03]" />
        <div className="h-12 bg-green-500 rounded-sm transition-all duration-300 hover:scale-[1.03]" />
      </motion.div>
    ),
    overlap: (
      <motion.div className="relative rounded-lg border border-pink-500 p-8 w-full h-68">
        <div className="absolute size-40 bg-pink-500/30 border border-pink-500 rounded-sm transition-all duration-300 hover:scale-[1.03] top-8 left-8" />
        <div className="absolute size-40 bg-pink-500/30 border border-pink-500 rounded-sm transition-all duration-300 hover:scale-[1.03] top-12 left-12 opacity-80" />
        <div className="absolute size-40 bg-pink-500/30 border border-pink-500 rounded-sm transition-all duration-300 hover:scale-[1.03] top-16 left-16 opacity-60" />
        <div className="absolute size-40 bg-pink-500/30 border border-pink-500 rounded-sm transition-all duration-300 hover:scale-[1.03] top-20 left-20 opacity-60" />
      </motion.div>
    ),
  };

  return patterns[pattern];
}

export default function ComplexGridLayout() {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
      >
        <ComplexGrid pattern="asymmetric" />
        <ComplexGrid pattern="masonry" />
        <ComplexGrid pattern="overlap" />
      </motion.main>
    </>
  );
}
