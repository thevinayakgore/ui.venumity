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

const linearData: LineChartDatum[] = [
  { month: "January", signups: 120 },
  { month: "February", signups: 240 },
  { month: "March", signups: 195 },
  { month: "April", signups: 310 },
  { month: "May", signups: 275 },
  { month: "June", signups: 390 },
];

const linearSeries: LineChartSeriesConfig[] = [
  {
    key: "signups",
    label: "Signups",
    color: "#22c55e",
    gradientTo: "#fbbf24",
  },
];

export default function LinearLineChartDemo() {
  return (
    <Card className="p-0 bg-accent gap-0 rounded-2xl w-2xl">
      <CardHeader className="px-4 py-3 gap-0">
        <CardTitle>Linear Line Chart</CardTitle>
        <CardDescription>Straight line segments</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pb-2 bg-background border-t">
        <LineChart variant="linear" data={linearData} series={linearSeries}>
          <LineChartCanvas>
            <LineChartGrid />
            <LineChartXAxis />
            <LineChartYAxis />
            <Tooltip cursor={false} content={<LineChartTooltip hideLabel />} />
            <LineChartSeries />
          </LineChartCanvas>
        </LineChart>
      </CardContent>
    </Card>
  );
}
