"use client";
import { motion } from "framer-motion";
import { Type, Indent, Outdent } from "lucide-react";
import { useState } from "react";

interface IndentStyle {
  name: string;
  indent: string;
  spacing: string;
  description: string;
}

const indentStyles: IndentStyle[] = [
  {
    name: "No Indent",
    indent: "pl-0",
    spacing: "space-y-4",
    description: "Standard paragraph with no indentation",
  },
  {
    name: "Small Indent",
    indent: "pl-4",
    spacing: "space-y-4",
    description: "Slight indentation for visual separation",
  },
  {
    name: "Medium Indent",
    indent: "pl-8",
    spacing: "space-y-6",
    description: "Traditional paragraph indentation",
  },
  {
    name: "Large Indent",
    indent: "pl-12",
    spacing: "space-y-6",
    description: "Prominent indentation for emphasis",
  },
  {
    name: "Block Quote",
    indent: "pl-6 border-l-4 border-gray-300 dark:border-gray-600",
    spacing: "space-y-4",
    description: "Indented with border for quotes",
  },
  {
    name: "Hanging Indent",
    indent: "pl-8 -indent-8",
    spacing: "space-y-4",
    description: "First line extends left of paragraph",
  },
];

const sampleParagraphs = [
  "The first paragraph introduces the main topic. It provides context and sets the stage for what follows. Each subsequent paragraph builds upon this foundation, developing ideas in a logical progression.",
  "This second paragraph elaborates on the initial concept. It provides supporting details, examples, or evidence to reinforce the main idea. Proper paragraph structure helps readers follow your argument.",
  "The third paragraph might introduce a related subtopic or provide additional context. Transitions between paragraphs ensure smooth flow and coherence throughout the text.",
  "Finally, this paragraph summarizes key points or draws conclusions. Effective paragraphing guides readers through complex information in digestible chunks.",
];

export default function ParagraphIndented() {
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [showFirstLine, setShowFirstLine] = useState(true);

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
              Indented Paragraphs
            </span>
          </div>

          {/* Paragraph Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Indentation Preview
              </h3>

              <div className={`${indentStyles[selectedStyle].spacing}`}>
                {sampleParagraphs.map((text, index) => (
                  <p
                    key={index}
                    className={`text-gray-800 dark:text-gray-200 leading-relaxed ${
                      indentStyles[selectedStyle].indent
                    } ${
                      !showFirstLine && index === 0
                        ? "first-line:uppercase first-line:tracking-widest first-line:font-semibold"
                        : ""
                    }`}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* First Line Styling */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFirstLine}
                  onChange={(e) => setShowFirstLine(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Show special first line styling
                </span>
              </label>
              {!showFirstLine && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  First paragraph has uppercase, wider tracking, and bold
                  styling
                </p>
              )}
            </div>
          </div>

          {/* Indent Style Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Indentation Styles
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {indentStyles.map((style, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedStyle(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedStyle === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {style.name.includes("Hanging") ? (
                      <Outdent className="w-4 h-4" />
                    ) : (
                      <Indent className="w-4 h-4" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        selectedStyle === index
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {style.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-left">
                    {style.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Indentation Guide */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Indentation Guide
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {indentStyles[selectedStyle].indent.includes("pl-0")
                      ? "0px"
                      : indentStyles[selectedStyle].indent.includes("pl-4")
                      ? "1rem"
                      : indentStyles[selectedStyle].indent.includes("pl-6")
                      ? "1.5rem"
                      : indentStyles[selectedStyle].indent.includes("pl-8")
                      ? "2rem"
                      : indentStyles[selectedStyle].indent.includes("pl-12")
                      ? "3rem"
                      : "0px"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="h-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Indentation distance
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Current style:{" "}
                  <span className="font-medium">
                    {indentStyles[selectedStyle].name}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Tailwind class:{" "}
                  <code className="font-mono">
                    {indentStyles[selectedStyle].indent}
                  </code>
                </p>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              When to Use Each Style
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  No Indent
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Best for web content, blogs, and digital reading where space
                  is limited
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Medium Indent
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Traditional for printed books, academic papers, and formal
                  documents
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Block Quote
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  For quotations, important excerpts, or highlighted text
                  sections
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Hanging Indent
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Used in bibliographies, reference lists, and legal documents
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
