"use client";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  Code2,
  Globe2,
  Layers3,
  LucideIcon,
  MousePointer2,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

const stats = [
  { label: "Components", value: "128", change: "+24%" },
  { label: "Downloads", value: "48.6K", change: "+18%" },
  { label: "Active users", value: "12.8K", change: "+32%" },
];

const features = [
  {
    icon: Palette,
    title: "Design system ready",
    description:
      "A flexible visual foundation built for fast, consistent product interfaces.",
    className: "lg:col-span-3",
    iconClass: "bg-pink-500/10 text-pink-500",
  },
  {
    icon: Code2,
    title: "Developer focused",
    description:
      "Typed, composable components that fit naturally into modern React projects.",
    className: "lg:col-span-3",
    iconClass: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Layers3,
    title: "Composable by default",
    description:
      "Combine primitives, layouts, and effects to create complete experiences.",
    className: "lg:col-span-2",
    iconClass: "bg-violet-500/10 text-violet-500",
  },
  {
    icon: Zap,
    title: "Built for speed",
    description:
      "Lightweight interactions and thoughtful motion without unnecessary complexity.",
    className: "lg:col-span-2",
    iconClass: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: Globe2,
    title: "Responsive everywhere",
    description:
      "Beautiful layouts that adapt from small screens to expansive dashboards.",
    className: "lg:col-span-2",
    iconClass: "bg-emerald-500/10 text-emerald-500",
  },
];

function MiniSparkline() {
  return (
    <div className="flex h-20 items-end gap-1.5">
      {[42, 56, 38, 70, 58, 78, 65, 92, 74, 100].map((height, index) => (
        <motion.span
          key={index}
          initial={{ height: 0 }}
          whileInView={{ height: `${height}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: index * 0.05,
            ease: "easeOut",
          }}
          className="flex-1 rounded-t-md bg-linear-to-t from-primary/20 to-primary"
        />
      ))}
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  iconClass,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClass: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "group relative min-h-52 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 p-6 transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/5",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-primary/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-2xl",
            iconClass,
          )}
        >
          <Icon className="size-5" />
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/55">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AuroraFeatureBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 p-5 w-full">
      {/* Hero card */}
      <motion.section
        variants={cardVariants}
        className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 p-6 md:col-span-2 lg:col-span-4 lg:row-span-2 lg:p-8"
      >
        <div className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-primary/20 blur-[8rem]" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full bg-violet-500/10 blur-[7rem]" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <Badge className="gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary hover:bg-primary/10">
              <Sparkles className="size-3.5" />
              Venumity UI
            </Badge>

            <Button
              size="icon"
              variant="ghost"
              className="rounded-full border border-foreground/10 bg-background/50"
            >
              <ArrowUpRight className="size-4" />
            </Button>
          </div>

          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium text-foreground/45">
              A better way to build interfaces
            </p>

            <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Build less.
              <br />
              <span className="bg-linear-to-r from-primary via-violet-500 to-pink-500 bg-clip-text text-transparent">
                Create more.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-foreground/55 sm:text-base">
              A modern collection of elegant React components, animated
              patterns, and production-ready interface blocks for ambitious
              digital products.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="group rounded-xl px-5">
                Explore components
                <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>

              <Button variant="outline" className="rounded-xl px-5">
                View documentation
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Live metric card */}
      <motion.section
        variants={cardVariants}
        className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 p-6 md:col-span-1 lg:col-span-2 lg:row-span-2"
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-violet-500/10" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground/50">
                Community growth
              </p>
              <p className="mt-2 text-5xl font-semibold tracking-tighter">
                84.8K
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
              <BarChart3 className="size-5" />
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between text-xs">
              <span className="text-foreground/45">Monthly activity</span>
              <span className="font-semibold text-emerald-600">+28.4%</span>
            </div>

            <MiniSparkline />

            <div className="mt-5 flex items-center justify-between border-t border-foreground/10 pt-4 text-xs text-foreground/45">
              <span>Jan 2026</span>
              <span>Dec 2026</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats row */}
      <motion.section
        variants={cardVariants}
        className="overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 p-5 md:col-span-2 lg:col-span-6"
      >
        <div className="grid grid-cols-1 divide-y divide-foreground/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "flex items-center justify-between px-2 py-4 sm:px-6",
                index === 0 && "sm:pl-2",
              )}
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/40">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {stat.value}
                </p>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                {stat.change}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Feature cards */}
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}

      {/* Interactive CTA card */}
      <motion.section
        variants={cardVariants}
        className="group relative min-h-52 overflow-hidden rounded-3xl bg-foreground p-6 text-secondary shadow-2xl shadow-foreground/10 transition-transform duration-500 lg:col-span-3"
      >
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/40 blur-3xl transition-transform duration-700 group-hover:scale-150" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary/10">
              <MousePointer2 className="size-5" />
            </div>

            <ArrowUpRight className="size-5 text-secondary/50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold tracking-tight">
              Find your next building block
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-secondary/55">
              Start with a polished foundation and make it yours in minutes.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Checklist card */}
      <motion.section
        variants={cardVariants}
        className="min-h-52 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 p-6 lg:col-span-3"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground/50">
              Ship faster
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">
              Everything is ready
            </h3>
          </div>

          <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <Check className="size-5" />
          </div>
        </div>

        <div className="space-y-3">
          {[
            "Accessible foundations",
            "Responsive by default",
            "Motion-ready interactions",
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-3 text-sm text-foreground/70"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="size-3" />
              </span>
              {item}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
