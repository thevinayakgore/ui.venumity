"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Zap,
  Globe,
  Users,
  Activity,
  LucideIcon,
  ArrowUpRight,
  MousePointerClick,
  ChartNoAxesColumn,
} from "lucide-react";

const viewsData = [
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

const followersData = [
  { month: "Jan", value: 28 },
  { month: "Feb", value: 44 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 57 },
  { month: "May", value: 64 },
  { month: "Jun", value: 72 },
  { month: "Jul", value: 68 },
  { month: "Aug", value: 84 },
  { month: "Sep", value: 79 },
  { month: "Oct", value: 91 },
  { month: "Nov", value: 97 },
  { month: "Dec", value: 88 },
];

const followingData = [
  { month: "Jan", value: 18 },
  { month: "Feb", value: 26 },
  { month: "Mar", value: 34 },
  { month: "Apr", value: 31 },
  { month: "May", value: 45 },
  { month: "Jun", value: 50 },
  { month: "Jul", value: 58 },
  { month: "Aug", value: 54 },
  { month: "Sep", value: 67 },
  { month: "Oct", value: 73 },
  { month: "Nov", value: 81 },
  { month: "Dec", value: 76 },
];

const activityItems = [
  {
    icon: Zap,
    color: "bg-yellow-500",
    text: "New deployment completed",
    meta: "production · 2m ago",
  },
  {
    icon: Users,
    color: "bg-blue-500",
    text: "10 new signups",
    meta: "via landing page · 8m ago",
  },
];

const regions = [
  { name: "India", value: 84, flag: "🇮🇳" },
  { name: "Germany", value: 64, flag: "🇩🇪" },
  { name: "United States", value: 28, flag: "🇺🇸" },
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
        "gap-2 pl-3 pr-4.5 py-5 text-sm font-semibold [&>svg]:size-5! rounded-lg",
        className,
      )}
    >
      <Icon />
      {children}
    </Badge>
  );
}

export default function AnalyticsStatsBento() {
  const [range, setRange] = useState<"Views" | "Followers" | "Following">(
    "Followers",
  );

  const chartData =
    range === "Views"
      ? viewsData
      : range === "Followers"
        ? followersData
        : followingData;

  return (
    <div className="p-5 w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 w-full">
        {/* Performance */}
        <div className="group relative z-10 md:col-span-2 lg:col-span-4 flex flex-col bg-foreground/5 border border-foreground/15 hover:shadow-xl/10 transition-all duration-500 rounded-3xl overflow-hidden w-full h-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-5">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                {range === "Views"
                  ? "48,293"
                  : range === "Followers"
                    ? "12,847"
                    : "8,426"}
              </h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm">
                <span className="font-semibold text-green-500">+18.4%</span>
                <span>vs last week</span>
              </p>
            </div>

            <Tabs
              value={range}
              onValueChange={(value) =>
                setRange(value as "Views" | "Followers" | "Following")
              }
            >
              <TabsList className="p-1! bg-background! h-10.5!">
                <TabsTrigger
                  value="Views"
                  className="h-8.5 border-0! px-3! py-2! font-semibold data-active:bg-pink-500! data-active:text-white!"
                >
                  Views
                </TabsTrigger>
                <TabsTrigger
                  value="Followers"
                  className="h-8.5 border-0! px-3! py-2! font-semibold data-active:bg-pink-500! data-active:text-white!"
                >
                  Followers
                </TabsTrigger>
                <TabsTrigger
                  value="Following"
                  className="h-8.5 border-0! px-3! py-2! font-semibold data-active:bg-pink-500! data-active:text-white!"
                >
                  Following
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="relative px-5 w-full h-full">
            <div className="relative z-10 flex items-end justify-between gap-2 h-full">
              {chartData.map((item, index) => (
                <motion.div
                  key={`${range}-${item.month}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${item.value}%` }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="group/bar relative cursor-pointer bg-pink-500 rounded-t-lg w-full"
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-md bg-foreground px-2.5 py-1.5 text-xs font-mono font-semibold uppercase tracking-tight text-secondary opacity-0 shadow-lg transition-opacity group-hover/bar:opacity-100 md:text-sm">
                    <span>{item.month}</span>
                    <span>{item.value}K</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Active users */}
        <div className="group relative z-10 md:col-span-1 lg:col-span-2 p-5 flex flex-col bg-foreground/5 border border-foreground/15 hover:shadow-xl/10 transition-all duration-500 rounded-3xl overflow-hidden w-full h-full">
          <div className="flex items-start justify-between gap-3 w-full">
            <div>
              <h2 className="text-lg font-semibold">Active Users</h2>
              <p className="mt-1 text-3xl md:text-5xl font-semibold tracking-tight">
                12,847
              </p>
            </div>

            <span className="flex items-center gap-0.5 px-3 py-1.5 bg-blue-500 text-xs font-semibold text-white ring-4 ring-background rounded-full">
              <ArrowUpRight className="size-3.5" />
              24%
            </span>
          </div>

          <div className="flex items-center justify-center m-auto w-full h-full">
            <div className="relative size-90">
              <Tooltip>
                <TooltipTrigger asChild>
                  <svg
                    className="absolute inset-0 z-10 -rotate-90"
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
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-blue-500" />
                    <span>Returning: 82%</span>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <svg
                    className="absolute inset-16 z-20 -rotate-90"
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
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-purple-500" />
                    <span>New: 18%</span>
                  </div>
                </TooltipContent>
              </Tooltip>

              <div className="absolute inset-0 z-0 flex flex-col items-center justify-center">
                <span className="text-3xl md:text-5xl leading-none font-semibold tracking-tight">
                  82%
                </span>
                <span className="text-xs md:text-sm lg:text-base font-mono tracking-wider uppercase">
                  Retention
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="group relative z-10 md:col-span-1 lg:col-span-2 p-5 flex flex-col bg-foreground/5 border border-foreground/15 hover:shadow-xl/10 transition-all duration-500 rounded-3xl overflow-hidden w-full h-full">
          <SectionBadge
            icon={Activity}
            className="border-0! bg-teal-500 text-white"
          >
            Activity
          </SectionBadge>

          <div className="flex-1 space-y-3 mt-5 mb-3 overflow-hidden">
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
                    "flex size-10 shrink-0 items-center justify-center text-white rounded-md",
                    item.color,
                  )}
                >
                  <item.icon className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.text}</p>
                  <p className="mt-0.5 text-xs font-medium tracking-wide text-foreground/50">
                    {item.meta}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <Button className="p-5! bg-foreground! text-secondary! font-semibold rounded-lg ml-auto w-fit">
            View all activity
            <ArrowUpRight />
          </Button>
        </div>

        {/* Conversion */}
        <div className="group relative z-10 md:col-span-1 lg:col-span-2 p-5 flex flex-col bg-linear-to-br from-orange-600 via-primary to-yellow-500 text-white hover:shadow-xl/10 transition-all duration-500 rounded-3xl overflow-hidden w-full h-full">
          <div className="relative z-10">
            <SectionBadge
              icon={MousePointerClick}
              className="mb-4 border-white/20 bg-white/15 text-white"
            >
              Conversion
            </SectionBadge>

            <p className="text-5xl lg:text-7xl font-bold tracking-tighter">
              6.4
              <span className="text-2xl md:text-4xl leading-none ml-3">%</span>
            </p>
            <p className="mt-1 text-sm md:txet-base font-semibold">
              Checkout Rate
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between mt-auto w-full">
            <span className="flex items-center gap-2 text-sm md:text-base font-semibold">
              <ArrowUpRight className="size-6" />
              +1.2% this week
            </span>

            <Button
              size="icon"
              className="size-10 bg-white! text-black! border-[1.5px] border-transparent ring-2 ring-white rounded-full"
            >
              <ArrowUpRight className="size-5" />
            </Button>
          </div>
        </div>

        {/* Top regions */}
        <div className="group relative z-10 md:col-span-1 lg:col-span-2 p-5 flex flex-col gap-5 bg-foreground/5 border border-foreground/15 hover:shadow-xl/10 transition-all duration-500 rounded-3xl overflow-hidden w-full h-full">
          <SectionBadge
            icon={Globe}
            className="border-0! bg-indigo-500 text-white"
          >
            Top regions
          </SectionBadge>

          <div className="space-y-4 overflow-auto w-full h-full">
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="text-xl md:text-3xl leading-none">
                  {region.flag}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span className="truncate text-xs md:text-base font-semibold">
                      {region.name}
                    </span>
                    <span className="text-xs md:text-sm font-medium text-foreground/60">
                      {region.value}%
                    </span>
                  </div>

                  <Progress
                    value={region.value}
                    className="h-2 bg-foreground/10 **:data-[slot='progress-indicator']:bg-indigo-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Peak traffic */}
        <div className="group relative z-10 md:col-span-2 lg:col-span-6 flex flex-col bg-background border border-foreground/15 hover:shadow-xl/10 transition-all duration-500 rounded-3xl overflow-hidden w-full h-full">
          <div className="absolute bottom-0 left-0 z-0 bg-linear-to-t from-green-500/40 via-green-500/15 to-transparent w-full h-full" />
          <div className="relative z-20 flex items-center justify-between p-5 w-full">
            <div className="flex shrink-0 items-center gap-5">
              <div className="flex size-15 items-center justify-center bg-green-500 text-white shadow-xl/5 rounded-lg">
                <ChartNoAxesColumn className="size-8" />
              </div>

              <div>
                <h2 className="text-lg md:text-xl font-semibold">
                  Peak Traffic Hour
                </h2>
                <p className="text-sm text-foreground/60">
                  Highest concurrent sessions in the past 24h
                </p>
              </div>
            </div>
            <div className="shrink-0 md:text-right">
              <p className="text-3xl font-semibold tracking-tight">2:47 PM</p>
              <p className="text-xs md:text-sm font-medium text-foreground/60">
                2,847 sessions
              </p>
            </div>
          </div>

          <div className="relative z-20 flex items-end px-5 md:px-8 gap-1.5 w-full h-40">
            {trafficData.map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height * 1.5}px` }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.03,
                  ease: "easeOut",
                }}
                className={cn(
                  "flex-1 cursor-pointer transition-all duration-500 rounded-t-lg",
                  height === 100
                    ? "bg-green-500"
                    : "bg-green-500/20 hover:bg-green-500",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
