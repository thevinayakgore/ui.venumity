// app/charts/area/percent/page.tsx
"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { PieChart, Percent, Users } from "lucide-react";

const data = [
  { month: "Jan", organic: 40, paid: 35, referral: 25 },
  { month: "Feb", organic: 45, paid: 30, referral: 25 },
  { month: "Mar", organic: 35, paid: 40, referral: 25 },
  { month: "Apr", organic: 50, paid: 30, referral: 20 },
  { month: "May", organic: 55, paid: 25, referral: 20 },
  { month: "Jun", organic: 45, paid: 35, referral: 20 },
];

const toPercent = (decimal: number) => `${decimal}%`;

export default function PercentAreaChart() {
  const averages = data.reduce(
    (acc, month) => ({
      organic: acc.organic + month.organic,
      paid: acc.paid + month.paid,
      referral: acc.referral + month.referral,
    }),
    { organic: 0, paid: 0, referral: 0 },
  );

  const avgOrganic = Math.round(averages.organic / data.length);
  const avgPaid = Math.round(averages.paid / data.length);
  const avgReferral = Math.round(averages.referral / data.length);

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold">
            Traffic Source Distribution
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            100% stacked area chart showing source percentages
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-cyan-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-cyan-500">Avg Organic</span>
            <p className="text-lg font-bold text-cyan-500">{avgOrganic}%</p>
          </div>
          <div className="bg-purple-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-purple-500">Avg Paid</span>
            <p className="text-lg font-bold text-purple-500">{avgPaid}%</p>
          </div>
          <div className="bg-orange-500/10 px-4 py-2 rounded-lg">
            <span className="text-xs text-orange-500">Avg Referral</span>
            <p className="text-lg font-bold text-orange-500">{avgReferral}%</p>
          </div>
        </div>
      </div>

      <div className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            stackOffset="expand"
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="colorReferral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-foreground/10"
            />
            <XAxis
              dataKey="month"
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <YAxis
              stroke="hsl(215 20% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={toPercent}
              tick={{ fill: "hsl(215 20% 65%)" }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                      <p className="text-sm font-medium mb-2">{label}</p>
                      {payload.map((entry) => (
                        <div
                          key={entry.name}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <span style={{ color: entry.color }}>
                            {entry.name}:
                          </span>
                          <span className="font-bold">{entry.value}%</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "10px" }}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-sm font-medium capitalize px-2">
                  {value}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="referral"
              stackId="1"
              stroke="#f97316"
              strokeWidth={1}
              fill="url(#colorReferral)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="paid"
              stackId="1"
              stroke="#a855f7"
              strokeWidth={1}
              fill="url(#colorPaid)"
              animationDuration={1500}
              animationBegin={200}
            />
            <Area
              type="monotone"
              dataKey="organic"
              stackId="1"
              stroke="#06b6d4"
              strokeWidth={1}
              fill="url(#colorOrganic)"
              animationDuration={1500}
              animationBegin={400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Distribution Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-cyan-500/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="size-5 text-cyan-500" />
            <h3 className="font-semibold text-cyan-500">Organic Search</h3>
          </div>
          <p className="text-2xl font-bold text-cyan-500">{avgOrganic}%</p>
          <p className="text-xs text-muted-foreground mt-1">Average share</p>
          <div className="w-full bg-cyan-500/30 rounded-full h-1.5 mt-2">
            <div
              className="bg-cyan-500 h-1.5 rounded-full"
              style={{ width: `${avgOrganic}%` }}
            />
          </div>
        </div>
        <div className="bg-purple-500/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="size-5 text-purple-500" />
            <h3 className="font-semibold text-purple-500">Paid Search</h3>
          </div>
          <p className="text-2xl font-bold text-purple-500">{avgPaid}%</p>
          <p className="text-xs text-muted-foreground mt-1">Average share</p>
          <div className="w-full bg-purple-500/30 rounded-full h-1.5 mt-2">
            <div
              className="bg-purple-500 h-1.5 rounded-full"
              style={{ width: `${avgPaid}%` }}
            />
          </div>
        </div>
        <div className="bg-orange-500/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="size-5 text-orange-500" />
            <h3 className="font-semibold text-orange-500">Referral</h3>
          </div>
          <p className="text-2xl font-bold text-orange-500">{avgReferral}%</p>
          <p className="text-xs text-muted-foreground mt-1">Average share</p>
          <div className="w-full bg-orange-500/30 rounded-full h-1.5 mt-2">
            <div
              className="bg-orange-500 h-1.5 rounded-full"
              style={{ width: `${avgReferral}%` }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
