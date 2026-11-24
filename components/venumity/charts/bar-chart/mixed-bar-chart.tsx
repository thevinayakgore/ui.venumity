import { Tooltip } from "recharts";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  BarChartGrid,
  BarChartXAxis,
  BarChartYAxis,
  BarChartSeries,
  BarChartCanvas,
  BarChartTooltip,
} from "./index";

const barChartData = [
  { month: "Jan", revenue: 4200, profit: 2400, margin: 57.1 },
  { month: "Feb", revenue: 5100, profit: 2800, margin: 54.9 },
  { month: "Mar", revenue: 4800, profit: 3100, margin: 64.6 },
  { month: "Apr", revenue: 6200, profit: 3600, margin: 58.1 },
  { month: "May", revenue: 7400, profit: 4300, margin: 58.1 },
  { month: "Jun", revenue: 8100, profit: 4900, margin: 60.5 },
  { month: "Jul", revenue: 6800, profit: 3900, margin: 57.4 },
  { month: "Aug", revenue: 7600, profit: 4500, margin: 59.2 },
  { month: "Sep", revenue: 8900, profit: 5400, margin: 60.7 },
  { month: "Oct", revenue: 9400, profit: 5800, margin: 61.7 },
  { month: "Nov", revenue: 8700, profit: 5200, margin: 59.8 },
  { month: "Dec", revenue: 10200, profit: 6400, margin: 62.7 },
];

export default function MixedBarChart() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Mixed Bar Chart</CardTitle>
          <CardDescription>
            Composed bars with a secondary percentage line axis
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-5!">
        <BarChart
          variant="mixed"
          data={barChartData}
          xAxisKey="month"
          series={[
            {
              key: "revenue",
              label: "Revenue",
              color: "#f59e0b",
              gradientTo: "#fbbf24",
              type: "bar",
              yAxisId: "left",
              radius: [0, 0, 8, 8],
            },
            {
              key: "profit",
              label: "Profit",
              color: "#f43f5e",
              gradientTo: "#fb7185",
              type: "bar",
              yAxisId: "left",
              radius: [8, 8, 0, 0],
            },
            {
              key: "margin",
              label: "Margin",
              color: "#06b6d4",
              type: "line",
              yAxisId: "right",
            },
          ]}
        >
          <BarChartCanvas className="w-3xl">
            <BarChartGrid
              vertical
              strokeDasharray="4 4"
              className="stroke-foreground/15!"
            />
            <BarChartXAxis tickLine={false} />
            <BarChartYAxis yAxisId="left" orientation="left" />
            <BarChartYAxis yAxisId="right" orientation="right" />
            <Tooltip
              cursor={{ fill: "currentColor", opacity: 0.06 }}
              content={<BarChartTooltip />}
            />
            <BarChartSeries />
          </BarChartCanvas>
        </BarChart>
      </CardContent>
    </Card>
  );
}
