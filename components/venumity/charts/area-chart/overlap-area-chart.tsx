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

const overlapChartData: AreaChartDatum[] = [
  { period: "W1", inbound: 4600, outbound: 2900 },
  { period: "W2", inbound: 3900, outbound: 2450 },
  { period: "W3", inbound: 5800, outbound: 4100 },
  { period: "W4", inbound: 4400, outbound: 3200 },
  { period: "W5", inbound: 7100, outbound: 5300 },
  { period: "W6", inbound: 6350, outbound: 4650 },
];

const overlapChartSeries: AreaChartSeriesConfig[] = [
  {
    key: "inbound",
    label: "Inbound",
    color: "#f97316",
  },
  {
    key: "outbound",
    label: "Outbound",
    color: "#10b981",
  },
];

export default function OverlapAreaChartDemo() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Overlap</CardTitle>
          <CardDescription>
            Overlapping series with custom two-metric array data
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-5!">
        <AreaChart
          variant="overlap"
          xAxisKey="period"
          data={overlapChartData}
          series={overlapChartSeries}
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
