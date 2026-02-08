"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  TrendingUp,
  Users,
  BarChart3,
  Target,
  Globe,
  Calendar,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";

interface ShareData {
  date: string;
  shares: number;
  clicks: number;
  engagement: number;
}

interface PlatformStats {
  name: string;
  shares: number;
  growth: number;
  color: string;
}

export default function AdvancedShareAnalyticsComponent() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const [shareData, setShareData] = useState<ShareData[]>([]);
  const [platformStats] = useState<PlatformStats[]>([
    { name: "Twitter", shares: 1245, growth: 12.5, color: "bg-sky-500" },
    { name: "Facebook", shares: 987, growth: 8.2, color: "bg-blue-600" },
    { name: "LinkedIn", shares: 654, growth: 15.3, color: "bg-blue-700" },
    { name: "WhatsApp", shares: 432, growth: 21.7, color: "bg-green-600" },
    { name: "Email", shares: 321, growth: 5.4, color: "bg-gray-600" },
  ]);
  const [loading, setLoading] = useState(false);

  const [countryStats, setCountryStats] = useState<{ country: string; value: number }[]>([]);
  const [demographicsStats, setDemographicsStats] = useState<number[]>([]);
  const [peakHourStats, setPeakHourStats] = useState<number[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setCountryStats(
        ["United States", "United Kingdom", "India", "Germany", "Canada"].map((country) => ({
          country,
          value: Math.floor(Math.random() * 1000) + 500,
        }))
      );
  
      setDemographicsStats(
        ["18-24", "25-34", "35-44", "45-54", "55+"].map(
          () => Math.floor(Math.random() * 40) + 10
        )
      );
  
      setPeakHourStats(
        ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM"].map(
          () => Math.floor(Math.random() * 300) + 100
        )
      );
    }, 0);
  
    return () => clearTimeout(t);
  }, []);

  const generateData = useCallback(() => {
    setLoading(true);
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const data: ShareData[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        shares: Math.floor(Math.random() * 200) + 50,
        clicks: Math.floor(Math.random() * 500) + 100,
        engagement: Math.floor(Math.random() * 40) + 60,
      });
    }

    setTimeout(() => {
      setShareData(data);
      setLoading(false);
    }, 500);
  }, [timeRange]);

  useEffect(() => {
    const t = setTimeout(() => {
      generateData();
    }, 0);
    return () => clearTimeout(t);
  }, [generateData]);

  const totalShares = platformStats.reduce((acc, stat) => acc + stat.shares, 0);
  const totalClicks = shareData.reduce((acc, data) => acc + data.clicks, 0);
  const avgEngagement =
    shareData.length > 0
      ? Math.round(
          shareData.reduce((acc, data) => acc + data.engagement, 0) /
            shareData.length
        )
      : 0;

  const topPlatform = platformStats.reduce((prev, current) =>
    prev.shares > current.shares ? prev : current
  );

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Share Analytics
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Track and analyze your content sharing performance
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Download size={18} />
              Export
            </button>
            <button
              onClick={generateData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Total Shares</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalShares.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                <Share2
                  className="text-blue-600 dark:text-blue-300"
                  size={24}
                />
              </div>
            </div>
            <div className="mt-3 flex items-center text-green-600">
              <TrendingUp size={16} />
              <span className="ml-2 text-sm">+12.4% from last period</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Total Clicks</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalClicks.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                <Users
                  className="text-green-600 dark:text-green-300"
                  size={24}
                />
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Click-through rate: 4.2%
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Engagement Rate
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {avgEngagement}%
                </h3>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                <BarChart3
                  className="text-purple-600 dark:text-purple-300"
                  size={24}
                />
              </div>
            </div>
            <div className="mt-3 text-sm text-green-600">
              High engagement detected
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Top Platform</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {topPlatform.name}
                </h3>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-xl">
                <Target className="text-red-600 dark:text-red-300" size={24} />
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {topPlatform.shares.toLocaleString()} shares
            </div>
          </div>
        </div>

        {/* Time Range Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-600" />
            <h3 className="font-bold text-gray-900 dark:text-white">
              Performance Over Time
            </h3>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(["7d", "30d", "90d"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-md ${
                  timeRange === range
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Shares Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-gray-900 dark:text-white">
                Shares Over Time
              </h4>
              <button className="flex items-center gap-2 text-sm text-gray-600">
                <Filter size={16} />
                Filter
              </button>
            </div>
            <div className="h-64">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <RefreshCw className="animate-spin text-gray-400" size={24} />
                </div>
              ) : (
                <div className="h-full flex items-end gap-1">
                  {shareData.map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className="w-full bg-linear-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${(data.shares / 250) * 100}%` }}
                        title={`${data.shares} shares on ${data.date}`}
                      ></div>
                      <div className="text-xs text-gray-500 mt-2">
                        {data.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">
              Platform Breakdown
            </h4>
            <div className="space-y-4">
              {platformStats.map((platform, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 ${platform.color} rounded-full`}
                      ></div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {platform.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {platform.shares.toLocaleString()}
                      </div>
                      <div
                        className={`text-xs ${
                          platform.growth > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {platform.growth > 0 ? "+" : ""}
                        {platform.growth}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${platform.color}`}
                      style={{
                        width: `${(platform.shares / totalShares) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Globe className="text-blue-600 dark:text-blue-300" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Geographic Reach
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Top countries
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {countryStats.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.country}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Users
                  className="text-green-600 dark:text-green-300"
                  size={20}
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Demographics
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Age groups
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {["18-24", "25-34", "35-44", "45-54", "55+"].map((age, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    {age}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {demographicsStats[index]}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Target
                  className="text-purple-600 dark:text-purple-300"
                  size={20}
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Peak Hours
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Best time to share
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {["9 AM", "12 PM", "3 PM", "6 PM", "9 PM"].map((time, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    {time}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {peakHourStats[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
