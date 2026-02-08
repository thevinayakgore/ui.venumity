"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, Clock, CheckCircle, AlertCircle, Plus, Filter, ChevronRight } from "lucide-react";
import { useState } from "react";

interface SupportTicket {
  id: string;
  title: string;
  status: "open" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdAt: string;
  lastUpdate: string;
}

export default function TicketStatusHelpWidgets() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const tickets: SupportTicket[] = [
    {
      id: "TKT-001",
      title: "Unable to access dashboard",
      status: "in-progress",
      priority: "high",
      createdAt: "2 hours ago",
      lastUpdate: "30 min ago",
    },
    {
      id: "TKT-002",
      title: "Billing inquiry for last month",
      status: "open",
      priority: "medium",
      createdAt: "1 day ago",
      lastUpdate: "5 hours ago",
    },
    {
      id: "TKT-003",
      title: "Feature request: Dark mode",
      status: "resolved",
      priority: "low",
      createdAt: "3 days ago",
      lastUpdate: "1 day ago",
    },
    {
      id: "TKT-004",
      title: "Integration setup help needed",
      status: "open",
      priority: "medium",
      createdAt: "5 hours ago",
      lastUpdate: "2 hours ago",
    },
  ];

  const filters = [
    { id: "all", label: "All" },
    { id: "open", label: "Open" },
    { id: "in-progress", label: "In Progress" },
    { id: "resolved", label: "Resolved" },
  ];

  const filteredTickets = selectedFilter === "all" 
    ? tickets 
    : tickets.filter(t => t.status === selectedFilter);

  const getStatusConfig = (status: SupportTicket["status"]) => {
    switch (status) {
      case "open":
        return { icon: <Clock className="w-4 h-4" />, color: "text-amber-500 bg-amber-500/10", label: "Open" };
      case "in-progress":
        return { icon: <AlertCircle className="w-4 h-4" />, color: "text-blue-500 bg-blue-500/10", label: "In Progress" };
      case "resolved":
        return { icon: <CheckCircle className="w-4 h-4" />, color: "text-emerald-500 bg-emerald-500/10", label: "Resolved" };
    }
  };

  const getPriorityColor = (priority: SupportTicket["priority"]) => {
    switch (priority) {
      case "low": return "bg-secondary text-muted-foreground";
      case "medium": return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
      case "high": return "bg-destructive/10 text-destructive";
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-card dark:bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-foreground">Support Tickets</h2>
                <p className="text-sm text-muted-foreground">{tickets.length} total tickets</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-lg shadow-primary/20"
            >
              <Plus className="w-4 h-4" />
              New Ticket
            </motion.button>
          </div>

          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === filter.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary dark:bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-border">
          <AnimatePresence mode="popLayout">
            {filteredTickets.map((ticket, index) => {
              const statusConfig = getStatusConfig(ticket.status);
              return (
                <motion.div
                  key={ticket.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.3)" }}
                  className="p-4 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <h3 className="font-medium text-foreground truncate">{ticket.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Created {ticket.createdAt}</span>
                        <span>Updated {ticket.lastUpdate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${statusConfig.color}`}>
                        {statusConfig.icon}
                        <span className="text-xs font-medium">{statusConfig.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredTickets.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 text-center"
            >
              <Ticket className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No tickets found</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.main>
  );
}
