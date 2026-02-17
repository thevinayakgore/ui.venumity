import { useRef, useEffect, useState } from "react";

interface SalesData {
  month: string;
  productA: number;
  productB: number;
  productC: number;
  productD: number;
  productE: number;
  productF: number;
  total: number;
}

export default function FixedColumnTable() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const salesData: SalesData[] = [
    {
      month: "January",
      productA: 45000,
      productB: 32000,
      productC: 28000,
      productD: 19000,
      productE: 15000,
      productF: 12000,
      total: 151000,
    },
    {
      month: "February",
      productA: 48000,
      productB: 35000,
      productC: 30000,
      productD: 21000,
      productE: 17000,
      productF: 14000,
      total: 165000,
    },
    {
      month: "March",
      productA: 52000,
      productB: 38000,
      productC: 32000,
      productD: 23000,
      productE: 19000,
      productF: 16000,
      total: 180000,
    },
    {
      month: "April",
      productA: 49000,
      productB: 36000,
      productC: 31000,
      productD: 22000,
      productE: 18000,
      productF: 15000,
      total: 171000,
    },
    {
      month: "May",
      productA: 55000,
      productB: 41000,
      productC: 35000,
      productD: 25000,
      productE: 21000,
      productF: 18000,
      total: 195000,
    },
    {
      month: "June",
      productA: 58000,
      productB: 43000,
      productC: 37000,
      productD: 27000,
      productE: 23000,
      productF: 20000,
      total: 208000,
    },
    {
      month: "July",
      productA: 51000,
      productB: 39000,
      productC: 34000,
      productD: 24000,
      productE: 20000,
      productF: 17000,
      total: 185000,
    },
    {
      month: "August",
      productA: 54000,
      productB: 40000,
      productC: 36000,
      productD: 26000,
      productE: 22000,
      productF: 19000,
      total: 197000,
    },
    {
      month: "September",
      productA: 60000,
      productB: 45000,
      productC: 40000,
      productD: 29000,
      productE: 25000,
      productF: 22000,
      total: 221000,
    },
    {
      month: "October",
      productA: 57000,
      productB: 42000,
      productC: 38000,
      productD: 28000,
      productE: 24000,
      productF: 21000,
      total: 210000,
    },
    {
      month: "November",
      productA: 63000,
      productB: 47000,
      productC: 42000,
      productD: 31000,
      productE: 27000,
      productF: 24000,
      total: 234000,
    },
    {
      month: "December",
      productA: 65000,
      productB: 49000,
      productC: 44000,
      productD: 33000,
      productE: 29000,
      productF: 26000,
      total: 246000,
    },
  ];

  const products = [
    "productA",
    "productB",
    "productC",
    "productD",
    "productE",
    "productF",
  ];
  const productNames = {
    productA: "Laptops",
    productB: "Phones",
    productC: "Tablets",
    productD: "Accessories",
    productE: "Monitors",
    productF: "Servers",
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        setIsScrolled(tableRef.current.scrollLeft > 0);
      }
    };

    const table = tableRef.current;
    if (table) {
      table.addEventListener("scroll", handleScroll);
      return () => table.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden max-w-6xl mx-auto">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Sales Dashboard</h2>
            <p className="text-gray-500">
              Monthly sales performance by product
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* Fixed first column shadow */}
        {isScrolled && (
          <div className="absolute left-0 top-0 bottom-0 w-48 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={tableRef}
          className="overflow-x-auto"
          style={{ maxHeight: "600px", overflowY: "auto" }}
        >
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {/* Fixed first column */}
                <th className="sticky left-0 bg-gray-50 z-20 py-3 px-6 text-left text-sm font-semibold text-gray-700 w-48">
                  Month
                </th>

                {/* Scrollable columns */}
                {products.map((product) => (
                  <th
                    key={product}
                    className="py-3 px-6 text-left text-sm font-semibold text-gray-700 min-w-40"
                  >
                    <div>
                      {productNames[product as keyof typeof productNames]}
                    </div>
                    <div className="text-xs text-gray-500 font-normal">
                      Monthly Sales
                    </div>
                  </th>
                ))}

                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 min-w-40">
                  <div>Total</div>
                  <div className="text-xs text-gray-500 font-normal">
                    All Products
                  </div>
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 min-w-32">
                  <div>Growth</div>
                  <div className="text-xs text-gray-500 font-normal">
                    vs Prev Month
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salesData.map((data, index) => {
                const previousMonth =
                  index > 0 ? salesData[index - 1].total : data.total;
                const growth = getGrowth(data.total, previousMonth);

                return (
                  <tr
                    key={data.month}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Fixed first column */}
                    <td className="sticky left-0 bg-white z-10 py-4 px-6 font-medium">
                      {data.month}
                    </td>

                    {/* Scrollable columns */}
                    {products.map((product) => (
                      <td key={product} className="py-4 px-6">
                        <div className="font-bold">
                          {formatCurrency(
                            data[product as keyof SalesData] as number
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {Math.round(
                            ((data[product as keyof SalesData] as number) /
                              data.total) *
                              100
                          )}
                          % of total
                        </div>
                      </td>
                    ))}

                    <td className="py-4 px-6">
                      <div className="font-bold text-lg">
                        {formatCurrency(data.total)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div
                        className={`font-semibold ${
                          growth >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {growth >= 0 ? "+" : ""}
                        {growth.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Totals row */}
              <tr className="bg-gray-50 font-semibold">
                <td className="sticky left-0 bg-gray-50 z-10 py-4 px-6">
                  Year Total
                </td>
                {products.map((product) => {
                  const total = salesData.reduce(
                    (sum, data) =>
                      sum + (data[product as keyof SalesData] as number),
                    0
                  );
                  return (
                    <td key={product} className="py-4 px-6">
                      {formatCurrency(total)}
                    </td>
                  );
                })}
                <td className="py-4 px-6 text-lg">
                  {formatCurrency(
                    salesData.reduce((sum, data) => sum + data.total, 0)
                  )}
                </td>
                <td className="py-4 px-6">
                  <div className="text-green-600">
                    +
                    {getGrowth(
                      salesData[salesData.length - 1].total,
                      salesData[0].total
                    ).toFixed(1)}
                    %
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Scroll horizontally to view all columns • Fixed first column for
            reference
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Growth</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Sales</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
