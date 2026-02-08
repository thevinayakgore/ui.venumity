"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Search, ChevronUp, ChevronDown, Filter, X, Globe, Users, Building } from "lucide-react"

const countryData = [
  { id: 1, name: "United States", continent: "North America", population: "331M", gdp: "$26.95T", growth: "2.1%", area: "9.83M km²" },
  { id: 2, name: "China", continent: "Asia", population: "1.42B", gdp: "$19.37T", growth: "5.2%", area: "9.60M km²" },
  { id: 3, name: "Germany", continent: "Europe", population: "83M", gdp: "$4.43T", growth: "-0.3%", area: "357k km²" },
  { id: 4, name: "Japan", continent: "Asia", population: "125M", gdp: "$4.23T", growth: "1.3%", area: "378k km²" },
  { id: 5, name: "India", continent: "Asia", population: "1.42B", gdp: "$3.73T", growth: "6.3%", area: "3.29M km²" },
  { id: 6, name: "United Kingdom", continent: "Europe", population: "67M", gdp: "$3.33T", growth: "0.5%", area: "243k km²" },
  { id: 7, name: "France", continent: "Europe", population: "68M", gdp: "$2.92T", growth: "0.7%", area: "643k km²" },
  { id: 8, name: "Brazil", continent: "South America", population: "216M", gdp: "$2.08T", growth: "3.1%", area: "8.51M km²" },
  { id: 9, name: "Canada", continent: "North America", population: "38M", gdp: "$2.14T", growth: "1.1%", area: "9.98M km²" },
  { id: 10, name: "Australia", continent: "Oceania", population: "26M", gdp: "$1.69T", growth: "2.7%", area: "7.69M km²" },
]

type SortField = 'name' | 'continent' | 'population' | 'gdp' | 'growth' | 'area'
type SortDirection = 'asc' | 'desc'

export default function SortableWithSearchTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>('gdp')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [continentFilter, setContinentFilter] = useState<string>("all")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  // Filter and sort data
  const filteredData = countryData.filter(country => {
    const matchesSearch = searchTerm === "" || 
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.continent.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesContinent = continentFilter === "all" || 
      country.continent === continentFilter
    
    return matchesSearch && matchesContinent
  })

  filteredData.sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    // Handle special cases for population, gdp, area
    if (sortField === 'population' || sortField === 'gdp' || sortField === 'area') {
      const aNum = parseFloat(aValue.replace(/[^0-9.-]+/g, ''))
      const bNum = parseFloat(bValue.replace(/[^0-9.-]+/g, ''))
      
      if (aValue.includes('M') && bValue.includes('B')) {
        // Convert to same unit for comparison
        const aConverted = aValue.includes('B') ? aNum * 1000 : aNum
        const bConverted = bValue.includes('B') ? bNum * 1000 : bNum
        return sortDirection === 'asc' ? aConverted - bConverted : bConverted - aConverted
      }
      
      return sortDirection === 'asc' ? aNum - bNum : bNum - aNum
    }
    
    // For growth, remove % sign
    if (sortField === 'growth') {
      const aNum = parseFloat(aValue.replace('%', ''))
      const bNum = parseFloat(bValue.replace('%', ''))
      return sortDirection === 'asc' ? aNum - bNum : bNum - aNum
    }
    
    // For string fields
    return sortDirection === 'asc' 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue)
  })

  const continents = Array.from(new Set(countryData.map(c => c.continent)))

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Global Economy Dashboard</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
            Search, filter by continent, and sort by any column
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search countries or continents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={continentFilter}
                  onChange={(e) => setContinentFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="all">All Continents</option>
                  {continents.map(continent => (
                    <option key={continent} value={continent}>{continent}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => {
                  setSearchTerm("")
                  setContinentFilter("all")
                }}
                className="px-4 py-3 bg-linear-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 text-white rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total Population</span>
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-2">3.7B+</div>
          </div>
          
          <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
            <div className="flex items-center">
              <Building className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total GDP</span>
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-2">$70.7T</div>
          </div>
          
          <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">Showing</span>
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-2">
              {filteredData.length} of {countryData.length} countries
            </div>
          </div>
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
                      Country
                      {sortField === 'name' && (
                        sortDirection === 'asc' 
                          ? <ChevronUp className="w-4 h-4 ml-1" />
                          : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('continent')}
                    className="hidden sm:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Continent
                      {sortField === 'continent' && (
                        sortDirection === 'asc' 
                          ? <ChevronUp className="w-4 h-4 ml-1" />
                          : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('population')}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Population
                      {sortField === 'population' && (
                        sortDirection === 'asc' 
                          ? <ChevronUp className="w-4 h-4 ml-1" />
                          : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('gdp')}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      GDP
                      {sortField === 'gdp' && (
                        sortDirection === 'asc' 
                          ? <ChevronUp className="w-4 h-4 ml-1" />
                          : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('growth')}
                    className="hidden md:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Growth
                      {sortField === 'growth' && (
                        sortDirection === 'asc' 
                          ? <ChevronUp className="w-4 h-4 ml-1" />
                          : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('area')}
                    className="hidden lg:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      Area
                      {sortField === 'area' && (
                        sortDirection === 'asc' 
                          ? <ChevronUp className="w-4 h-4 ml-1" />
                          : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredData.map((country) => (
                  <motion.tr
                    key={country.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-900/50 transition-all duration-300"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="shrink-0 w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            {country.name.substring(0, 2)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {country.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                            {country.continent}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                        {country.continent}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {country.population}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {country.gdp}
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                      <div className={`flex items-center text-sm font-semibold ${
                        country.growth.startsWith('-') 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        {country.growth.startsWith('-') ? '▼' : '▲'}
                        <span className="ml-1">{country.growth}</span>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-4 sm:px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {country.area}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center py-12"
          >
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No countries found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            Sorted by: <span className="font-medium text-gray-700 dark:text-gray-300">
              {sortField === 'name' ? 'Country' : 
               sortField === 'continent' ? 'Continent' : 
               sortField === 'population' ? 'Population' : 
               sortField === 'gdp' ? 'GDP' : 
               sortField === 'growth' ? 'Growth' : 'Area'}
            </span> ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
            {continentFilter !== 'all' && ` • Filtered by: ${continentFilter}`}
          </div>
          <div className="mt-2 sm:mt-0">
            <button
              onClick={() => {
                setSortField('gdp')
                setSortDirection('desc')
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Reset to GDP Sort
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  )
}