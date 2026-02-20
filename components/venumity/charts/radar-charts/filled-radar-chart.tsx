// app/charts/radar/filled/page.tsx
"use client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Gauge, Zap, Shield, Award, Battery, PenTool } from "lucide-react";

const filledRadarData = [
  { subject: "Speed", value: 92, fullMark: 100, icon: Zap, color: "#f97316" },
  {
    subject: "Reliability",
    value: 88,
    fullMark: 100,
    icon: Shield,
    color: "#3b82f6",
  },
  {
    subject: "Comfort",
    value: 76,
    fullMark: 100,
    icon: Award,
    color: "#10b981",
  },
  {
    subject: "Safety",
    value: 95,
    fullMark: 100,
    icon: Shield,
    color: "#a855f7",
  },
  {
    subject: "Efficiency",
    value: 84,
    fullMark: 100,
    icon: Battery,
    color: "#ec4899",
  },
  {
    subject: "Design",
    value: 78,
    fullMark: 100,
    icon: PenTool,
    color: "#eab308",
  },
];

export default function FilledRadarChart() {
  const overallScore = Math.round(
    filledRadarData.reduce((acc, item) => acc + item.value, 0) /
      filledRadarData.length,
  );

  return (
    <main className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-4xl font-semibold">Product Performance Radar</h1>
        <p className="text-muted-foreground mt-2">
          Multi-dimensional analysis with gradient fill
        </p>
      </div>

      {/* Chart Container */}
      <div className="flex items-start gap-10 bg-card rounded-2xl border p-6">
        <div className="-my-10 h-150 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="70%"
              data={filledRadarData}
            >
              <defs>
                <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <PolarGrid
                stroke="hsl(215 20% 65% / 0.2)"
                strokeWidth={1}
                gridType="polygon"
              />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: "hsl(215 20% 65%)",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                stroke="hsl(215 20% 65% / 0.3)"
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "hsl(215 20% 65%)", fontSize: 10 }}
                stroke="hsl(215 20% 65% / 0.3)"
                tickCount={5}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = filledRadarData.find(
                      (d) => d.subject === label,
                    );
                    const Icon = data?.icon;
                    return (
                      <div className="bg-background/90 backdrop-blur-sm border rounded-lg shadow-xl p-4 min-w-45">
                        <div className="flex items-center gap-2 mb-2">
                          {Icon && (
                            <Icon
                              className="size-4"
                              style={{ color: data?.color }}
                            />
                          )}
                          <p className="text-sm font-medium">{label}</p>
                        </div>
                        <p
                          className="text-2xl font-bold"
                          style={{ color: data?.color }}
                        >
                          {payload[0].value}%
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Target: {data?.fullMark}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="url(#radarFill)"
                fill="url(#radarFill)"
                strokeWidth={2}
                dot={{ fill: "#f97316", strokeWidth: 0, r: 4 }}
                activeDot={{
                  fill: "#f97316",
                  stroke: "white",
                  strokeWidth: 2,
                  r: 6,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
          <div className="col-span-3 bg-linear-to-r from-orange-600 to-purple-600 p-6 rounded-2xl text-white">
            <div className="flex items-center gap-4">
              <Gauge className="size-8" />
              <div>
                <p className="text-sm opacity-90">Overall Performance Score</p>
                <p className="text-4xl font-bold">{overallScore}%</p>
              </div>
            </div>
          </div>
          {filledRadarData.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.subject}
                className="bg-background rounded-lg p-5 border-2 hover:shadow-lg/10 transition-all duration-500"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${metric.color}20` }}
                  >
                    <Icon className="size-4" style={{ color: metric.color }} />
                  </div>
                  <span className="text-xs font-medium">{metric.subject}</span>
                </div>
                <p
                  className="text-xl font-bold"
                  style={{ color: metric.color }}
                >
                  {metric.value}%
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 mt-2">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${metric.value}%`,
                      backgroundColor: metric.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex justify-center">
        <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-full">
          <div className="w-3 h-3 rounded-full bg-linear-to-r from-orange-600 to-purple-600" />
          <span className="text-sm">
            Gradient fill shows performance intensity
          </span>
        </div>
      </div>
    </main>
  );
}
