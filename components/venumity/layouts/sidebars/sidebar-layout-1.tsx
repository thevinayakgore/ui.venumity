"use client";
import { motion } from "framer-motion";
import {
  PanelLeft,
  GripVertical,
  Sparkles,
  Settings,
  Menu,
} from "lucide-react";

export default function SidebarLayout1() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-20 w-full h-full">
        {/* Variation 1: Basic Sidebar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <PanelLeft className="w-6 h-6 text-blue-400" />
            Basic Sidebar
          </h3>
          <div className="space-y-4">
            <BasicSidebarLayout position="left" />
            <BasicSidebarLayout position="right" />
            <BasicSidebarLayout position="top" />
          </div>
        </motion.div>

        {/* Variation 2: Collapsible Sidebar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Menu className="w-6 h-6 text-purple-400" />
            Collapsible
          </h3>
          <div className="space-y-4">
            <CollapsibleSidebarLayout state="expanded" />
            <CollapsibleSidebarLayout state="collapsed" />
            <CollapsibleSidebarLayout state="floating" />
          </div>
        </motion.div>

        {/* Variation 3: Animated Sidebar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-pink-400" />
            Animated
          </h3>
          <div className="space-y-4">
            <AnimatedSidebarLayout animation="slide" />
            <AnimatedSidebarLayout animation="fade" />
            <AnimatedSidebarLayout animation="scale" />
          </div>
        </motion.div>

        {/* Variation 4: Sticky Sidebar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <GripVertical className="w-6 h-6 text-green-400" />
            Sticky Sidebar
          </h3>
          <div className="space-y-4">
            <StickySidebarLayout behavior="always" />
            <StickySidebarLayout behavior="scroll" />
            <StickySidebarLayout behavior="hover" />
          </div>
        </motion.div>

        {/* Variation 5: Glass Sidebar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Settings className="w-6 h-6 text-cyan-400" />
            Glass Sidebar
          </h3>
          <div className="space-y-4">
            <GlassSidebarLayout intensity="light" />
            <GlassSidebarLayout intensity="medium" />
            <GlassSidebarLayout intensity="heavy" />
          </div>
        </motion.div>
      </div>
    </>
  );
}

// Sub-component 1: Basic Sidebar Layout
function BasicSidebarLayout({
  position = "left",
}: {
  position?: "left" | "right" | "top";
}) {
  const positions = {
    left: "flex-row",
    right: "flex-row-reverse",
    top: "flex-col",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30 p-4 ${positions[position]} flex gap-4`}
    >
      <div className="w-16 h-20 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full"></div>
        <div className="h-4 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full w-3/4"></div>
      </div>
    </motion.div>
  );
}

// Sub-component 2: Collapsible Sidebar Layout
function CollapsibleSidebarLayout({
  state = "expanded",
}: {
  state?: "expanded" | "collapsed" | "floating";
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 p-4 flex gap-4"
    >
      <motion.div
        animate={{
          width: state === "expanded" ? 96 : state === "collapsed" ? 32 : 64,
        }}
        className={`h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center`}
      >
        <Menu className="w-4 h-4 text-white" />
      </motion.div>
      <div className="flex-1">
        <div className="h-4 bg-white/20 rounded-full mb-2"></div>
        <div className="h-3 bg-white/20 rounded-full w-2/3"></div>
      </div>
    </motion.div>
  );
}

// Sub-component 3: Animated Sidebar Layout
function AnimatedSidebarLayout({
  animation = "slide",
}: {
  animation?: "slide" | "fade" | "scale";
}) {
  const animations = {
    slide: (
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-linear-to-br from-pink-500/20 to-rose-500/20 rounded-xl border border-pink-500/30 p-4 flex gap-4"
      >
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-20 bg-linear-to-br from-pink-500 to-rose-500 rounded-lg"
        ></motion.div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/20 rounded-full"></div>
          <div className="h-3 bg-white/20 rounded-full w-4/5"></div>
        </div>
      </motion.div>
    ),
    fade: (
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-linear-to-br from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30 p-4 flex gap-4"
      >
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-20 bg-linear-to-br from-orange-500 to-red-500 rounded-lg"
        ></motion.div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/20 rounded-full"></div>
          <div className="h-3 bg-white/20 rounded-full w-4/5"></div>
        </div>
      </motion.div>
    ),
    scale: (
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 p-4 flex gap-4"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg"
        ></motion.div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/20 rounded-full"></div>
          <div className="h-3 bg-white/20 rounded-full w-4/5"></div>
        </div>
      </motion.div>
    ),
  };

  return animations[animation];
}

// Sub-component 4: Sticky Sidebar Layout
function StickySidebarLayout({
  behavior = "always",
}: {
  behavior?: "always" | "scroll" | "hover";
}) {
  const behaviors = {
    always: "sticky top-0",
    scroll: "relative",
    hover: "hover:sticky",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 p-4 flex gap-4 ${behaviors[behavior]}`}
    >
      <div className="w-12 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-4 bg-white/20 rounded-full mb-2"></div>
        <div className="h-3 bg-white/20 rounded-full mb-1"></div>
        <div className="h-3 bg-white/20 rounded-full w-2/3"></div>
      </div>
    </motion.div>
  );
}

// Sub-component 5: Glass Sidebar Layout
function GlassSidebarLayout({
  intensity = "medium",
}: {
  intensity?: "light" | "medium" | "heavy";
}) {
  const intensities = {
    light: "bg-gray-800/20 backdrop-blur-sm",
    medium: "bg-gray-800/40 backdrop-blur-md",
    heavy: "bg-gray-800/60 backdrop-blur-lg",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-xl border border-white/10 p-4 flex gap-4 ${intensities[intensity]}`}
    >
      <div className="w-16 h-20 bg-linear-to-br from-cyan-500 to-blue-500 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-4 bg-white/30 rounded-full mb-2"></div>
        <div className="h-3 bg-white/30 rounded-full mb-1"></div>
        <div className="h-3 bg-white/30 rounded-full w-3/4"></div>
      </div>
    </motion.div>
  );
}

