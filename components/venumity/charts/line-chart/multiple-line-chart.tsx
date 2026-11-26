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

const multipleData: LineChartDatum[] = [
  { month: "January", desktop: 186, mobile: 80, tablet: 45 },
  { month: "February", desktop: 305, mobile: 200, tablet: 78 },
  { month: "March", desktop: 237, mobile: 120, tablet: 92 },
  { month: "April", desktop: 73, mobile: 190, tablet: 64 },
  { month: "May", desktop: 209, mobile: 130, tablet: 88 },
  { month: "June", desktop: 214, mobile: 140, tablet: 71 },
];

const multipleSeries: LineChartSeriesConfig[] = [
  { key: "desktop", label: "Desktop", color: "#8b5cf6" },
  { key: "mobile", label: "Mobile", color: "#f97316" },
  { key: "tablet", label: "Tablet", color: "#06b6d4" },
];

export default function MultipleLineChartDemo() {
  return (
    <Card className="p-0! gap-0! w-3xl">
      <CardHeader className="border-b py-5">
        <CardTitle>Multiple Line Chart</CardTitle>
        <CardDescription>Desktop, mobile, and tablet series</CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <LineChart
          variant="multiple"
          data={multipleData}
          series={multipleSeries}
        >
          <LineChartCanvas>
            <LineChartGrid />
            <LineChartXAxis />
            <LineChartYAxis />
            <Tooltip cursor={false} content={<LineChartTooltip />} />
            <LineChartSeries />
          </LineChartCanvas>
        </LineChart>
      </CardContent>
    </Card>
  );
}
