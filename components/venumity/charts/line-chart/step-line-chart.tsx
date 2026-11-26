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

const stepData: LineChartDatum[] = [
  { month: "January", tier: 186 },
  { month: "February", tier: 305 },
  { month: "March", tier: 237 },
  { month: "April", tier: 73 },
  { month: "May", tier: 209 },
  { month: "June", tier: 214 },
];

const stepSeries: LineChartSeriesConfig[] = [
  { key: "tier", label: "Tier", color: "#3b82f6" },
];

export default function StepLineChartDemo() {
  return (
    <Card className="p-0! gap-0! w-3xl">
      <CardHeader className="border-b py-5">
        <CardTitle>Step Line Chart</CardTitle>
        <CardDescription>Step curve interpolation</CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <LineChart variant="step" data={stepData} series={stepSeries}>
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
