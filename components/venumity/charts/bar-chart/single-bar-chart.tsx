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
  { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 5100 },
  { month: "Mar", sales: 4800 },
  { month: "Apr", sales: 6200 },
  { month: "May", sales: 7400 },
  { month: "Jun", sales: 8100 },
  { month: "Jul", sales: 6800 },
  { month: "Aug", sales: 7600 },
  { month: "Sep", sales: 8900 },
  { month: "Oct", sales: 9400 },
  { month: "Nov", sales: 8700 },
  { month: "Dec", sales: 10200 },
];

export default function SingleBarChart() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Single Bar Chart</CardTitle>
          <CardDescription>
            Single-series vertical bar chart with rounded top corners
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-5!">
        <BarChart
          variant="single"
          data={barChartData}
          xAxisKey="month"
          series={[
            {
              key: "sales",
              label: "Sales",
              color: "#f97316",
              gradientTo: "#fdba74",
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
