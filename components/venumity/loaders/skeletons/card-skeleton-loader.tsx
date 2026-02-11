"use client";
import { motion } from "framer-motion";

export default function SkeletonLoaderCard() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Image skeleton */}
              <div className="h-48 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
              
              <div className="p-6 space-y-4">
                {/* Title skeleton */}
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
                </div>
                
                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse" />
                </div>
                
                {/* Tags skeleton */}
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
                </div>
                
                {/* Button skeleton */}
                <div className="pt-4">
                  <div className="h-10 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}