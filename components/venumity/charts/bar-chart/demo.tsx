"use client";

import { Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  BarChartCanvas,
  BarChartGrid,
  BarChartSeries,
  BarChartTooltipProps,
  BarChartXAxis,
  BarChartYAxis,
} from "./index";

const BAR_CHART_DATA = [
  {
    month: "Jan",
    online: 4200,
    retail: 2800,
    shipping: 900,
    tax: 450,
    margin: 38,
  },
  {
    month: "Feb",
    online: 2800,
    retail: 1900,
    shipping: 650,
    tax: 325,
    margin: 26,
  },
  {
    month: "Mar",
    online: 5600,
    retail: 3700,
    shipping: 1200,
    tax: 600,
    margin: 48,
  },
  {
    month: "Apr",
    online: 3400,
    retail: 2300,
    shipping: 750,
    tax: 375,
    margin: 31,
  },
  {
    month: "May",
    online: 6800,
    retail: 4500,
    shipping: 1450,
    tax: 725,
    margin: 56,
  },
];

function formatCurrency(value: number | string) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return String(value);
  }

  return `$${amount.toLocaleString("en-US")}`;
}

function CustomGroupStackedMixTooltip({
  active,
  payload,
  label,
}: BarChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const getValue = (key: string) =>
    Number(payload.find((item) => item.dataKey === key)?.value ?? 0);

  const online = getValue("online");
  const retail = getValue("retail");
  const shipping = getValue("shipping");
  const tax = getValue("tax");
  const margin = getValue("margin");
  const total = online + retail;

  return (
    <div className="min-w-60 rounded-xl border border-teal-500/20 bg-white/95 p-4 shadow-2xl backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-teal-500/10 pb-2">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <span className="rounded-full bg-teal-500/10 px-2 py-0.5 text-xs font-medium text-teal-600">
          Sales overview
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-sm text-slate-600">
            <span className="size-2.5 rounded-full bg-teal-500" />
            Online
          </span>
          <span className="font-mono text-sm font-semibold tabular-nums text-slate-900">
            {formatCurrency(online)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-sm text-slate-600">
            <span className="size-2.5 rounded-full bg-rose-500" />
            Retail
          </span>
          <span className="font-mono text-sm font-semibold tabular-nums text-slate-900">
            {formatCurrency(retail)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-sm text-slate-600">
            <span className="size-2.5 rounded-full bg-amber-500" />
            Shipping + Tax
          </span>
          <span className="font-mono text-sm font-semibold tabular-nums text-slate-900">
            {formatCurrency(shipping + tax)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-sm text-slate-600">
            <span className="size-2.5 rounded-full bg-fuchsia-500" />
            Margin
          </span>
          <span className="font-mono text-sm font-semibold tabular-nums text-fuchsia-600">
            {margin.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-teal-500/10 pt-2">
        <span className="text-sm font-medium text-slate-600">Total sales</span>
        <span className="font-mono text-sm font-bold tabular-nums text-teal-600">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  );
}

export default function GroupStackedMixBarChartPage() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Group Stacked Mix Bar Chart</CardTitle>
          <CardDescription>
            Grouped sales channels, stacked operating costs, and a margin trend
            line
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-5!">
        <BarChart
          xAxisKey="month"
          variant="mixed"
          data={BAR_CHART_DATA}
          series={[
            {
              key: "online",
              label: "Online",
              color: "#14b8a6",
              gradientTo: "#5eead4",
              type: "bar",
              yAxisId: "left",
              radius: [0, 0, 0, 0],
            },
            {
              key: "retail",
              label: "Retail",
              color: "#f43f5e",
              gradientTo: "#fda4af",
              type: "bar",
              yAxisId: "left",
              radius: [8, 8, 0, 0],
            },
            {
              key: "shipping",
              label: "Shipping",
              color: "#f59e0b",
              gradientTo: "#fcd34d",
              type: "bar",
              yAxisId: "left",
              stackId: "costs",
              radius: 0,
            },
            {
              key: "tax",
              label: "Tax",
              color: "#f97316",
              gradientTo: "#fdba74",
              type: "bar",
              yAxisId: "left",
              stackId: "costs",
              radius: [8, 8, 0, 0],
            },
            {
              key: "margin",
              label: "Margin",
              color: "#d946ef",
              type: "line",
              yAxisId: "right",
            },
          ]}
        >
          <BarChartCanvas className="w-3xl h-70">
            <BarChartGrid
              horizontal
              vertical
              strokeDasharray="4 4"
              className="stroke-foreground/15!"
            />

            <BarChartXAxis tickLine axisLine tickMargin={15} />

            <BarChartYAxis
              yAxisId="left"
              orientation="left"
              tickLine
              axisLine
              width={72}
              tickMargin={10}
              tickFormatter={formatCurrency}
            />

            <BarChartYAxis
              yAxisId="right"
              orientation="right"
              tickLine
              axisLine
              width={56}
              tickMargin={10}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              cursor={{ fill: "currentColor", opacity: 0.06 }}
              content={<CustomGroupStackedMixTooltip />}
            />

            <BarChartSeries />
          </BarChartCanvas>
        </BarChart>
      </CardContent>
    </Card>
  );
}
