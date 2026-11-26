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

const donutSliceData: PieChartDatum[] = [
  { name: "Direct", value: 520, color: "#3b82f6" },
  { name: "Organic", value: 380, color: "#10b981" },
  { name: "Referral", value: 240, color: "#f97316" },
  { name: "Social", value: 160, color: "#a855f7" },
];

export default function DonutVariantDemo() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="border-b py-5">
        <CardTitle>Donut Pie Chart</CardTitle>
        <CardDescription>Rounded inner radius ring with slice spacing</CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <PieChart variant="donut" data={donutSliceData}>
          <PieChartCanvas>
            <PieChartSlices
              innerRadius={64}
              outerRadius={124}
              paddingAngle={3}
              cornerRadius={6}
            />
            <Tooltip content={<PieChartTooltip />} />
          </PieChartCanvas>
        </PieChart>
      </CardContent>
    </Card>
  );
}