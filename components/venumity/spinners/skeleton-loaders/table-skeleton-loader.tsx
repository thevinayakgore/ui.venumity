"use client";
import { motion } from "framer-motion";

export default function SkeletonLoaderTable() {
  const columns = 5;
  const rows = 8;

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Table header skeleton */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
              </div>
              <div className="flex gap-3">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Table skeleton */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <th key={colIndex} className="p-4 text-left">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                  <tr 
                    key={rowIndex} 
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    {Array.from({ length: columns }).map((_, colIndex) => (
                      <td key={colIndex} className="p-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table footer skeleton */}
          <div className="p-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-10 animate-pulse" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-10 animate-pulse" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-10 animate-pulse" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-10 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}