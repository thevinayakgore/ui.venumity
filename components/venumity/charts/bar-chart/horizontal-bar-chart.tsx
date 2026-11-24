import { Tooltip } from "recharts";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  BarChartGrid,
  BarChartXAxis,
  BarChartYAxis,
  BarChartSeries,
  BarChartCanvas,
  BarChartTooltip,
} from "./index";

export default function HorizontalBarChart() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Horizontal Bar Chart</CardTitle>
          <CardDescription>
            Horizontal layout with category labels and value callouts
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-5!">
        <BarChart variant="horizontal">
          <BarChartCanvas className="h-96">
            <BarChartGrid />
            <BarChartXAxis />
            <BarChartYAxis />
            <Tooltip
              cursor={{ fill: "currentColor", opacity: 0.06 }}
              content={<BarChartTooltip />}
            />
            <BarChartSeries />
          </BarChartCanvas>
        </BarChart>
      </CardContent>
    </Card>
  );
}