"use client";
import { motion } from "framer-motion";

export default function SkeletonLoaderProfile() {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header skeleton */}
          <div className="h-48 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
          
          <div className="relative px-8 pb-8">
            {/* Avatar skeleton */}
            <div className="absolute -top-16 left-8">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full border-4 border-white dark:border-gray-800 animate-pulse" />
            </div>
            
            <div className="pt-20 space-y-8">
              {/* Profile info skeleton */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
                  </div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
                </div>
                
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
              </div>
              
              {/* Stats skeleton */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="text-center space-y-2">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto animate-pulse" />
                  </div>
                ))}
              </div>
              
              {/* Tabs skeleton */}
              <div className="border-b border-gray-100 dark:border-gray-700">
                <div className="flex space-x-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="pb-4">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Content grid skeleton */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}