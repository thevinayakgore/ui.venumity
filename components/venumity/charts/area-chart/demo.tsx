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

const stackedGradientChartData: AreaChartDatum[] = [
  { day: "Mon", organic: 2400, direct: 1500, referral: 900 },
  { day: "Tue", organic: 3150, direct: 1850, referral: 1120 },
  { day: "Wed", organic: 5200, direct: 2900, referral: 1650 },
  { day: "Thu", organic: 4100, direct: 2200, referral: 1340 },
  { day: "Fri", organic: 4750, direct: 2650, referral: 1580 },
  { day: "Sat", organic: 3600, direct: 1980, referral: 1210 },
  { day: "Sun", organic: 4280, direct: 2340, referral: 1420 },
];

const stackedGradientChartSeries: AreaChartSeriesConfig[] = [
  {
    key: "referral",
    label: "Referral",
    color: "#f97316",
    gradientTo: "#fbbf24",
    stackId: "traffic-gradient-stack",
  },
  {
    key: "direct",
    label: "Direct",
    color: "#06b6d4",
    gradientTo: "#3b82f6",
    stackId: "traffic-gradient-stack",
  },
  {
    key: "organic",
    label: "Organic",
    color: "#a855f7",
    gradientTo: "#ec4899",
    stackId: "traffic-gradient-stack",
  },
];

export default function AreaChartDemo() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Stacked Gradient</CardTitle>
          <CardDescription>
            Stacked gradient fill across three traffic channels with custom
            weekly data
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-5!">
        <AreaChart
          xAxisKey="day"
          variant="stacked"
          data={stackedGradientChartData}
          series={stackedGradientChartSeries}
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
