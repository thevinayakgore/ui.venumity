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

const stackedChartData: AreaChartDatum[] = [
  { quarter: "Q1", web: 3200, app: 2100, api: 1400 },
  { quarter: "Q2", web: 3850, app: 2650, api: 1750 },
  { quarter: "Q3", web: 4400, app: 3300, api: 2200 },
  { quarter: "Q4", web: 5150, app: 3950, api: 2800 },
];

const stackedChartSeries: AreaChartSeriesConfig[] = [
  { key: "api", label: "API", color: "#10b981", stackId: "usage" },
  { key: "app", label: "App", color: "#a855f7", stackId: "usage" },
  { key: "web", label: "Web", color: "#06b6d4", stackId: "usage" },
];

export default function StackedAreaChartDemo() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Stacked</CardTitle>
          <CardDescription>
            Stacked series accumulation with custom quarterly array data
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-5!">
        <AreaChart
          variant="stacked"
          data={stackedChartData}
          series={stackedChartSeries}
          xAxisKey="quarter"
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
