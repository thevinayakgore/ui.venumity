"use client";

import { Button } from "@/components/ui/button";
import { Tag, ArrowRight } from "lucide-react";
import { motion, spring, cubicBezier } from "framer-motion"; // Using framer-motion for enhanced animations

export default function SimpleOfferBanner() {
  // Animation variants for a minimal, refined system
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.25, 0.1, 0, 1), // Custom easing for smoothness
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -5 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.4, type: spring, stiffness: 200 },
    },
  };

  return (
    <main className="flex items-start p-6 md:p-10 w-full h-full">
      {/* Main banner container with motion */}
      <motion.div
        className="relative flex flex-col md:flex-row items-center justify-between gap-6 bg-linear-to-br from-indigo-600 via-blue-600 to-sky-500 rounded-2xl p-5 text-white shadow-xl overflow-hidden w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        {/* Subtle animated background elements for depth */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
          animate={{ x: [10, -10, 10], y: [5, -5, 5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-2xl"
          animate={{ x: [-5, 5, -5], y: [-5, 5, -5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Left section with icon and text */}
        <div className="flex items-center gap-4 relative z-10">
          <motion.div
            className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/10 shadow-inner"
            variants={iconVariants}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Tag className="size-7 md:size-8" />
          </motion.div>
          <div>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold tracking-tight"
              variants={itemVariants}
            >
              Summer Sale — Up to 50% Off
            </motion.h2>
            <motion.p
              className="text-sm md:text-base text-white/80 mt-1 max-w-md"
              variants={itemVariants}
            >
              Limited time offer on all electronics. Shop now and save big !
            </motion.p>
          </div>
        </div>

        {/* Button with refined motion */}
        <motion.div variants={itemVariants} className="relative z-10">
          <Button className="group relative flex items-center gap-2 py-6 px-8 md:px-10 cursor-pointer bg-white text-blue-600 hover:bg-blue-500 text-base font-semibold inset-shadow-sm inset-shadow-blue-500/20 shadow-md hover:shadow-lg rounded-lg border-2 hover:border-white transition-all duration-500 overflow-hidden">
            {/* Animated background reveal */}
            <motion.span
              className="absolute inset-0 bg-linear-to-r from-blue-500 to-sky-400 rounded-xl"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Button text and icon - kept above background */}
            <span className="relative z-10 flex items-center gap-2 text-blue-600 group-hover:text-white transition-colors duration-300">
              Shop Now
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <ArrowRight className="size-5" />
              </motion.span>
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
