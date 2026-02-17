import { useState } from "react";

interface StockItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
}

export default function StickyHeaderTable() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof StockItem;
    direction: "asc" | "desc";
  }>({ key: "symbol", direction: "asc" });

  const stocks: StockItem[] = [
    {
      id: "1",
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.25,
      change: 2.15,
      changePercent: 1.24,
      volume: "45.2M",
      marketCap: "2.7T",
      sector: "Technology",
    },
    {
      id: "2",
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 155.8,
      change: -1.2,
      changePercent: -0.76,
      volume: "28.7M",
      marketCap: "1.9T",
      sector: "Technology",
    },
    {
      id: "3",
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 420.72,
      change: 5.45,
      changePercent: 1.31,
      volume: "32.1M",
      marketCap: "3.1T",
      sector: "Technology",
    },
    {
      id: "4",
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 178.22,
      change: 3.18,
      changePercent: 1.82,
      volume: "56.8M",
      marketCap: "1.8T",
      sector: "Consumer",
    },
    {
      id: "5",
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 175.79,
      change: -4.25,
      changePercent: -2.36,
      volume: "102.5M",
      marketCap: "559B",
      sector: "Automotive",
    },
    {
      id: "6",
      symbol: "META",
      name: "Meta Platforms",
      price: 502.3,
      change: 8.75,
      changePercent: 1.77,
      volume: "18.9M",
      marketCap: "1.3T",
      sector: "Technology",
    },
    {
      id: "7",
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: 950.02,
      change: 25.48,
      changePercent: 2.75,
      volume: "45.6M",
      marketCap: "2.4T",
      sector: "Technology",
    },
    {
      id: "8",
      symbol: "JPM",
      name: "JPMorgan Chase",
      price: 195.43,
      change: 1.23,
      changePercent: 0.63,
      volume: "12.8M",
      marketCap: "562B",
      sector: "Financial",
    },
    {
      id: "9",
      symbol: "JNJ",
      name: "Johnson & Johnson",
      price: 151.77,
      change: -0.45,
      changePercent: -0.3,
      volume: "8.4M",
      marketCap: "384B",
      sector: "Healthcare",
    },
    {
      id: "10",
      symbol: "WMT",
      name: "Walmart Inc.",
      price: 59.88,
      change: 0.52,
      changePercent: 0.88,
      volume: "15.3M",
      marketCap: "482B",
      sector: "Retail",
    },
  ];

  const sortedStocks = [...stocks].sort((a, b) => {
    if (
      sortConfig.key === "symbol" ||
      sortConfig.key === "name" ||
      sortConfig.key === "sector"
    ) {
      return sortConfig.direction === "asc"
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    } else {
      return sortConfig.direction === "asc"
        ? (a[sortConfig.key] as number) - (b[sortConfig.key] as number)
        : (b[sortConfig.key] as number) - (a[sortConfig.key] as number);
    }
  });

  const handleSort = (key: keyof StockItem) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden max-w-6xl mx-auto">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Stock Market Watchlist</h2>
            <p className="text-gray-500">
              Real-time stock prices and performance
            </p>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Refresh Data
          </button>
        </div>
      </div>

      <div className="h-[500px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-white shadow-sm z-10">
            <tr className="bg-gray-50">
              {[
                { key: "symbol", label: "Symbol" },
                { key: "name", label: "Company Name" },
                { key: "price", label: "Price" },
                { key: "change", label: "Change" },
                { key: "changePercent", label: "Change %" },
                { key: "volume", label: "Volume" },
                { key: "marketCap", label: "Market Cap" },
                { key: "sector", label: "Sector" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="py-4 px-6 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort(key as keyof StockItem)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    {sortConfig.key === key && (
                      <span
                        className={
                          sortConfig.direction === "desc"
                            ? "transform rotate-180"
                            : ""
                        }
                      >
                        ↓
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedStocks.map((stock) => (
              <tr key={stock.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-bold">{stock.symbol}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-medium">{stock.name}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-bold">${stock.price.toFixed(2)}</div>
                </td>
                <td className="py-4 px-6">
                  <div
                    className={`font-semibold ${
                      stock.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div
                    className={`font-semibold ${
                      stock.changePercent >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stock.changePercent >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">{stock.volume}</td>
                <td className="py-4 px-6 text-gray-600">{stock.marketCap}</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {stock.sector}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t sticky bottom-0 bg-white">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {stocks.length} stocks • Sorted by {sortConfig.key} (
            {sortConfig.direction})
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Gainers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">Losers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
