"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Folder, FileText, HelpCircle, Settings, Users, CreditCard } from "lucide-react";
import { useState } from "react";

interface TreeItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: TreeItem[];
  articles?: number;
}

export default function KnowledgeTreeHelpWidgets() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["getting-started"]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const treeData: TreeItem[] = [
    {
      id: "getting-started",
      label: "Getting Started",
      icon: <HelpCircle className="w-4 h-4" />,
      children: [
        { id: "gs-1", label: "Quick Start Guide", icon: <FileText className="w-4 h-4" />, articles: 5 },
        { id: "gs-2", label: "Installation", icon: <FileText className="w-4 h-4" />, articles: 3 },
        { id: "gs-3", label: "First Project", icon: <FileText className="w-4 h-4" />, articles: 4 },
      ],
    },
    {
      id: "account",
      label: "Account & Settings",
      icon: <Settings className="w-4 h-4" />,
      children: [
        { id: "acc-1", label: "Profile Settings", icon: <FileText className="w-4 h-4" />, articles: 6 },
        { id: "acc-2", label: "Security", icon: <FileText className="w-4 h-4" />, articles: 8 },
        { id: "acc-3", label: "Notifications", icon: <FileText className="w-4 h-4" />, articles: 4 },
      ],
    },
    {
      id: "billing",
      label: "Billing & Payments",
      icon: <CreditCard className="w-4 h-4" />,
      children: [
        { id: "bill-1", label: "Plans & Pricing", icon: <FileText className="w-4 h-4" />, articles: 5 },
        { id: "bill-2", label: "Payment Methods", icon: <FileText className="w-4 h-4" />, articles: 3 },
        { id: "bill-3", label: "Invoices", icon: <FileText className="w-4 h-4" />, articles: 2 },
      ],
    },
    {
      id: "teams",
      label: "Teams & Collaboration",
      icon: <Users className="w-4 h-4" />,
      children: [
        { id: "team-1", label: "Invite Members", icon: <FileText className="w-4 h-4" />, articles: 4 },
        { id: "team-2", label: "Permissions", icon: <FileText className="w-4 h-4" />, articles: 6 },
        { id: "team-3", label: "Workspaces", icon: <FileText className="w-4 h-4" />, articles: 5 },
      ],
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const renderTreeItem = (item: TreeItem, depth: number = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isSelected = selectedItem === item.id;

    return (
      <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.button
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            } else {
              setSelectedItem(item.id);
            }
          }}
          whileHover={{ x: 2 }}
          className={`w-full flex items-center gap-2 p-2.5 rounded-lg text-left transition-colors ${
            isSelected
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary dark:hover:bg-secondary text-foreground"
          }`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
        >
          {hasChildren ? (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          ) : (
            <span className="w-4" />
          )}
          <span className={`shrink-0 ${hasChildren ? "text-primary" : ""}`}>
            {hasChildren ? <Folder className="w-4 h-4" /> : item.icon}
          </span>
          <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
          {item.articles && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              isSelected ? "bg-primary-foreground/20" : "bg-secondary dark:bg-secondary text-muted-foreground"
            }`}>
              {item.articles}
            </span>
          )}
        </motion.button>

        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.children?.map((child) => renderTreeItem(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const getSelectedArticle = () => {
    for (const category of treeData) {
      if (category.children) {
        const found = category.children.find(child => child.id === selectedItem);
        if (found) return { category: category.label, article: found };
      }
    }
    return null;
  };

  const selectedArticle = getSelectedArticle();

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-card dark:bg-card rounded-2xl border border-border p-4 shadow-lg h-fit"
        >
          <h3 className="font-display font-semibold text-foreground mb-4 px-2">
            Knowledge Base
          </h3>
          <div className="space-y-1">
            {treeData.map((item) => renderTreeItem(item))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-card dark:bg-card rounded-2xl border border-border p-6 shadow-lg"
        >
          <AnimatePresence mode="wait">
            {selectedArticle ? (
              <motion.div
                key={selectedItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <span>{selectedArticle.category}</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-foreground">{selectedArticle.article.label}</span>
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  {selectedArticle.article.label}
                </h2>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    This section contains {selectedArticle.article.articles} articles about {selectedArticle.article.label.toLowerCase()}.
                    Select an article from the sidebar to read its content.
                  </p>
                  <div className="mt-6 p-4 bg-secondary/50 dark:bg-secondary/30 rounded-xl">
                    <h4 className="font-semibold text-foreground mb-2">In this section:</h4>
                    <ul className="space-y-2">
                      {Array.from({ length: selectedArticle.article.articles || 0 }).map((_, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Article {i + 1} - Sample Topic</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <HelpCircle className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Welcome to Knowledge Base
                </h3>
                <p className="text-muted-foreground">
                  Select a topic from the sidebar to get started
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.main>
  );
}
