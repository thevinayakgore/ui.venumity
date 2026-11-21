"use client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  Activity,
  Users,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

export default function StandardContainer() {
  return (
    <main className="relative flex flex-col gap-6 p-6 md:p-10 overflow-auto w-full h-full">
      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Badge
              variant="outline"
              className="rounded-full px-2 py-0.5 text-[10px]"
            >
              Overview
            </Badge>
            <span>Environment · Production</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Basic Container
          </h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            A focused surface for monitoring product health, recent activity,
            and key signals across your live environment.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge
            variant="secondary"
            className="rounded-full bg-primary/10 px-3 py-1 text-[11px] text-primary"
          >
            Live snapshot
          </Badge>
          <span className="flex items-center gap-1">
            Updated just now
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
        </div>
      </header>

      <Separator className="opacity-60" />

      {/* Top feature cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="border-dashed bg-muted/40 transition-colors hover:border-muted-foreground/40 hover:bg-muted/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Feature one</CardTitle>
            <CardDescription className="text-xs">
              Simple and clean feature description
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1 text-xs text-muted-foreground">
            Great for highlighting a primary capability, workflow, or
            integration your users should notice first.
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-3 text-xs">
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Activity className="h-3 w-3" />
              Always-on insight
            </span>
            <button className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
              View details
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </CardFooter>
        </Card>

        <Card className="border-dashed bg-muted/40 transition-colors hover:border-muted-foreground/40 hover:bg-muted/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Feature two</CardTitle>
            <CardDescription className="text-xs">
              Another essential feature point
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1 text-xs text-muted-foreground">
            Use this surface to describe secondary functionality, a new release,
            or upcoming changes in your system.
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-3 text-xs">
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <ArrowUpRight className="h-3 w-3" />
              Connected endpoints
            </span>
            <button className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
              Open docs
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </CardFooter>
        </Card>
      </section>

      {/* Stats + recent activity */}
      <section className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Key metrics */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="bg-background">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Active users</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <Users className="h-3.5 w-3.5" />
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-2xl font-semibold tracking-tight">
                  1,248
                </div>
              </CardContent>
              <CardFooter className="pt-0 text-xs text-emerald-500">
                ↑ 12.4% vs last week
              </CardFooter>
            </Card>

            <Card className="bg-background">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Monthly revenue</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/10 text-sky-500">
                    <DollarSign className="h-3.5 w-3.5" />
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-2xl font-semibold tracking-tight">
                  $32,540
                </div>
              </CardContent>
              <CardFooter className="pt-0 text-xs text-sky-500">
                ↑ 4.1% this month
              </CardFooter>
            </Card>

            <Card className="bg-background">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>System errors</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-2xl font-semibold tracking-tight">18</div>
              </CardContent>
              <CardFooter className="pt-0 text-xs text-red-500">
                ↓ 6 incidents today
              </CardFooter>
            </Card>
          </div>

          {/* Status chips */}
          <Card className="border-dashed bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Runtime status
              </CardTitle>
              <CardDescription className="text-xs">
                Quick signals from your production environment.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 pt-1">
              <Badge
                variant="outline"
                className="rounded-full bg-primary/10 px-3 py-1 text-[11px] text-primary"
              >
                Production
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-500"
              >
                Healthy
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full bg-sky-500/10 px-3 py-1 text-[11px] text-sky-500"
              >
                API v2
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground"
              >
                Stable
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Recent activity */}
        <Card className="flex h-full flex-col bg-muted/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Recent activity
            </CardTitle>
            <CardDescription className="text-xs">
              The latest events from your application stream.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ScrollArea className="h-full pr-2">
              <ul className="space-y-3 text-sm">
                <ActivityRow
                  label="User signup"
                  meta="2 min ago"
                  accent="emerald"
                />
                <ActivityRow
                  label="Payment processed"
                  meta="18 min ago"
                  accent="sky"
                />
                <ActivityRow
                  label="Deployment completed"
                  meta="1 hour ago"
                  accent="primary"
                />
                <ActivityRow
                  label="Server restart"
                  meta="Yesterday"
                  accent="amber"
                />
              </ul>
            </ScrollArea>
          </CardContent>
          <CardFooter className="mt-1 flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground">
            <span>Showing last 24 hours</span>
            <button className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
              View full log
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}

/* Inline helper – stays in same file */
function ActivityRow({
  label,
  meta,
  accent,
}: {
  label: string;
  meta: string;
  accent?: "emerald" | "sky" | "primary" | "amber";
}) {
  const accentClass =
    accent === "emerald"
      ? "bg-emerald-500"
      : accent === "sky"
        ? "bg-sky-500"
        : accent === "amber"
          ? "bg-amber-500"
          : "bg-primary";

  return (
    <li className="flex items-center justify-between rounded-md bg-background/60 px-3 py-2 text-xs">
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${accentClass}`} />
        <span className="font-medium text-foreground">{label}</span>
      </div>
      <span className="text-[11px] text-muted-foreground">{meta}</span>
    </li>
  );
}
