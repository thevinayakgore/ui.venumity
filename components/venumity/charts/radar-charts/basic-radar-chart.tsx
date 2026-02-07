"use client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";

const radarData = [
  { subject: "Marketing", A: 120, B: 110, fullMark: 150 },
  { subject: "Finance", A: 98, B: 130, fullMark: 150 },
  { subject: "Development", A: 86, B: 130, fullMark: 150 },
  { subject: "Support", A: 99, B: 100, fullMark: 150 },
  { subject: "Sales", A: 85, B: 90, fullMark: 150 },
  { subject: "HR", A: 65, B: 85, fullMark: 150 },
];

export default function BasicRadarChart() {
  return (
    <main className="flex flex-col items-center justify-center m-auto p-5 border rounded-md overflow-hidden max-w-6xl w-full h-130">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid stroke="hsl(215 20% 65% / 0.3)" strokeWidth={1} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "hsl(215 0% 50%)", fontSize: 12 }}
            stroke="hsl(215 20% 65%)"
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 150]}
            tick={{ fill: "hsl(215 0% 50%)", fontSize: 10 }}
            stroke="hsl(215 20% 65%)"
          />
          <Radar
            name="Current"
            dataKey="A"
            stroke="hsl(24 100% 55%)"
            fill="hsl(24 100% 55% / 0.4)"
            fillOpacity={0.6}
            strokeWidth={2}
          />
          <Radar
            name="Target"
            dataKey="B"
            stroke="hsl(220 90% 56%)"
            fill="hsl(220 90% 56% / 0.4)"
            fillOpacity={0.6}
            strokeWidth={2}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </main>
  );
}
