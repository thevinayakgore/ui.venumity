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
  { month: "Jan", online: 4200, retail: 2800, wholesale: 1600 },
  { month: "Feb", online: 5100, retail: 3200, wholesale: 1900 },
  { month: "Mar", online: 4800, retail: 3600, wholesale: 2200 },
  { month: "Apr", online: 6200, retail: 4100, wholesale: 2500 },
  { month: "May", online: 7400, retail: 4500, wholesale: 2800 },
];

export default function GroupedBarChart() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Grouped Bar Chart</CardTitle>
          <CardDescription>
            Side-by-side multi-metric comparison across categories
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-5!">
        <BarChart
          variant="grouped"
          data={barChartData}
          xAxisKey="month"
          series={[
            {
              key: "online",
              label: "Online",
              color: "#3b82f6",
              gradientTo: "#93c5fd",
              radius: [8, 8, 0, 0],
            },
            {
              key: "retail",
              label: "Retail",
              color: "#f97316",
              gradientTo: "#fdba74",
              radius: [8, 8, 0, 0],
            },
            {
              key: "wholesale",
              label: "Wholesale",
              color: "#22c55e",
              gradientTo: "#86efac",
              radius: [8, 8, 0, 0],
            },
          ]}
        >
          <BarChartCanvas className="w-2xl">
            <BarChartGrid />
            <BarChartXAxis />
            <BarChartYAxis />
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