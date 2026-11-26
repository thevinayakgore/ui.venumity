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
} from "./index";

const labelData: LineChartDatum[] = [
  { month: "January", desktop: 186, mobile: 80, badge: "🌐", color: "#3b82f6" },
  {
    month: "February",
    desktop: 305,
    mobile: 200,
    badge: "🧭",
    color: "#10b981",
  },
  { month: "March", desktop: 237, mobile: 120, badge: "🦊", color: "#f97316" },
  { month: "April", desktop: 73, mobile: 190, badge: "🌊", color: "#8b5cf6" },
  { month: "May", desktop: 209, mobile: 130, badge: "⚡", color: "#ec4899" },
  { month: "June", desktop: 214, mobile: 140, badge: "🚀", color: "#06b6d4" },
];

export function ValueLabelsUseCase() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="border-b py-5">
        <CardTitle>Label - Point Values</CardTitle>
        <CardDescription>
          Numeric labels rendered above each point
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <LineChart
          variant="label"
          data={labelData}
          series={[
            {
              key: "desktop",
              label: "Desktop",
              color: "#f59e0b",
              showDots: true,
              dotRadius: 4.5,
            },
            {
              key: "mobile",
              label: "Mobile",
              color: "#6366f1",
              showDots: true,
              dotRadius: 4.5,
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

export function FormattedValueLabelsUseCase() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="border-b py-5">
        <CardTitle>Label - Custom Formatter</CardTitle>
        <CardDescription>
          Formatted labels via labelFormatter, labelFontSize, and labelOffset
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <LineChart
          variant="label"
          data={labelData}
          series={[
            {
              key: "desktop",
              label: "Revenue",
              color: "#10b981",
              showDots: true,
              labelOffset: 14,
              labelFontSize: 12,
              labelFormatter: (val) => `$${Number(val ?? 0)}`,
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

export function CategoryLabelsWithBadgeDotsUseCase() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="border-b py-5">
        <CardTitle>Label - Category Key &amp; Badge Dots</CardTitle>
        <CardDescription>
          Using labelDataKey to display month names above custom badge markers
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <LineChart
          variant="label"
          data={labelData}
          series={[
            {
              key: "desktop",
              label: "Desktop",
              color: "#3b82f6",
              labelDataKey: "month",
              labelFormatter: (val) => String(val ?? "").slice(0, 3),
              renderDot: ({ cx, cy, payload }) => {
                if (cx == null || cy == null || !payload) return null;
                const fill = String(payload.color ?? "#3b82f6");
                const badge = String(payload.badge ?? "•");
                return (
                  <g>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={10}
                      fill={fill}
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                    <text
                      x={cx}
                      y={cy}
                      fontSize={10}
                      fill="#ffffff"
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ pointerEvents: "none" }}
                    >
                      {badge}
                    </text>
                  </g>
                );
              },
            },
          ]}
        >
          <LineChartCanvas
            margin={{ top: 44, left: 24, right: 24, bottom: 20 }}
          >
            <LineChartGrid />
            <LineChartXAxis hide />
            <LineChartYAxis />
            <Tooltip cursor={false} content={<LineChartTooltip hideLabel />} />
            <LineChartSeries />
          </LineChartCanvas>
        </LineChart>
      </CardContent>
    </Card>
  );
}

export function BottomPositionLabelsUseCase() {
  return (
    <Card className="p-0! gap-0!">
      <CardHeader className="border-b py-5">
        <CardTitle>Label - Bottom Position</CardTitle>
        <CardDescription>
          Labels placed below points via labelPosition=&quot;bottom&quot;
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5!">
        <LineChart
          variant="label"
          data={labelData}
          series={[
            {
              key: "mobile",
              label: "Mobile",
              color: "#8b5cf6",
              showDots: true,
              labelPosition: "bottom",
              labelOffset: 10,
              labelClassName: "fill-violet-500",
            },
          ]}
        >
          <LineChartCanvas
            margin={{ top: 20, left: 16, right: 16, bottom: 36 }}
          >
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

export default function LabelLineChartDemo() {
  return (
    <div className="flex flex-col gap-5 md:gap-10 p-5 md:p-10 m-auto max-w-4xl w-full">
      <ValueLabelsUseCase />
      <FormattedValueLabelsUseCase />
      <CategoryLabelsWithBadgeDotsUseCase />
      <BottomPositionLabelsUseCase />
    </div>
  );
}
