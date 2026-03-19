"use client";
import { motion, spring } from "framer-motion";
import { Zap, Globe, Code2, ArrowUpRight, ShieldCheck } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: spring, stiffness: 100, damping: 15 },
  },
};

export default function BentoGrid1() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 lg:grid-rows-3 gap-5 p-5 md:p-10 w-full h-full">
      {/* Card 1: Large Featured (Spans 2 cols, 2 rows) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 md:row-span-2 relative group rounded-2xl overflow-hidden hover:shadow-lg/10 transition-all duration-500"
      >
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-0 size-130 bg-blue-500/50 rounded-full blur-[10rem] -translate-y-1/2 -translate-x-1/3 pointer-events-none transition-all duration-500" />

        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
          <div>
            <h3 className="text-2xl font-medium mb-2">Automated Insights</h3>
            <p className="text-foreground/70 max-w-sm">
              Our AI continuously analyzes your traffic patterns to optimize
              delivery and catch anomalies before they affect users.
            </p>
          </div>

          {/* Interactive/Animated Graphic area */}
          <div className="relative h-70 w-full mt-6 rounded-xl bg-background overflow-hidden flex items-center justify-center">
            {/* Decorative Chart UI */}
            <div className="absolute inset-0 z-0 flex items-end justify-between px-6 pt-10 pb-4 gap-2">
              {[40, 70, 45, 90, 65, 85, 40, 100, 55, 75, 50].map((h, i) => (
                <div
                  key={i}
                  className="w-full bg-linear-to-b from-blue-500 via-blue-500/60 rounded-t-sm"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 z-20 bg-linear-to-l from-transparent via-blue-500 to-transparent h-0.5 w-full" />
          </div>
        </div>
      </motion.div>

      {/* Card 2: Tall Profile (Spans 1 col, 2 rows) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-1 md:row-span-2 relative group bg-accent dark:bg-card rounded-2xl hover:shadow-lg/10 flex flex-col overflow-hidden transition-all duration-500"
      >
        <div className="p-6 flex-1 flex flex-col w-full h-full">
          <ShieldCheck className="size-10 text-yellow-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">Enterprise Security</h3>
          <p className="text-sm text-foreground/70 mb-8">
            Bank-grade encryption, DDoS protection, and automated threat
            mitigation built right in this.
          </p>

          {/* Vertical Graphic */}
          <div className="mt-auto relative flex-1 z-30 max-h-fit! -mb-20 group-hover:-translate-y-20 p-5 w-full rounded-t-xl bg-linear-to-b from-yellow-400/60 to-transparent backdrop-blur flex flex-col items-center justify-center gap-3 transition-all duration-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 bg-background rounded-sm shadow-sm flex items-center px-3 gap-2 w-full"
              >
                <div
                  className="size-3! shrink-0 rounded-full bg-yellow-400 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
                <div className="h-3 bg-foreground/10 rounded-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Card 3: Standard Square (Top Right) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-1 md:row-span-1 relative group bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/20 p-6 flex flex-col justify-between text-white transition-all duration-500"
      >
        <div className="absolute -top-20 -right-20 p-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 group-hover:text-white size-60 group-hover:size-70 transition-all duration-500">
          <Zap className="stroke-1 fill-yellow-400! transition-all duration-500 w-full h-full" />
        </div>
        <div className="relative z-10">
          <h3 className="text-5xl font-medium tracking-tighter mb-1">
            99.9 <span className="text-2xl">%</span>
          </h3>
          <p className="text-sm font-medium">Guaranteed Uptime</p>
        </div>
        <div className="relative z-10 flex items-end justify-between mt-auto w-full h-full">
          <span className="text-sm">View Status</span>
          <div className="size-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer duration-500">
            <ArrowUpRight className="size-5" />
          </div>
        </div>
      </motion.div>

      {/* Card 4: Standard Square (Middle Right) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-1 md:row-span-1 relative group bg-linear-to-b from-accent dark:from-card to-transparent rounded-2xl overflow-hidden hover:shadow-lg/10 p-6 flex flex-col justify-center items-center text-center transition-all duration-500"
      >
        <div className="absolute inset-0 -top-5 bg-[radial-gradient(#1f2937_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[15px_15px] opacity-30 mask-[linear-gradient(to_bottom,white,transparent)]" />

        <div className="relative z-10">
          <div className="w-12 h-12 mx-auto bg-foreground/10 backdrop-blur-lg rounded-xl flex items-center justify-center mb-4 group-hover:-translate-y-1 group-hover:-rotate-12 group-hover:scale-120 transition-all duration-500">
            <Code2 className="size-5" />
          </div>
          <h3 className="text-lg font-medium mb-2">Developer First</h3>
          <p className="text-sm text-foreground/70">
            Robust APIs and native SDKs for every major framework.
          </p>
        </div>
      </motion.div>

      {/* Card 5: Wide Bottom Left (Spans 2 cols) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-1 md:row-span-1 relative group bg-linear-to-t from-green-500/50 via-green-500/20 hover:shadow-lg/10 rounded-b-2xl overflow-hidden p-6 flex items-start transition-all duration-500"
      >
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-semibold mb-6 border border-green-500/70 shadow-lg shadow-green-500/20">
            <Globe size={12} /> Global Edge Network
          </div>
          <h3 className="text-2xl font-medium mb-2">Deploy everywhere.</h3>
          <p className="text-foreground/70 text-sm">
            Push your code to 300+ edge locations worldwide in milliseconds.
            Closer to your users, faster for everyone.
          </p>
        </div>
      </motion.div>

      {/* Card 6: Wide Bottom Right (Spans 2 cols) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-3 md:row-span-1 relative group bg-card border rounded-2xl overflow-hidden hover:shadow-lg/10 p-4 flex flex-col transition-all duration-500"
      >
        <div className="flex flex-col md:flex-row gap-4 items-start w-full h-full">
          {/* Terminal Mockup */}
          <div className="bg-accent dark:bg-background rounded-xl p-4 border transition-all duration-500 md:w-1/2 w-full h-full">
            <div className="flex gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <div className="font-mono text-xs text-foreground/50 space-y-1.5">
              <p>
                <span className="text-green-500">~</span> npm install
                @platform/sdk
              </p>
              <p>Setting up project...</p>
              <p>Installing dependencies...</p>
              <p>Almost done...</p>
              <p className="text-green-500">🎉 Success ! Ready to build.</p>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-medium mb-2">CLI Magic</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Manage your entire infrastructure right from your terminal. No
              context switching required. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Eligendi vel et, doloremque
              molestiae unde officia totam doloribus voluptates aspernatur natus
              a odio. Maiores animi quae alias reiciendis, ipsa eveniet
              quisquam. Lorem ipsum dolor consectetur.
            </p>
            <button className="text-sm cursor-pointer font-semibold text-indigo-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
              Read Documentation <ArrowUpRight className="size-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
