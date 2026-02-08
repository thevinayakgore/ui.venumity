"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
  Filter,
  Target,
  DollarSign,
  Users,
} from "lucide-react";

const startupData = [
  {
    id: 1,
    name: "CloudScale",
    industry: "Cloud Computing",
    funding: "$45M",
    valuation: "$320M",
    growth: 184,
    employees: 125,
    metrics: {
      revenueGrowth: 184,
      customerGrowth: 142,
      employeeGrowth: 85,
      fundingEfficiency: 2.8,
    },
  },
  {
    id: 2,
    name: "MediTech AI",
    industry: "Healthcare",
    funding: "$28M",
    valuation: "$210M",
    growth: 215,
    employees: 89,
    metrics: {
      revenueGrowth: 215,
      customerGrowth: 178,
      employeeGrowth: 62,
      fundingEfficiency: 3.5,
    },
  },
  {
    id: 3,
    name: "GreenEnergy",
    industry: "Clean Tech",
    funding: "$62M",
    valuation: "$480M",
    growth: 142,
    employees: 156,
    metrics: {
      revenueGrowth: 142,
      customerGrowth: 98,
      employeeGrowth: 120,
      fundingEfficiency: 1.9,
    },
  },
  {
    id: 4,
    name: "FinTech Pro",
    industry: "Finance",
    funding: "$35M",
    valuation: "$280M",
    growth: 198,
    employees: 102,
    metrics: {
      revenueGrowth: 198,
      customerGrowth: 156,
      employeeGrowth: 75,
      fundingEfficiency: 2.9,
    },
  },
  {
    id: 5,
    name: "EduStream",
    industry: "EdTech",
    funding: "$22M",
    valuation: "$165M",
    growth: 165,
    employees: 78,
    metrics: {
      revenueGrowth: 165,
      customerGrowth: 134,
      employeeGrowth: 58,
      fundingEfficiency: 3.2,
    },
  },
  {
    id: 6,
    name: "AutoDrive AI",
    industry: "Automotive",
    funding: "$85M",
    valuation: "$650M",
    growth: 92,
    employees: 210,
    metrics: {
      revenueGrowth: 92,
      customerGrowth: 67,
      employeeGrowth: 145,
      fundingEfficiency: 1.2,
    },
  },
  {
    id: 7,
    name: "Retail Boost",
    industry: "E-commerce",
    funding: "$18M",
    valuation: "$145M",
    growth: 245,
    employees: 65,
    metrics: {
      revenueGrowth: 245,
      customerGrowth: 210,
      employeeGrowth: 45,
      fundingEfficiency: 4.1,
    },
  },
  {
    id: 8,
    name: "CyberSecure",
    industry: "Security",
    funding: "$40M",
    valuation: "$310M",
    growth: 176,
    employees: 115,
    metrics: {
      revenueGrowth: 176,
      customerGrowth: 142,
      employeeGrowth: 82,
      fundingEfficiency: 2.7,
    },
  },
];

type SortField =
  | "name"
  | "industry"
  | "funding"
  | "valuation"
  | "growth"
  | "employees";
type SortDirection = "asc" | "desc";

export default function VisualSortableTable() {
  const [sortField, setSortField] = useState<SortField>("growth");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Filter and sort data
  const filteredData = startupData.filter(
    (startup) =>
      selectedIndustry === "all" || startup.industry === selectedIndustry
  );

  filteredData.sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      const aNum = parseFloat(aValue.replace(/[^0-9.-]+/g, ""));
      const bNum = parseFloat(bValue.replace(/[^0-9.-]+/g, ""));

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
      }

      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const getIndustryColor = (industry: string) => {
    const colors: Record<string, string> = {
      "Cloud Computing": "from-blue-500 to-cyan-600",
      Healthcare: "from-green-500 to-emerald-600",
      "Clean Tech": "from-emerald-500 to-green-600",
      Finance: "from-purple-500 to-pink-600",
      EdTech: "from-orange-500 to-yellow-600",
      Automotive: "from-red-500 to-orange-600",
      "E-commerce": "from-indigo-500 to-purple-600",
      Security: "from-gray-500 to-blue-600",
    };
    return colors[industry] || "from-gray-500 to-gray-600";
  };

  const industries = Array.from(new Set(startupData.map((s) => s.industry)));

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Startup Portfolio
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
                Visual data representation with interactive sorting and
                filtering
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="all">All Industries</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setSortField("growth");
                  setSortDirection("desc");
                  setSelectedIndustry("all");
                }}
                className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Reset View
              </button>
            </div>
          </div>
        </div>

        {/* Visual Summary */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Avg. Growth
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {Math.round(
                    startupData.reduce((acc, s) => acc + s.growth, 0) /
                      startupData.length
                  )}
                  %
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Total Valuation
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  $2.56B
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Total Funding
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  $335M
                </div>
              </div>
              <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>

          <div className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Total Employees
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  940
                </div>
              </div>
              <Users className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <tr>
                  <th
                    onClick={() => handleSort("name")}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Startup
                      {sortField === "name" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("industry")}
                    className="hidden md:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Industry
                      {sortField === "industry" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("funding")}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-linear-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      Funding
                      {sortField === "funding" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("valuation")}
                    className="hidden lg:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-linear-to-r hover:from-green-50 hover:to-green-100 dark:hover:from-green-900/20 dark:hover:to-green-800/20 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      Valuation
                      {sortField === "valuation" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("growth")}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-linear-to-r hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:to-purple-800/20 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      Growth Score
                      {sortField === "growth" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("employees")}
                    className="hidden sm:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-linear-to-r hover:from-orange-50 hover:to-orange-100 dark:hover:from-orange-900/20 dark:hover:to-orange-800/20 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      Team Size
                      {sortField === "employees" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        ))}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredData.map((startup) => (
                  <motion.tr
                    key={startup.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.01 }}
                    className="hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-900/50 transition-all duration-300"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`shrink-0 w-10 h-10 bg-linear-to-br ${getIndustryColor(
                            startup.industry
                          )} rounded-xl flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-sm">
                            {startup.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {startup.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                            {startup.industry}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                        {startup.industry}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {startup.funding}
                      </div>
                      <div className="mt-1">
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-linear-to-r from-blue-500 to-cyan-600"
                            style={{
                              width: `${
                                (parseFloat(
                                  startup.funding
                                    .replace("$", "")
                                    .replace("M", "")
                                ) /
                                  85) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-4 sm:px-6 py-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {startup.valuation}
                      </div>
                      <div className="mt-1">
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-linear-to-r from-green-500 to-emerald-600"
                            style={{
                              width: `${
                                (parseFloat(
                                  startup.valuation
                                    .replace("$", "")
                                    .replace("M", "")
                                ) /
                                  650) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 dark:bg-gray-800 rounded-full h-2 mr-3">
                          <div
                            className="h-2 rounded-full bg-linear-to-r from-purple-500 to-pink-600"
                            style={{
                              width: `${(startup.growth / 250) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center text-sm font-bold text-gray-900 dark:text-white">
                          {startup.growth}%
                          {startup.growth > 200 ? (
                            <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                          ) : startup.growth > 150 ? (
                            <TrendingUp className="w-4 h-4 text-blue-500 ml-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-yellow-500 ml-1" />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 dark:bg-gray-800 rounded-full h-2 mr-3">
                          <div
                            className="h-2 rounded-full bg-linear-to-r from-orange-500 to-yellow-600"
                            style={{
                              width: `${(startup.employees / 210) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {startup.employees}
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            {selectedIndustry !== "all" &&
              `Filtered by: ${selectedIndustry} • `}
            Sorted by:{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {sortField === "name"
                ? "Startup Name"
                : sortField === "industry"
                ? "Industry"
                : sortField === "funding"
                ? "Funding"
                : sortField === "valuation"
                ? "Valuation"
                : sortField === "growth"
                ? "Growth Score"
                : "Team Size"}
            </span>{" "}
            ({sortDirection === "asc" ? "Ascending" : "Descending"})
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>High Growth</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span>Moderate Growth</span>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
