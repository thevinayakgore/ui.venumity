"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

export const MagneticHoverButton = ({
  children,
  strength = 0.8,
  maxDistance = 100,
}: {
  children: React.ReactNode;
  strength?: number;
  maxDistance?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Mouse hover effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !ref.current) return;

    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    let x = (clientX - (left + width / 2)) * strength;
    let y = (clientY - (top + height / 2)) * strength;

    const distance = Math.hypot(x, y);
    if (distance > maxDistance) {
      const scale = maxDistance / distance;
      x *= scale;
      y *= scale;
    }

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setPosition({ x: 0, y: 0 });
    }
  };

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    // Calculate offset from mouse to element center
    setDragOffset({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
    setIsDragging(true);
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate new position relative to center of screen
    let newX = e.clientX - windowWidth / 2 - dragOffset.x;
    let newY = e.clientY - windowHeight / 2 - dragOffset.y;

    // Constrain to viewport bounds
    const elementWidth = rect.width;
    const elementHeight = rect.height;

    const maxX = windowWidth / 2 - elementWidth / 2;
    const maxY = windowHeight / 2 - elementHeight / 2;
    const minX = -windowWidth / 2 + elementWidth / 2;
    const minY = -windowHeight / 2 + elementHeight / 2;

    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));

    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Global mouse up handler
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging]);

  const hasMoved = position.x !== 0 || position.y !== 0;

  return (
    <div
      className="overflow-hidden w-full h-full"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleDragStart}
        className="rounded-full border border-dashed transition-all duration-500 [--show-color:var(--color-primary)]"
        style={{
          borderColor: hasMoved
            ? "color-mix(in srgb,var(--show-color) 60%, transparent)"
            : "transparent",
          backgroundColor: hasMoved
            ? "color-mix(in srgb,var(--show-color) 10%, transparent)"
            : "transparent",
          display: "inline-block",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          ref={ref}
          animate={{ x: position.x, y: position.y }}
          transition={
            isDragging
              ? { duration: 0 }
              : { type: "spring", stiffness: 150, damping: 25, mass: 0.1 }
          }
          style={{
            width: "fit-content",
            // touchAction: "none",
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default function MagneticButtonDemo() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <MagneticHoverButton>
        <button className="cursor-grab active:cursor-grabbing bg-linear-to-br from-primary to-yellow-400 px-6 py-4 font-semibold text-white ring-2 ring-background ring-offset-2 ring-offset-primary transition-transform duration-150 ring-inset active:scale-98 rounded-full select-none whitespace-nowrap">
          Follow @thevinayakgore
        </button>
      </MagneticHoverButton>
    </div>
  );
}
