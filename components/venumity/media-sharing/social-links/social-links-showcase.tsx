"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Users,
  Target,
  ExternalLink,
  Copy,
  Check,
  Share2,
  QrCode,
  Eye,
  EyeOff,
  Filter,
  Grid,
  List
} from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  icon: string;
  url: string;
  description: string;
  stats: {
    clicks: number;
    growth: number;
    engagement: number;
    rank: number;
  };
  category: string;
  featured: boolean;
  color: string;
  gradient: string;
}

interface ViewMode {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export default function SocialLinksShowcase() {
  const [links, setLinks] = useState<SocialLink[]>([
    { 
      id: "1", 
      platform: "Twitter", 
      icon: "🐦", 
      url: "https://twitter.com/innovator", 
      description: "Daily tech insights & industry updates", 
      stats: { clicks: 1567, growth: 12.5, engagement: 8.2, rank: 1 }, 
      category: "social", 
      featured: true, 
      color: "text-sky-500",
      gradient: "from-sky-400 to-sky-600"
    },
    { 
      id: "2", 
      platform: "GitHub", 
      icon: "💻", 
      url: "https://github.com/innovator", 
      description: "Open source projects & code repositories", 
      stats: { clicks: 892, growth: 8.2, engagement: 6.5, rank: 3 }, 
      category: "work", 
      featured: true, 
      color: "text-gray-800 dark:text-gray-300",
      gradient: "from-gray-700 to-gray-900"
    },
    { 
      id: "3", 
      platform: "LinkedIn", 
      icon: "💼", 
      url: "https://linkedin.com/in/innovator", 
      description: "Professional network & career updates", 
      stats: { clicks: 1245, growth: 15.3, engagement: 7.8, rank: 2 }, 
      category: "work", 
      featured: false, 
      color: "text-blue-700",
      gradient: "from-blue-600 to-blue-800"
    },
    { 
      id: "4", 
      platform: "Instagram", 
      icon: "📸", 
      url: "https://instagram.com/innovator", 
      description: "Visual content & behind the scenes", 
      stats: { clicks: 2345, growth: 21.7, engagement: 12.4, rank: 1 }, 
      category: "social", 
      featured: true, 
      color: "text-pink-600",
      gradient: "from-pink-500 to-rose-600"
    },
    { 
      id: "5", 
      platform: "YouTube", 
      icon: "🎥", 
      url: "https://youtube.com/@innovator", 
      description: "Tutorials & educational content", 
      stats: { clicks: 5678, growth: 18.4, engagement: 14.2, rank: 1 }, 
      category: "content", 
      featured: true, 
      color: "text-red-600",
      gradient: "from-red-500 to-red-700"
    },
    { 
      id: "6", 
      platform: "Portfolio", 
      icon: "🎨", 
      url: "https://innovator.design", 
      description: "Interactive portfolio & case studies", 
      stats: { clicks: 3456, growth: 9.8, engagement: 5.6, rank: 2 }, 
      category: "work", 
      featured: false, 
      color: "text-purple-600",
      gradient: "from-purple-500 to-purple-700"
    },
    { 
      id: "7", 
      platform: "Medium", 
      icon: "✍️", 
      url: "https://medium.com/@innovator", 
      description: "Technical articles & thought leadership", 
      stats: { clicks: 789, growth: 6.7, engagement: 4.3, rank: 4 }, 
      category: "content", 
      featured: false, 
      color: "text-green-600",
      gradient: "from-green-500 to-green-700"
    },
    { 
      id: "8", 
      platform: "Newsletter", 
      icon: "📬", 
      url: "https://newsletter.innovator.com", 
      description: "Weekly curated content & insights", 
      stats: { clicks: 1234, growth: 11.2, engagement: 9.8, rank: 3 }, 
      category: "content", 
      featured: true, 
      color: "text-orange-600",
      gradient: "from-orange-500 to-orange-700"
    },
  ]);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(true);

  const categories = [
    { id: "all", name: "All Links", count: links.length },
    { id: "featured", name: "Featured", count: links.filter(l => l.featured).length },
    { id: "social", name: "Social", count: links.filter(l => l.category === "social").length },
    { id: "work", name: "Work", count: links.filter(l => l.category === "work").length },
    { id: "content", name: "Content", count: links.filter(l => l.category === "content").length },
  ];

  const viewModes: ViewMode[] = [
    { id: "grid", name: "Grid View", icon: <Grid size={18} /> },
    { id: "list", name: "List View", icon: <List size={18} /> },
  ];

  const filteredLinks = activeCategory === "all" 
    ? links 
    : activeCategory === "featured"
      ? links.filter(l => l.featured)
      : links.filter(l => l.category === activeCategory);

  const totalClicks = links.reduce((acc, link) => acc + link.stats.clicks, 0);
  const avgEngagement = links.reduce((acc, link) => acc + link.stats.engagement, 0) / links.length;
  const featuredLinks = links.filter(l => l.featured).length;

  const copyToClipboard = async (url: string, id: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const simulateClick = (id: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id 
        ? { 
            ...link, 
            stats: { 
              ...link.stats, 
              clicks: link.stats.clicks + 1,
              growth: link.stats.growth + (Math.random() * 2 - 1)
            }
          }
        : link
    ));
  };

  const toggleFeatured = (id: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, featured: !link.featured } : link
    ));
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-7xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl">
                  <Sparkles className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Social Links Showcase</h2>
                  <p className="text-gray-600 dark:text-gray-400">Beautiful showcase of all social profiles</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {totalClicks.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Clicks</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {avgEngagement.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Engagement</div>
                  </div>
                </div>
                <button className="px-6 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Share Showcase
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-blue-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{featuredLinks}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Featured Links</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
                <div className="flex items-center gap-3">
                  <TrendingUp size={20} className="text-green-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{links.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Links</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
                <div className="flex items-center gap-3">
                  <Target size={20} className="text-purple-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">#1</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Top Platform</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-orange-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {Math.round(totalClicks / links.length)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Clicks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeCategory === category.id 
                      ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow" 
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                  >
                    {category.name}
                    <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      {category.count}
                    </span>
                  </button>
                ))}
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2">
                  <Filter size={16} />
                  Filters
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  {viewModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id as "grid" | "list")}
                      className={`p-2 rounded ${viewMode === mode.id 
                        ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white" 
                        : "text-gray-600 dark:text-gray-400"}`}
                    >
                      {mode.icon}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {showStats ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid/List */}
          <div className="p-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredLinks.map((link) => (
                  <motion.div
                    key={link.id}
                    whileHover={{ y: -8 }}
                    onHoverStart={() => setHoveredLink(link.id)}
                    onHoverEnd={() => setHoveredLink(null)}
                    className={`relative rounded-xl border overflow-hidden ${link.featured 
                      ? "border-yellow-500 bg-linear-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20" 
                      : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"}`}
                  >
                    {/* Featured Badge */}
                    {link.featured && (
                      <div className="absolute top-3 right-3 bg-linear-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Sparkles size={10} />
                        Featured
                      </div>
                    )}

                    {/* Link Card */}
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <div className={`text-5xl mb-3 ${link.color}`}>
                          {link.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {link.platform}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {link.description}
                        </p>
                      </div>

                      {/* Stats */}
                      {showStats && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="text-center p-2 bg-white dark:bg-gray-900 rounded-lg">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              {link.stats.clicks.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Clicks</div>
                          </div>
                          <div className="text-center p-2 bg-white dark:bg-gray-900 rounded-lg">
                            <div className="text-lg font-bold text-green-600">
                              +{link.stats.growth.toFixed(1)}%
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Growth</div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="space-y-2">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => simulateClick(link.id)}
                          className={`block w-full py-2 bg-linear-to-r ${link.gradient} text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-2`}
                        >
                          Visit Link
                          <ExternalLink size={14} />
                        </a>
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyToClipboard(link.url, link.id)}
                            className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center gap-1"
                          >
                            {copiedLink === link.id ? (
                              <Check size={14} className="text-green-600" />
                            ) : (
                              <Copy size={14} className="text-gray-500" />
                            )}
                            Copy
                          </button>
                          <button
                            onClick={() => toggleFeatured(link.id)}
                            className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                            title={link.featured ? "Remove featured" : "Mark as featured"}
                          >
                            <Sparkles size={14} className={link.featured ? "text-yellow-500" : "text-gray-500"} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <AnimatePresence>
                      {hoveredLink === link.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredLinks.map((link) => (
                  <div
                    key={link.id}
                    className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`text-3xl ${link.color}`}>
                          {link.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 dark:text-white">{link.platform}</h3>
                            {link.featured && (
                              <Sparkles size={14} className="text-yellow-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        {showStats && (
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-bold text-gray-900 dark:text-white">
                                {link.stats.clicks.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Clicks</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-green-600">+{link.stats.growth.toFixed(1)}%</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Growth</div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(link.url, link.id)}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                          >
                            {copiedLink === link.id ? (
                              <Check size={16} className="text-green-600" />
                            ) : (
                              <Copy size={16} className="text-gray-500" />
                            )}
                          </button>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => simulateClick(link.id)}
                            className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                          >
                            Visit
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Stats */}
            <div className="mt-8 p-6 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {filteredLinks.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Showing Links</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {filteredLinks.filter(l => l.featured).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Featured</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {avgEngagement.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Engagement</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">Top 10%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Creator Rank</div>
                </div>
              </div>
            </div>

            {/* Final Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2">
                <Share2 size={20} />
                Share Showcase
              </button>
              <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center gap-2">
                <QrCode size={20} />
                Generate QR Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}