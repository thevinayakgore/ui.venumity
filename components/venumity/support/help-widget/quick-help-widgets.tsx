"use client";
import { motion } from "framer-motion";
import { Search, BookOpen, Video, FileText, ExternalLink, TrendingUp } from "lucide-react";
import { useState } from "react";

interface QuickLink {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

interface TrendingTopic {
  title: string;
  views: string;
}

export default function QuickHelpWidgets() {
  const [searchQuery, setSearchQuery] = useState("");

  const quickLinks: QuickLink[] = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Getting Started Guide",
      description: "Learn the basics in 5 minutes",
      href: "#",
      badge: "Popular",
    },
    {
      icon: <Video className="w-5 h-5" />,
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      href: "#",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "API Documentation",
      description: "Technical reference docs",
      href: "#",
    },
  ];

  const trendingTopics: TrendingTopic[] = [
    { title: "How to reset password", views: "2.4k" },
    { title: "Billing and invoices", views: "1.8k" },
    { title: "Team collaboration", views: "1.2k" },
    { title: "Export options", views: "890" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-card dark:bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
      >
        <div className="p-6 bg-linear-to-br from-primary/10 to-accent/10 dark:from-primary/5 dark:to-accent/5">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-display font-semibold text-foreground mb-4"
          >
            How can we help?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-card dark:bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground shadow-sm"
            />
          </motion.div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4, backgroundColor: "hsl(var(--secondary) / 0.5)" }}
                  className="flex items-center gap-4 p-3 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary dark:bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{link.title}</p>
                      {link.badge && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Trending Topics
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {trendingTopics.map((topic, index) => (
                <motion.a
                  key={index}
                  href="#"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 bg-secondary/50 dark:bg-secondary/30 rounded-lg hover:bg-secondary transition-colors"
                >
                  <p className="text-sm font-medium text-foreground truncate">{topic.title}</p>
                  <p className="text-xs text-muted-foreground">{topic.views} views</p>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
}
