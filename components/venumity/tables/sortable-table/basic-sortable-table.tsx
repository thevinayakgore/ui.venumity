"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown, Minus } from "lucide-react"

const cryptoData = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: "$45,678.90", change: "+2.5%", marketCap: "$850B", volume: "$32.4B" },
  { id: 2, name: "Ethereum", symbol: "ETH", price: "$2,345.67", change: "-1.2%", marketCap: "$280B", volume: "$15.8B" },
  { id: 3, name: "Cardano", symbol: "ADA", price: "$0.52", change: "+5.8%", marketCap: "$18.5B", volume: "$1.2B" },
  { id: 4, name: "Solana", symbol: "SOL", price: "$102.34", change: "-3.4%", marketCap: "$42.8B", volume: "$3.5B" },
  { id: 5, name: "Polkadot", symbol: "DOT", price: "$7.89", change: "+0.8%", marketCap: "$9.8B", volume: "$450M" },
  { id: 6, name: "Chainlink", symbol: "LINK", price: "$14.56", change: "+4.2%", marketCap: "$8.2B", volume: "$680M" },
  { id: 7, name: "Polygon", symbol: "MATIC", price: "$0.89", change: "-2.1%", marketCap: "$6.9B", volume: "$320M" },
  { id: 8, name: "Avalanche", symbol: "AVAX", price: "$36.78", change: "+8.5%", marketCap: "$12.5B", volume: "$1.8B" },
]

type SortField = 'name' | 'price' | 'change' | 'marketCap' | 'volume'
type SortDirection = 'asc' | 'desc'

export default function BasicSortableTable() {
  const [sortField, setSortField] = useState<SortField>('marketCap')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedData = [...cryptoData].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    // Remove symbols and convert to numbers for proper comparison
    const aNum = parseFloat(aValue.replace(/[^0-9.-]+/g, ''))
    const bNum = parseFloat(bValue.replace(/[^0-9.-]+/g, ''))
    
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return sortDirection === 'asc' ? aNum - bNum : bNum - aNum
    }
    
    // For string comparison (name, symbol)
    return sortDirection === 'asc' 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue)
  })

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+')) return <TrendingUp className="w-4 h-4" />
    if (change.startsWith('-')) return <TrendingDown className="w-4 h-4" />
    return <Minus className="w-4 h-4" />
  }

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Cryptocurrency Market</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
            Click on column headers to sort. Real-time prices and market data.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <tr>
                  <th 
                    onClick={() => handleSort('name')}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Asset
                      {sortField === 'name' && (
                        sortDirection === 'asc' 
                          ? <ChevronUp className="w-4 h-4 ml-1" />
                          : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('price')}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Price
                      {sortField === 'price' && (
                        sortDirection === 'asc' 
                          ? <ChevronUp className="w-4 h-4 ml-1" />
                          : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('change')}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      24h Change
                      {sortField === 'change' && (
                        sortDirection === 'asc' 
                          ? <ChevronUp className="w-4 h-4 ml-1" />
                          : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('marketCap')}
                    className="hidden md:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Market Cap
                      {sortField === 'marketCap' && (
                        sortDirection === 'asc' 
                          ? <ChevronUp className="w-4 h-4 ml-1" />
                          : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('volume')}
                    className="hidden lg:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      24h Volume
                      {sortField === 'volume' && (
                        sortDirection === 'asc' 
                          ? <ChevronUp className="w-4 h-4 ml-1" />
                          : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {sortedData.map((crypto) => (
                  <motion.tr
                    key={crypto.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-900/50 transition-all duration-300"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="shrink-0 w-10 h-10 bg-linear-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{crypto.symbol.charAt(0)}</span>
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {crypto.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {crypto.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {crypto.price}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className={`flex items-center text-sm font-semibold ${
                        crypto.change.startsWith('+') 
                          ? 'text-green-600 dark:text-green-400' 
                          : crypto.change.startsWith('-')
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {getChangeIcon(crypto.change)}
                        <span className="ml-2">{crypto.change}</span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {crypto.marketCap}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-4 sm:px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {crypto.volume}
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
            Sorted by: <span className="font-medium text-gray-700 dark:text-gray-300">
              {sortField === 'name' ? 'Asset' : 
               sortField === 'price' ? 'Price' : 
               sortField === 'change' ? '24h Change' : 
               sortField === 'marketCap' ? 'Market Cap' : '24h Volume'}
            </span> ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span>Positive</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              <span>Negative</span>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}