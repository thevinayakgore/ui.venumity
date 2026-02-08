"use client";
import { useState } from 'react';
import { Search, Home, Briefcase, FileText, Users, Settings, Star, Clock, Filter } from 'lucide-react';

export default function SidebarWithSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState('dashboard');
  const [filters, setFilters] = useState({
    starred: false,
    recent: false,
    team: false,
  });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const quickFilters = [
    { id: 'starred', label: 'Starred', icon: Star, count: 12 },
    { id: 'recent', label: 'Recent', icon: Clock, count: 8 },
    { id: 'team', label: 'Team', icon: Users, count: 24 },
  ];

  const recentSearches = [
    'Project Alpha',
    'Quarterly Report',
    'Team Meeting',
    'Budget Planning',
  ];

  const filteredItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFilter = (filterId: string) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId as keyof typeof filters],
    }));
  };

  return (
    <div className="flex h-[500px] bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 flex flex-col border-r border-gray-200 dark:border-gray-800">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Filters</span>
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="space-y-2">
            {quickFilters.map((filter) => {
              const Icon = filter.icon;
              const isActive = filters[filter.id as keyof typeof filters];

              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{filter.label}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex-1 p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Navigation</h4>
          <div className="space-y-1">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                No matching items found
              </div>
            )}
          </div>
        </div>

        {/* Recent Searches */}
        {searchQuery === '' && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Recent Searches</h4>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{search}</span>
                  </div>
                  <Search className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sidebar with Search</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {searchQuery ? `Search results for: "${searchQuery}"` : 'All items'}
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Active Filters */}
          {Object.values(filters).some(Boolean) && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900 dark:text-white">Active Filters</span>
                <button
                  onClick={() => setFilters({ starred: false, recent: false, team: false })}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters)
                  .filter(([, isActive]) => isActive)
                  .map(([filterId]) => {
                    const filter = quickFilters.find(f => f.id === filterId);
                    return filter ? (
                      <div
                        key={filter.id}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full"
                      >
                        <span className="text-sm">{filter.label}</span>
                        <button
                          onClick={() => toggleFilter(filter.id)}
                          className="text-primary hover:text-primary/80"
                        >
                          ×
                        </button>
                      </div>
                    ) : null;
                  })}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="font-medium text-gray-900 dark:text-white mb-2">Current Selection</div>
              <div className="text-gray-600 dark:text-gray-400">
                Active item: <span className="font-medium text-primary">{activeItem}</span>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="font-medium text-gray-900 dark:text-white mb-2">Search Status</div>
              <div className="text-gray-600 dark:text-gray-400">
                {searchQuery ? (
                  <>
                    Found <span className="font-medium text-primary">{filteredItems.length}</span> matching items
                  </>
                ) : (
                  'No active search'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}