"use client";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

type Direction = "top" | "bottom" | "left" | "right";

const variants: Record<Direction, Variants> = {
  top: {
    hidden: { opacity: 0, y: -500, scale: 0.5 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 500, scale: 0.5, rotate: 30 },
  },
  bottom: {
    hidden: { opacity: 0, y: 500, scale: 0.5 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -500, scale: 0.5, rotate: -30 },
  },
  left: {
    hidden: { opacity: 0, x: -500, scale: 0.5 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 500, scale: 0.5, rotate: -30 },
  },
  right: {
    hidden: { opacity: 0, x: 500, scale: 0.5 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -500, scale: 0.5, rotate: 30 },
  },
};

export default function Popup2() {
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState<Direction>("top");

  const openPopup = (dir: Direction) => {
    setDirection(dir);
    setIsOpen(true);
  };

  const closePopup = () => setIsOpen(false);

  const directions: {
    dir: Direction;
    label: string;
    gradient: string;
    bg: string;
    borderColor: string;
    textColor: string;
  }[] = [
    {
      dir: "top",
      label: "Top",
      gradient: "from-green-500 to-teal-400",
      borderColor: "border-green-500/60",
      bg: "from-background via-background to-green-500/50",
      textColor: "text-green-500",
    },
    {
      dir: "bottom",
      label: "Bottom",
      gradient: "from-blue-500 to-cyan-400",
      borderColor: "border-blue-500/60",
      bg: "from-background via-background to-blue-500/50",
      textColor: "text-blue-500",
    },
    {
      dir: "left",
      label: "Left",
      gradient: "from-purple-500 to-violet-400",
      borderColor: "border-purple-500/60",
      bg: "from-background via-background to-purple-500/50",
      textColor: "text-purple-500",
    },
    {
      dir: "right",
      label: "Right",
      gradient: "from-rose-500 to-pink-400",
      borderColor: "border-pink-500/60",
      bg: "from-background via-background to-pink-500/50",
      textColor: "text-pink-500",
    },
  ];

  const currentDirection = directions.find((d) => d.dir === direction)!;

  return (
    <main className="flex flex-col items-center justify-center m-auto gap-6 p-6 sm:p-10 md:py-14 w-full h-full">
      <div className="grid grid-cols-2 gap-4 items-center justify-center m-auto">
        {directions.map(({ dir, label, gradient }) => (
          <Button
            key={dir}
            size="lg"
            onClick={() => openPopup(dir)}
            className={`p-6 cursor-pointer text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-500 bg-linear-to-tl ${gradient}`}
          >
            {label} Side
          </Button>
        ))}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center m-auto w-full"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className={`bg-linear-to-tr ${currentDirection.bg} backdrop-blur-[2px] border ${currentDirection.borderColor} rounded-lg shadow-xl/10 max-w-100! w-full p-6`}
              variants={variants[direction]}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2
                className={`text-sm md:text-base font-medium ${currentDirection.textColor} mb-2`}
              >
                Confirmation
              </h2>
              <p className="mt-2 mb-4 text-sm">
                Are you sure you want to proceed ?
                <br />
                <span className="block mt-2 text-sm">
                  <span>Direction -</span>{" "}
                  <span
                    className={`font-semibold ${currentDirection.textColor}`}
                  >
                    {direction.toUpperCase()}
                  </span>
                </span>
              </p>
              <div className="flex gap-4 text-sm md:text-base font-medium">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={closePopup}
                  className="flex-1 p-6 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  size="lg"
                  onClick={closePopup}
                  className={`flex-1 p-6 cursor-pointer bg-linear-to-tl ${currentDirection.gradient} text-white`}
                >
                  Confirm
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
