// app/charts/radar/basic/page.tsx
"use client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { TrendingUp, Target } from "lucide-react";

const radarData = [
  { subject: "Marketing", A: 120, B: 110, fullMark: 150 },
  { subject: "Finance", A: 98, B: 130, fullMark: 150 },
  { subject: "Development", A: 86, B: 130, fullMark: 150 },
  { subject: "Support", A: 99, B: 100, fullMark: 150 },
  { subject: "Sales", A: 85, B: 90, fullMark: 150 },
  { subject: "HR", A: 65, B: 85, fullMark: 150 },
];

export default function BasicRadarChart() {
  const averageCurrent = Math.round(
    radarData.reduce((acc, item) => acc + item.A, 0) / radarData.length,
  );
  const averageTarget = Math.round(
    radarData.reduce((acc, item) => acc + item.B, 0) / radarData.length,
  );

  return (
    <main className="p-6 md:p-10">
      {/* Header */}
      <header className="mb-5">
        <h1 className="text-4xl font-semibold">Department Performance Radar</h1>
        <p className="text-muted-foreground mt-2">
          Compare current performance against targets across departments
        </p>
      </header>

      <section className="flex items-start gap-10 w-full h-full">
        {/* Chart Container */}
        <div className="-my-10 h-150 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
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
                domain={[0, 150]}
                tick={{ fill: "hsl(215 20% 65%)", fontSize: 10 }}
                stroke="hsl(215 20% 65% / 0.3)"
                tickCount={6}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border rounded-lg shadow-xl p-3">
                        <p className="text-sm font-medium mb-2">{label}</p>
                        {payload.map((entry) => (
                          <div
                            key={entry.name}
                            className="flex items-center justify-between gap-4 text-sm"
                          >
                            <span style={{ color: entry.color }}>
                              {entry.name} :
                            </span>
                            <span className="font-bold">{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span className="text-sm font-medium px-2">
                    {value === "A" ? "Current Performance" : "Target"}
                  </span>
                )}
              />
              <Radar
                name="A"
                dataKey="A"
                stroke="#f97316"
                fill="#f97316"
                fillOpacity={0.3}
                strokeWidth={2}
                dot={{ fill: "#f97316", strokeWidth: 0, r: 4 }}
              />
              <Radar
                name="B"
                dataKey="B"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 0, r: 4 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Details */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20 w-full">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="size-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">
                Current Avg
              </span>
            </div>
            <p className="text-2xl font-bold text-orange-600">
              {averageCurrent}
            </p>
            <p className="text-xs text-muted-foreground mt-1">out of 150</p>
          </div>
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20 w-full">
            <div className="flex items-center gap-2 mb-2">
              <Target className="size-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                Target Avg
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{averageTarget}</p>
            <p className="text-xs text-muted-foreground mt-1">out of 150</p>
          </div>
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20 w-full">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="size-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                Gap to Target
              </span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {averageTarget - averageCurrent > 0 ? "+" : ""}
              {averageTarget - averageCurrent}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              need improvement
            </p>
          </div>
          {radarData.map((dept) => (
            <div
              key={dept.subject}
              className="bg-foreground/5 backdrop-blur-sm border rounded-lg p-4 w-full"
            >
              <p className="text-sm font-medium mb-2">{dept.subject}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-orange-600">Current :</span>
                  <span className="font-bold text-orange-600">{dept.A}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-blue-600">Target :</span>
                  <span className="font-bold text-blue-600">{dept.B}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Gap :</span>
                  <span
                    className={`font-bold ${dept.B - dept.A >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {dept.B - dept.A >= 0 ? "+" : ""}
                    {dept.B - dept.A}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
