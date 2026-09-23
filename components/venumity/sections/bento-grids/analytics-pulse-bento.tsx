"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Zap,
  Globe,
  Users,
  Activity,
  BarChart3,
  LucideIcon,
  ArrowUpRight,
  MousePointerClick,
} from "lucide-react";

const revenueData = [
  { month: "Jan", value: 35 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 41 },
  { month: "Apr", value: 68 },
  { month: "May", value: 55 },
  { month: "Jun", value: 78 },
  { month: "Jul", value: 62 },
  { month: "Aug", value: 90 },
  { month: "Sep", value: 72 },
  { month: "Oct", value: 85 },
  { month: "Nov", value: 95 },
  { month: "Dec", value: 82 },
];

const activityItems = [
  {
    icon: Zap,
    color: "text-yellow-500 bg-yellow-500/10",
    text: "New deployment completed",
    meta: "production · 2m ago",
  },
  {
    icon: Users,
    color: "text-blue-500 bg-blue-500/10",
    text: "10 new signups",
    meta: "via landing page · 8m ago",
  },
];

const regions = [
  { name: "United States", value: 82, flag: "🇺🇸" },
  { name: "Germany", value: 64, flag: "🇩🇪" },
  { name: "India", value: 48, flag: "🇮🇳" },
];

const trafficData = [
  20, 35, 28, 45, 60, 75, 55, 90, 100, 82, 65, 48, 32, 22, 30, 45, 68, 85, 72,
  58,
];

function SectionBadge({
  icon: Icon,
  children,
  className,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        className,
      )}
    >
      <Icon className="size-3.5" />
      {children}
    </Badge>
  );
}

export default function AnalyticsPulseBento() {
  const [range, setRange] = useState<"Weekly" | "Monthly" | "Yearly">("Monthly");

  return (
    <div className="p-5 w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 lg:grid-rows-4 w-full">
        {/* Revenue */}
        <div className="group relative z-10 flex flex-col p-5 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 md:col-span-2 lg:col-span-4 lg:row-span-2 w-full h-fit">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-5">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                $48,293.00
              </h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-foreground/50">
                <span className="font-semibold text-green-500">+18.4%</span>
                <span>vs last week</span>
              </p>
            </div>

            <Tabs
              value={range}
              onValueChange={(value) => setRange(value as "Weekly" | "Monthly" | "Yearly")}
            >
              <TabsList className="p-1! bg-foreground/10! border border-background h-11! w-fit">
                <TabsTrigger
                  value="Weekly"
                  className="h-8.5 border-0! px-3! py-2! font-semibold data-active:bg-foreground! data-active:text-secondary!"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="Monthly"
                  className="h-8.5 border-0! px-3! py-2! font-semibold data-active:bg-foreground! data-active:text-secondary!"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="Yearly"
                  className="h-8.5 border-0! px-3! py-2! font-semibold data-active:bg-foreground! data-active:text-secondary!"
                >
                  Yearly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="relative p-5 pb-0! bg-background border border-foreground/15 shadow-lg/5 rounded-2xl overflow-hidden w-full h-90">
            <div className="relative z-10 flex items-end justify-between gap-2 h-full">
              {revenueData.map((item, index) => (
                <motion.div
                  key={item.month}
                  initial={{ height: 0 }}
                  animate={{ height: `${item.value}%` }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="group/bar relative w-full cursor-pointer rounded-t-lg bg-linear-to-t from-primary/30 via-primary/70 to-primary transition-all hover:from-primary/60 hover:to-primary"
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-[10px] font-bold text-secondary opacity-0 shadow-lg transition-opacity group-hover/bar:opacity-100">
                    ${item.value}k
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Active users */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 md:col-span-1 lg:col-span-2 lg:row-span-2 w-full h-full">
          <div className="flex items-start justify-between gap-3 p-5 pb-0! w-full">
            <div>
              <h2 className="text-lg font-semibold">Active Users</h2>
              <p className="mt-1 text-4xl font-semibold tracking-tight">
                12,847
              </p>
            </div>

            <span className="flex items-center gap-0.5 rounded-full bg-green-500/15 border border-green-500/40 px-2.5 py-1 text-xs font-semibold text-green-500">
              <ArrowUpRight className="size-3.5" />
              24%
            </span>
          </div>

          <div className="flex flex-1 items-center justify-center w-full">
            <div className="relative size-70">
              <svg
                className="absolute inset-3 -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="15"
                  className="text-foreground/10"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  initial={{ strokeDashoffset: 264 }}
                  animate={{ strokeDashoffset: 264 * 0.18 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  className="text-blue-500"
                />
              </svg>

              <svg
                className="absolute inset-15 -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="15"
                  className="text-foreground/10"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  initial={{ strokeDashoffset: 264 }}
                  animate={{ strokeDashoffset: 264 * 0.44 }}
                  transition={{
                    duration: 1.4,
                    delay: 0.3,
                    ease: "easeOut",
                  }}
                  className="text-purple-500"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-semibold tracking-tight">
                  82%
                </span>
                <span className="text-xs font-medium text-foreground/50">
                  Retention
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around p-5 border-t border-dashed border-foreground/10">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground/50">
              <span className="size-4 bg-blue-500 rounded-full" />
              Returning
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground/50">
              <span className="size-4 bg-purple-500 rounded-full" />
              New
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="flex min-h-40 flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 p-5 transition-shadow duration-500 hover:shadow-xl hover:shadow-green-500/5 sm:p-6 md:col-span-1 lg:col-span-2 lg:row-span-1">
          <div className="mb-5 flex items-center justify-between">
            <SectionBadge
              icon={Activity}
              className="border-green-500/20 bg-green-500/10 text-green-500"
            >
              Activity
            </SectionBadge>

            <span className="flex items-center gap-1.5 text-xs font-medium text-foreground/50">
              <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
              Live
            </span>
          </div>

          <div className="flex-1 space-y-4 overflow-hidden">
            {activityItems.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.08 }}
                className="flex items-start gap-3"
              >
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-xl",
                    item.color,
                  )}
                >
                  <item.icon className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.text}</p>
                  <p className="mt-0.5 text-xs text-foreground/45">
                    {item.meta}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <Button variant="ghost" size="sm" className="mt-4 w-full">
            View all activity
            <ArrowUpRight className="ml-1 size-3.5" />
          </Button>
        </div>

        {/* Conversion */}
        <div className="relative flex min-h-40 flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br from-orange-500 to-rose-500 p-5 text-white shadow-lg shadow-orange-500/15 transition-transform duration-500 hover:-translate-y-1 md:col-span-1 lg:col-span-2 lg:row-span-1">
          <div className="pointer-events-none absolute -bottom-10 -right-10 size-36 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10">
            <SectionBadge
              icon={MousePointerClick}
              className="mb-4 border-white/20 bg-white/15 text-white"
            >
              Conversion
            </SectionBadge>

            <p className="text-4xl font-semibold tracking-tighter">
              6.4<span className="text-2xl">%</span>
            </p>
            <p className="mt-1 text-sm font-medium text-white/80">
              Checkout rate
            </p>
          </div>

          <div className="relative z-10 mt-5 flex items-center justify-between">
            <span className="flex items-center gap-0.5 text-xs font-semibold text-white/85">
              <ArrowUpRight className="size-3.5" />
              +1.2% this week
            </span>

            <Button
              size="icon"
              className="size-8 rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Top regions */}
        <div className="flex min-h-40 flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 p-5 transition-shadow duration-500 hover:shadow-xl hover:shadow-indigo-500/5 md:col-span-1 lg:col-span-2 lg:row-span-1">
          <div className="mb-4 flex items-center justify-between">
            <SectionBadge
              icon={Globe}
              className="border-indigo-500/20 bg-indigo-500/10 text-indigo-600"
            >
              Top regions
            </SectionBadge>

            <span className="text-xs font-medium text-foreground/45">
              Last 7d
            </span>
          </div>

          <div className="space-y-3">
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="text-lg">{region.flag}</span>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-semibold">
                      {region.name}
                    </span>
                    <span className="text-xs font-medium text-foreground/50">
                      {region.value}%
                    </span>
                  </div>

                  <Progress
                    value={region.value}
                    className="h-1.5 bg-foreground/10"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Peak traffic */}
        <div className="flex max-h-25 flex-col gap-5 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5 p-5 transition-shadow duration-500 hover:shadow-xl md:col-span-2 lg:col-span-6 lg:row-span-1 md:flex-row md:items-center md:gap-8">
          <div className="flex shrink-0 items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BarChart3 className="size-6" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Peak Traffic Hour</h2>
              <p className="mt-0.5 text-sm text-foreground/50">
                Highest concurrent sessions in the past 24h
              </p>
            </div>
          </div>

          <div className="flex min-h-16 flex-1 items-end justify-center">
            <div className="flex h-16 w-full max-w-2xl items-end gap-1.5">
              {trafficData.map((height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${height * 0.55}px` }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.03,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "flex-1 rounded-t-md transition-colors",
                    height === 100
                      ? "bg-primary"
                      : "bg-primary/25 hover:bg-primary/60",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="shrink-0 md:text-right">
            <p className="text-3xl font-semibold tracking-tight">2:47 PM</p>
            <p className="text-xs font-medium text-foreground/50">
              2,847 sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
