import { Tooltip } from "recharts";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  LineChartGrid,
  LineChartXAxis,
  LineChartYAxis,
  LineChartSeries,
  LineChartCanvas,
  LineChartTooltip,
  type LineChartDatum,
  type LineChartSeriesConfig,
} from "./index";

const monthlySeriesData: LineChartDatum[] = [
  { month: "January", desktop: 186, mobile: 80, tablet: 45 },
  { month: "February", desktop: 305, mobile: 200, tablet: 78 },
  { month: "March", desktop: 237, mobile: 120, tablet: 92 },
  { month: "April", desktop: 73, mobile: 190, tablet: 64 },
  { month: "May", desktop: 209, mobile: 130, tablet: 88 },
  { month: "June", desktop: 214, mobile: 140, tablet: 71 },
];

const combinedSeries: LineChartSeriesConfig[] = [
  {
    key: "desktop",
    label: "Desktop (Natural + Labels)",
    color: "#3b82f6",
    gradientTo: "#06b6d4",
    curveType: "natural",
    strokeWidth: 3,
    showDots: true,
    dotRadius: 4,
    activeDotRadius: 7,
    showLabels: true,
    labelPosition: "top",
    labelOffset: 10,
  },
  {
    key: "mobile",
    label: "Mobile (Linear + Dots)",
    color: "#f97316",
    curveType: "linear",
    strokeWidth: 2,
    showDots: true,
    dotRadius: 3.5,
  },
  {
    key: "tablet",
    label: "Tablet (Step + Dashed)",
    color: "#a855f7",
    curveType: "step",
    strokeWidth: 2,
    strokeDasharray: "4 4",
    showDots: false,
  },
];

export default function LineChartDemo() {
  return (
    <div className="p-5 md:p-10 m-auto max-w-4xl w-full">
      <Card className="p-0! gap-0!">
        <CardHeader className="border-b py-5">
          <CardTitle>Line Chart - Combined Curves &amp; Mixed Props</CardTitle>
          <CardDescription>
            Natural, linear, and step series with dots, labels, gradient, and
            dashed stroke on one dataset
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5!">
          <LineChart
            variant="multiple"
            data={monthlySeriesData}
            series={combinedSeries}
            xAxisKey="month"
          >
            <LineChartCanvas
              className="h-72 sm:h-80"
              margin={{ top: 28, right: 16, left: 8, bottom: 16 }}
            >
              <LineChartGrid
                horizontal
                vertical={false}
                strokeDasharray="3 3"
              />
              <LineChartXAxis
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <LineChartYAxis
                hide={false}
                width={44}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                cursor={{ stroke: "currentColor", strokeOpacity: 0.15 }}
                content={<LineChartTooltip />}
              />
              <LineChartSeries />
            </LineChartCanvas>
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
}
