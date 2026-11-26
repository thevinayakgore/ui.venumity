import { Tooltip } from "recharts";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  PieChart,
  PieChartCanvas,
  PieChartSlices,
  PieChartTooltip,
  type PieChartDatum,
} from "./index";

const pieSliceData: PieChartDatum[] = [
  { name: "Group A", value: 400, color: "#f97316" },
  { name: "Group B", value: 300, color: "#3b82f6" },
  { name: "Group C", value: 300, color: "#10b981" },
  { name: "Group D", value: 200, color: "#eab308" },
];

export default function PieVariantDemo() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="border-b py-5">
        <CardTitle>Standard Pie Chart</CardTitle>
        <CardDescription>Full circular slices with percentage labels</CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <PieChart variant="pie" data={pieSliceData}>
          <PieChartCanvas>
            <PieChartSlices outerRadius={124} />
            <Tooltip content={<PieChartTooltip />} />
          </PieChartCanvas>
        </PieChart>
      </CardContent>
    </Card>
  );
}