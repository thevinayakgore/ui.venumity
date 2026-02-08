"use client";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

interface BadgeVariant {
  name: string;
  color: string;
  icon?: React.ReactNode;
}

const badgeVariants: BadgeVariant[] = [
  {
    name: "Default",
    color: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
  },
  {
    name: "Primary",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  },
  {
    name: "Success",
    color:
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  },
  {
    name: "Warning",
    color:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
  },
  {
    name: "Error",
    color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  },
  {
    name: "Info",
    color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300",
  },
];

export default function InlineBadgeBasic() {
  const sampleText =
    "This is an example text with inline badges like Default, Primary, Success, Warning, Error, and Info badges embedded within the content.";

  const renderText = () => {
    const parts = sampleText.split(" ");

    return parts.map((word, index) => {
      const cleanWord = word.replace(/[.,]/g, "");
      const punctuation = word.match(/[.,]/g)?.[0] || "";

      const badgeIndex = badgeVariants.findIndex(
        (b) => b.name.toLowerCase() === cleanWord.toLowerCase()
      );

      if (badgeIndex !== -1) {
        return (
          <span key={index}>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium mx-1 ${badgeVariants[badgeIndex].color}`}
            >
              {cleanWord}
            </span>
            {punctuation}
            {index < parts.length - 1 ? " " : ""}
          </span>
        );
      }

      return (
        <span key={index}>
          {word}
          {index < parts.length - 1 ? " " : ""}
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
            <Tag className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Inline Badges
            </span>
          </div>

          {/* Example Text with Badges */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
              {renderText()}
            </p>
          </div>

          {/* Badge Variants */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Badge Variants
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {badgeVariants.map((badge, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium mb-2 ${badge.color}`}
                  >
                    {badge.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    {badge.color.split(" ")[0].replace("bg-", "").split("-")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Example */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              How to Use
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Inline badges are useful for{" "}
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    highlighting status
                  </span>{" "}
                  within text
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Use them for{" "}
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    success messages
                  </span>{" "}
                  or{" "}
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                    error alerts
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Perfect for{" "}
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                    category tags
                  </span>{" "}
                  in content
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
