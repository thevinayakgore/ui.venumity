"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Sparkles,
  Crown,
  Gem,
  Award,
  Target,
  Star,
  Shield,
  Zap,
  ChevronRight,
} from "lucide-react";

export default function PremiumContainer() {
  return (
    <main className="relative p-6 md:p-10 overflow-auto m-auto w-full h-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f4f4f4_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f4_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-size-[100px_100px]" />

      {/* Premium header */}
      <div className="flex flex-col items-center text-center mb-8 md:mb-16">
        {/* Crown icon with glow */}
        <motion.div
          className="relative mb-16"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-full blur-3xl opacity-80 animate-pulse" />
          <div className="relative size-24 md:size-28 rounded-full bg-linear-to-br from-yellow-400 via-amber-500 to-yellow-600 flex items-center justify-center shadow-2xl shadow-yellow-500/50 ring-10 ring-yellow-400/50 dark:ring-yellow-400/90 ring-offset-5 ring-offset-white">
            <Crown
              className="size-12 md:size-14 text-white"
              strokeWidth={2.5}
            />
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-4 md:space-y-6"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="size-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400">
              ELITE MEMBERSHIP
            </span>
            <Star className="size-4 text-yellow-400 fill-yellow-400" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-linear-to-tl from-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
              Luxury Executive
            </span>
            <br />
            <span className="bg-linear-to-tl from-foreground/50 via-foreground/30 bg-clip-text text-transparent">
              Suite
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl opacity-50 max-w-3xl">
            Experience the pinnacle of excellence with our exclusive premium
            offering. Unparalleled luxury, superior performance, and bespoke
            design elements.
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-0.5 w-40 bg-linear-to-r from-transparent via-yellow-400 to-transparent" />
            <Gem className="size-7 text-yellow-400" />
            <div className="h-0.5 w-40 bg-linear-to-r from-transparent via-yellow-400 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Premium features grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-16 m-auto max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {[
          {
            icon: <Gem className="size-7 md:size-8" />,
            title: "Diamond Grade Security",
            description:
              "Military-grade encryption with multi-layer protection and zero-knowledge architecture",
            color: "from-sky-300 to-blue-500",
            shadowColor: "shadow-blue-500/30",
            delay: 0.7,
          },
          {
            icon: <Award className="size-7 md:size-8" />,
            title: "Award Winning Support",
            description:
              "24/7 VIP concierge service with dedicated account managers and instant response",
            color: "from-purple-300 to-pink-500",
            shadowColor: "shadow-purple-500/30",
            delay: 0.8,
          },
          {
            icon: <Target className="size-7 md:size-8" />,
            title: "Precision Analytics",
            description:
              "AI-powered insights with real-time monitoring and predictive intelligence and unlimited scaling",
            color: "from-emerald-300 to-green-500",
            shadowColor: "shadow-emerald-500/30",
            delay: 0.9,
          },
          {
            icon: <Zap className="size-7 md:size-8" />,
            title: "Exclusive Features",
            description:
              "Priority access to beta features, custom integrations, and unlimited scaling and unlimited scaling",
            color: "from-yellow-300 to-primary",
            shadowColor: "shadow-amber-500/30",
            delay: 1.0,
          },
        ].map((feature, index) => (
          <div
            key={index}
            className={`group relative rounded-2xl overflow-hidden bg-linear-to-br ${feature.color} text-white p-6 md:p-10 hover:shadow-xl ${feature.shadowColor} transition-all duration-500`}
          >
            {/* Icon container */}
            <div className="mb-5">{feature.icon}</div>

            <h3 className="text-xl md:text-2xl font-bold">{feature.title}</h3>
            <p className="text-sm md:text-base">{feature.description}</p>
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2 + index * 2.546,
              }}
            />
          </div>
        ))}
      </motion.div>

      {/* Luxury CTA Section */}
      <div className="flex flex-col items-center gap-16 w-full">
        {/* Primary CTA */}
        <motion.div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-yellow-400 opacity-40 group-hover:opacity-70 blur-xl transition-all duration-500" />

          <Button className="relative w-full h-auto py-5 md:py-6 px-8 bg-linear-to-tl from-primary to-yellow-400 text-white cursor-pointer font-bold text-base md:text-lg rounded-xl overflow-hidden group border-0 transition-all duration-300">
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-white/0 via-white/30 to-white/0"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            <span className="relative z-10 flex items-center justify-center gap-5">
              <Crown className="size-6 group-hover:-rotate-5 group-hover:scale-180 transition-all duration-500" />
              Request Exclusive Access
              <ChevronRight className="size-6 group-hover:translate-x-5 transition-all duration-500" />
            </span>
          </Button>
        </motion.div>

        {/* Secondary info */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span>By invitation only</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-700" />
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-yellow-500" />
            <span>Limited availability</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-700" />
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-yellow-500" />
            <span>Premium experience guaranteed</span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-3 w-full">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="size-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>
    </main>
  );
}
