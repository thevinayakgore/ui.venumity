"use client";
import { motion } from "framer-motion";
import { Split, Columns, GitMerge, Sparkles, GripVertical } from "lucide-react";

export default function SplitLayout1() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-orange-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4"
          >
            Split Layout
          </motion.h1>
          <p className="text-xl text-gray-300">
            Divided layouts with flexible ratios and interactions
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {/* Variation 1: Basic Split */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Split className="w-6 h-6 text-orange-400" />
              Basic Split
            </h3>
            <div className="space-y-4">
              <BasicSplitLayout ratio="50-50" />
              <BasicSplitLayout ratio="30-70" />
              <BasicSplitLayout ratio="70-30" />
            </div>
          </motion.div>

          {/* Variation 2: Vertical Split */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Columns className="w-6 h-6 text-blue-400" />
              Vertical Split
            </h3>
            <div className="space-y-4">
              <VerticalSplitLayout columns={2} />
              <VerticalSplitLayout columns={3} />
              <VerticalSplitLayout columns={4} />
            </div>
          </motion.div>

          {/* Variation 3: Animated Split */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-400" />
              Animated Split
            </h3>
            <div className="space-y-4">
              <AnimatedSplitLayout animation="slide" />
              <AnimatedSplitLayout animation="fade" />
              <AnimatedSplitLayout animation="resize" />
            </div>
          </motion.div>

          {/* Variation 4: Draggable Split */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <GripVertical className="w-6 h-6 text-green-400" />
              Draggable Split
            </h3>
            <div className="space-y-4">
              <DraggableSplitLayout handle="visible" />
              <DraggableSplitLayout handle="hidden" />
              <DraggableSplitLayout handle="animated" />
            </div>
          </motion.div>

          {/* Variation 5: Responsive Split */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <GitMerge className="w-6 h-6 text-cyan-400" />
              Responsive Split
            </h3>
            <div className="space-y-4">
              <ResponsiveSplitLayout behavior="stack" />
              <ResponsiveSplitLayout behavior="collapse" />
              <ResponsiveSplitLayout behavior="reorder" />
            </div>
          </motion.div>
        </div>

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Split Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SplitLayoutExample1 />
            <SplitLayoutExample2 />
            <SplitLayoutExample3 />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Sub-component 1: Basic Split Layout
function BasicSplitLayout({ ratio = "50-50" }: { ratio?: "50-50" | "30-70" | "70-30" }) {
  const ratios = {
    "50-50": ["1/2", "1/2"],
    "30-70": ["30%", "70%"],
    "70-30": ["70%", "30%"]
  };

  const [left, right] = ratios[ratio];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-linear-to-br from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30 p-4 flex gap-4"
    >
      <div className={`bg-linear-to-br from-orange-500 to-red-500 rounded-lg`} style={{ width: left }}></div>
      <div className={`bg-linear-to-br from-orange-600 to-red-600 rounded-lg`} style={{ width: right }}></div>
    </motion.div>
  );
}

// Sub-component 2: Vertical Split Layout
function VerticalSplitLayout({ columns = 3 }: { columns?: 2 | 3 | 4 }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30 p-4 grid grid-cols-${columns} gap-4`}
    >
      {[...Array(columns)].map((_, i) => (
        <div key={i} className="h-20 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg"></div>
      ))}
    </motion.div>
  );
}

// Sub-component 3: Animated Split Layout
function AnimatedSplitLayout({ animation = "slide" }: { animation?: "slide" | "fade" | "resize" }) {
  const animations = {
    slide: (
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 p-4 flex gap-4"
      >
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex-1 h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg"
        ></motion.div>
        <div className="flex-1 h-20 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg"></div>
      </motion.div>
    ),
    fade: (
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 p-4 flex gap-4"
      >
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex-1 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg"
        ></motion.div>
        <div className="flex-1 h-20 bg-linear-to-br from-green-600 to-emerald-600 rounded-lg"></div>
      </motion.div>
    ),
    resize: (
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 p-4 flex gap-4"
      >
        <motion.div
          animate={{ flex: [1, 2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="h-20 bg-linear-to-br from-cyan-500 to-blue-500 rounded-lg"
        ></motion.div>
        <div className="flex-1 h-20 bg-linear-to-br from-cyan-600 to-blue-600 rounded-lg"></div>
      </motion.div>
    )
  };

  return animations[animation];
}

// Sub-component 4: Draggable Split Layout
function DraggableSplitLayout({ handle = "visible" }: { handle?: "visible" | "hidden" | "animated" }) {
  const handles = {
    visible: (
      <motion.div
        drag="x"
        dragConstraints={{ left: -20, right: 20 }}
        className="bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 p-4 flex gap-4"
      >
        <div className="flex-1 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg"></div>
        <div className="w-2 bg-green-400 rounded-full cursor-col-resize"></div>
        <div className="flex-1 h-20 bg-linear-to-br from-green-600 to-emerald-600 rounded-lg"></div>
      </motion.div>
    ),
    hidden: (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 p-4 flex gap-4"
      >
        <div className="flex-1 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg"></div>
        <div className="w-1 bg-transparent"></div>
        <div className="flex-1 h-20 bg-linear-to-br from-green-600 to-emerald-600 rounded-lg"></div>
      </motion.div>
    ),
    animated: (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 p-4 flex gap-4"
      >
        <div className="flex-1 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg"></div>
        <motion.div
          animate={{ scaleX: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-1 bg-green-400 rounded-full"
        ></motion.div>
        <div className="flex-1 h-20 bg-linear-to-br from-green-600 to-emerald-600 rounded-lg"></div>
      </motion.div>
    )
  };

  return handles[handle];
}

// Sub-component 5: Responsive Split Layout
function ResponsiveSplitLayout({ behavior = "stack" }: { behavior?: "stack" | "collapse" | "reorder" }) {
  const behaviors = {
    stack: "flex-col sm:flex-row",
    collapse: "flex-row lg:flex-col",
    reorder: "flex-col lg:flex-row lg:flex-row-reverse"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 p-4 ${behaviors[behavior]} flex gap-4`}
    >
      <div className="flex-1 h-16 bg-linear-to-br from-cyan-500 to-blue-500 rounded-lg"></div>
      <div className="flex-1 h-16 bg-linear-to-br from-cyan-600 to-blue-600 rounded-lg"></div>
    </motion.div>
  );
}

// Live Example Components
function SplitLayoutExample1() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-linear-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
          <Split className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-semibold text-white">Code Editor</p>
          <p className="text-sm text-orange-300">Split view</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1 h-32 bg-linear-to-br from-orange-500 to-red-500 rounded-lg"></div>
        <div className="flex-1 h-32 bg-linear-to-br from-orange-600 to-red-600 rounded-lg"></div>
      </div>
    </motion.div>
  );
}

function SplitLayoutExample2() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-linear-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30"
    >
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <p className="font-semibold text-white">Animated Split</p>
          <p className="text-sm text-purple-300">Dynamic sections</p>
        </div>
      </div>
      <div className="flex gap-4">
        <motion.div
          animate={{ flex: [1, 2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="h-24 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg"
        ></motion.div>
        <div className="flex-1 h-24 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg"></div>
      </div>
    </motion.div>
  );
}

function SplitLayoutExample3() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-linear-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
          <GripVertical className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-semibold text-white">Draggable Panels</p>
          <p className="text-sm text-green-300">Adjustable split</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1 h-32 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg"></div>
        <div className="w-2 bg-green-400 rounded-full cursor-col-resize"></div>
        <div className="flex-1 h-32 bg-linear-to-br from-green-600 to-emerald-600 rounded-lg"></div>
      </div>
    </motion.div>
  );
}