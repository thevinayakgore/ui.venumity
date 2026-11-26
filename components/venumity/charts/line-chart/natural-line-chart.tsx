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

const naturalData: LineChartDatum[] = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const naturalSeries: LineChartSeriesConfig[] = [
  { key: "desktop", label: "Desktop", color: "#3b82f6" },
];

export default function NaturalLineChartDemo() {
  return (
    <Card className="p-0! gap-0! w-3xl">
      <CardHeader className="border-b py-5">
        <CardTitle>Natural Line Chart</CardTitle>
        <CardDescription>Smooth curve interpolation</CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <LineChart variant="natural" data={naturalData} series={naturalSeries}>
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
