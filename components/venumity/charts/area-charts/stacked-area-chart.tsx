"use client";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Monitor,
  RotateCcw,
  Smartphone,
  Tablet,
  TrendingUp,
  Users2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  desktop: { label: "Desktop", color: "#06b6d4" },
  mobile: { label: "Mobile", color: "#a855f7" },
  tablet: { label: "Tablet", color: "#10b981" },
} satisfies ChartConfig;

const data = [
  { name: "Jan", desktop: 4000, mobile: 2400, tablet: 1200 },
  { name: "Feb", desktop: 3000, mobile: 1398, tablet: 900 },
  { name: "Mar", desktop: 2000, mobile: 9800, tablet: 1500 },
  { name: "Apr", desktop: 2780, mobile: 3908, tablet: 2100 },
  { name: "May", desktop: 1890, mobile: 4800, tablet: 1800 },
  { name: "Jun", desktop: 2390, mobile: 3800, tablet: 2200 },
  { name: "Jul", desktop: 3490, mobile: 4300, tablet: 2500 },
];

type DeviceFilter = "all" | "desktop" | "mobile" | "tablet";
type SortFilter = "default" | "highest" | "lowest";
type DeviceKey = "desktop" | "mobile" | "tablet";
type DeviceDataItem = (typeof data)[number];

interface TooltipPayloadItem {
  dataKey?: string;
  name?: string;
  value?: number;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const deviceColors: Record<DeviceKey, string> = {
  desktop: "#06b6d4",
  mobile: "#a855f7",
  tablet: "#10b981",
};

const deviceLabels: Record<DeviceKey, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  tablet: "Tablet",
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function formatCompactNumber(value: number) {
  return `${(value / 1000).toFixed(1)}K`;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const total = payload.reduce(
    (sum, entry) => sum + (typeof entry.value === "number" ? entry.value : 0),
    0,
  );

  return (
    <div className="min-w-52 rounded-lg border border-border/60 bg-background p-3 shadow-lg">
      <p className="mb-3 border-b border-dashed border-foreground/15 pb-2 text-sm font-semibold md:text-base">
        {label}
      </p>
      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const key = (entry.dataKey ?? entry.name ?? "") as DeviceKey;
          const color = deviceColors[key] ?? entry.color ?? "#94a3b8";
          const name = deviceLabels[key] ?? entry.name ?? "Device";

          return (
            <div
              key={`${key}-${index}`}
              className="flex items-center justify-between gap-5 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block size-3.5 shrink-0 rounded"
                  style={{ backgroundColor: color }}
                />
                <span className="text-foreground/60">{name}</span>
              </div>
              <span className="font-semibold">
                {formatNumber(entry.value ?? 0)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between border-t pt-2 text-sm font-bold">
        <span>Total</span>
        <span>{formatNumber(total)}</span>
      </div>
    </div>
  );
}

function getDeviceValue(item: DeviceDataItem, device: DeviceFilter) {
  if (device === "all") return item.desktop + item.mobile + item.tablet;
  return item[device];
}

export default function StackedAreaChart() {
  const [device, setDevice] = useState<DeviceFilter>("all");
  const [sort, setSort] = useState<SortFilter>("default");

  const visibleDevices = useMemo<DeviceKey[]>(
    () => (device === "all" ? ["tablet", "mobile", "desktop"] : [device]),
    [device],
  );

  const filteredData = useMemo(() => {
    const result = [...data];

    if (sort === "highest")
      result.sort(
        (a, b) => getDeviceValue(b, device) - getDeviceValue(a, device),
      );
    if (sort === "lowest")
      result.sort(
        (a, b) => getDeviceValue(a, device) - getDeviceValue(b, device),
      );

    return result;
  }, [device, sort]);

  const totals = useMemo(
    () => ({
      desktop: filteredData.reduce((sum, item) => sum + item.desktop, 0),
      mobile: filteredData.reduce((sum, item) => sum + item.mobile, 0),
      tablet: filteredData.reduce((sum, item) => sum + item.tablet, 0),
    }),
    [filteredData],
  );

  const grandTotal = totals.desktop + totals.mobile + totals.tablet;
  const selectedTotal = visibleDevices.reduce(
    (sum, key) => sum + totals[key],
    0,
  );

  const peakMonth = filteredData.reduce(
    (best, item) => {
      const value = visibleDevices.reduce((sum, key) => sum + item[key], 0);
      return value > best.value ? { name: item.name, value } : best;
    },
    { name: "—", value: 0 },
  );

  const averageMonthly = filteredData.length
    ? selectedTotal / filteredData.length
    : 0;
  const dominantDevice = (
    Object.entries(totals) as [DeviceKey, number][]
  ).reduce(
    (best, [key, value]) => (value > best.value ? { key, value } : best),
    { key: "desktop" as DeviceKey, value: 0 },
  );

  const hasActiveFilters = device !== "all" || sort !== "default";

  function resetFilters() {
    setDevice("all");
    setSort("default");
  }

  return (
    <div className="p-5 w-full">
      <div className="flex flex-col border rounded-2xl overflow-hidden w-full">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b bg-foreground/5 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full">
              <h1 className="text-2xl font-semibold">Device Traffic Stack</h1>
              <p className="mt-1 text-sm text-foreground/50 md:text-base">
                Stacked area chart showing device distribution across 2026
              </p>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              <Select
                value={device}
                onValueChange={(value) => setDevice(value as DeviceFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Select device" />
                </SelectTrigger>
                <SelectContent className="p-1">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    All devices
                  </SelectItem>
                  <SelectItem
                    value="desktop"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Desktop focus
                  </SelectItem>
                  <SelectItem
                    value="mobile"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Mobile focus
                  </SelectItem>
                  <SelectItem
                    value="tablet"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Tablet focus
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sort}
                onValueChange={(value) => setSort(value as SortFilter)}
              >
                <SelectTrigger className="h-11! w-full rounded-lg border-foreground/10! bg-foreground/5! px-3 py-2">
                  <SelectValue placeholder="Sort months" />
                </SelectTrigger>
                <SelectContent className="p-1">
                  <SelectItem
                    value="default"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Default order
                  </SelectItem>
                  <SelectItem
                    value="highest"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Highest first
                  </SelectItem>
                  <SelectItem
                    value="lowest"
                    className="cursor-pointer hover:bg-foreground/10!"
                  >
                    Lowest first
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant="outline"
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className="h-11! rounded-lg"
              >
                <RotateCcw />
                Reset
              </Button>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/50">
              <span>
                Showing {filteredData.length} of {data.length} months
              </span>
              {device !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Device: {deviceLabels[device]}
                </Badge>
              )}
              {sort !== "default" && (
                <Badge
                  variant="outline"
                  className="bg-foreground/5! px-3! py-3.5!"
                >
                  Sort: {sort === "highest" ? "Highest first" : "Lowest first"}
                </Badge>
              )}
            </div>
          )}
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-4 md:p-8">
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingUp className="size-4 text-cyan-500" />
              <span className="text-sm">Peak Month</span>
            </div>
            <div className="text-xl font-medium">{peakMonth.name}</div>
            <div className="text-sm text-foreground/50">
              {formatNumber(peakMonth.value)} sessions
            </div>
          </div>
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Users2 className="size-4 text-purple-500" />
              <span className="text-sm">Selected Total</span>
            </div>
            <div className="text-xl font-medium">
              {formatCompactNumber(selectedTotal)}
            </div>
            <div className="text-sm text-foreground/50">Selected devices</div>
          </div>
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <TrendingUp className="size-4 text-green-500" />
              <span className="text-sm">Monthly Average</span>
            </div>
            <div className="text-xl font-medium">
              {formatNumber(Math.round(averageMonthly))}
            </div>
            <div className="text-sm text-foreground/50">Per month</div>
          </div>
          <div className="rounded-xl border bg-foreground/5 p-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/50">
              <Monitor className="size-4" />
              <span className="text-sm">Dominant Device</span>
            </div>
            <div className="text-xl font-medium">
              {deviceLabels[dominantDevice.key]}
            </div>
            <div className="text-sm text-foreground/50">
              {grandTotal
                ? ((dominantDevice.value / grandTotal) * 100).toFixed(1)
                : 0}
              % of traffic
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-100 w-full px-5 md:px-8">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              accessibilityLayer
              data={filteredData}
              margin={{ top: 10, right: 0, left: -10, bottom: 10 }}
            >
              <defs>
                <linearGradient
                  id="desktopGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="mobileGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="tabletGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => `${value / 1000}K`}
              />
              <Tooltip
                cursor={{ stroke: "currentColor", strokeOpacity: 0.15 }}
                content={<CustomTooltip />}
              />
              {visibleDevices.includes("tablet") && (
                <Area
                  type="monotone"
                  dataKey="tablet"
                  name="Tablet"
                  stackId="1"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#tabletGradient)"
                  animationDuration={1000}
                />
              )}
              {visibleDevices.includes("mobile") && (
                <Area
                  type="monotone"
                  dataKey="mobile"
                  name="Mobile"
                  stackId="1"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fill="url(#mobileGradient)"
                  animationDuration={1000}
                  animationBegin={150}
                />
              )}
              {visibleDevices.includes("desktop") && (
                <Area
                  type="monotone"
                  dataKey="desktop"
                  name="Desktop"
                  stackId="1"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="url(#desktopGradient)"
                  animationDuration={1000}
                  animationBegin={300}
                />
              )}
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Device Summary */}
        <div className="grid grid-cols-1 gap-3 border-t p-5 md:grid-cols-3 md:p-8">
          {(["desktop", "mobile", "tablet"] as DeviceKey[])
            .filter((key) => visibleDevices.includes(key))
            .map((key) => {
              const percentage = grandTotal
                ? (totals[key] / grandTotal) * 100
                : 0;
              const Icon =
                key === "desktop"
                  ? Monitor
                  : key === "mobile"
                    ? Smartphone
                    : Tablet;
              return (
                <div
                  key={key}
                  className="rounded-xl border bg-foreground/5 p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Icon
                      className="size-5"
                      style={{ color: deviceColors[key] }}
                    />
                    <h3
                      className="font-semibold"
                      style={{ color: deviceColors[key] }}
                    >
                      {deviceLabels[key]}
                    </h3>
                  </div>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: deviceColors[key] }}
                  >
                    {percentage.toFixed(1)}%
                  </p>
                  <p className="mt-1 text-sm text-foreground/50">
                    {formatNumber(totals[key])} sessions
                  </p>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-foreground/10">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: deviceColors[key],
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-start justify-between gap-5 border-t p-5 sm:flex-row sm:items-center md:p-8">
          <div className="text-sm">
            <span className="text-foreground/50">Selected traffic: </span>
            <span className="font-bold">
              {formatCompactNumber(selectedTotal)}
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            {(["desktop", "mobile", "tablet"] as DeviceKey[]).map((key) => (
              <div key={key} className="flex items-center gap-1.5">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: deviceColors[key] }}
                />
                <span className="text-sm">{deviceLabels[key]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
