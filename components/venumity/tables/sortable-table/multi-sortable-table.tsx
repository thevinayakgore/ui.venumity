"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronUp, ChevronDown, Filter, X, TrendingUp } from "lucide-react"

const employeeData = [
  { id: 1, name: "Alex Johnson", department: "Engineering", position: "Senior Developer", salary: "$125,000", experience: "5 years", rating: 4.8 },
  { id: 2, name: "Sarah Miller", department: "Marketing", position: "Marketing Director", salary: "$95,000", experience: "7 years", rating: 4.5 },
  { id: 3, name: "Michael Chen", department: "Engineering", position: "DevOps Engineer", salary: "$110,000", experience: "4 years", rating: 4.2 },
  { id: 4, name: "Emma Wilson", department: "Sales", position: "Sales Manager", salary: "$85,000", experience: "6 years", rating: 4.7 },
  { id: 5, name: "David Brown", department: "HR", position: "HR Manager", salary: "$75,000", experience: "8 years", rating: 4.9 },
  { id: 6, name: "Lisa Taylor", department: "Engineering", position: "Frontend Developer", salary: "$105,000", experience: "3 years", rating: 4.3 },
  { id: 7, name: "Tom Wilson", department: "Finance", position: "Financial Analyst", salary: "$90,000", experience: "5 years", rating: 4.6 },
  { id: 8, name: "Maria Garcia", department: "Sales", position: "Account Executive", salary: "$80,000", experience: "2 years", rating: 4.1 },
]

type SortConfig = {
  field: string
  direction: 'asc' | 'desc'
}

type FilterConfig = {
  department: string[]
}

export default function MultiSortTable() {
  const [sortConfigs, setSortConfigs] = useState<SortConfig[]>([
    { field: 'rating', direction: 'desc' },
    { field: 'salary', direction: 'desc' }
  ])
  const [filters, setFilters] = useState<FilterConfig>({ department: [] })
  const [showFilters, setShowFilters] = useState(false)

  const handleSort = (field: string) => {
    const existingSort = sortConfigs.find(sort => sort.field === field)
    
    if (existingSort) {
      // Toggle direction or remove if already sorted asc
      if (existingSort.direction === 'desc') {
        // Change to asc
        setSortConfigs(prev => 
          prev.map(sort => 
            sort.field === field ? { ...sort, direction: 'asc' } : sort
          )
        )
      } else {
        // Remove from sort
        setSortConfigs(prev => prev.filter(sort => sort.field !== field))
      }
    } else {
      // Add new sort
      setSortConfigs(prev => [...prev, { field, direction: 'desc' }])
    }
  }

  const toggleDepartmentFilter = (dept: string) => {
    setFilters(prev => ({
      department: prev.department.includes(dept)
        ? prev.department.filter(d => d !== dept)
        : [...prev.department, dept]
    }))
  }

  const clearFilters = () => {
    setFilters({ department: [] })
  }

  const clearSort = (field: string) => {
    setSortConfigs(prev => prev.filter(sort => sort.field !== field))
  }

  // Filter data
  let filteredData = [...employeeData]
  if (filters.department.length > 0) {
    filteredData = filteredData.filter(emp => 
      filters.department.includes(emp.department)
    )
  }

  // Sort data
  filteredData.sort((a, b) => {
    for (const sort of sortConfigs) {
      const aValue = a[sort.field as keyof typeof a]
      const bValue = b[sort.field as keyof typeof b]
      
      // Convert to numbers for comparison
      const aNum = parseFloat(String(aValue).replace(/[^0-9.-]+/g, ''))
      const bNum = parseFloat(String(bValue).replace(/[^0-9.-]+/g, ''))
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        if (aNum !== bNum) {
          return sort.direction === 'asc' ? aNum - bNum : bNum - aNum
        }
      } else {
        // String comparison
        const comparison = String(aValue).localeCompare(String(bValue))
        if (comparison !== 0) {
          return sort.direction === 'asc' ? comparison : -comparison
        }
      }
    }
    return 0
  })

  const getSortIcon = (field: string) => {
    const sort = sortConfigs.find(s => s.field === field)
    if (!sort) return null
    return sort.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      : <ChevronDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
  }

  const getSortOrder = (field: string) => {
    return sortConfigs.findIndex(sort => sort.field === field) + 1
  }

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
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Employee Directory</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
                Multi-sort enabled. Click multiple columns to sort by multiple criteria.
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters {filters.department.length > 0 && `(${filters.department.length})`}</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-800"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Filter Employees</h3>
              <button
                onClick={clearFilters}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'].map(dept => (
                <button
                  key={dept}
                  onClick={() => toggleDepartmentFilter(dept)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    filters.department.includes(dept)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Active Sort Indicators */}
        {sortConfigs.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {sortConfigs.map((sort, index) => (
              <div
                key={sort.field}
                className="flex items-center px-3 py-1 bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full text-sm"
              >
                <span className="mr-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  #{index + 1}
                </span>
                <span className="font-medium text-blue-700 dark:text-blue-400">
                  {sort.field === 'name' ? 'Name' : 
                   sort.field === 'department' ? 'Department' : 
                   sort.field === 'position' ? 'Position' : 
                   sort.field === 'salary' ? 'Salary' : 
                   sort.field === 'experience' ? 'Experience' : 'Rating'}
                </span>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {sort.direction === 'asc' ? 'Ascending' : 'Descending'}
                </span>
                <button
                  onClick={() => clearSort(sort.field)}
                  className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {sortConfigs.length > 1 && (
              <button
                onClick={() => setSortConfigs([])}
                className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              >
                Clear all sorts
              </button>
            )}
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <tr>
                  <th 
                    onClick={() => handleSort('name')}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        Name
                        {getSortIcon('name')}
                      </div>
                      {sortConfigs.some(s => s.field === 'name') && (
                        <span className="text-xs font-medium bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          {getSortOrder('name')}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('department')}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        Department
                        {getSortIcon('department')}
                      </div>
                      {sortConfigs.some(s => s.field === 'department') && (
                        <span className="text-xs font-medium bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          {getSortOrder('department')}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('position')}
                    className="hidden md:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        Position
                        {getSortIcon('position')}
                      </div>
                      {sortConfigs.some(s => s.field === 'position') && (
                        <span className="text-xs font-medium bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          {getSortOrder('position')}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('salary')}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        Salary
                        {getSortIcon('salary')}
                      </div>
                      {sortConfigs.some(s => s.field === 'salary') && (
                        <span className="text-xs font-medium bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          {getSortOrder('salary')}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('experience')}
                    className="hidden lg:table-cell px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        Experience
                        {getSortIcon('experience')}
                      </div>
                      {sortConfigs.some(s => s.field === 'experience') && (
                        <span className="text-xs font-medium bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          {getSortOrder('experience')}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('rating')}
                    className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        Rating
                        {getSortIcon('rating')}
                      </div>
                      {sortConfigs.some(s => s.field === 'rating') && (
                        <span className="text-xs font-medium bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          {getSortOrder('rating')}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredData.map((emp) => (
                  <motion.tr
                    key={emp.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-900/50 transition-all duration-300"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {emp.name}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {emp.department}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {emp.position}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {emp.salary}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-4 sm:px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {emp.experience}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 dark:bg-gray-800 rounded-full h-2 mr-3">
                          <div 
                            className="h-2 rounded-full bg-linear-to-r from-yellow-500 to-orange-600"
                            style={{ width: `${(emp.rating / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {emp.rating}
                        </span>
                        <TrendingUp className="w-4 h-4 text-green-500 ml-2" />
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
            Showing {filteredData.length} of {employeeData.length} employees
            {filters.department.length > 0 && ` • Filtered by ${filters.department.length} departments`}
            {sortConfigs.length > 0 && ` • Sorted by ${sortConfigs.length} columns`}
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <button
              onClick={() => setSortConfigs([])}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Reset Sorting
            </button>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  )
}