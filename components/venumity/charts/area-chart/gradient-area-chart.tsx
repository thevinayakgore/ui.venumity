import { Tooltip } from "recharts";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  AreaChart,
  AreaChartGrid,
  AreaChartXAxis,
  AreaChartYAxis,
  AreaChartSeries,
  AreaChartCanvas,
  AreaChartTooltip,
  type AreaChartDatum,
  type AreaChartSeriesConfig,
} from "./index";

const gradientChartData: AreaChartDatum[] = [
  { day: "Mon", sessions: 2400 },
  { day: "Tue", sessions: 3150 },
  { day: "Wed", sessions: 6800 },
  { day: "Thu", sessions: 4920 },
  { day: "Fri", sessions: 5740 },
  { day: "Sat", sessions: 4380 },
  { day: "Sun", sessions: 5120 },
];

const gradientChartSeries: AreaChartSeriesConfig[] = [
  {
    key: "sessions",
    label: "Sessions",
    color: "#a855f7",
    gradientTo: "#ec4899",
  },
];

export default function GradientAreaChartDemo() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Gradient</CardTitle>
          <CardDescription>
            Dual-stop gradient fill and stroke with custom weekly array data
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-5!">
        <AreaChart
          xAxisKey="day"
          variant="gradient"
          data={gradientChartData}
          series={gradientChartSeries}
        >
          <AreaChartCanvas className="w-2xl">
            <AreaChartGrid vertical={false} />
            <AreaChartXAxis tickMargin={8} />
            <AreaChartYAxis tickMargin={8} />
            <Tooltip
              cursor={{ stroke: "currentColor", strokeOpacity: 0.15 }}
              content={<AreaChartTooltip />}
            />
            <AreaChartSeries />
          </AreaChartCanvas>
        </AreaChart>
      </CardContent>
    </Card>
  );
}
