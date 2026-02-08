"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap, Sparkles } from "lucide-react";

export default function ProgressCirclePremium() {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsAnimating(false), 800);
          return 100;
        }
        return prev + 0.5;
      });
    }, 10);
    
    return () => clearInterval(interval);
  }, [isAnimating]);

  const startAnimation = () => {
    setIsAnimating(true);
    setProgress(0);
  };

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="space-y-10">
        <div className="relative w-72 h-72">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
            
            {/* Glow effect */}
            <circle
              cx="50"
              cy="50"
              r={radius + 4}
              strokeWidth="12"
              stroke="currentColor"
              className="text-amber-500/20 dark:text-amber-400/20"
              fill="none"
            />
            
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="8"
              stroke="currentColor"
              className="text-gray-100 dark:text-gray-800"
              fill="none"
            />
            
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="8"
              stroke="url(#premiumGradient)"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={isAnimating ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <Zap className="w-12 h-12 text-amber-500 dark:text-amber-400" />
            </motion.div>
            
            <span className="text-5xl font-bold bg-linear-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
              {Math.round(progress)}%
            </span>
            
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {isAnimating ? 'Processing...' : 'Premium Feature'}
            </p>
          </div>
          
          {isAnimating && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-linear-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 45}deg) translateX(60px)`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}
        </div>
        
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="relative bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-700 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl shadow-amber-500/30 dark:shadow-amber-600/30 disabled:opacity-90 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <div className="relative flex items-center justify-center gap-3">
            {isAnimating ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Activate Premium
                <Sparkles className="w-5 h-5" />
              </>
            )}
          </div>
        </button>
      </div>
    </motion.main>
  );
}