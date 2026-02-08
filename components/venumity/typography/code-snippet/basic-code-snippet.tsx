"use client";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function CodeSnippetBasic() {
  const [copied, setCopied] = useState(false);

  // Inline default snippet (no props)
  const code = `console.log("Hello World");`;
  const language = "javascript";

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
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gray-800/50 dark:bg-gray-800/30 border-b border-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-medium text-gray-300 ml-2">
                {language}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 sm:p-6 overflow-x-auto">
            <code className="text-sm sm:text-base text-gray-100 font-mono whitespace-pre">
              {code}
            </code>
          </pre>
        </div>
      </div>
    </motion.main>
  );
}
