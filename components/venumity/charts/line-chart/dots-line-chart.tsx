import { Tooltip } from "recharts";
import { GitCommitVertical } from "lucide-react";
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
} from "./index";

const dotsData: LineChartDatum[] = [
  { month: "January", desktop: 186, mobile: 80, color: "#3b82f6" },
  { month: "February", desktop: 305, mobile: 200, color: "#10b981" },
  { month: "March", desktop: 237, mobile: 120, color: "#f97316" },
  { month: "April", desktop: 73, mobile: 190, color: "#8b5cf6" },
  { month: "May", desktop: 209, mobile: 130, color: "#ec4899" },
  { month: "June", desktop: 214, mobile: 140, color: "#06b6d4" },
];

export function StandardDotsUseCase() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="border-b py-5">
        <CardTitle>Dots - Standard Markers</CardTitle>
        <CardDescription>Default circular dots across series</CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <LineChart
          variant="dots"
          data={dotsData}
          series={[
            {
              key: "desktop",
              label: "Desktop",
              color: "#d946ef",
              dotRadius: 4,
            },
            {
              key: "mobile",
              label: "Mobile",
              color: "#14b8a6",
              dotRadius: 4,
            },
          ]}
        >
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

export function ColoredDotsUseCase() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="border-b py-5">
        <CardTitle>Dots - Per-Point Colors</CardTitle>
        <CardDescription>
          Each dot colored dynamically via colorByDataKey
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <LineChart
          variant="dots"
          data={dotsData}
          series={[
            {
              key: "desktop",
              label: "Desktop",
              color: "#3b82f6",
              colorByDataKey: "color",
              dotRadius: 6,
              activeDotRadius: 8,
            },
          ]}
        >
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

export function CustomIconDotsUseCase() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="border-b py-5">
        <CardTitle>Dots - Custom SVG Icons</CardTitle>
        <CardDescription>
          Custom commit icon dots rendered via renderDot
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <LineChart
          variant="dots"
          data={dotsData}
          series={[
            {
              key: "desktop",
              label: "Desktop",
              color: "#a855f7",
              renderDot: ({ cx, cy, payload }) => {
                if (cx == null || cy == null) return null;
                return (
                  <GitCommitVertical
                    x={cx - 9}
                    y={cy - 9}
                    width={18}
                    height={18}
                    fill="#ffffff"
                    stroke="#a855f7"
                    strokeWidth={2}
                    aria-label={String(payload?.month ?? "")}
                  />
                );
              },
            },
            {
              key: "mobile",
              label: "Mobile",
              color: "#ec4899",
              renderDot: ({ cx, cy, payload }) => {
                if (cx == null || cy == null) return null;
                return (
                  <GitCommitVertical
                    x={cx - 9}
                    y={cy - 9}
                    width={18}
                    height={18}
                    fill="#ffffff"
                    stroke="#ec4899"
                    strokeWidth={2}
                    aria-label={String(payload?.month ?? "")}
                  />
                );
              },
            },
          ]}
        >
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

export function OutlinedActiveDotsUseCase() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="border-b py-5">
        <CardTitle>Dots - Ring Stroke &amp; Hover Scale</CardTitle>
        <CardDescription>
          Custom dot stroke, strokeWidth, and expanded activeDotRadius
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <LineChart
          variant="dots"
          data={dotsData}
          series={[
            {
              key: "mobile",
              label: "Mobile",
              color: "#f97316",
              dotRadius: 4.5,
              dotStroke: "#ffffff",
              dotStrokeWidth: 2,
              activeDotRadius: 8,
              activeDotStroke: "#f97316",
              activeDotStrokeWidth: 2.5,
            },
          ]}
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

export default function DotsLineChartDemo() {
  return (
    <div className="flex flex-col gap-5 md:gap-10 p-5 md:p-10 m-auto max-w-4xl w-full">
      <StandardDotsUseCase />
      <ColoredDotsUseCase />
      <CustomIconDotsUseCase />
      <OutlinedActiveDotsUseCase />
    </div>
  );
}
