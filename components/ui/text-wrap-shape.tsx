"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TextWrapShapeProps {
  shape: "hexagon" | "circle" | "triangle" | "star";
  children: React.ReactNode;
  className?: string;
  content: React.ReactNode;
}

const shapeStyles = {
  hexagon: "clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  circle: "clip-path: circle(50%)",
  triangle: "clip-path: polygon(50% 0%, 0% 100%, 100% 100%)",
  star: "clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
};

export function TextWrapShape({ 
  shape, 
  children, 
  className,
  content 
}: TextWrapShapeProps) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "float-left mr-6 mb-4 size-24 bg-linear-to-br from-primary/20 to-yellow-500/30 flex items-center justify-center backdrop-blur-sm",
          className
        )}
        style={{
          clipPath: shapeStyles[shape].split(": ")[1].replace(";", ""),
          shapeOutside: shapeStyles[shape].split(": ")[1].replace(";", ""),
        }}
      >
        {content}
      </motion.div>
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}