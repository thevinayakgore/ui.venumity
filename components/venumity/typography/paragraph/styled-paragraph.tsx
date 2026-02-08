"use client";
import { motion } from "framer-motion";
import { Palette, Sparkles } from "lucide-react";
import { useState } from "react";

interface ParagraphStyle {
  id: string;
  name: string;
  style: string;
  description: string;
}

const paragraphStyles: ParagraphStyle[] = [
  {
    id: "default",
    name: "Default",
    style: "text-gray-800 dark:text-gray-200",
    description: "Standard paragraph style",
  },
  {
    id: "lead",
    name: "Lead",
    style:
      "text-xl text-gray-700 dark:text-gray-300 font-light leading-relaxed",
    description: "Larger text for introductory paragraphs",
  },
  {
    id: "muted",
    name: "Muted",
    style: "text-gray-600 dark:text-gray-400 italic",
    description: "Subtle text for secondary information",
  },
  {
    id: "highlight",
    name: "Highlight",
    style:
      "bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800",
    description: "Highlighted paragraph with background",
  },
  {
    id: "border",
    name: "Bordered",
    style:
      "border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 bg-blue-50/50 dark:bg-blue-900/10",
    description: "Paragraph with left border accent",
  },
  {
    id: "gradient",
    name: "Gradient",
    style:
      "bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium",
    description: "Gradient text effect",
  },
];

const sampleParagraphs = [
  "Typography plays a crucial role in web design, affecting both aesthetics and readability. Good typography guides users through content and enhances user experience.",
  "Paragraph styling can significantly impact how users perceive and interact with your content. Different styles serve different purposes in your design system.",
  "Consistent paragraph styling across your application creates visual harmony and improves overall readability. It helps establish hierarchy and guides users through content.",
  "Responsive paragraph design ensures that text remains readable and accessible across all device sizes and screen resolutions.",
];

export default function ParagraphStyled() {
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Styled Paragraphs
            </span>
          </div>

          {/* Paragraph Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Style Preview
              </h3>

              <motion.div
                animate={
                  animate && paragraphStyles[selectedStyle].id === "gradient"
                    ? {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }
                    : {}
                }
                transition={
                  animate && paragraphStyles[selectedStyle].id === "gradient"
                    ? {
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }
                    : {}
                }
                className={paragraphStyles[selectedStyle].style}
                style={
                  animate && paragraphStyles[selectedStyle].id === "gradient"
                    ? {
                        backgroundSize: "200% auto",
                      }
                    : {}
                }
              >
                {sampleParagraphs[paragraphIndex]}
              </motion.div>
            </div>

            {/* Sample Text Selection */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sample Text
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {paragraphIndex + 1} of {sampleParagraphs.length}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setParagraphIndex((prev) =>
                      prev === 0 ? sampleParagraphs.length - 1 : prev - 1
                    )
                  }
                  className="px-3 py-1.5 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>

                <div className="flex-1 flex items-center justify-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    &quot;{sampleParagraphs[paragraphIndex].substring(0, 40)}
                    ...&ldquo;
                  </span>
                </div>

                <button
                  onClick={() =>
                    setParagraphIndex((prev) =>
                      prev === sampleParagraphs.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="px-3 py-1.5 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Style Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Paragraph Styles
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {paragraphStyles.map((style, index) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedStyle === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="text-center">
                    <span
                      className={`block mb-2 font-medium ${
                        selectedStyle === index
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {style.name}
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {style.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Animation Control for Gradient */}
          {paragraphStyles[selectedStyle].id === "gradient" && (
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Gradient Animation
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Animate gradient flow across text
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setAnimate(!animate)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    animate ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      animate ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {animate && (
                <motion.div
                  className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Gradient is flowing across the text
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {/* Usage Examples */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Style Usage Examples
            </h3>

            <div className="space-y-6">
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Lead Paragraph
                </p>
                <p className="text-xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                  Use lead paragraphs to introduce important sections or
                  articles.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Highlighted Paragraph
                </p>
                <p className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                  Highlight important information or callouts with background
                  styling.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bordered Paragraph
                </p>
                <p className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 bg-blue-50/50 dark:bg-blue-900/10">
                  Use bordered paragraphs for quotes or important notes.
                </p>
              </div>
            </div>
          </div>

          {/* Style Details */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Current Style Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Style Name
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {paragraphStyles[selectedStyle].name}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Tailwind Classes
                </p>
                <code className="text-sm font-mono text-gray-900 dark:text-white break-all">
                  {paragraphStyles[selectedStyle].style}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
