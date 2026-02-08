"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Tag, MessageSquare, Paperclip, Send } from "lucide-react";
import { useState } from "react";

interface TicketComment {
  id: number;
  author: string;
  authorRole: "customer" | "support";
  message: string;
  timestamp: string;
}

interface TicketDetail {
  id: string;
  title: string;
  status: "open" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: string;
  assignee: string;
  description: string;
  comments: TicketComment[];
}

export default function TicketDetailSupportCard() {
  const [isOpen, setIsOpen] = useState(true);
  const [newComment, setNewComment] = useState("");

  const ticket: TicketDetail = {
    id: "TKT-2024-001",
    title: "Unable to export data to CSV format",
    status: "in-progress",
    priority: "high",
    category: "Technical Issue",
    createdAt: "Dec 10, 2024 at 2:30 PM",
    assignee: "Sarah Chen",
    description: "When I try to export my project data to CSV format, the download starts but then fails with an error message saying 'Export failed. Please try again.' I've tried multiple times with different projects but the issue persists.",
    comments: [
      {
        id: 1,
        author: "John Doe",
        authorRole: "customer",
        message: "I've attached a screenshot of the error message I'm receiving.",
        timestamp: "Dec 10, 2024 at 2:35 PM",
      },
      {
        id: 2,
        author: "Sarah Chen",
        authorRole: "support",
        message: "Thank you for reporting this issue. I can see the error in our logs. This appears to be related to a recent update. Our team is investigating and I'll keep you posted on the progress.",
        timestamp: "Dec 10, 2024 at 3:15 PM",
      },
      {
        id: 3,
        author: "Sarah Chen",
        authorRole: "support",
        message: "Update: We've identified the root cause. A fix is being deployed and should be live within the hour.",
        timestamp: "Dec 10, 2024 at 4:00 PM",
      },
    ],
  };

  const getStatusConfig = (status: TicketDetail["status"]) => {
    switch (status) {
      case "open": return { color: "bg-amber-500/10 text-amber-600", label: "Open" };
      case "in-progress": return { color: "bg-blue-500/10 text-blue-600", label: "In Progress" };
      case "resolved": return { color: "bg-emerald-500/10 text-emerald-600", label: "Resolved" };
    }
  };

  const getPriorityConfig = (priority: TicketDetail["priority"]) => {
    switch (priority) {
      case "low": return { color: "bg-secondary text-muted-foreground" };
      case "medium": return { color: "bg-amber-500/10 text-amber-600" };
      case "high": return { color: "bg-destructive/10 text-destructive" };
    }
  };

  const statusConfig = getStatusConfig(ticket.status);
  const priorityConfig = getPriorityConfig(ticket.priority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setNewComment("");
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-3xl bg-card dark:bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono text-muted-foreground">{ticket.id}</span>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${priorityConfig.color}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <h2 className="text-xl font-display font-semibold text-foreground">{ticket.title}</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-secondary rounded-lg"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {ticket.createdAt}
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {ticket.assignee}
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  {ticket.category}
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-border">
              <h3 className="text-sm font-medium text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground">{ticket.description}</p>
            </div>

            <div className="p-6 border-b border-border max-h-80 overflow-y-auto">
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Activity ({ticket.comments.length})
              </h3>

              <div className="space-y-4">
                {ticket.comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex gap-3 ${
                      comment.authorRole === "support" ? "" : "flex-row-reverse"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-medium ${
                      comment.authorRole === "support"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}>
                      {comment.author.charAt(0)}
                    </div>
                    <div className={`flex-1 max-w-[80%] ${
                      comment.authorRole === "customer" ? "text-right" : ""
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <div className={`p-3 rounded-xl ${
                        comment.authorRole === "support"
                          ? "bg-secondary/50 dark:bg-secondary/30 rounded-tl-none"
                          : "bg-primary/10 rounded-tr-none"
                      }`}>
                        <p className="text-sm text-foreground">{comment.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 bg-secondary/30 dark:bg-secondary/20">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={2}
                    className="w-full px-4 py-3 bg-card dark:bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-secondary dark:bg-secondary text-foreground rounded-xl"
                  >
                    <Paperclip className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!newComment.trim()}
                    className="p-3 bg-primary text-primary-foreground rounded-xl disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium"
        >
          View Ticket Details
        </motion.button>
      )}
    </motion.main>
  );
}
