"use client";
import { motion } from "framer-motion";
import { Type } from "lucide-react";

interface TextStyle {
  name: string;
  style: string;
  example: string;
  description: string;
}

const textStyles: TextStyle[] = [
  {
    name: "Bold",
    style: "font-bold",
    example: "Bold Text",
    description: "Emphasize important information",
  },
  {
    name: "Italic",
    style: "italic",
    example: "Italic Text",
    description: "Indicate titles or foreign words",
  },
  {
    name: "Underline",
    style: "underline",
    example: "Underlined Text",
    description: "Highlight links or key terms",
  },
  {
    name: "Strikethrough",
    style: "line-through",
    example: "Strikethrough Text",
    description: "Show deleted or outdated content",
  },
  {
    name: "Code",
    style: "font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded",
    example: "code snippet",
    description: "Display code or commands",
  },
  {
    name: "Small",
    style: "text-sm",
    example: "Small Text",
    description: "Use for footnotes or disclaimers",
  },
];

export default function InlineTextBasic() {
  const sampleText =
    "This paragraph demonstrates various inline text styles. You can use bold text for emphasis, italic text for titles, underlined text for links, and strikethrough for removed content. Code snippets appear like this: console.log('Hello');. Small text is perfect for footnotes.";

  const renderText = () => {
    const words = sampleText.split(" ");

    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,:;()]/g, "");
      const punctuation = word.match(/[.,:;()]/g)?.[0] || "";

      // Apply styles based on content
      let style = "";

      if (cleanWord.toLowerCase() === "bold") style = textStyles[0].style;
      else if (cleanWord.toLowerCase() === "italic")
        style = textStyles[1].style;
      else if (cleanWord.toLowerCase() === "underlined")
        style = textStyles[2].style;
      else if (cleanWord.toLowerCase() === "strikethrough")
        style = textStyles[3].style;
      else if (cleanWord.toLowerCase() === "code") style = textStyles[4].style;
      else if (cleanWord.toLowerCase() === "small") style = textStyles[5].style;
      else if (cleanWord === "console.log('Hello');")
        style = textStyles[4].style;

      if (style) {
        return (
          <span key={index}>
            <span className={style}>{word.replace(punctuation, "")}</span>
            {punctuation}
            {index < words.length - 1 ? " " : ""}
          </span>
        );
      }

      return (
        <span key={index}>
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      );
    });
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
              Inline Text Styles
            </span>
          </div>

          {/* Example Text */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
              {renderText()}
            </p>
          </div>

          {/* Text Style Examples */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Available Styles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {textStyles.map((style, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {style.name}
                    </span>
                    <span
                      className={`text-sm ${style.style} text-gray-700 dark:text-gray-300`}
                    >
                      {style.example}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {style.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Best Practices
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    Use Bold Sparingly
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Reserve bold text for key terms or important callouts
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    Italic for Titles
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Use italics for book titles, foreign words, or emphasis
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    Code Snippets
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Use monospace font and background for code examples
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
