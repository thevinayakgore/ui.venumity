"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Type, Zap, Sparkles, Waves, Clock } from "lucide-react";
import { useState } from "react";

interface AnimationEffect {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  duration: number;
}

const animationEffects: AnimationEffect[] = [
  {
    id: "fade",
    name: "Fade In",
    icon: <Sparkles className="w-4 h-4" />,
    description: "Text fades in smoothly",
    duration: 0.5,
  },
  {
    id: "slide",
    name: "Slide Up",
    icon: <Waves className="w-4 h-4" />,
    description: "Text slides up from below",
    duration: 0.7,
  },
  {
    id: "typewriter",
    name: "Typewriter",
    icon: <Type className="w-4 h-4" />,
    description: "Text appears character by character",
    duration: 2,
  },
  {
    id: "blur",
    name: "Blur Clear",
    icon: <Zap className="w-4 h-4" />,
    description: "Text clears from blurry state",
    duration: 0.8,
  },
  {
    id: "scale",
    name: "Scale Up",
    icon: <Sparkles className="w-4 h-4" />,
    description: "Text scales up from small",
    duration: 0.6,
  },
  {
    id: "stagger",
    name: "Word Stagger",
    icon: <Clock className="w-4 h-4" />,
    description: "Words appear one by one",
    duration: 1.5,
  },
];

const sampleParagraphs = [
  "Animation brings paragraphs to life, creating engaging reading experiences. When used thoughtfully, animations can guide attention and enhance storytelling.",
  "Text animations should be subtle and purposeful. They should enhance readability rather than distract from the content itself.",
  "Different animation effects serve different purposes. Some are best for page transitions, while others work well for highlighting key points.",
  "The key to effective text animation is timing. Animations should be fast enough to feel responsive but slow enough to be readable.",
];

export default function ParagraphAnimated() {
  const [selectedEffect, setSelectedEffect] = useState(0);
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [speed, setSpeed] = useState(1);

  const handleAnimate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), animationEffects[selectedEffect].duration * 1000);
  };

  const renderAnimatedParagraph = () => {
    const text = sampleParagraphs[paragraphIndex];
    const effect = animationEffects[selectedEffect];
    
    switch (effect.id) {
      case "fade":
        return (
          <motion.p
            key={`${paragraphIndex}-${selectedEffect}`}
            initial={{ opacity: 0 }}
            animate={isAnimating ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: effect.duration / speed }}
            className="text-gray-800 dark:text-gray-200 leading-relaxed"
          >
            {text}
          </motion.p>
        );
        
      case "slide":
        return (
          <motion.p
            key={`${paragraphIndex}-${selectedEffect}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimating ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: effect.duration / speed }}
            className="text-gray-800 dark:text-gray-200 leading-relaxed"
          >
            {text}
          </motion.p>
        );
        
      case "typewriter":
        return (
          <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
            {text.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={isAnimating ? { opacity: 1 } : { opacity: 1 }}
                transition={{
                  duration: 0.05,
                  delay: isAnimating ? index * 0.03 : 0,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        );
        
      case "blur":
        return (
          <motion.p
            key={`${paragraphIndex}-${selectedEffect}`}
            initial={{ filter: "blur(10px)", opacity: 0 }}
            animate={isAnimating ? { filter: "blur(0px)", opacity: 1 } : { filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: effect.duration / speed }}
            className="text-gray-800 dark:text-gray-200 leading-relaxed"
          >
            {text}
          </motion.p>
        );
        
      case "scale":
        return (
          <motion.p
            key={`${paragraphIndex}-${selectedEffect}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isAnimating ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
            transition={{ duration: effect.duration / speed }}
            className="text-gray-800 dark:text-gray-200 leading-relaxed"
          >
            {text}
          </motion.p>
        );
        
      case "stagger":
        return (
          <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
            {text.split(' ').map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isAnimating ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: isAnimating ? index * 0.1 : 0,
                }}
                className="inline-block mr-1"
              >
                {word}{' '}
              </motion.span>
            ))}
          </div>
        );
        
      default:
        return (
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
            {text}
          </p>
        );
    }
  };

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.6 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Animated Paragraphs
            </span>
          </div>

          {/* Animation Preview */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Animation Preview
              </h3>
              
              <div className="min-h-[120px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {renderAnimatedParagraph()}
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sample Text
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {paragraphIndex + 1} of {sampleParagraphs.length}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setParagraphIndex((prev) => (prev === 0 ? sampleParagraphs.length - 1 : prev - 1))}
                    className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={() => setParagraphIndex((prev) => (prev === sampleParagraphs.length - 1 ? 0 : prev + 1))}
                    className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Animation Speed
                  </span>
                  <span className="text-xs text-gray-500">
                    {speed === 0.5 ? "Slow" : speed === 1 ? "Normal" : "Fast"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.5"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                />
              </div>
            </div>
            
            <button
              onClick={handleAnimate}
              disabled={isAnimating}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-4 h-4" />
              {isAnimating ? "Animating..." : "Trigger Animation"}
            </button>
          </div>

          {/* Effect Selection */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Animation Effects
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {animationEffects.map((effect, index) => (
                <button
                  key={effect.id}
                  onClick={() => setSelectedEffect(index)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedEffect === index
                      ? "ring-2 ring-offset-2 ring-blue-500 border-transparent"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded ${
                      selectedEffect === index
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
                        : "bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                    }`}>
                      {effect.icon}
                    </div>
                    <span className={`text-sm font-medium ${
                      selectedEffect === index
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}>
                      {effect.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-left">
                    {effect.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {effect.duration}s
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < Math.ceil(effect.duration / 0.5)
                              ? "bg-blue-500"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Animation Properties */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Current Animation Properties
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Effect
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {animationEffects[selectedEffect].name}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Duration
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {(animationEffects[selectedEffect].duration / speed).toFixed(1)}s
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Speed
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {speed}x
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Status
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {isAnimating ? "Animating" : "Ready"}
                </p>
              </div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-4">
              Animation Best Practices
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Keep it Short
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Animations should be brief (under 1 second) to avoid delays
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Subtle Effects
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Use subtle animations that enhance rather than distract
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Zap className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Performance
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Use hardware-accelerated properties for smooth performance
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Type className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Readability
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Ensure animations do not interfere with text readability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}