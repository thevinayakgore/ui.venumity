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

const lineChartData: AreaChartDatum[] = [
  { label: "Jan", score: 120 },
  { label: "Feb", score: 210 },
  { label: "Mar", score: 185 },
  { label: "Apr", score: 310 },
  { label: "May", score: 290 },
  { label: "Jun", score: 420 },
  { label: "Jul", score: 395 },
];

const lineChartSeries: AreaChartSeriesConfig[] = [
  {
    key: "score",
    label: "Score",
    color: "#f97316",
  },
];

export default function LineAreaChartDemo() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Line</CardTitle>
          <CardDescription>
            Linear point-to-point segments with custom array data
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-5!">
        <AreaChart
          variant="line"
          xAxisKey="label"
          data={lineChartData}
          series={lineChartSeries}
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
