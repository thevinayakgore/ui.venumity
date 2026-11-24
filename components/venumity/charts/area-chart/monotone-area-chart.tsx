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

const monotoneChartData: AreaChartDatum[] = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 3800 },
  { month: "Mar", revenue: 5600 },
  { month: "Apr", revenue: 5100 },
  { month: "May", revenue: 6900 },
  { month: "Jun", revenue: 6400 },
  { month: "Jul", revenue: 8200 },
  { month: "Aug", revenue: 7750 },
];

const monotoneChartSeries: AreaChartSeriesConfig[] = [
  {
    key: "revenue",
    label: "Revenue",
    color: "#f97316",
  },
];

export default function MonotoneAreaChartDemo() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Monotone</CardTitle>
          <CardDescription>
            Smooth monotone curve with custom monthly array data
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-5!">
        <AreaChart
          xAxisKey="month"
          variant="monotone"
          data={monotoneChartData}
          series={monotoneChartSeries}
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
