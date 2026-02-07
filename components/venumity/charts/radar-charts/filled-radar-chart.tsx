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

const filledRadarData = [
  { subject: "Speed", value: 92, fullMark: 100 },
  { subject: "Reliability", value: 88, fullMark: 100 },
  { subject: "Comfort", value: 76, fullMark: 100 },
  { subject: "Safety", value: 95, fullMark: 100 },
  { subject: "Efficiency", value: 84, fullMark: 100 },
  { subject: "Design", value: 78, fullMark: 100 },
];

export default function FilledRadarChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto p-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={filledRadarData}>
          <defs>
            <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(24 100% 55%)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(24 100% 55%)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <PolarGrid stroke="hsl(215 20% 65% / 0.3)" strokeWidth={1} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "hsl(215 0% 50%)", fontSize: 12 }}
            stroke="hsl(215 20% 65%)"
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "hsl(215 0% 50%)", fontSize: 10 }}
            stroke="hsl(215 20% 65%)"
          />
          <Tooltip
            contentStyle={{
              padding: "10px 15px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              border: "1px solid white",
              borderRadius: "7px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              backdropFilter: "blur(3px)",
            }}
            formatter={(value) => [`${value}%`, "Score"]}
          />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="hsl(24 100% 55%)"
            fill="url(#radarFill)"
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </main>
  );
}
