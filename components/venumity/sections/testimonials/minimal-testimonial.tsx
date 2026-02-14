"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { authorName, brandName } from "@/lib/brand";

export default function MinimalTestimonial() {
  return (
    <main className="flex items-center justify-center m-auto p-6 md:p-10 max-w-2xl w-full h-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-6 p-6 md:p-10 bg-linear-to-br from-yellow-400 to-primary text-white shadow-2xl/30 rounded-2xl w-full"
      >
        <Quote className="size-10" />

        <p className="text-lg md:text-xl italic w-full">
          Venumity UI helped us ship faster with clean, accessible, and
          beautifully crafted components.
        </p>

        <div className="flex flex-col">
          <span className="text-base font-semibold">{authorName}</span>
          <span className="text-sm font-medium italic opacity-80">
            {brandName}
          </span>
        </div>
      </motion.div>
    </main>
  );
}
