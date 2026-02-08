// app/components/typography/blockquote/interactive.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { useState } from "react";

interface QuoteItem {
  content: string;
  author: string;
  title: string;
}

const quotes: QuoteItem[] = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    title: "Apple Co-founder",
  },
  {
    content: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    title: "Apple Co-founder",
  },
  {
    content: "Stay hungry, stay foolish.",
    author: "Steve Jobs",
    title: "Apple Co-founder",
  },
];

export default function BlockquoteInteractive() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const currentQuote = quotes[currentIndex];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `"${currentQuote.content}" - ${currentQuote.author}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="max-w-3xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <Quote className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quote {currentIndex + 1} of {quotes.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-2 rounded-lg transition-colors ${
                    liked
                      ? "bg-red-50 dark:bg-red-900/20 text-red-500"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={liked ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-xl sm:text-2xl text-gray-900 dark:text-white mb-8 leading-relaxed italic">
              &quot;{currentQuote.content}&ldquo;
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white block">
                  {currentQuote.author}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  {currentQuote.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevious}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1">
                  {quotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex
                          ? "bg-blue-500"
                          : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
