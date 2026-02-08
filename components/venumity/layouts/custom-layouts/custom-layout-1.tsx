"use client";
import { motion } from "framer-motion";
import {
  Sliders,
  Sparkles,
  Zap,
  Wand2,
  Layers,
  Puzzle,
  GitBranch,
  Cpu,
} from "lucide-react";

export default function CustomLayout1() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-violet-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4"
          >
            Custom Layout
          </motion.h1>
          <p className="text-xl text-gray-300">
            Highly customizable layout components with unique designs
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {/* Variation 1: Modular Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Puzzle className="w-6 h-6 text-violet-400" />
              Modular Layout
            </h3>
            <div className="space-y-4">
              <ModularCustomLayout type="grid" />
              <ModularCustomLayout type="stack" />
              <ModularCustomLayout type="split" />
            </div>
          </motion.div>

          {/* Variation 2: Dynamic Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Sliders className="w-6 h-6 text-blue-400" />
              Dynamic Layout
            </h3>
            <div className="space-y-4">
              <DynamicCustomLayout mode="resizable" />
              <DynamicCustomLayout mode="draggable" />
              <DynamicCustomLayout mode="collapsible" />
            </div>
          </motion.div>

          {/* Variation 3: Creative Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Wand2 className="w-6 h-6 text-purple-400" />
              Creative Layout
            </h3>
            <div className="space-y-4">
              <CreativeCustomLayout style="asymmetric" />
              <CreativeCustomLayout style="overlapping" />
              <CreativeCustomLayout style="floating" />
            </div>
          </motion.div>

          {/* Variation 4: Animated Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-pink-400" />
              Animated Layout
            </h3>
            <div className="space-y-4">
              <AnimatedCustomLayout animation="morph" />
              <AnimatedCustomLayout animation="flow" />
              <AnimatedCustomLayout animation="particles" />
            </div>
          </motion.div>

          {/* Variation 5: Adaptive Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Cpu className="w-6 h-6 text-cyan-400" />
              Adaptive Layout
            </h3>
            <div className="space-y-4">
              <AdaptiveCustomLayout behavior="responsive" />
              <AdaptiveCustomLayout behavior="fluid" />
              <AdaptiveCustomLayout behavior="elastic" />
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
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Custom Layout Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CustomLayoutExample1 />
            <CustomLayoutExample2 />
            <CustomLayoutExample3 />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Sub-component 1: Modular Custom Layout
function ModularCustomLayout({
  type = "grid",
}: {
  type?: "grid" | "stack" | "split";
}) {
  const layouts = {
    grid: (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-br from-violet-500/20 to-fuchsia-500/20 rounded-xl border border-violet-500/30 p-4"
      >
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-violet-500/30 rounded-lg"
            ></div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Puzzle className="w-4 h-4 text-violet-400" />
          <span className="text-xs text-white font-semibold">Grid Modular</span>
        </div>
      </motion.div>
    ),
    stack: (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30 p-4"
      >
        <div className="space-y-1 mb-3">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="h-6 bg-blue-500/30 rounded-lg"
              style={{ marginLeft: `${i * 8}px` }}
            ></motion.div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-white font-semibold">
            Stack Modular
          </span>
        </div>
      </motion.div>
    ),
    split: (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 p-4"
      >
        <div className="flex gap-2 mb-3">
          <div className="flex-1 h-16 bg-purple-500/30 rounded-lg"></div>
          <div className="flex-1 h-16 bg-pink-500/30 rounded-lg"></div>
        </div>
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-white font-semibold">
            Split Modular
          </span>
        </div>
      </motion.div>
    ),
  };

  return layouts[type];
}

// Sub-component 2: Dynamic Custom Layout
function DynamicCustomLayout({
  mode = "resizable",
}: {
  mode?: "resizable" | "draggable" | "collapsible";
}) {
  const modes = {
    resizable: (
      <motion.div
        whileHover={{ scale: 1.03 }}
        drag
        dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
        className="bg-linear-to-br from-teal-500/20 to-emerald-500/20 rounded-xl border border-teal-500/30 p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
          </div>
          <Sliders className="w-4 h-4 text-teal-400" />
        </div>
        <div className="h-4 bg-white/20 rounded-full mb-2"></div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-white font-semibold">Resizable</span>
          <motion.div
            animate={{ width: ["50%", "80%", "50%"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-1 bg-teal-400 rounded-full w-1/2"
          ></motion.div>
        </div>
      </motion.div>
    ),
    draggable: (
      <motion.div
        whileHover={{ scale: 1.03 }}
        drag
        dragElastic={0.2}
        className="bg-linear-to-br from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30 p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-orange-400 rounded-full border border-white/20"
              ></div>
            ))}
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sliders className="w-4 h-4 text-orange-400" />
          </motion.div>
        </div>
        <div className="text-center">
          <span className="text-xs text-white font-semibold">Drag Me</span>
          <p className="text-xs text-orange-300 mt-1">Interactive element</p>
        </div>
      </motion.div>
    ),
    collapsible: (
      <motion.div
        whileHover={{ scale: 1.03 }}
        animate={{ height: ["60px", "40px", "60px"] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="bg-linear-to-br from-yellow-500/20 to-amber-500/20 rounded-xl border border-yellow-500/30 p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-yellow-400 rounded-full"></div>
            <span className="text-xs text-white font-semibold">
              Collapsible
            </span>
          </div>
          <Sliders className="w-4 h-4 text-yellow-400" />
        </div>
      </motion.div>
    ),
  };

  return modes[mode];
}

// Sub-component 3: Creative Custom Layout
function CreativeCustomLayout({
  style = "asymmetric",
}: {
  style?: "asymmetric" | "overlapping" | "floating";
}) {
  const styles = {
    asymmetric: (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-br from-fuchsia-500/20 to-rose-500/20 rounded-xl border border-fuchsia-500/30 p-4"
      >
        <div className="grid grid-cols-3 gap-1 mb-3">
          <div className="h-8 bg-fuchsia-500/40 rounded-lg col-span-2"></div>
          <div className="h-8 bg-rose-500/40 rounded-lg row-span-2"></div>
          <div className="h-8 bg-fuchsia-500/40 rounded-lg"></div>
          <div className="h-8 bg-rose-500/40 rounded-lg col-span-2"></div>
        </div>
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-fuchsia-400" />
          <span className="text-xs text-white font-semibold">Asymmetric</span>
        </div>
      </motion.div>
    ),
    overlapping: (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30 p-4"
      >
        <div className="relative h-16 mb-3">
          <div className="absolute inset-0 bg-indigo-500/40 rounded-lg"></div>
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-4 bg-purple-500/40 rounded-lg"
          ></motion.div>
          <motion.div
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-8 bg-pink-500/40 rounded-lg"
          ></motion.div>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="text-xs text-white font-semibold">Overlapping</span>
        </div>
      </motion.div>
    ),
    floating: (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 p-4"
      >
        <div className="relative h-16 mb-3">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute left-4 top-2 w-8 h-8 bg-cyan-500/40 rounded-lg"
          ></motion.div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
            className="absolute right-6 top-4 w-6 h-6 bg-blue-500/40 rounded-lg"
          ></motion.div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
            className="absolute left-8 bottom-2 w-10 h-4 bg-cyan-500/40 rounded-lg"
          ></motion.div>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-white font-semibold">Floating</span>
        </div>
      </motion.div>
    ),
  };

  return styles[style];
}

// Sub-component 4: Animated Custom Layout
function AnimatedCustomLayout({
  animation = "morph",
}: {
  animation?: "morph" | "flow" | "particles";
}) {
  const animations = {
    morph: (
      <motion.div
        whileHover={{ scale: 1.03 }}
        animate={{ borderRadius: ["20%", "50%", "20%"] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="bg-linear-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 p-4"
      >
        <div className="flex items-center justify-center h-12 mb-3">
          <motion.div
            animate={{ borderRadius: ["20%", "50%", "20%"], rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-8 h-8 bg-linear-to-br from-pink-500 to-rose-500"
          ></motion.div>
        </div>
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-pink-400" />
          <span className="text-xs text-white font-semibold">Morphing</span>
        </div>
      </motion.div>
    ),
    flow: (
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 p-4"
      >
        <div className="h-12 mb-3 overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-1 bg-linear-to-r from-transparent via-green-400 to-transparent"
          ></motion.div>
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            }}
            className="w-full h-1 bg-linear-to-r from-transparent via-emerald-400 to-transparent mt-4"
          ></motion.div>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-green-400" />
          <span className="text-xs text-white font-semibold">Flow Lines</span>
        </div>
      </motion.div>
    ),
    particles: (
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-linear-to-br from-violet-500/20 to-purple-500/20 rounded-xl border border-violet-500/30 p-4"
      >
        <div className="relative h-12 mb-3 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: ["0%", "100%", "0%"],
                x: [
                  `${(i % 4) * 25}%`,
                  `${(i % 4) * 25 + 10}%`,
                  `${(i % 4) * 25}%`,
                ],
              }}
              transition={{
                duration: 2 + (i % 3) * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="absolute w-2 h-2 bg-violet-400 rounded-full"
            ></motion.div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-xs text-white font-semibold">Particles</span>
        </div>
      </motion.div>
    ),
  };

  return animations[animation];
}

// Sub-component 5: Adaptive Custom Layout
function AdaptiveCustomLayout({
  behavior = "responsive",
}: {
  behavior?: "responsive" | "fluid" | "elastic";
}) {
  const behaviors = {
    responsive: (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 p-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-linear-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xs text-white font-semibold block">
              Responsive
            </span>
            <span className="text-xs text-cyan-300">Adapts to screen size</span>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex-1 h-2 bg-white/20 rounded-full"></div>
          <div className="flex-1 h-2 bg-white/20 rounded-full"></div>
          <div className="flex-1 h-2 bg-white/20 rounded-full"></div>
        </div>
      </motion.div>
    ),
    fluid: (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-br from-teal-500/20 to-emerald-500/20 rounded-xl border border-teal-500/30 p-4"
      >
        <div className="mb-3">
          <motion.div
            animate={{ width: ["60%", "90%", "60%"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="h-3 bg-linear-to-r from-teal-400 to-emerald-400 rounded-full"
          ></motion.div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-teal-400" />
            <span className="text-xs text-white font-semibold">Fluid</span>
          </div>
          <span className="text-xs text-teal-300">Flexible</span>
        </div>
      </motion.div>
    ),
    elastic: (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/30 p-4"
      >
        <div className="mb-3">
          <motion.div
            animate={{ scaleX: [0.7, 1.3, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-3 bg-linear-to-r from-amber-400 to-orange-400 rounded-full origin-left"
          ></motion.div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-white font-semibold">Elastic</span>
          </div>
          <span className="text-xs text-amber-300">Stretchy</span>
        </div>
      </motion.div>
    ),
  };

  return behaviors[behavior];
}

// Live Example Components
function CustomLayoutExample1() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-linear-to-br from-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm rounded-2xl p-6 border border-violet-500/30"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
          <Puzzle className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-semibold text-white">Modular Dashboard</p>
          <p className="text-sm text-violet-300">Drag & drop modules</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-4 bg-white/20 rounded-full"></div>
        <div className="h-4 bg-white/20 rounded-full"></div>
        <div className="h-8 bg-white/10 rounded-lg col-span-2"></div>
      </div>
    </motion.div>
  );
}

function CustomLayoutExample2() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      drag
      dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
      className="bg-linear-to-br from-teal-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-teal-500/30"
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 bg-linear-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center"
        >
          <Sliders className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <p className="font-semibold text-white">Dynamic Panel</p>
          <p className="text-sm text-teal-300">Interactive controls</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-2 bg-white/20 rounded-full"></div>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
          <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
}

function CustomLayoutExample3() {
  return (
    <motion.div
      animate={{ borderRadius: ["20px", "40px", "20px"] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="bg-linear-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-sm border border-pink-500/30 p-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          animate={{ borderRadius: ["20%", "50%", "20%"] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-12 h-12 bg-linear-to-br from-pink-500 to-rose-500 flex items-center justify-center"
        >
          <Wand2 className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <p className="font-semibold text-white">Creative Canvas</p>
          <p className="text-sm text-pink-300">Morphing layout</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="h-6 bg-white/20 rounded-lg"></div>
        <div className="h-6 bg-white/20 rounded-lg col-span-2"></div>
        <div className="h-6 bg-white/20 rounded-lg col-span-2"></div>
        <div className="h-6 bg-white/20 rounded-lg"></div>
      </div>
    </motion.div>
  );
}
