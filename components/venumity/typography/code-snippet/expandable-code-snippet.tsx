"use client";
import { motion } from "framer-motion";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function CodeSnippetExpandable() {
  const code = `// your code here
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");`;
  const language = "javascript";
  const previewLength = 3;

  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const lines = code.split("\n");
  const previewLines = expanded ? lines : lines.slice(0, previewLength);
  const hasMoreLines = lines.length > previewLength;

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
      <div className="w-full max-w-3xl">
        <div className="bg-gray-900 dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gray-800/50 dark:bg-gray-800/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-gray-300">
                {language}
              </span>
              <span className="text-xs text-gray-500">
                {lines.length} lines
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Collapse</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>Expand</span>
                  </>
                )}
              </button>

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
          </div>

          <div className="relative">
            <pre className="p-4 sm:p-6 overflow-x-auto">
              <code className="text-sm sm:text-base text-gray-100 font-mono">
                {previewLines.map((line, index) => (
                  <div key={index} className="py-0.5">
                    {line}
                  </div>
                ))}

                {!expanded && hasMoreLines && (
                  <div className="py-2 text-gray-500 italic">
                    ... {lines.length - previewLength} more lines
                  </div>
                )}
              </code>
            </pre>

            {!expanded && hasMoreLines && (
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-gray-900 to-transparent dark:from-gray-950 pointer-events-none"></div>
            )}
          </div>
        </div>
      </div>
    </motion.main>
  );
}
