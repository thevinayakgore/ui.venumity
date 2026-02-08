"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronRight,
  Users,
  Target,
  TrendingUp,
  BarChart3,
  DollarSign,
} from "lucide-react";

const salesTeamData = [
  {
    id: 1,
    region: "North America",
    manager: "John Smith",
    target: "$500,000",
    achieved: "$523,450",
    progress: 104.7,
    teams: [
      {
        id: 11,
        team: "East Coast",
        lead: "Sarah Johnson",
        members: 8,
        target: "$250,000",
        achieved: "$265,780",
        deals: [
          {
            id: 111,
            client: "TechCorp Inc.",
            value: "$45,000",
            status: "Closed",
          },
          {
            id: 112,
            client: "Global Bank",
            value: "$120,000",
            status: "Closed",
          },
          {
            id: 113,
            client: "HealthPlus",
            value: "$85,000",
            status: "In Progress",
          },
        ],
      },
      {
        id: 12,
        team: "West Coast",
        lead: "Michael Chen",
        members: 6,
        target: "$200,000",
        achieved: "$195,670",
        deals: [
          { id: 121, client: "StartupXYZ", value: "$35,000", status: "Closed" },
          { id: 122, client: "MediaOne", value: "$85,000", status: "Closed" },
          {
            id: 123,
            client: "RetailGiant",
            value: "$60,000",
            status: "Negotiation",
          },
        ],
      },
      {
        id: 13,
        team: "Central",
        lead: "Emma Wilson",
        members: 5,
        target: "$50,000",
        achieved: "$62,000",
        deals: [
          { id: 131, client: "LocalGov", value: "$25,000", status: "Closed" },
          { id: 132, client: "EduTech", value: "$37,000", status: "Closed" },
        ],
      },
    ],
  },
  {
    id: 2,
    region: "Europe",
    manager: "David Brown",
    target: "$350,000",
    achieved: "$298,750",
    progress: 85.4,
    teams: [
      {
        id: 21,
        team: "UK & Ireland",
        lead: "Lisa Taylor",
        members: 7,
        target: "$150,000",
        achieved: "$142,500",
        deals: [
          { id: 211, client: "FinancePro", value: "$65,000", status: "Closed" },
          { id: 212, client: "TravelPlus", value: "$45,000", status: "Closed" },
        ],
      },
      {
        id: 22,
        team: "DACH Region",
        lead: "Mark Schmidt",
        members: 6,
        target: "$100,000",
        achieved: "$89,250",
        deals: [
          { id: 221, client: "AutoMakers", value: "$50,000", status: "Closed" },
          {
            id: 222,
            client: "EngineeringCo",
            value: "$25,000",
            status: "In Progress",
          },
        ],
      },
      {
        id: 23,
        team: "Southern Europe",
        lead: "Maria Rossi",
        members: 4,
        target: "$100,000",
        achieved: "$67,000",
        deals: [
          {
            id: 231,
            client: "FashionBrand",
            value: "$42,000",
            status: "Closed",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    region: "Asia Pacific",
    manager: "Kenji Tanaka",
    target: "$450,000",
    achieved: "$512,300",
    progress: 113.8,
    teams: [
      {
        id: 31,
        team: "Japan & Korea",
        lead: "Yuki Nakamura",
        members: 9,
        target: "$250,000",
        achieved: "$285,000",
        deals: [
          {
            id: 311,
            client: "ElectronicsInc",
            value: "$120,000",
            status: "Closed",
          },
          {
            id: 312,
            client: "GamingStudio",
            value: "$85,000",
            status: "Closed",
          },
          {
            id: 313,
            client: "AutoManufacturer",
            value: "$80,000",
            status: "Closed",
          },
        ],
      },
      {
        id: 32,
        team: "Southeast Asia",
        lead: "Raj Patel",
        members: 8,
        target: "$150,000",
        achieved: "$167,300",
        deals: [
          {
            id: 321,
            client: "EcommerceHub",
            value: "$95,000",
            status: "Closed",
          },
          {
            id: 322,
            client: "FintechStartup",
            value: "$45,000",
            status: "Closed",
          },
        ],
      },
      {
        id: 33,
        team: "Australia/NZ",
        lead: "Sarah Wilson",
        members: 5,
        target: "$50,000",
        achieved: "$60,000",
        deals: [
          { id: 331, client: "MiningCorp", value: "$35,000", status: "Closed" },
          { id: 332, client: "AgriTech", value: "$25,000", status: "Closed" },
        ],
      },
    ],
  },
];

export default function NestedExpandableTable() {
  const [expandedRegions, setExpandedRegions] = useState<number[]>([1]);
  const [expandedTeams, setExpandedTeams] = useState<number[]>([11]);

  const toggleRegion = (id: number) => {
    setExpandedRegions((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  const toggleTeam = (id: number) => {
    setExpandedTeams((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div className="text-xs font-semibold">
          {progress > 100 ? "Exceeded" : progress > 80 ? "On Track" : "Behind"}
        </div>
        <div className="text-xs font-semibold">{progress}%</div>
      </div>
      <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-800">
        <div
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
            progress >= 100
              ? "bg-linear-to-r from-green-500 to-emerald-600"
              : progress >= 80
              ? "bg-linear-to-r from-blue-500 to-cyan-600"
              : "bg-linear-to-r from-yellow-500 to-orange-600"
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Sales Performance Dashboard
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
                Click on regions and teams to drill down into performance data
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Above Target
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Below Target
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Target
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  $1.3M
                </div>
              </div>
              <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Achieved
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  $1.33M
                </div>
              </div>
              <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Overall Progress
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  102.3%
                </div>
              </div>
              <div className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Active Teams
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  9
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {salesTeamData.map((region) => (
              <div
                key={region.id}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
              >
                {/* Region Row */}
                <div
                  className="p-4 sm:p-6 cursor-pointer flex items-center justify-between"
                  onClick={() => toggleRegion(region.id)}
                >
                  <div className="flex-1 flex items-center">
                    <motion.div
                      animate={{
                        rotate: expandedRegions.includes(region.id) ? 90 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="mr-3 sm:mr-4"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-sm">
                              {region.region.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {region.region}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Manager: {region.manager}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Target
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {region.target}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Achieved
                            </div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                              {region.achieved}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <ProgressBar progress={region.progress} />
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex items-center space-x-4">
                    <div className="text-right md:hidden">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Progress
                      </div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {region.progress}%
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      {region.teams.length} teams
                    </div>
                  </div>
                </div>

                {/* Teams Section */}
                <AnimatePresence>
                  {expandedRegions.includes(region.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-8 sm:pl-12 pr-4 sm:pr-6 pb-4 bg-gray-50/50 dark:bg-gray-800/20"
                    >
                      <div className="space-y-3 mt-4">
                        {region.teams.map((team) => (
                          <motion.div
                            key={team.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                          >
                            {/* Team Row */}
                            <div
                              className="p-4 cursor-pointer flex items-center justify-between"
                              onClick={() => toggleTeam(team.id)}
                            >
                              <div className="flex-1 flex items-center">
                                <motion.div
                                  animate={{
                                    rotate: expandedTeams.includes(team.id)
                                      ? 90
                                      : 0,
                                  }}
                                  transition={{ duration: 0.3 }}
                                  className="mr-3"
                                >
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                </motion.div>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  <div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                      {team.team}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      Lead: {team.lead}
                                    </div>
                                  </div>

                                  <div className="hidden sm:block">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex items-center text-sm">
                                        <Users className="w-3 h-3 text-gray-400 mr-1" />
                                        <span className="text-gray-600 dark:text-gray-400">
                                          {team.members} members
                                        </span>
                                      </div>
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {team.target}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="hidden sm:block">
                                    <ProgressBar
                                      progress={
                                        (parseFloat(
                                          team.achieved
                                            .replace("$", "")
                                            .replace(",", "")
                                        ) /
                                          parseFloat(
                                            team.target
                                              .replace("$", "")
                                              .replace(",", "")
                                          )) *
                                        100
                                      }
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="ml-4 flex items-center space-x-4">
                                <div className="text-right sm:hidden">
                                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                                    {team.achieved}
                                  </div>
                                </div>
                                <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                  {team.deals.length} deals
                                </div>
                              </div>
                            </div>

                            {/* Deals Section */}
                            <AnimatePresence>
                              {expandedTeams.includes(team.id) && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="border-t border-gray-200 dark:border-gray-800"
                                >
                                  <div className="p-4">
                                    <div className="mb-3 flex items-center">
                                      <TrendingUp className="w-4 h-4 text-gray-400 mr-2" />
                                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Active Deals
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                      {team.deals.map((deal) => (
                                        <div
                                          key={deal.id}
                                          className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg"
                                        >
                                          <div className="flex justify-between items-start mb-2">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                              {deal.client}
                                            </div>
                                            <span
                                              className={`text-xs px-2 py-1 rounded-full ${
                                                deal.status === "Closed"
                                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                              }`}
                                            >
                                              {deal.status}
                                            </span>
                                          </div>
                                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                                            {deal.value}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm">
          <div className="text-gray-500 dark:text-gray-400">
            Data updated in real-time • Last refresh: Just now
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <button className="px-4 py-2 text-sm font-medium bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:opacity-90 transition-opacity">
              Export Report
            </button>
            <button className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
