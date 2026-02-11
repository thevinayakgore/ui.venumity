"use client";
import { motion } from "framer-motion";

export default function WaveLoaderPremium() {
  const bars = 9;

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-5 p-4 sm:p-6 lg:p-8 xl:p-10 w-full h-full"
    >
      <div className="relative">
        <div className="flex items-end justify-center gap-2 border-b-2 h-20 w-55">
          {Array.from({ length: bars }).map((_, i) => (
            <motion.div
              key={i}
              className="w-3 rounded-t-lg"
              style={{
                background: `linear-gradient(to top, 
                    ${
                      i % 4 === 0
                        ? "#F59E0B"
                        : i % 4 === 1
                          ? "#F97316"
                          : i % 4 === 2
                            ? "#EF4444"
                            : "#EC4899"
                    }, 
                    ${
                      i % 4 === 0
                        ? "#FBBF24"
                        : i % 4 === 1
                          ? "#FB923C"
                          : i % 4 === 2
                            ? "#F87171"
                            : "#F472B6"
                    }
                  )`,
              }}
              animate={{
                height: ["20%", "100%", "20%"],
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Floating notes */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${20 + i * 20}%`,
              top: "-30px",
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          >
            ♫
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Premium Audio Processing
        </h2>
        <p className="opacity-50 my-1 max-w-lg">
          High-fidelity sound analysis with real-time visualization
        </p>
        <span className="text-sm opacity-50">
          Active processing • High quality • Real-time
        </span>
      </div>
    </motion.main>
  );
}
