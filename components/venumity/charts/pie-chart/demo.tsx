"use client";
import * as React from "react";
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
  { segment: "Group A", units: 400, hex: "#f97316" },
  { segment: "Group B", units: 300, hex: "#3b82f6" },
  { segment: "Group C", units: 300, hex: "#10b981" },
  { segment: "Group D", units: 200, hex: "#eab308" },
];

export default function PieDemo() {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
    undefined,
  );

  return (
    <Card className="p-0! gap-0! w-2xl">
      <CardHeader className="border-b py-5">
        <CardTitle>Pie Chart - Mixed Props</CardTitle>
        <CardDescription>
          Custom data keys, donut ring radii, interactive hover/click callbacks,
          and formatted tooltip
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <PieChart
          variant="donut"
          data={pieSliceData}
          nameKey="segment"
          valueKey="units"
          colorKey="hex"
          activeIndex={activeIndex}
          onSliceHover={setActiveIndex}
          sliceConfig={{
            innerRadius: 68,
            outerRadius: 122,
            paddingAngle: 4,
            cornerRadius: 6,
            strokeWidth: 3,
            activeExpandOffset: 10,
            showLabel: true,
            showLabelLine: false,
            labelFormatter: ({ name, percent }) =>
              `${name}: ${percent.toFixed(0)}%`,
          }}
        >
          <PieChartCanvas className="h-72 sm:h-80">
            <PieChartSlices />
            <Tooltip
              content={
                <PieChartTooltip
                  unitLabel="units"
                  valueFormatter={(val) => val.toLocaleString("en-US")}
                  percentageFormatter={(val, total) =>
                    total > 0 ? ((val / total) * 100).toFixed(1) : "0.0"
                  }
                />
              }
            />
          </PieChartCanvas>
        </PieChart>
      </CardContent>
    </Card>
  );
}
