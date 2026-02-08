"use client";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function CodeSnippetInline() {
  const [copied, setCopied] = useState(false);
  const code = `your code here`;
  const language = 'javascript';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-3xl">
        <div className="relative group">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <code className="text-sm sm:text-base font-mono text-gray-800 dark:text-gray-200 break-all">
                  {code}
                </code>
                {language && (
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                      {language}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleCopy}
                className="shrink-0 p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
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

          {copied && (
            <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs py-1 px-2 rounded">
              Copied!
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            This is an inline code snippet that can be easily copied and used.
          </p>
        </div>
      </div>
    </motion.main>
  );
}
