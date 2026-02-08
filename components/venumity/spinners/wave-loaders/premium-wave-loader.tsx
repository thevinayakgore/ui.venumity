"use client";
import { motion } from "framer-motion";
import { Music } from "lucide-react";

export default function WaveLoaderPremium() {
  const bars = 9;
  
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="flex flex-col items-center justify-center gap-14">
        <div className="relative">
          <div className="flex items-end justify-center gap-2 h-32">
            {Array.from({ length: bars }).map((_, i) => (
              <motion.div
                key={i}
                className="w-5 rounded-t-lg"
                style={{
                  background: `linear-gradient(to top, 
                    ${i % 4 === 0 ? '#F59E0B' : 
                      i % 4 === 1 ? '#F97316' : 
                      i % 4 === 2 ? '#EF4444' : 
                      '#EC4899'
                    }, 
                    ${i % 4 === 0 ? '#FBBF24' : 
                      i % 4 === 1 ? '#FB923C' : 
                      i % 4 === 2 ? '#F87171' : 
                      '#F472B6'
                    }
                  )`
                }}
                animate={{
                  height: ["20%", "100%", "20%"],
                  filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Music className="w-8 h-8 text-amber-500 dark:text-amber-400" />
            </motion.div>
          </div>
          
          {/* Floating notes */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${20 + i * 20}%`,
                top: '-30px',
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            >
              ♫
            </motion.div>
          ))}
        </div>
        
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Premium Audio Processing
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg">
            High-fidelity sound analysis with real-time visualization
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Active processing • High quality • Real-time
            </span>
          </div>
        </div>
      </div>
    </motion.main>
  );
}