"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  SortAsc,
  MoreVertical,
} from "lucide-react";

export default function HorizontalMenuWithSearch() {
  const [activeView, setActiveView] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const sortOptions = [
    { id: "newest", label: "Newest First" },
    { id: "oldest", label: "Oldest First" },
    { id: "name", label: "Name A-Z" },
    { id: "size", label: "Size" },
  ];

  const filterOptions = [
    { label: "All Types", count: 128 },
    { label: "Documents", count: 45 },
    { label: "Images", count: 32 },
    { label: "Videos", count: 18 },
    { label: "Others", count: 33 },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Horizontal Menu with Search
      </h3>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search files..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filterOptions.map((filter) => (
          <button
            key={filter.label}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-colors ${
              filter.label === "All Types"
                ? "bg-primary border-primary text-white"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary dark:hover:border-primary"
            }`}
          >
            <span className="font-medium">{filter.label}</span>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* View Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveView("grid")}
              className={`p-2 rounded ${
                activeView === "grid"
                  ? "bg-white dark:bg-gray-900 text-primary"
                  : "text-gray-500"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveView("list")}
              className={`p-2 rounded ${
                activeView === "list"
                  ? "bg-white dark:bg-gray-900 text-primary"
                  : "text-gray-500"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary">
              <SortAsc className="w-4 h-4" />
              <span className="text-sm font-medium">Sort</span>
              <MoreVertical className="w-4 h-4" />
            </button>

            <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      sortBy === option.id
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Advanced Filters</span>
        </button>
      </div>
    </div>
  );
}
