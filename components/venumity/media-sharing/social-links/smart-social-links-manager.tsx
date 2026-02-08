"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Check,
  Share2,
  QrCode,
  BarChart3,
  Target,
  Zap,
  Lock,
  Unlock,
  AlertCircle
} from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  icon: string;
  url: string;
  customName: string;
  clicks: number;
  growth: number;
  status: "active" | "paused" | "draft";
  priority: number;
  lastClicked: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export default function SmartSocialLinksManager() {
  const [links, setLinks] = useState<SocialLink[]>([
    { id: "1", platform: "Twitter", icon: "🐦", url: "https://twitter.com/dev", customName: "Professional Twitter", clicks: 1567, growth: 12.5, status: "active", priority: 1, lastClicked: "2 hours ago", category: "social" },
    { id: "2", platform: "GitHub", icon: "💻", url: "https://github.com/dev", customName: "Code Portfolio", clicks: 892, growth: 8.2, status: "active", priority: 2, lastClicked: "1 day ago", category: "work" },
    { id: "3", platform: "LinkedIn", icon: "💼", url: "https://linkedin.com/in/dev", customName: "Professional Profile", clicks: 1245, growth: 15.3, status: "active", priority: 1, lastClicked: "5 hours ago", category: "work" },
    { id: "4", platform: "Instagram", icon: "📸", url: "https://instagram.com/dev", customName: "Creative Portfolio", clicks: 2345, growth: 21.7, status: "paused", priority: 3, lastClicked: "1 week ago", category: "social" },
    { id: "5", platform: "YouTube", icon: "🎥", url: "https://youtube.com/@dev", customName: "Tutorial Channel", clicks: 5678, growth: 18.4, status: "active", priority: 2, lastClicked: "Just now", category: "content" },
    { id: "6", platform: "Portfolio", icon: "🎨", url: "https://portfolio.dev", customName: "Main Portfolio", clicks: 3456, growth: 9.8, status: "active", priority: 1, lastClicked: "3 hours ago", category: "work" },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: "all", name: "All Links", icon: "📊", color: "text-blue-600", count: 6 },
    { id: "work", name: "Work", icon: "💼", color: "text-green-600", count: 3 },
    { id: "social", name: "Social", icon: "👥", color: "text-purple-600", count: 2 },
    { id: "content", name: "Content", icon: "🎬", color: "text-orange-600", count: 1 },
  ]);

  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [showNewLinkForm, setShowNewLinkForm] = useState(false);
  const [newLink, setNewLink] = useState({
    platform: "",
    icon: "🔗",
    url: "",
    customName: "",
    category: "social"
  });

  const filteredLinks = activeCategory === "all" 
    ? links 
    : links.filter(link => link.category === activeCategory);

  const activeLinks = links.filter(link => link.status === "active");
  const totalClicks = links.reduce((acc, link) => acc + link.clicks, 0);
  const avgGrowth = links.reduce((acc, link) => acc + link.growth, 0) / links.length;

  const handleCopy = async (url: string, id: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const toggleLinkStatus = (id: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id 
        ? { 
            ...link, 
            status: link.status === "active" ? "paused" : "active",
            lastClicked: "Just now"
          }
        : link
    ));
  };

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const addNewLink = () => {
    if (!newLink.platform || !newLink.url) return;

    const newLinkItem: SocialLink = {
      id: Date.now().toString(),
      platform: newLink.platform,
      icon: newLink.icon,
      url: newLink.url,
      customName: newLink.customName || newLink.platform,
      clicks: 0,
      growth: 0,
      status: "active",
      priority: links.length + 1,
      lastClicked: "Never",
      category: newLink.category
    };

    setLinks(prev => [...prev, newLinkItem]);
    setNewLink({ platform: "", icon: "🔗", url: "", customName: "", category: "social" });
    setShowNewLinkForm(false);
  };

  const updateCategoryCounts = useCallback(() => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      count: cat.id === "all"
        ? links.length
        : links.filter(link => link.category === cat.id).length
    })));
  }, [links]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateCategoryCounts();
    }, 0);
    return () => clearTimeout(timeout);
  }, [links, updateCategoryCounts]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-6xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Smart Links Manager</h2>
                <p className="text-gray-600 dark:text-gray-400">Manage and optimize all your social links</p>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{activeLinks.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active Links</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">+{avgGrowth.toFixed(1)}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Growth</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowNewLinkForm(true)}
                  className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Add New Link
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <BarChart3 size={20} className="text-blue-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{totalClicks.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Clicks</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Target size={20} className="text-green-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{activeLinks.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-purple-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{categories.length - 1}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <AlertCircle size={20} className="text-orange-600" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {Math.round(totalClicks / links.length)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg per Link</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeCategory === category.id 
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow" 
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                >
                  <span className={`text-lg ${category.color}`}>{category.icon}</span>
                  {category.name}
                  <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* New Link Form */}
          <AnimatePresence>
            {showNewLinkForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-6 border-b border-gray-200 dark:border-gray-800 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Add New Link</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Platform (e.g., Twitter)"
                    value={newLink.platform}
                    onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                    className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Custom Name (optional)"
                    value={newLink.customName}
                    onChange={(e) => setNewLink({ ...newLink, customName: e.target.value })}
                    className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
                  />
                  <select
                    value={newLink.category}
                    onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
                    className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
                  >
                    <option value="social">Social</option>
                    <option value="work">Work</option>
                    <option value="content">Content</option>
                  </select>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={addNewLink}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add Link
                  </button>
                  <button
                    onClick={() => setShowNewLinkForm(false)}
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Links List */}
          <div className="p-6">
            <div className="space-y-4">
              {filteredLinks.map((link) => (
                <div
                  key={link.id}
                  className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{link.icon}</div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{link.customName}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{link.platform}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        link.status === "active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}>
                        {link.status === "active" ? "Active" : "Paused"}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                        Priority: {link.priority}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">URL</div>
                      <div className="text-gray-800 dark:text-gray-200 truncate">{link.url}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Performance</div>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">{link.clicks}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Clicks</div>
                        </div>
                        <div>
                          <div className="font-bold text-green-600">+{link.growth.toFixed(1)}%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Growth</div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">{link.lastClicked}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Last Click</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(link.url, link.id)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                        title="Copy link"
                      >
                        {copiedLink === link.id ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <Copy size={16} className="text-gray-500" />
                        )}
                      </button>
                      <button
                        onClick={() => toggleLinkStatus(link.id)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                        title={link.status === "active" ? "Pause link" : "Activate link"}
                      >
                        {link.status === "active" ? (
                          <Lock size={16} className="text-gray-500" />
                        ) : (
                          <Unlock size={16} className="text-gray-500" />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                      >
                        Visit
                        <ExternalLink size={14} />
                      </a>
                      <button
                        onClick={() => deleteLink(link.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 rounded-lg"
                        title="Delete link"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Share All Links
                </button>
                <button className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center gap-2">
                  <QrCode size={20} />
                  Generate QR Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}