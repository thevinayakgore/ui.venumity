"use client";
import { motion } from "framer-motion";
import { Box } from "lucide-react";

// Alignment Flex Layout
function SpacingFlexBox({
  spacing = "normal",
}: {
  spacing?: "tight" | "normal" | "loose";
}) {
  const spacings = {
    tight: "gap-5",
    normal: "gap-10",
    loose: "gap-15",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-card rounded-md border p-6 flex gap-6 hover:scale-105 transition-all duration-500 ${spacings[spacing]}`}
    >
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="size-16 p-2 bg-green-500 text-white rounded-sm flex items-center justify-center"
        >
          <Box className="w-full h-full" />
        </div>
      ))}
    </motion.div>
  );
}

export default function AlignmentFlexBoxLayout() {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-2 items-start justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
      >
        <SpacingFlexBox spacing="tight" />
        <SpacingFlexBox spacing="normal" />
        <SpacingFlexBox spacing="loose" />
      </motion.main>
    </>
  );
}
