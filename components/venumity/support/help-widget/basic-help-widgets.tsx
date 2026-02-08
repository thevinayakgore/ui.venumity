"use client";
import { motion } from "framer-motion";
import { MessageCircle, Headphones, BookOpen, Zap, ArrowRight } from "lucide-react";

interface HelpWidget {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  color: string;
}

export default function BasicHelpWidgets() {
  const widgets: HelpWidget[] = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Knowledge Base",
      description: "Browse articles and tutorials",
      action: "Browse Articles",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Call Support",
      description: "Speak with an agent directly",
      action: "Call Now",
      color: "from-violet-500 to-violet-600",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quick Actions",
      description: "Common tasks and shortcuts",
      action: "View Actions",
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
      >
        {widgets.map((widget, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-card dark:bg-card rounded-xl border border-border p-5 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${widget.color} text-white mb-4`}>
              {widget.icon}
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">
              {widget.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {widget.description}
            </p>
            <motion.span
              className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all"
              whileHover={{ x: 4 }}
            >
              {widget.action}
              <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </motion.main>
  );
}
