"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function DeleteConfirmButton() {
  const [stage, setStage] = useState<"idle" | "confirm" | "deleting">("idle");
  const [shake, setShake] = useState(false);
  const [particles, setParticles] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  const handleClick = () => {
    if (stage === "idle") {
      setStage("confirm");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stage === "confirm") {
      setStage("deleting");

      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        id: i,
      }));
      setParticles(newParticles);

      setTimeout(() => {
        setStage("idle");
        setParticles([]);
        console.log("Deleted!");
      }, 2000);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStage("idle");
    setShake(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        animate={
          shake
            ? {
                x: [-10, 10, -10, 10, -5, 5, 0],
                rotate: [-2, 2, -2, 2, -1, 1, 0],
                transition: { duration: 0.5 },
              }
            : {}
        }
        className={`relative overflow-visible px-8 py-4 rounded-xl font-semibold text-white transition-all duration-500 shadow-2xl cursor-pointer ${
          stage === "idle"
            ? "bg-linear-to-tl from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 hover:scale-105 shadow-red-500/30 hover:shadow-red-500/50"
            : stage === "confirm"
              ? "bg-linear-to-tl from-red-500 to-red-600 shadow-red-600/40 scale-105"
              : "bg-linear-to-r from-red-600 to-red-500 cursor-not-allowed scale-95"
        }`}
        onClick={handleClick}
      >
        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3 relative z-10"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                animate={{
                  rotate: [0, -5, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </motion.svg>
              <span className="text-base">Delete Item</span>
            </motion.div>
          )}

          {stage === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
              className="flex items-center gap-4 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
              <span className="font-semibold">Are you sure ?</span>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 text-xs font-semibold bg-white/20 hover:bg-white/30 rounded-sm transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-3 py-1 text-xs font-semibold bg-white/20 hover:bg-white/30 rounded-sm transition-all duration-500"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          )}

          {stage === "deleting" && (
            <motion.div
              key="deleting"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center gap-3 relative z-10"
            >
              <motion.svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </motion.svg>
              <span>Deleting...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {stage === "deleting" &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: particle.x,
                y: particle.y,
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
              className="absolute w-2 h-2 bg-red-500 rounded-full"
              style={{
                boxShadow: "0 0 10px rgba(255,0,0,0.5)",
              }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
