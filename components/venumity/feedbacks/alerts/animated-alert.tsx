"use client";
import { motion } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";

// Animated Alert
function AnimatedAlert({
  variant = "pulse",
}: {
  variant?: "pulse" | "shake" | "glow" | "bounce";
}) {
  const variants = {
    pulse: (
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="bg-yellow-500/10 border border-yellow-500/50 rounded-md p-4 backdrop-blur-sm w-full"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-yellow-500" />
          <div className="text-yellow-500">
            <h1 className="text-base md:text-lg font-medium leading-none">
              Pulse Alert
            </h1>
            <p className="text-sm opacity-80 mt-2">
              Continuously pulsing for attention
            </p>
          </div>
        </div>
      </motion.div>
    ),
    shake: (
      <motion.div
        animate={{ x: [0, -5, 5, -5, 5, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        className="bg-red-500/10 border border-red-500/50 rounded-md p-4 backdrop-blur-sm w-full"
      >
        <div className="flex items-start gap-3">
          <XCircle className="size-5 text-red-500" />
          <div className="text-red-500">
            <h1 className="text-base md:text-lg font-medium leading-none">
              Shake Alert
            </h1>
            <p className="text-sm opacity-80 mt-2">Shaking to grab attention</p>
          </div>
        </div>
      </motion.div>
    ),
    glow: (
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0px rgba(59, 130, 246, 0.5)",
            "0 0 20px rgba(59, 130, 246, 0.8)",
            "0 0 0px rgba(59, 130, 246, 0.5)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="bg-blue-500/10 border border-blue-500/50 rounded-md p-4 backdrop-blur-sm w-full"
      >
        <div className="flex items-start gap-3">
          <Info className="size-5 text-blue-500" />
          <div className="text-blue-500">
            <h1 className="text-base md:text-lg font-medium leading-none">
              Glow Alert
            </h1>
            <p className="text-sm opacity-80 mt-2">Glowing border effect</p>
          </div>
        </div>
      </motion.div>
    ),
    bounce: (
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="bg-green-500/10 border border-green-500/50 rounded-md p-4 backdrop-blur-sm w-full"
      >
        <div className="flex items-start gap-3">
          <CheckCircle className="size-5 text-green-500" />
          <div className="text-green-500">
            <h1 className="text-base md:text-lg font-medium leading-none">
              Bounce Alert
            </h1>
            <p className="text-sm opacity-80 mt-2">Bouncing up and down</p>
          </div>
        </div>
      </motion.div>
    ),
  };

  return variants[variant];
}

export default function bannerAlert() {
  const animTypes = ["pulse", "shake", "glow", "bounce"] as const;

  return (
    <>
      {/* Animated Alert */}
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col m-auto gap-4 p-6 sm:p-10 overflow-auto max-w-4xl w-full h-full"
      >
        {animTypes.map((v, i) => (
          <motion.div
            key={v}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="w-full"
          >
            <AnimatedAlert variant={v} />
          </motion.div>
        ))}
      </motion.main>
    </>
  );
}
