"use client";
import { motion } from "framer-motion";
import { RotateCw, Zap, Palette, Box } from "lucide-react";
import { useState } from "react";

interface ThreeDTypographyProps {
  text: string;
}

const effects = [
  { id: "depth", name: "Depth", description: "3D perspective effect" },
  { id: "shadow", name: "Shadow", description: "Floating shadow effect" },
  { id: "neon", name: "Neon", description: "Glowing neon effect" },
  { id: "gradient", name: "Gradient", description: "3D gradient effect" },
];

const colors = [
  { name: "Blue", class: "text-blue-500", shadow: "shadow-blue-500/50" },
  { name: "Purple", class: "text-purple-500", shadow: "shadow-purple-500/50" },
  {
    name: "Emerald",
    class: "text-emerald-500",
    shadow: "shadow-emerald-500/50",
  },
  { name: "Rose", class: "text-rose-500", shadow: "shadow-rose-500/50" },
];

export default function CustomTypographyThreeD({
  text = "3D TYPOGRAPHY",
}: ThreeDTypographyProps) {
  const [selectedEffect, setSelectedEffect] = useState("depth");
  const [selectedColor, setSelectedColor] = useState(0);
  const [rotation, setRotation] = useState({ x: 20, y: 20 });
  const [depth, setDepth] = useState(5);
  const [isRotating, setIsRotating] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRotating) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 20;
    const rotateX = ((centerY - y) / centerY) * 20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    if (!isRotating) {
      setRotation({ x: 20, y: 20 });
    }
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
    if (!isRotating) {
      setRotation({ x: 20, y: 20 });
    }
  };

  const renderText = () => {
    const colorClass = colors[selectedColor].class;

    switch (selectedEffect) {
      case "depth":
        return (
          <div className="relative">
            {[...Array(depth)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute ${colorClass} font-black`}
                style={{
                  transform: `translateZ(${-i * 2}px)`,
                  opacity: 1 - i * 0.15,
                  transformStyle: "preserve-3d",
                }}
                animate={
                  isRotating
                    ? {
                        rotateX: rotation.x + 360,
                        rotateY: rotation.y + 360,
                      }
                    : {
                        rotateX: rotation.x,
                        rotateY: rotation.y,
                      }
                }
                transition={
                  isRotating
                    ? {
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }
                    : { type: "spring", stiffness: 100 }
                }
              >
                <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-widest">
                  {text}
                </div>
              </motion.div>
            ))}
            <motion.div
              className={`${colorClass} font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-widest relative z-10`}
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={
                isRotating
                  ? {
                      rotateX: rotation.x + 360,
                      rotateY: rotation.y + 360,
                    }
                  : {
                      rotateX: rotation.x,
                      rotateY: rotation.y,
                    }
              }
              transition={
                isRotating
                  ? {
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }
                  : { type: "spring", stiffness: 100 }
              }
            >
              {text}
            </motion.div>
          </div>
        );

      case "shadow":
        return (
          <motion.div
            className={`relative ${colorClass} font-black`}
            animate={
              isRotating
                ? {
                    rotateX: 360,
                    rotateY: 360,
                  }
                : {
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                  }
            }
            transition={
              isRotating
                ? {
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }
                : { type: "spring", stiffness: 100 }
            }
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-widest relative z-10">
              {text}
            </div>
            <motion.div
              className={`absolute inset-0 ${colorClass} opacity-30 blur-lg`}
              animate={{
                y: [0, 10, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {text}
            </motion.div>
          </motion.div>
        );

      case "neon":
        return (
          <motion.div
            className={`relative ${colorClass} font-black`}
            animate={
              isRotating
                ? {
                    rotateX: 360,
                    rotateY: 360,
                  }
                : {
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                  }
            }
            transition={
              isRotating
                ? {
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }
                : { type: "spring", stiffness: 100 }
            }
            style={{
              transformStyle: "preserve-3d",
              textShadow: `0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor`,
            }}
          >
            <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-widest">
              {text}
            </div>
            <motion.div
              className="absolute inset-0"
              animate={{
                textShadow: [
                  "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
                  "0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor",
                  "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              {text}
            </motion.div>
          </motion.div>
        );

      case "gradient":
        return (
          <motion.div
            className="relative font-black"
            animate={
              isRotating
                ? {
                    rotateX: 360,
                    rotateY: 360,
                  }
                : {
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                  }
            }
            transition={
              isRotating
                ? {
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }
                : { type: "spring", stiffness: 100 }
            }
            style={{
              transformStyle: "preserve-3d",
              background: `linear-gradient(45deg, ${colorClass}, ${
                colors[(selectedColor + 1) % colors.length].class
              })`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <motion.div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-widest">
              {text}
            </motion.div>
          </motion.div>
        );

      default:
        return <div>{text}</div>;
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-5xl">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Box className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              3D Typography
            </h2>
          </div>

          {/* Interactive 3D Text */}
          <div
            className="w-full min-h-[300px] flex items-center justify-center cursor-pointer perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {renderText()}
          </div>

          {/* Controls */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Effect Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  3D Effects
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {effects.map((effect) => (
                  <button
                    key={effect.id}
                    onClick={() => setSelectedEffect(effect.id)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedEffect === effect.id
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                        : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <span
                      className={`block font-medium mb-1 ${
                        selectedEffect === effect.id
                          ? "text-blue-700 dark:text-blue-300"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {effect.name}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {effect.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color and Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Controls
                  </h3>
                </div>

                <button
                  onClick={toggleRotation}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                    isRotating
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <RotateCw className="w-4 h-4" />
                  {isRotating ? "Stop Rotation" : "Auto Rotate"}
                </button>
              </div>

              <div className="space-y-4">
                {/* Color Selection */}
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </p>
                  <div className="flex gap-2">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === index
                            ? "border-gray-900 dark:border-white scale-110"
                            : "border-gray-300 dark:border-gray-600 hover:scale-105"
                        }`}
                        style={{
                          backgroundColor: color.class
                            .replace("text-", "")
                            .split("-")[1],
                        }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Depth Control */}
                {selectedEffect === "depth" && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Depth: {depth} layers
                      </p>
                      <span className="text-xs text-gray-500">
                        {depth * 2}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={depth}
                      onChange={(e) => setDepth(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
