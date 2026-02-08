"use client";
import { motion } from "framer-motion";
import { Type, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useState } from "react";

interface ParagraphStyle {
  name: string;
  fontSize: string;
  lineHeight: string;
  description: string;
}

const paragraphStyles: ParagraphStyle[] = [
  {
    name: "Small",
    fontSize: "text-sm",
    lineHeight: "leading-relaxed",
    description: "For captions, footnotes, or dense content",
  },
  {
    name: "Regular",
    fontSize: "text-base",
    lineHeight: "leading-relaxed",
    description: "Standard body text for most content",
  },
  {
    name: "Large",
    fontSize: "text-lg",
    lineHeight: "leading-relaxed",
    description: "Enhanced readability for main content",
  },
  {
    name: "Extra Large",
    fontSize: "text-xl",
    lineHeight: "leading-loose",
    description: "For featured content or presentations",
  },
];

const sampleParagraphs = [
  "Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. Good typography establishes a clear visual hierarchy, provides a graphic balance to the website, and sets the product's overall tone.",
  "Paragraphs are the building blocks of written content. They group related sentences together to form coherent thoughts and ideas. A well-structured paragraph should have a clear topic sentence, supporting details, and a concluding sentence.",
  "In web design, paragraph styling significantly impacts readability and user experience. Factors like font size, line height, letter spacing, and text alignment all contribute to how easily users can consume your content.",
  "Responsive typography ensures that text remains readable and accessible across all device sizes. This involves adjusting font sizes, line heights, and spacing based on viewport dimensions.",
];

export default function ParagraphBasic() {
  const [selectedStyle, setSelectedStyle] = useState(1);
  const [alignment, setAlignment] = useState<"left" | "center" | "justify">(
    "left"
  );
  const [paragraphIndex, setParagraphIndex] = useState(0);

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    justify: "text-justify",
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Type className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Paragraph Styling
            </span>
          </div>

          {/* Paragraph Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Paragraph Preview
              </h3>

              <div
                className={`${paragraphStyles[selectedStyle].fontSize} ${paragraphStyles[selectedStyle].lineHeight} ${alignmentClasses[alignment]} text-gray-800 dark:text-gray-200`}
              >
                {sampleParagraphs[paragraphIndex]}
              </div>
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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {paragraphStyles.map((style, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedStyle(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedStyle === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="text-center">
                    <span
                      className={`block mb-2 font-medium ${style.fontSize} ${
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

          {/* Alignment Controls */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Text Alignment
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setAlignment("left")}
                className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                  alignment === "left"
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                <AlignLeft className="w-5 h-5 mb-2" />
                <span className="text-sm font-medium">Left</span>
              </button>

              <button
                onClick={() => setAlignment("center")}
                className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                  alignment === "center"
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                <AlignCenter className="w-5 h-5 mb-2" />
                <span className="text-sm font-medium">Center</span>
              </button>

              <button
                onClick={() => setAlignment("justify")}
                className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                  alignment === "justify"
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                <AlignRight className="w-5 h-5 mb-2" />
                <span className="text-sm font-medium">Justify</span>
              </button>
            </div>
          </div>

          {/* Style Details */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Current Style Details
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Font Size
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {paragraphStyles[selectedStyle].fontSize.replace("text-", "")}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Line Height
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {paragraphStyles[selectedStyle].lineHeight.replace(
                    "leading-",
                    ""
                  )}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Alignment
                </p>
                <p className="font-medium text-gray-900 dark:text-white capitalize">
                  {alignment}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
