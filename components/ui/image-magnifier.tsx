"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageMagnifierProps {
  src: string;
  alt: string;
  className?: string;
  zoomLevel?: number;
}

export function ImageMagnifier({
  src,
  alt,
  className,
  zoomLevel = 2,
}: ImageMagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative">
        <Image
          src={src}
          alt={alt}
          width={2000}
          height={2000}
          priority
          className={cn(
            "cursor-zoom-in transition-all duration-300",
            className
          )}
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          onClick={() => setShowModal(true)}
        />

        {/* Magnifier Glass */}
        <div
          style={{
            display: showMagnifier ? "block" : "none",
            position: "absolute",
            pointerEvents: "none",
            height: "150px",
            width: "150px",
            top: `${y - 75}px`,
            left: `${x - 75}px`,
            border: "3px solid rgba(255, 160, 0, 0.8)",
            borderRadius: "50%",
            opacity: 1,
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-x * zoomLevel + 75}px`,
            backgroundPositionY: `${-y * zoomLevel + 75}px`,
            boxShadow: "0 0 20px rgba(255, 160, 0, 0.3)",
          }}
        />

        <button
          onClick={() => setShowModal(true)}
          className="absolute top-2 right-2 p-2 bg-background/80 rounded-lg backdrop-blur-sm hover:bg-background transition-colors"
        >
          <Maximize2 className="size-4" />
        </button>
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={2000}
                height={2000}
                priority
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <button
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                onClick={() => setShowModal(false)}
              >
                <Maximize2 className="size-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
