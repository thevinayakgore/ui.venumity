import React, { useState } from "react";

export default function InteractiveDataCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  const dataPoints = [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 19000 },
    { month: "Mar", value: 15000 },
    { month: "Apr", value: 22000 },
    { month: "May", value: 24580 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border p-6 max-w-md mx-auto hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-xl">Sales Analytics</h3>
          <p className="text-gray-500">Q1 2024 Performance</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-4xl font-bold">$90,580</div>
            <p className="text-sm text-gray-500">Total Q1 Revenue</p>
          </div>
          <div className="text-right">
            <div className="text-green-500 text-lg font-semibold">↑ 18.2%</div>
            <p className="text-sm text-gray-500">vs Q1 2023</p>
          </div>
        </div>

        {isExpanded && (
          <div className="pt-6 border-t space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Monthly Breakdown</span>
                <span className="font-medium">$90,580 total</span>
              </div>
              {dataPoints.map((point) => (
                <div key={point.month} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{point.month}</span>
                    <span className="font-medium">
                      ${point.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${(point.value / 25000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            View Report
          </button>
          <button className="flex-1 border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
}
