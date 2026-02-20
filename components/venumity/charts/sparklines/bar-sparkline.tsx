"use client";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { TrendingUp, Calendar, Activity } from "lucide-react";

const barSparklineData = [
  { day: "Mon", value: 4000, fullDay: "Monday" },
  { day: "Tue", value: 3000, fullDay: "Tuesday" },
  { day: "Wed", value: 5000, fullDay: "Wednesday" },
  { day: "Thu", value: 4500, fullDay: "Thursday" },
  { day: "Fri", value: 6000, fullDay: "Friday" },
  { day: "Sat", value: 5500, fullDay: "Saturday" },
  { day: "Sun", value: 7000, fullDay: "Sunday" },
];

export default function BarSparklines() {
  const total = barSparklineData.reduce((acc, item) => acc + item.value, 0);
  const average = total / barSparklineData.length;
  const peak = Math.max(...barSparklineData.map((d) => d.value));
  const peakDay = barSparklineData.find((d) => d.value === peak)?.fullDay;

  // Calculate week-over-week growth (simulated)
  const previousWeekTotal = total * 0.92; // 8% less than current
  const growth = (
    ((total - previousWeekTotal) / previousWeekTotal) *
    100
  ).toFixed(1);

  return (
    <main className="my-10 p-4 md:p-6 border rounded-2xl max-w-3xl m-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h2 className="text-3xl font-semibold">Bar Sparkline</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Daily activity with individual bar values
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20">
            <span className="text-xs text-emerald-600">Total</span>
            <p className="text-lg font-bold text-emerald-600">
              {(total / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20">
            <span className="text-xs text-green-600">Avg</span>
            <p className="text-lg font-bold text-green-600">
              {Math.round(average).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Activity className="size-4" />
            <span className="text-xs">Peak Day</span>
          </div>
          <div className="text-xl font-medium">{peakDay}</div>
          <div className="text-xs text-muted-foreground">
            {peak.toLocaleString()} visitors
          </div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingUp className="size-4" />
            <span className="text-xs">Growth</span>
          </div>
          <div className="text-xl font-medium text-green-600">+{growth}%</div>
          <div className="text-xs text-muted-foreground">vs last week</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Calendar className="size-4" />
            <span className="text-xs">Best Day</span>
          </div>
          <div className="text-xl font-medium">Sunday</div>
          <div className="text-xs text-muted-foreground">7,000 visitors</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-50 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barSparklineData}
            margin={{ left: -20, right: 20, top: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="barSparkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 20% 65%)", fontSize: 12 }}
            />
            <YAxis hide domain={[0, "dataMax + 1000"]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-1">
                        {payload[0].payload.fullDay}
                      </p>
                      <p className="text-lg font-bold text-emerald-600">
                        {payload[0].value?.toLocaleString()} visitors
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round(
                          ((payload[0].value as number) / peak) * 100,
                        )}
                        % of peak
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="value"
              fill="url(#barSparkGradient)"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Progress Bars */}
      <div className="grid grid-cols-7 gap-2 mt-6">
        {barSparklineData.map((item) => (
          <div key={item.day} className="text-center">
            <div className="text-xs font-medium mb-1">{item.day}</div>
            <div className="h-10 bg-muted rounded-sm overflow-hidden relative">
              <div
                className="absolute bottom-0 w-full bg-linear-to-t from-emerald-500 to-emerald-400 transition-all duration-500"
                style={{
                  height: `${(item.value / peak) * 100}%`,
                  opacity: 0.8,
                }}
              />
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              {(item.value / 1000).toFixed(1)}K
            </div>
          </div>
        ))}
      </div>

      {/* Comparison */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <div className="text-sm">
          <span className="text-muted-foreground">Week total: </span>
          <span className="font-bold">{(total / 1000).toFixed(1)}K</span>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs">Current week</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            <span className="text-xs">Last week</span>
          </div>
        </div>
      </div>
    </main>
  );
}
