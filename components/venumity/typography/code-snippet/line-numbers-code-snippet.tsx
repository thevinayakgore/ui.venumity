"use client";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function CodeSnippetLineNumbers() {
  const [copied, setCopied] = useState(false);
  const code = `console.log("Hello, world!");
function add(a: number, b: number): number {
  return a + b;
}
`;
  const language = "typescript";
  const highlightLines: number[] = [1];

  const lines = code.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="bg-gray-900 dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gray-800/50 dark:bg-gray-800/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <span className="text-sm font-mono text-gray-300">
                {language}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300 transition-colors"
              title="Copy code"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800/30 border-r border-gray-800 dark:border-gray-700">
              <div className="py-4 pr-2 text-right">
                {lines.map((_, index) => (
                  <div
                    key={index}
                    className={`text-xs font-mono py-0.5 ${
                      highlightLines.includes(index + 1)
                        ? "text-blue-400 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            <pre className="pl-14 pr-4 sm:pr-6 py-4 overflow-x-auto">
              <code className="text-sm sm:text-base text-gray-100 font-mono">
                {lines.map((line, index) => (
                  <div
                    key={index}
                    className={`py-0.5 ${
                      highlightLines.includes(index + 1)
                        ? "bg-blue-900/20 border-l-2 border-blue-500 pl-2 -ml-2"
                        : ""
                    }`}
                  >
                    {line || "\u00A0"}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
