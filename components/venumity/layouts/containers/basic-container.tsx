"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Users } from "lucide-react";

interface StatsCard {
  id: number;
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

export default function BasicContainerLayout() {
  const stats: StatsCard[] = [
    {
      id: 1,
      label: "Active users",
      value: "12,847",
      change: "+12.5%",
      icon: <Users className="h-4 w-4" />,
      color: "from-sky-500 to-cyan-500",
    },
    {
      id: 2,
      label: "Performance",
      value: "99.8%",
      change: "+0.2%",
      icon: <Zap className="h-4 w-4" />,
      color: "from-emerald-500 to-green-500",
    },
    {
      id: 3,
      label: "Global reach",
      value: "186",
      change: "+24",
      icon: <Globe className="h-4 w-4" />,
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      id: 4,
      label: "Security score",
      value: "A+",
      change: "Perfect",
      icon: <Shield className="h-4 w-4" />,
      color: "from-amber-500 to-red-500",
    },
  ];

  const metrics = [75, 90, 60, 85];

  const activity = [
    { activity: "System update completed", time: "2 minutes ago" },
    { activity: "Security scan passed", time: "1 hour ago" },
    { activity: "New user registered", time: "3 hours ago" },
    { activity: "Backup successful", time: "5 hours ago" },
  ];

  return (
    <main className="relative flex flex-col gap-6 p-6 md:p-10 m-auto overflow-auto w-full h-full">
      {/* Header */}
      <header className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge
              variant="outline"
              className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]"
            >
              Premium
            </Badge>
            <span>Enterprise monitoring surface</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            My Dashboard
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            Enterprise-grade container with advanced metrics, real-time signals,
            and thoughtfully layered surfaces designed for high-focus workflows.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="secondary"
            className="hidden rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-500 md:inline-flex"
          >
            Live · Synchronized
          </Badge>
          <Button className="px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-300 hover:shadow-lg">
            Upgrade plan
          </Button>
        </div>
      </header>

      <Separator className="opacity-60" />

      {/* Stats Grid */}
      <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.id}
            className="group relative overflow-hidden border border-border/70 bg-card/80 transition-colors hover:border-primary/50"
          >
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-background via-background/40 to-background" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardDescription className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {stat.label}
                </CardDescription>
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  {stat.value}
                </CardTitle>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br ${stat.color} text-white shadow-sm`}
              >
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent className="relative pb-1">
              <div className="flex items-center justify-between text-xs">
                <Badge
                  variant="outline"
                  className="rounded-full border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-500"
                >
                  {stat.change}
                </Badge>
                <span className="text-[11px] text-muted-foreground">
                  vs. previous period
                </span>
              </div>
            </CardContent>
            <CardFooter className="relative pt-0 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span className="h-1 w-4 rounded-full bg-primary/60" />
                At-a-glance insight
              </span>
            </CardFooter>
          </Card>
        ))}
      </section>

      {/* Content Sections */}
      <section className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        {/* Performance overview */}
        <Card className="border border-border/70 bg-linear-to-br from-background/60 via-background to-background/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">
                Performance overview
              </CardTitle>
              <CardDescription className="text-xs">
                Key runtime metrics across your core services.
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]"
            >
              Real-time
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {metrics.map((value, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Metric {index + 1}
                  </span>
                  <span className="font-medium text-foreground">{value}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.9, delay: index * 0.1 }}
                    className={`h-full rounded-full ${
                      value >= 80
                        ? "bg-linear-to-r from-emerald-500 to-green-500"
                        : value >= 60
                          ? "bg-linear-to-r from-sky-500 to-cyan-500"
                          : "bg-linear-to-r from-amber-500 to-red-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-2 text-[11px] text-muted-foreground">
            <span>Updated in the last 60 seconds</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Healthy baseline
            </span>
          </CardFooter>
        </Card>

        {/* Recent activity */}
        <Card className="border border-border/70 bg-linear-to-br from-background/70 via-background to-background/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">
                Recent activity
              </CardTitle>
              <CardDescription className="text-xs">
                Latest events from your production stream.
              </CardDescription>
            </div>
            <Badge
              variant="secondary"
              className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary"
            >
              Last 6 hours
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {activity.map((item, index) => (
              <motion.div
                key={item.activity}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="flex items-center gap-3 rounded-lg bg-background/60 px-3 py-2 text-xs transition-colors hover:bg-background"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <div className="flex-1">
                  <p className="text-foreground">{item.activity}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {item.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-2 text-[11px] text-muted-foreground">
            <span>Noise filtered · critical only</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-[11px] font-medium"
            >
              View full log
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
