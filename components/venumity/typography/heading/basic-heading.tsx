"use client";
import React, { ReactNode } from "react"; // <-- Import React and types
import { motion } from "framer-motion";
import { Heading as HeadingIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: ReactNode;
}

interface HeadingData {
  title: string;
  subtitle?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

// Example data directly inside this page
const headingsData: HeadingData[] = [
  { title: "Welcome to the Platform", subtitle: "Start here", level: 1 },
  {
    title: "Getting Started Guide",
    subtitle: "Step by step tutorial",
    level: 2,
  },
  { title: "Advanced Settings", subtitle: "Optimize your workflow", level: 3 },
  { title: "Tips & Tricks", subtitle: "Enhance productivity", level: 4 },
  { title: "FAQs", subtitle: "Common questions answered", level: 5 },
  { title: "Contact Support", subtitle: "We are here to help", level: 6 },
];

export default function HeadingBasic({ level = 1 }: HeadingProps) {
  const Tag: React.ElementType = `h${level}`;

  const sizes: Record<number, string> = {
    1: "text-4xl sm:text-5xl lg:text-6xl",
    2: "text-3xl sm:text-4xl lg:text-5xl",
    3: "text-2xl sm:text-3xl lg:text-4xl",
    4: "text-xl sm:text-2xl lg:text-3xl",
    5: "text-lg sm:text-xl lg:text-2xl",
    6: "text-base sm:text-lg lg:text-xl",
  };

  const weights: Record<number, string> = {
    1: "font-black",
    2: "font-bold",
    3: "font-semibold",
    4: "font-medium",
    5: "font-medium",
    6: "font-normal",
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl flex flex-col gap-12">
        {headingsData.map((heading) => (
          <div key={heading.title} className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 mb-4">
              <HeadingIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Heading {heading.level}
              </span>
            </div>

            <div className="text-center">
              <Tag
                className={`${sizes[heading.level]} ${
                  weights[heading.level]
                } text-gray-900 dark:text-white mb-4 leading-tight`}
              >
                {heading.title}
              </Tag>

              {heading.subtitle && (
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {heading.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.main>
  );
}
