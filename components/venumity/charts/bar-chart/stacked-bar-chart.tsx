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
  { month: "Jan", productA: 4200, productB: 2800, productC: 1600 },
  { month: "Feb", productA: 5100, productB: 3200, productC: 1900 },
  { month: "Mar", productA: 4800, productB: 3600, productC: 2200 },
  { month: "Apr", productA: 6200, productB: 4100, productC: 2500 },
  { month: "May", productA: 7400, productB: 4500, productC: 2800 },
  { month: "Jun", productA: 8100, productB: 5200, productC: 3100 },
  { month: "Jul", productA: 6800, productB: 4800, productC: 2900 },
  { month: "Aug", productA: 7600, productB: 5400, productC: 3300 },
  { month: "Sep", productA: 8900, productB: 6100, productC: 3700 },
  { month: "Oct", productA: 9400, productB: 6600, productC: 4100 },
  { month: "Nov", productA: 8700, productB: 6200, productC: 3900 },
  { month: "Dec", productA: 10200, productB: 7200, productC: 4600 },
];

export default function StackedBarChart() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Stacked Bar Chart</CardTitle>
          <CardDescription>
            Cumulative stacked bars showing part-to-whole totals
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-5!">
        <BarChart
          variant="stacked"
          data={barChartData}
          xAxisKey="month"
          series={[
            {
              key: "productA",
              label: "Product A",
              color: "#ec4899",
              gradientTo: "#f472b6",
              stackId: "products",
              radius: 0,
            },
            {
              key: "productB",
              label: "Product B",
              color: "#84cc16",
              gradientTo: "#a3e635",
              stackId: "products",
              radius: 0,
            },
            {
              key: "productC",
              label: "Product C",
              color: "#f97316",
              gradientTo: "#fb923c",
              stackId: "products",
              radius: [8, 8, 0, 0],
            },
          ]}
        >
          <BarChartCanvas className="w-3xl">
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
